import { Router, Request, Response } from 'express'
import { authMiddleware, type AuthRequest } from '../middleware/auth'
import { validate, tokenizeSchema, detokenizeSchema } from '../middleware/validation'
import { tokenizeText, detokenizeText } from '../services/pii/tokenizer'
import { detectPII } from '../services/pii/detector'
import { detectThreats, logThreat } from '../services/threat/detector'
import { prisma } from '../config/database'

const router = Router()

/**
 * @swagger
 * /api/pii/tokenize:
 *   post:
 *     summary: Tokenize PII in text
 *     tags: [PII]
 */
router.post('/tokenize', authMiddleware, validate(tokenizeSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body

    // Threat check first
    const threats = detectThreats(text)
    if (threats.length > 0) {
      for (const threat of threats) {
        await logThreat(threat.type, threat.severity, text.substring(0, 200), req.ip, true)
      }
      // Still tokenize but flag the threat
    }

    const result = await tokenizeText(text)

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: req.userId,
        action: 'PII_TOKENIZE',
        resource: '/api/pii/tokenize',
        details: JSON.stringify({ piiCount: result.tokenCount, threats: threats.length }),
        ipAddress: req.ip,
      },
    })

    res.json({ ...result, threats: threats.length > 0 ? threats : undefined })
  } catch (err) {
    console.error('Tokenize error:', err)
    res.status(500).json({ error: 'Tokenization failed' })
  }
})

/**
 * @swagger
 * /api/pii/detokenize:
 *   post:
 *     summary: Restore original text from tokens
 *     tags: [PII]
 */
router.post('/detokenize', authMiddleware, validate(detokenizeSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body
    const result = await detokenizeText(text)

    await prisma.auditLog.create({
      data: {
        userId: req.userId,
        action: 'PII_DETOKENIZE',
        resource: '/api/pii/detokenize',
        details: JSON.stringify({ tokensRestored: result.tokensRestored }),
        ipAddress: req.ip,
      },
    })

    res.json(result)
  } catch (err) {
    console.error('Detokenize error:', err)
    res.status(500).json({ error: 'Detokenization failed' })
  }
})

/**
 * @swagger
 * /api/pii/detect:
 *   post:
 *     summary: Detect PII without tokenizing
 *     tags: [PII]
 */
router.post('/detect', authMiddleware, validate(tokenizeSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body
    const detections = detectPII(text)

    await prisma.auditLog.create({
      data: {
        userId: req.userId,
        action: 'PII_DETECT',
        resource: '/api/pii/detect',
        details: JSON.stringify({ piiCount: detections.length }),
        ipAddress: req.ip,
      },
    })

    res.json({ detections })
  } catch (err) {
    console.error('Detect error:', err)
    res.status(500).json({ error: 'Detection failed' })
  }
})

export default router
