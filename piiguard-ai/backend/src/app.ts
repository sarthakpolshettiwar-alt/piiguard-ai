import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { prisma } from './config/database'

// Routes
import authRoutes from './routes/auth'
import piiRoutes from './routes/pii'
import analyticsRoutes from './routes/analytics'
import auditRoutes from './routes/audit'
import healthRoutes from './routes/health'

const app = express()

// Security
app.use(helmet({ contentSecurityPolicy: false }))
const allowedOrigins = env.CORS_ORIGIN.split(',').map(o => o.trim())
app.use(cors({
  origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
})
app.use('/api/', limiter)

// Parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(compression())

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('short'))
}

// API Metrics middleware
app.use('/api/', async (req, res, next) => {
  const start = Date.now()
  res.on('finish', async () => {
    try {
      await prisma.apiMetric.create({
        data: {
          endpoint: req.originalUrl.split('?')[0] || req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
          latency: Date.now() - start,
        },
      })
    } catch {
      // Don't fail requests due to metric logging
    }
  })
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/pii', piiRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/audit', auditRoutes)
app.use('/api/health', healthRoutes)

// Swagger (lazy loaded)
app.get('/api-docs', (_req, res) => {
  res.redirect('/api-docs/')
})

// Error handler
app.use(errorHandler)

export default app
