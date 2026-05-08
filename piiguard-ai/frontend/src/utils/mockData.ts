import type { DashboardStats, AuditLog, TokenEvent, ThreatEvent, ApiMetric, HealthStatus, ChartDataPoint } from '@/types'

export const mockDashboardStats: DashboardStats = {
  totalRequests: 284_391,
  totalTokens: 47_832,
  totalThreats: 1_247,
  avgLatency: 23.4,
  activeUsers: 342,
  uptimePercent: 99.97,
  requestTrend: 12.5,
  tokenTrend: 8.3,
  threatTrend: -3.2,
}

export const mockRequestChart: ChartDataPoint[] = [
  { name: 'Mon', value: 4200, tokens: 820 },
  { name: 'Tue', value: 5100, tokens: 950 },
  { name: 'Wed', value: 4800, tokens: 890 },
  { name: 'Thu', value: 6200, tokens: 1200 },
  { name: 'Fri', value: 5900, tokens: 1100 },
  { name: 'Sat', value: 3100, tokens: 580 },
  { name: 'Sun', value: 2800, tokens: 520 },
]

export const mockPIITypeChart: ChartDataPoint[] = [
  { name: 'Email', value: 12840 },
  { name: 'Phone', value: 8920 },
  { name: 'SSN', value: 3240 },
  { name: 'Credit Card', value: 5630 },
  { name: 'IP Address', value: 7200 },
]

export const mockThreatChart: ChartDataPoint[] = [
  { name: '00:00', value: 12, critical: 2, high: 4, medium: 6 },
  { name: '04:00', value: 8, critical: 1, high: 2, medium: 5 },
  { name: '08:00', value: 24, critical: 5, high: 8, medium: 11 },
  { name: '12:00', value: 31, critical: 7, high: 12, medium: 12 },
  { name: '16:00', value: 28, critical: 4, high: 10, medium: 14 },
  { name: '20:00', value: 18, critical: 3, high: 6, medium: 9 },
]

export const mockLatencyChart: ChartDataPoint[] = [
  { name: '00:00', value: 18, p95: 42, p99: 85 },
  { name: '04:00', value: 15, p95: 38, p99: 72 },
  { name: '08:00', value: 28, p95: 55, p99: 120 },
  { name: '12:00', value: 32, p95: 68, p99: 145 },
  { name: '16:00', value: 25, p95: 52, p99: 110 },
  { name: '20:00', value: 20, p95: 45, p99: 92 },
]

export const mockAuditLogs: AuditLog[] = [
  { id: '1', userId: 'u1', action: 'PII_TOKENIZE', resource: '/api/pii/tokenize', details: { piiCount: 3 }, ipAddress: '192.168.1.45', timestamp: new Date(Date.now() - 60000).toISOString() },
  { id: '2', userId: 'u2', action: 'LOGIN', resource: '/api/auth/login', details: { method: 'password' }, ipAddress: '10.0.0.12', timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: '3', userId: 'u1', action: 'PII_DETECT', resource: '/api/pii/detect', details: { piiCount: 5 }, ipAddress: '192.168.1.45', timestamp: new Date(Date.now() - 180000).toISOString() },
  { id: '4', userId: 'u3', action: 'THREAT_BLOCKED', resource: '/api/pii/tokenize', details: { type: 'sql_injection' }, ipAddress: '203.0.113.50', timestamp: new Date(Date.now() - 240000).toISOString() },
  { id: '5', userId: 'u2', action: 'PII_DETOKENIZE', resource: '/api/pii/detokenize', details: { tokenCount: 2 }, ipAddress: '10.0.0.12', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: '6', userId: 'u4', action: 'SETTINGS_UPDATE', resource: '/api/settings', details: { field: 'notifications' }, ipAddress: '172.16.0.5', timestamp: new Date(Date.now() - 360000).toISOString() },
  { id: '7', userId: 'u1', action: 'API_KEY_CREATED', resource: '/api/settings/keys', details: { keyName: 'production' }, ipAddress: '192.168.1.45', timestamp: new Date(Date.now() - 420000).toISOString() },
  { id: '8', userId: 'u5', action: 'PII_TOKENIZE', resource: '/api/pii/tokenize', details: { piiCount: 8 }, ipAddress: '198.51.100.23', timestamp: new Date(Date.now() - 480000).toISOString() },
]

export const mockTokenEvents: TokenEvent[] = [
  { id: '1', piiType: 'email', tokenId: 'tok_a1b2c3', action: 'tokenize', timestamp: new Date(Date.now() - 30000).toISOString() },
  { id: '2', piiType: 'phone', tokenId: 'tok_d4e5f6', action: 'tokenize', timestamp: new Date(Date.now() - 60000).toISOString() },
  { id: '3', piiType: 'ssn', tokenId: 'tok_g7h8i9', action: 'tokenize', timestamp: new Date(Date.now() - 90000).toISOString() },
  { id: '4', piiType: 'credit_card', tokenId: 'tok_j1k2l3', action: 'tokenize', timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: '5', piiType: 'email', tokenId: 'tok_a1b2c3', action: 'detokenize', timestamp: new Date(Date.now() - 150000).toISOString() },
  { id: '6', piiType: 'ip_address', tokenId: 'tok_m4n5o6', action: 'tokenize', timestamp: new Date(Date.now() - 180000).toISOString() },
]

export const mockThreatEvents: ThreatEvent[] = [
  { id: '1', type: 'prompt_injection', severity: 'critical', payload: 'Ignore previous instructions...', ipAddress: '203.0.113.50', blocked: true, timestamp: new Date(Date.now() - 45000).toISOString() },
  { id: '2', type: 'sql_injection', severity: 'high', payload: "' OR 1=1 --", ipAddress: '198.51.100.77', blocked: true, timestamp: new Date(Date.now() - 90000).toISOString() },
  { id: '3', type: 'xss_attempt', severity: 'medium', payload: '<script>alert("xss")</script>', ipAddress: '192.0.2.100', blocked: true, timestamp: new Date(Date.now() - 135000).toISOString() },
  { id: '4', type: 'prompt_injection', severity: 'high', payload: 'System: override safety...', ipAddress: '203.0.113.22', blocked: true, timestamp: new Date(Date.now() - 200000).toISOString() },
  { id: '5', type: 'abnormal_request', severity: 'low', payload: 'Unusual payload size detected', ipAddress: '10.0.0.55', blocked: false, timestamp: new Date(Date.now() - 300000).toISOString() },
]

export const mockApiMetrics: ApiMetric[] = [
  { id: '1', endpoint: '/api/pii/tokenize', method: 'POST', statusCode: 200, latency: 23, timestamp: new Date(Date.now() - 10000).toISOString() },
  { id: '2', endpoint: '/api/pii/detect', method: 'POST', statusCode: 200, latency: 18, timestamp: new Date(Date.now() - 20000).toISOString() },
  { id: '3', endpoint: '/api/auth/login', method: 'POST', statusCode: 401, latency: 12, timestamp: new Date(Date.now() - 30000).toISOString() },
  { id: '4', endpoint: '/api/pii/tokenize', method: 'POST', statusCode: 200, latency: 45, timestamp: new Date(Date.now() - 40000).toISOString() },
  { id: '5', endpoint: '/api/health', method: 'GET', statusCode: 200, latency: 5, timestamp: new Date(Date.now() - 50000).toISOString() },
]

export const mockHealth: HealthStatus = {
  status: 'healthy',
  postgres: { connected: true, latency: 3.2 },
  redis: { connected: true, latency: 1.1 },
  uptime: 864000,
  memory: { used: 256_000_000, total: 512_000_000, percentage: 50 },
  environment: 'production',
  version: '1.0.0',
}
