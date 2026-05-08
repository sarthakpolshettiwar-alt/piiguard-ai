import { Coins } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatCard } from '@/components/ui/StatCard'
import { BarChartWidget } from '@/components/charts/BarChartWidget'
import { PieChartWidget } from '@/components/charts/PieChartWidget'
import { Badge } from '@/components/ui/Badge'
import { mockPIITypeChart, mockTokenEvents } from '@/utils/mockData'
import { formatTimeAgo } from '@/utils/formatters'
import { Lock, Unlock, Hash } from 'lucide-react'

export function TokenAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Coins size={24} className="text-violet-400"/>Token Analytics</h1><p className="text-sm text-slate-400 mt-1">Track tokenization volume and PII type distribution</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Tokens" value={47832} icon={Hash} color="violet" trend={8.3} />
        <StatCard title="Tokenized" value={38250} icon={Lock} color="cyan" trend={12.1} />
        <StatCard title="Detokenized" value={9582} icon={Unlock} color="emerald" trend={-2.4} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard><h2 className="text-sm font-semibold text-slate-300 mb-4">Token Volume by PII Type</h2><BarChartWidget data={mockPIITypeChart} color="#8b5cf6" height={280}/></GlassCard>
        <GlassCard><h2 className="text-sm font-semibold text-slate-300 mb-4">PII Type Distribution</h2><PieChartWidget data={mockPIITypeChart} height={280}/></GlassCard>
      </div>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Recent Token Events</h2>
        <div className="space-y-2">{mockTokenEvents.map((e) => (
          <div key={e.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="flex items-center gap-3">
              {e.action === 'tokenize' ? <Lock size={14} className="text-cyan-400"/> : <Unlock size={14} className="text-emerald-400"/>}
              <Badge variant="info">{e.piiType.replace('_',' ')}</Badge>
              <code className="text-xs text-slate-400 font-mono">{e.tokenId}</code>
            </div>
            <span className="text-xs text-slate-500">{formatTimeAgo(e.timestamp)}</span>
          </div>
        ))}</div>
      </GlassCard>
    </div>
  )
}
