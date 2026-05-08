import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowLeft, Copy, Check, Clock, Database, LogOut, Settings } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import type { HistoryItem } from '@/pages/DemoPage'

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const historyStr = localStorage.getItem('piiguard_history')
    if (historyStr) {
      try {
        setHistory(JSON.parse(historyStr))
      } catch (e) {
        console.error('Failed to parse history', e)
      }
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('piiguard_token')
    localStorage.removeItem('piiguard_user')
    navigate('/')
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-surface-950 grid-bg">
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-700/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">PIIGuard</span>
            <span className="text-lg font-light text-slate-400">AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/demo" className="btn-secondary text-sm flex items-center gap-1.5"><ArrowLeft size={14} /> Back to Demo</Link>
            <Link to="/settings" className="btn-secondary text-sm flex items-center gap-1.5"><Settings size={14} /> Settings</Link>
            <button onClick={handleSignOut} className="btn-primary text-sm flex items-center gap-1.5"><LogOut size={14} /> Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="text-cyan-400" size={28} />
            <h1 className="text-3xl font-bold text-white">Tokenization History</h1>
          </div>
          <p className="text-slate-400">View your recent tokenization requests and secure outputs.</p>
        </motion.div>

        {history.length === 0 ? (
          <GlassCard className="text-center py-16">
            <Clock className="mx-auto text-slate-600 mb-4" size={48} />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No history found</h3>
            <p className="text-slate-500 text-sm">No tokenization history available yet.</p>
            <Link to="/demo" className="mt-6 inline-block btn-primary">Try Live Demo</Link>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Clock size={14} /> {formatDate(item.timestamp)}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Original Prompt */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-300">Original Prompt</span>
                        <button 
                          onClick={() => handleCopy(item.original, `orig-${item.id}`)}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          {copiedId === `orig-${item.id}` ? <Check size={14}/> : <Copy size={14}/>}
                          {copiedId === `orig-${item.id}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="input-field flex-1 font-mono text-sm whitespace-pre-wrap min-h-[100px] text-slate-300 bg-slate-900/50">
                        {item.original}
                      </div>
                    </div>

                    {/* Tokenized Output */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-300">Tokenized Output</span>
                        <button 
                          onClick={() => handleCopy(item.tokenized, `tok-${item.id}`)}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          {copiedId === `tok-${item.id}` ? <Check size={14}/> : <Copy size={14}/>}
                          {copiedId === `tok-${item.id}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="input-field flex-1 font-mono text-sm whitespace-pre-wrap min-h-[100px] text-emerald-300 bg-slate-900/50 border-cyan-900/30">
                        {item.tokenized}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
