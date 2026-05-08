export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
}

export interface PIIDetection {
  type: string
  value: string
  start: number
  end: number
  confidence: number
}

export interface TokenizeRequest {
  text: string
}

export interface TokenizeResponse {
  originalText: string
  tokenizedText: string
  detections: PIIDetection[]
  tokenCount: number
  processingTime: number
}

export interface DetokenizeRequest {
  text: string
}

export interface DetokenizeResponse {
  tokenizedText: string
  restoredText: string
  tokensRestored: number
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  details: Record<string, unknown>
  ipAddress: string
  timestamp: string
}

export interface TokenEvent {
  id: string
  piiType: string
  tokenId: string
  action: 'tokenize' | 'detokenize'
  timestamp: string
}

export interface ThreatEvent {
  id: string
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  payload: string
  ipAddress: string
  blocked: boolean
  timestamp: string
}

export interface ApiMetric {
  id: string
  endpoint: string
  method: string
  statusCode: number
  latency: number
  timestamp: string
}

export interface DashboardStats {
  totalRequests: number
  totalTokens: number
  totalThreats: number
  avgLatency: number
  activeUsers: number
  uptimePercent: number
  requestTrend: number
  tokenTrend: number
  threatTrend: number
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  postgres: { connected: boolean; latency: number }
  redis: { connected: boolean; latency: number }
  uptime: number
  memory: { used: number; total: number; percentage: number }
  environment: string
  version: string
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface NavItem {
  label: string
  path: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}
