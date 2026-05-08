import { ShieldAlert, ShieldCheck, ShieldX, AlertTriangle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatCard } from '@/components/ui/StatCard'
import { AreaChartWidget } from '@/components/charts/AreaChartWidget'
import { Badge } from '@/components/ui/Badge'
import { mockThreatChart, mockThreatEvents } from '@/utils/mockData'
import { formatTimeAgo } from '@/utils/formatters'

export function ThreatMonitoringPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><ShieldAlert size={24} className="text-red-400"/>Threat Monitoring</h1><p className="text-sm text-slate-400 mt-1">Real-time threat detection and blocking analytics</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Total Threats" value={1247} icon={ShieldAlert} color="red" trend={-3.2}/>
        <StatCard title="Blocked" value={1198} icon={ShieldCheck} color="emerald"/>
        <StatCard title="Critical" value={89} icon={ShieldX} color="red"/>
        <StatCard title="Under Review" value={49} icon={AlertTriangle} color="orange"/>
      </div>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Threat Volume (24h)</h2>
        <AreaChartWidget data={mockThreatChart} color="#ef4444" height={280}/>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Recent Threats</h2>
        <div className="space-y-3">{mockThreatEvents.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="flex items-center gap-3">
              <Badge variant={t.severity}>{t.severity}</Badge>
              <span className="text-sm text-slate-300">{t.type.replace(/_/g,' ')}</span>
              <code className="text-xs text-slate-500 font-mono max-w-[200px] truncate">{t.payload}</code>
            </div>
            <div className="flex items-center gap-3">
              <code className="text-xs text-slate-500 font-mono">{t.ipAddress}</code>
              <span className="text-xs text-slate-500">{formatTimeAgo(t.timestamp)}</span>
              <Badge variant={t.blocked?'success':'high'}>{t.blocked?'Blocked':'Allowed'}</Badge>
            </div>
          </div>
        ))}</div>
      </GlassCard>
    </div>
  )
}
