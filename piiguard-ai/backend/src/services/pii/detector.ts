export interface PIIMatch {
  type: string
  value: string
  start: number
  end: number
  confidence: number
}

const PII_PATTERNS: { type: string; pattern: RegExp; confidence: number }[] = [
  {
    type: 'email',
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    confidence: 0.99,
  },
  {
    type: 'phone',
    pattern: /\b(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    confidence: 0.95,
  },
  {
    type: 'ssn',
    pattern: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
    confidence: 0.97,
  },
  {
    type: 'credit_card',
    pattern: /\b(?:4\d{3}|5[1-5]\d{2}|3[47]\d{2}|6(?:011|5\d{2}))\d?\s?[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    confidence: 0.96,
  },
  {
    type: 'ip_address',
    pattern: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
    confidence: 0.90,
  },
]

export function detectPII(text: string): PIIMatch[] {
  const matches: PIIMatch[] = []

  for (const { type, pattern, confidence } of PII_PATTERNS) {
    // Reset regex state
    const regex = new RegExp(pattern.source, pattern.flags)
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      matches.push({
        type,
        value: match[0],
        start: match.index,
        end: match.index + match[0].length,
        confidence,
      })
    }
  }

  // Sort by position
  matches.sort((a, b) => a.start - b.start)

  // Remove overlapping matches (keep higher confidence)
  const filtered: PIIMatch[] = []
  for (const m of matches) {
    const overlapping = filtered.find(
      (f) => m.start < f.end && m.end > f.start
    )
    if (!overlapping) {
      filtered.push(m)
    } else if (m.confidence > overlapping.confidence) {
      const idx = filtered.indexOf(overlapping)
      filtered[idx] = m
    }
  }

  return filtered
}
