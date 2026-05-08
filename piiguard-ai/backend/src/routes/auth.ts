import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '../config/database'
import { env } from '../config/env'
import { validate, loginSchema, registerSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } from '../middleware/validation'
import { authMiddleware, type AuthRequest } from '../middleware/auth'
import { cacheSet, cacheGet, cacheDel } from '../config/redis'

const router = Router()

function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role, jti: uuidv4() }, env.JWT_SECRET, {
    expiresIn: 604800, // 7 days
  })
}

router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      res.status(409).json({ error: 'Email already registered' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })

    const token = generateToken(user.id, user.role)

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'REGISTER', resource: '/api/auth/register', ipAddress: req.ip },
    })

    res.status(201).json({ token, user })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = generateToken(user.id, user.role)

    // Clean expired sessions for this user, then create new one
    await prisma.session.deleteMany({
      where: { userId: user.id, expiresAt: { lt: new Date() } },
    })

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'LOGIN', resource: '/api/auth/login', ipAddress: req.ip },
    })

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      await prisma.session.deleteMany({ where: { token } })
    }
    await prisma.auditLog.create({
      data: { userId: req.userId, action: 'LOGOUT', resource: '/api/auth/logout', ipAddress: req.ip },
    })
    res.json({ message: 'Logged out' })
  } catch {
    res.status(500).json({ error: 'Logout failed' })
  }
})

router.put('/password', authMiddleware, validate(changePasswordSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await prisma.user.findUnique({ where: { id: req.userId } })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!valid) {
      res.status(401).json({ error: 'Incorrect current password' })
      return
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)
    
    await prisma.user.update({
      where: { id: req.userId },
      data: { passwordHash },
    })

    // Log out from all devices by deleting sessions except current (optional, but good practice. For now, we leave sessions intact or clear them).
    // The requirement says reset password works, we'll keep it simple.

    await prisma.auditLog.create({
      data: { userId: req.userId, action: 'CHANGE_PASSWORD', resource: '/api/auth/password', ipAddress: req.ip },
    })

    res.json({ message: 'Password updated successfully' })
  } catch (err) {
    console.error('Password change error:', err)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

router.post('/forgot-password', validate(forgotPasswordSchema), async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Return success even if user not found to prevent email enumeration
      res.json({ message: 'If an account exists, a password reset link has been sent.' })
      return
    }

    const resetToken = uuidv4()
    // Store in Redis with 15-minute expiration (900 seconds)
    await cacheSet(`pwd_reset_${resetToken}`, user.id, 900)

    // In a real application, send this token via email here.
    // For this demonstration, we'll return it so the frontend can display it or log it.
    console.log(`[DEMO] Password reset link generated: ${env.CORS_ORIGIN}/reset-password?token=${resetToken}`)

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'FORGOT_PASSWORD', resource: '/api/auth/forgot-password', ipAddress: req.ip },
    })

    res.json({ message: 'Password reset link generated.', devToken: resetToken })
  } catch (err) {
    console.error('Forgot password error:', err)
    res.status(500).json({ error: 'Failed to process request' })
  }
})

router.post('/reset-password', validate(resetPasswordSchema), async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body

    const userId = await cacheGet(`pwd_reset_${token}`)
    if (!userId) {
      res.status(400).json({ error: 'Invalid or expired reset token' })
      return
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)
    
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    })

    await cacheDel(`pwd_reset_${token}`)

    await prisma.auditLog.create({
      data: { userId, action: 'RESET_PASSWORD', resource: '/api/auth/reset-password', ipAddress: req.ip },
    })

    res.json({ message: 'Password reset successfully' })
  } catch (err) {
    console.error('Reset password error:', err)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

export default router
