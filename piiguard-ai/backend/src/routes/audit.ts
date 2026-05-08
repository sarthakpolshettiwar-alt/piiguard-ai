import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { prisma } from '../config/database'

const router = Router()

/**
 * @swagger
 * /api/audit/logs:
 *   get:
 *     summary: Paginated audit logs
 *     tags: [Audit]
 */
router.get('/logs', authMiddleware, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100)
    const skip = (page - 1) * limit

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.auditLog.count(),
    ])

    res.json({
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    console.error('Audit logs error:', err)
    res.status(500).json({ error: 'Failed to fetch audit logs' })
  }
})

export default router
