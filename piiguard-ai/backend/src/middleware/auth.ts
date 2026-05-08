import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export interface AuthRequest extends Request {
  userId?: string
  userRole?: string
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Invalid token format' })
    return
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; role: string }
    req.userId = decoded.userId
    req.userRole = decoded.role
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.userRole !== 'admin') {
    res.status(403).json({ error: 'Admin access required' })
    return
  }
  next()
}
