import { prisma } from '../../config/database'

interface ThreatDetectionResult {
  isThreat: boolean
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  details: string
}

const THREAT_PATTERNS: { type: string; patterns: RegExp[]; severity: 'critical' | 'high' | 'medium' | 'low' }[] = [
  {
    type: 'prompt_injection',
    severity: 'critical',
    patterns: [
      /ignore\s+(all\s+)?previous\s+instructions/i,
      /ignore\s+(all\s+)?above\s+instructions/i,
      /disregard\s+(all\s+)?previous/i,
      /system\s*:\s*override/i,
      /reveal\s+(the\s+)?(system\s+)?prompt/i,
      /you\s+are\s+now\s+(a|an)/i,
      /pretend\s+you\s+are/i,
      /act\s+as\s+(a|an)\s+(?!api)/i,
      /jailbreak/i,
      /DAN\s+mode/i,
    ],
  },
  {
    type: 'sql_injection',
    severity: 'high',
    patterns: [
      /'\s*(OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
      /;\s*(DROP|DELETE|UPDATE|INSERT|ALTER)\s+/i,
      /UNION\s+SELECT/i,
      /--\s*$/m,
      /\/\*.*\*\//,
      /WAITFOR\s+DELAY/i,
      /xp_cmdshell/i,
    ],
  },
  {
    type: 'xss_attempt',
    severity: 'medium',
    patterns: [
      /<script[\s>]/i,
      /javascript\s*:/i,
      /on(?:error|load|click|mouseover)\s*=/i,
      /<iframe/i,
      /<object/i,
      /eval\s*\(/i,
      /document\s*\.\s*(?:cookie|write|location)/i,
    ],
  },
  {
    type: 'abnormal_request',
    severity: 'low',
    patterns: [
      /(.)\1{50,}/,  // Repeated characters (50+)
    ],
  },
]

export function detectThreats(text: string): ThreatDetectionResult[] {
  const threats: ThreatDetectionResult[] = []

  for (const { type, patterns, severity } of THREAT_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        threats.push({
          isThreat: true,
          type,
          severity,
          details: `Detected ${type.replace(/_/g, ' ')} pattern`,
        })
        break // One match per category is enough
      }
    }
  }

  // Check payload size
  if (text.length > 50000) {
    threats.push({
      isThreat: true,
      type: 'abnormal_request',
      severity: 'medium',
      details: `Unusually large payload: ${text.length} characters`,
    })
  }

  return threats
}

export async function logThreat(
  type: string,
  severity: string,
  payload: string,
  ipAddress?: string,
  blocked: boolean = true
): Promise<void> {
  try {
    // Sanitize payload — never store raw malicious content
    const sanitized = payload.substring(0, 200).replace(/[<>'"]/g, '')

    await prisma.threatEvent.create({
      data: {
        type,
        severity,
        payload: sanitized,
        ipAddress,
        blocked,
      },
    })
  } catch {
    console.warn('Failed to log threat event')
  }
}
