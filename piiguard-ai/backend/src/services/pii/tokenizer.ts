import { v4 as uuidv4 } from 'uuid'
import { detectPII, type PIIMatch } from './detector'
import { encrypt, decrypt } from '../../utils/encryption'
import { cacheSet, cacheGet, cacheDel } from '../../config/redis'
import { prisma } from '../../config/database'

const TOKEN_PREFIX = 'TOKEN'
const TOKEN_TTL = 3600 // 1 hour

interface TokenizeResult {
  originalText: string
  tokenizedText: string
  detections: PIIMatch[]
  tokenCount: number
  processingTime: number
}

interface DetokenizeResult {
  tokenizedText: string
  restoredText: string
  tokensRestored: number
}

export async function tokenizeText(text: string): Promise<TokenizeResult> {
  const start = Date.now()
  const detections = detectPII(text)
  let tokenizedText = text
  const tokenMappings: { tokenId: string; type: string; original: string }[] = []

  // Process detections in reverse order to preserve positions
  const sorted = [...detections].sort((a, b) => b.start - a.start)

  for (const detection of sorted) {
    const tokenId = uuidv4().replace(/-/g, '').substring(0, 12)
    const tokenPlaceholder = `[${TOKEN_PREFIX}_${detection.type.toUpperCase()}_${tokenId}]`

    tokenizedText =
      tokenizedText.substring(0, detection.start) +
      tokenPlaceholder +
      tokenizedText.substring(detection.end)

    tokenMappings.push({
      tokenId,
      type: detection.type,
      original: detection.value,
    })
  }

  // Store token mappings in Redis (encrypted)
  for (const mapping of tokenMappings) {
    const encryptedValue = encrypt(mapping.original)
    const cacheKey = `token:${mapping.tokenId}`
    await cacheSet(cacheKey, encryptedValue, TOKEN_TTL)

    // Log token event in database
    try {
      await prisma.tokenEvent.create({
        data: {
          piiType: mapping.type,
          tokenId: mapping.tokenId,
          action: 'tokenize',
          encryptedMapping: encryptedValue,
        },
      })
    } catch {
      // Graceful — don't fail tokenization if DB logging fails
    }
  }

  return {
    originalText: text,
    tokenizedText,
    detections,
    tokenCount: detections.length,
    processingTime: Date.now() - start,
  }
}

export async function detokenizeText(text: string): Promise<DetokenizeResult> {
  let restoredText = text
  let tokensRestored = 0

  // Find all token placeholders
  const tokenRegex = /\[TOKEN_[A-Z_]+_([a-f0-9]+)\]/g
  let match: RegExpExecArray | null

  const replacements: { full: string; tokenId: string }[] = []
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match[1]) {
      replacements.push({ full: match[0], tokenId: match[1] })
    }
  }

  for (const { full, tokenId } of replacements) {
    const cacheKey = `token:${tokenId}`
    const encryptedValue = await cacheGet(cacheKey)

    if (encryptedValue) {
      const original = decrypt(encryptedValue)
      if (original) {
        restoredText = restoredText.replace(full, original)
        tokensRestored++

        // Log detokenize event
        try {
          await prisma.tokenEvent.create({
            data: {
              piiType: 'unknown',
              tokenId,
              action: 'detokenize',
            },
          })
        } catch {}
      }
    }
  }

  return { tokenizedText: text, restoredText, tokensRestored }
}
