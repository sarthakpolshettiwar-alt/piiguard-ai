import { HeartPulse, Database, Server, Cpu, HardDrive, Wifi } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { mockHealth } from '@/utils/mockData'
import { formatUptime, formatBytes } from '@/utils/formatters'

export function SystemHealthPage() {
  const h = mockHealth
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><HeartPulse size={24} className="text-emerald-400"/>System Health</h1><p className="text-sm text-slate-400 mt-1">Live infrastructure status and resource monitoring</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Status */}
        <GlassCard className="text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${h.status==='healthy'?'bg-emerald-500/20 neon-glow':'bg-red-500/20'}`}>
            <HeartPulse size={36} className={h.status==='healthy'?'text-emerald-400':'text-red-400'}/>
          </div>
          <h3 className="text-lg font-bold text-white mb-1 capitalize">{h.status}</h3>
          <p className="text-sm text-slate-400">All systems operational</p>
          <div className="mt-4"><Badge variant="success">v{h.version}</Badge></div>
        </GlassCard>

        {/* Services */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2"><Wifi size={16}/>Service Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/30">
              <div className="flex items-center gap-3"><Database size={16} className="text-cyan-400"/><span className="text-sm text-slate-300">PostgreSQL</span></div>
              <div className="flex items-center gap-2"><Badge variant={h.postgres.connected?'success':'critical'}>{h.postgres.connected?'Connected':'Down'}</Badge><span className="text-xs text-slate-500">{h.postgres.latency}ms</span></div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/30">
              <div className="flex items-center gap-3"><Server size={16} className="text-violet-400"/><span className="text-sm text-slate-300">Redis</span></div>
              <div className="flex items-center gap-2"><Badge variant={h.redis.connected?'success':'critical'}>{h.redis.connected?'Connected':'Down'}</Badge><span className="text-xs text-slate-500">{h.redis.latency}ms</span></div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/30">
              <div className="flex items-center gap-3"><Cpu size={16} className="text-emerald-400"/><span className="text-sm text-slate-300">API Server</span></div>
              <Badge variant="success">Running</Badge>
            </div>
          </div>
        </GlassCard>

        {/* Resources */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2"><HardDrive size={16}/>Resources</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-400">Memory Usage</span><span className="text-slate-300">{formatBytes(h.memory.used)} / {formatBytes(h.memory.total)}</span></div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all" style={{width:`${h.memory.percentage}%`}}/></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-400">Uptime</span><span className="text-slate-300">{formatUptime(h.uptime)}</span></div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" style={{width:'99.97%'}}/></div>
            </div>
            <div className="flex justify-between text-xs"><span className="text-slate-400">Environment</span><Badge variant="info">{h.environment}</Badge></div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
