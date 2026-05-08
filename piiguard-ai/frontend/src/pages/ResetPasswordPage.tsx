import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Shield, ArrowLeft, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { authService } from '@/services/auth.service'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await authService.resetPassword({ token, newPassword: password })
      setSuccess('Password reset successfully. Redirecting to login...')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } catch (err: unknown) {
      let message = 'Failed to reset password. The token may be expired or invalid.'
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
      <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">PIIGuard</span>
            <span className="text-xl font-light text-slate-400">AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-sm text-slate-400">Create a new secure password</p>
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
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-400 text-sm leading-relaxed">{success}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">New Password</label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${error ? 'text-red-400/60' : 'text-slate-500'} transition-colors`} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => { setPassword(e.target.value); setError(''); setSuccess('') }} 
                  className="input-field" 
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', ...(error ? { borderColor: 'rgb(248 113 113 / 0.5)', backgroundColor: 'rgb(248 113 113 / 0.05)' } : {}) }} 
                  placeholder="••••••••" 
                  required 
                  minLength={6}
                  disabled={!token || !!success}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${error ? 'text-red-400/60' : 'text-slate-500'} transition-colors`} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={confirmPassword} 
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); setSuccess('') }} 
                  className="input-field" 
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', ...(error ? { borderColor: 'rgb(248 113 113 / 0.5)', backgroundColor: 'rgb(248 113 113 / 0.05)' } : {}) }} 
                  placeholder="••••••••" 
                  required 
                  minLength={6}
                  disabled={!token || !!success}
                />
              </div>
            </div>

            <button type="submit" disabled={loading || !token || !!success || !password || !confirmPassword} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Reset Password'}
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
