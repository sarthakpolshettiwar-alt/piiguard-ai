import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react'

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (name: string, email: string, password: string) => Promise<void>
  redirectTo?: string
}

export function LoginPage({ onLogin, onRegister, redirectTo = '/dashboard' }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const navigate = useNavigate()

  // Clear error when user starts typing
  const clearError = useCallback(() => {
    if (error) setError('')
  }, [error])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); clearError() }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); clearError() }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); clearError() }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      triggerShake()
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      triggerShake()
      setLoading(false)
      return
    }
    if (isRegister && name.trim().length < 2) {
      setError('Please enter your full name.')
      triggerShake()
      setLoading(false)
      return
    }

    try {
      if (isRegister) {
        await onRegister(name.trim(), email, password)
      } else {
        await onLogin(email, password)
      }
      navigate(redirectTo)
    } catch (err: unknown) {
      // Extract error message from API response
      let message = isRegister ? 'Registration failed. Please try again.' : 'Incorrect email or password.'
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { error?: string }; status?: number } }
        if (axiosErr.response?.data?.error) {
          message = axiosErr.response.data.error
        } else if (axiosErr.response?.status === 409) {
          message = 'An account with this email already exists.'
        }
      }
      setError(message)
      triggerShake()
    } finally {
      setLoading(false)
    }
  }

  const inputErrorStyle = error
    ? { borderColor: 'rgba(239, 68, 68, 0.5)', boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.1)' }
    : {}

  const iconErrorClass = error ? 'text-red-400/60' : 'text-slate-500'

  return (
    <div className="min-h-screen bg-surface-950 grid-bg flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">PIIGuard</span>
            <span className="text-xl font-light text-slate-400">AI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-sm text-slate-400">{isRegister ? 'Start protecting your AI workflows' : 'Sign in to your PIIGuard dashboard'}</p>
        </div>

        <div
          className="glass-card-static p-8"
          style={shake ? { animation: 'shake 0.5s ease-in-out' } : undefined}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25"
              >
                <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-red-400 text-sm leading-relaxed">{error}</span>
              </motion.div>
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconErrorClass} transition-colors`} />
                  <input type="text" value={name} onChange={handleNameChange} className="input-field" style={{ paddingLeft: '2.5rem', ...inputErrorStyle }} placeholder="John Doe" required />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconErrorClass} transition-colors`} />
                <input type="email" value={email} onChange={handleEmailChange} className="input-field" style={{ paddingLeft: '2.5rem', ...inputErrorStyle }} placeholder="you@company.com" required />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-400">Password</label>
                {!isRegister && (
                  <Link to="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconErrorClass} transition-colors`} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} className="input-field" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', ...inputErrorStyle }} placeholder="••••••••" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight size={16} /> {isRegister ? 'Create Account' : 'Sign In'}</>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => { setIsRegister(!isRegister); setError('') }} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Demo credentials: test@piiguard.ai / test123456
        </p>
      </motion.div>
    </div>
  )
}
