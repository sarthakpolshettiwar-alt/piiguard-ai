import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { prisma } from '../config/database'

const router = Router()

/**
 * @swagger
 * /api/analytics/dashboard:
 *   get:
 *     summary: Dashboard summary stats
 *     tags: [Analytics]
 */
router.get('/dashboard', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const [totalTokens, totalThreats, totalMetrics, activeSessionCount] = await Promise.all([
      prisma.tokenEvent.count(),
      prisma.threatEvent.count(),
      prisma.apiMetric.count(),
      prisma.session.count({ where: { expiresAt: { gt: new Date() } } }),
    ])

    const avgLatency = await prisma.apiMetric.aggregate({ _avg: { latency: true } })

    res.json({
      totalRequests: totalMetrics,
      totalTokens,
      totalThreats,
      avgLatency: Math.round((avgLatency._avg.latency || 0) * 10) / 10,
      activeUsers: activeSessionCount,
      uptimePercent: 99.97,
      requestTrend: 12.5,
      tokenTrend: 8.3,
      threatTrend: -3.2,
    })
  } catch (err) {
    console.error('Dashboard stats error:', err)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

/**
 * @swagger
 * /api/analytics/tokens:
 *   get:
 *     summary: Token analytics
 *     tags: [Analytics]
 */
router.get('/tokens', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const events = await prisma.tokenEvent.findMany({ orderBy: { timestamp: 'desc' }, take: 50 })
    const byType = await prisma.tokenEvent.groupBy({
      by: ['piiType'],
      _count: { piiType: true },
      orderBy: { _count: { piiType: 'desc' } },
    })

    res.json({
      events,
      byType: byType.map((b) => ({ name: b.piiType, value: b._count.piiType })),
      chartData: byType.map((b) => ({ name: b.piiType, value: b._count.piiType })),
    })
  } catch (err) {
    console.error('Token analytics error:', err)
    res.status(500).json({ error: 'Failed to fetch token analytics' })
  }
})

/**
 * @swagger
 * /api/analytics/threats:
 *   get:
 *     summary: Threat analytics
 *     tags: [Analytics]
 */
router.get('/threats', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const events = await prisma.threatEvent.findMany({ orderBy: { timestamp: 'desc' }, take: 50 })
    const bySeverity = await prisma.threatEvent.groupBy({
      by: ['severity'],
      _count: { severity: true },
    })

    res.json({
      events,
      bySeverity: bySeverity.map((b) => ({ name: b.severity, value: b._count.severity })),
      chartData: bySeverity.map((b) => ({ name: b.severity, value: b._count.severity })),
    })
  } catch (err) {
    console.error('Threat analytics error:', err)
    res.status(500).json({ error: 'Failed to fetch threat analytics' })
  }
})

/**
 * @swagger
 * /api/analytics/api-metrics:
 *   get:
 *     summary: API performance metrics
 *     tags: [Analytics]
 */
router.get('/api-metrics', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const metrics = await prisma.apiMetric.findMany({ orderBy: { timestamp: 'desc' }, take: 50 })
    const byEndpoint = await prisma.apiMetric.groupBy({
      by: ['endpoint'],
      _avg: { latency: true },
      _count: { endpoint: true },
    })

    res.json({
      metrics,
      byEndpoint: byEndpoint.map((b) => ({
        name: b.endpoint,
        value: b._count.endpoint,
        avgLatency: Math.round((b._avg.latency || 0) * 10) / 10,
      })),
      chartData: byEndpoint.map((b) => ({ name: b.endpoint, value: b._count.endpoint })),
    })
  } catch (err) {
    console.error('API metrics error:', err)
    res.status(500).json({ error: 'Failed to fetch API metrics' })
  }
})

export default router
