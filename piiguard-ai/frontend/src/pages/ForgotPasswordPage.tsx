import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, ArrowLeft, Mail, AlertCircle, Check } from 'lucide-react'
import { authService } from '@/services/auth.service'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [devToken, setDevToken] = useState<string | null>(null) // For demo purposes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setDevToken(null)

    try {
      const res = await authService.forgotPassword(email)
      setSuccess(res.message || 'Password reset link sent to your email.')
      if (res.devToken) {
        setDevToken(res.devToken)
      }
    } catch (err: unknown) {
      let message = 'Failed to send reset link. Please try again.'
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { error?: string } } }
        if (axiosErr.response?.data?.error) {
          message = axiosErr.response.data.error
        }
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 grid-bg flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">PIIGuard</span>
            <span className="text-xl font-light text-slate-400">AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-sm text-slate-400">Enter your email to receive a reset link</p>
        </div>

        <div className="glass-card-static p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25">
                <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-red-400 text-sm leading-relaxed">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-400 text-sm leading-relaxed">{success}</span>
                </div>
                {devToken && (
                  <div className="text-xs text-emerald-300 bg-emerald-950/50 p-2 rounded border border-emerald-500/20 break-all">
                    <span className="font-semibold block mb-1">Demo Mode - Reset Link:</span>
                    <a href={`/reset-password?token=${devToken}`} className="underline hover:text-emerald-200">
                      http://localhost:5173/reset-password?token={devToken}
                    </a>
                  </div>
                )}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${error ? 'text-red-400/60' : 'text-slate-500'} transition-colors`} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess('') }} 
                  className="input-field" 
                  style={{ paddingLeft: '2.5rem', ...(error ? { borderColor: 'rgb(248 113 113 / 0.5)', backgroundColor: 'rgb(248 113 113 / 0.05)' } : {}) }} 
                  placeholder="you@company.com" 
                  required 
                />
              </div>
            </div>

            <button type="submit" disabled={loading || !email} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
