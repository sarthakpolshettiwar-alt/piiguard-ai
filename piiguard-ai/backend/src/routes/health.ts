import { Router, Request, Response } from 'express'
import { checkDatabaseConnection } from '../config/database'
import { checkRedisConnection } from '../config/redis'

const router = Router()

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: System health check
 *     tags: [Health]
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [postgres, redis] = await Promise.all([
      checkDatabaseConnection(),
      checkRedisConnection(),
    ])

    const memUsage = process.memoryUsage()
    const uptime = process.uptime()

    const status = postgres.connected ? 'healthy' : 'degraded'

    res.status(status === 'healthy' ? 200 : 503).json({
      status,
      postgres,
      redis,
      uptime: Math.floor(uptime),
      memory: {
        used: memUsage.heapUsed,
        total: memUsage.heapTotal,
        percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100),
      },
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      nodeVersion: process.version,
    })
  } catch (err) {
    res.status(500).json({ status: 'unhealthy', error: 'Health check failed' })
  }
})

export default router
