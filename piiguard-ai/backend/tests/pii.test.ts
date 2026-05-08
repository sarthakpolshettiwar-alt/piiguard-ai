import { detectPII } from '../src/services/pii/detector'

describe('PII Detector', () => {
  test('should detect email addresses', () => {
    const matches = detectPII('Contact john@example.com for info')
    expect(matches).toHaveLength(1)
    expect(matches[0]!.type).toBe('email')
    expect(matches[0]!.value).toBe('john@example.com')
  })

  test('should detect phone numbers', () => {
    const matches = detectPII('Call me at 555-123-4567')
    expect(matches).toHaveLength(1)
    expect(matches[0]!.type).toBe('phone')
  })

  test('should detect SSN', () => {
    const matches = detectPII('My SSN is 123-45-6789')
    expect(matches.some(m => m.type === 'ssn')).toBe(true)
  })

  test('should detect credit card numbers', () => {
    const matches = detectPII('Card: 4111-1111-1111-1111')
    expect(matches.some(m => m.type === 'credit_card')).toBe(true)
  })

  test('should detect IP addresses', () => {
    const matches = detectPII('Server IP is 192.168.1.100')
    expect(matches.some(m => m.type === 'ip_address')).toBe(true)
  })

  test('should detect multiple PII types', () => {
    const matches = detectPII('Email john@test.com and call 555-999-1234 from 10.0.0.1')
    expect(matches.length).toBeGreaterThanOrEqual(3)
  })

  test('should return empty for clean text', () => {
    const matches = detectPII('This is a clean text with no personal information')
    expect(matches).toHaveLength(0)
  })
})
