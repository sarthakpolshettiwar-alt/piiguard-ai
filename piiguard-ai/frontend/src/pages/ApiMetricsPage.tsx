import { Activity, Clock, Gauge, AlertCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatCard } from '@/components/ui/StatCard'
import { LineChartWidget } from '@/components/charts/LineChartWidget'
import { Badge } from '@/components/ui/Badge'
import { mockLatencyChart, mockApiMetrics } from '@/utils/mockData'
import { formatTimeAgo, formatLatency } from '@/utils/formatters'

export function ApiMetricsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Activity size={24} className="text-cyan-400"/>API Metrics</h1><p className="text-sm text-slate-400 mt-1">Performance and throughput analytics for all API endpoints</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Avg Latency" value={23.4} icon={Clock} color="cyan" suffix="ms" format={false}/>
        <StatCard title="P95 Latency" value={52} icon={Gauge} color="violet" suffix="ms" format={false}/>
        <StatCard title="Total Requests" value={284391} icon={Activity} color="emerald" trend={12.5}/>
        <StatCard title="Error Rate" value={0.3} icon={AlertCircle} color="red" suffix="%" format={false}/>
      </div>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Latency Distribution (24h)</h2>
        <LineChartWidget data={mockLatencyChart} lines={[{key:'value',color:'#06b6d4'},{key:'p95',color:'#8b5cf6',dashed:true},{key:'p99',color:'#ef4444',dashed:true}]} height={300}/>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-300 mb-4">Recent API Calls</h2>
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="border-b border-slate-700/50">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Method</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Endpoint</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Latency</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Time</th>
          </tr></thead>
          <tbody>{mockApiMetrics.map((m) => (
            <tr key={m.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
              <td className="py-3 px-4"><Badge variant={m.method==='GET'?'info':'medium'}>{m.method}</Badge></td>
              <td className="py-3 px-4 text-slate-300 font-mono text-xs">{m.endpoint}</td>
              <td className="py-3 px-4"><Badge variant={m.statusCode<400?'success':'critical'}>{m.statusCode}</Badge></td>
              <td className="py-3 px-4 text-slate-400 text-xs">{formatLatency(m.latency)}</td>
              <td className="py-3 px-4 text-slate-500 text-xs">{formatTimeAgo(m.timestamp)}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </GlassCard>
    </div>
  )
}
