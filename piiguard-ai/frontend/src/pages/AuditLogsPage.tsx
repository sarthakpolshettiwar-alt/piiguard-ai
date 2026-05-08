import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { mockAuditLogs } from '@/utils/mockData'
import { formatDate } from '@/utils/formatters'
import { ScrollText, Search, Filter } from 'lucide-react'

const actionColors: Record<string, 'info'|'success'|'high'|'medium'|'critical'|'low'> = {
  PII_TOKENIZE: 'info', PII_DETECT: 'info', PII_DETOKENIZE: 'info',
  LOGIN: 'success', LOGOUT: 'medium', THREAT_BLOCKED: 'critical',
  SETTINGS_UPDATE: 'low', API_KEY_CREATED: 'high',
}

export function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><ScrollText size={24} className="text-cyan-400"/>Audit Logs</h1><p className="text-sm text-slate-400 mt-1">Complete activity trail of all system events</p></div>
      </div>
      <GlassCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input className="input-field pl-10 py-2 text-sm" placeholder="Search logs..."/></div>
          <button className="btn-secondary flex items-center gap-2 text-sm"><Filter size={14}/>Filter</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Resource</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">IP Address</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Details</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Timestamp</th>
            </tr></thead>
            <tbody>{mockAuditLogs.map((log) => (
              <tr key={log.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="py-3 px-4"><Badge variant={actionColors[log.action]||'info'}>{log.action}</Badge></td>
                <td className="py-3 px-4 text-slate-300 font-mono text-xs">{log.resource}</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">{log.ipAddress}</td>
                <td className="py-3 px-4 text-slate-500 text-xs">{JSON.stringify(log.details)}</td>
                <td className="py-3 px-4 text-slate-500 text-xs">{formatDate(log.timestamp)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
