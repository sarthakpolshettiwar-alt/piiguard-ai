import { Activity, Coins, ShieldAlert, Zap, Users, Clock } from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { AreaChartWidget } from '@/components/charts/AreaChartWidget'
import { PieChartWidget } from '@/components/charts/PieChartWidget'
import { Badge } from '@/components/ui/Badge'
import { mockDashboardStats, mockRequestChart, mockPIITypeChart, mockThreatEvents } from '@/utils/mockData'
import { formatTimeAgo } from '@/utils/formatters'

export function DashboardPage() {
  const stats = mockDashboardStats
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Dashboard</h1><p className="text-sm text-slate-400 mt-1">Real-time overview of your PIIGuard infrastructure</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Requests" value={stats.totalRequests} trend={stats.requestTrend} icon={Activity} color="cyan" delay={0} />
        <StatCard title="Tokens Created" value={stats.totalTokens} trend={stats.tokenTrend} icon={Coins} color="violet" delay={0.05} />
        <StatCard title="Threats Blocked" value={stats.totalThreats} trend={stats.threatTrend} icon={ShieldAlert} color="red" delay={0.1} />
        <StatCard title="Avg Latency" value={stats.avgLatency} icon={Zap} color="emerald" suffix="ms" format={false} delay={0.15} />
        <StatCard title="Active Users" value={stats.activeUsers} icon={Users} color="orange" delay={0.2} />
        <StatCard title="Uptime" value={stats.uptimePercent} icon={Clock} color="yellow" suffix="%" format={false} delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Request Volume (7 Days)</h2>
          <AreaChartWidget data={mockRequestChart} secondaryKey="tokens" secondaryColor="#8b5cf6" height={280} />
        </GlassCard>
        <GlassCard>
          <h2 className="text-sm font-semibold text-slate-300 mb-4">PII Types Detected</h2>
          <PieChartWidget data={mockPIITypeChart} height={280} innerRadius={50} outerRadius={85} />
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Recent Threat Alerts</h2>
        <div className="space-y-3">
          {mockThreatEvents.slice(0, 4).map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <div className="flex items-center gap-3">
                <Badge variant={t.severity}>{t.severity}</Badge>
                <span className="text-sm text-slate-300">{t.type.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-xs text-slate-500 font-mono">{t.ipAddress}</code>
                <span className="text-xs text-slate-500">{formatTimeAgo(t.timestamp)}</span>
                <Badge variant={t.blocked ? 'success' : 'high'}>{t.blocked ? 'Blocked' : 'Allowed'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
