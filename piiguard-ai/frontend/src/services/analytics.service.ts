import api from './api'
import type { DashboardStats, AuditLog, TokenEvent, ThreatEvent, ApiMetric, HealthStatus, ChartDataPoint } from '@/types'

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const { data } = await api.get('/analytics/dashboard')
    return data
  },

  async getTokenAnalytics(): Promise<{
    events: TokenEvent[]
    chartData: ChartDataPoint[]
    byType: ChartDataPoint[]
  }> {
    const { data } = await api.get('/analytics/tokens')
    return data
  },

  async getThreatAnalytics(): Promise<{
    events: ThreatEvent[]
    chartData: ChartDataPoint[]
    bySeverity: ChartDataPoint[]
  }> {
    const { data } = await api.get('/analytics/threats')
    return data
  },

  async getApiMetrics(): Promise<{
    metrics: ApiMetric[]
    chartData: ChartDataPoint[]
    byEndpoint: ChartDataPoint[]
  }> {
    const { data } = await api.get('/analytics/api-metrics')
    return data
  },

  async getAuditLogs(page = 1, limit = 20): Promise<{
    logs: AuditLog[]
    total: number
    page: number
    totalPages: number
  }> {
    const { data } = await api.get(`/audit/logs?page=${page}&limit=${limit}`)
    return data
  },

  async getHealth(): Promise<HealthStatus> {
    const { data } = await api.get('/health')
    return data
  },
}
