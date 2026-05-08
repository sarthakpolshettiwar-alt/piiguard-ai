import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, ArrowLeft, Key, User, Mail, Calendar, LogOut, Check, AlertCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/auth.service'

export function SettingsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignOut = () => {
    logout()
    navigate('/')
  }

  const clearMessages = useCallback(() => {
    if (error) setError('')
    if (success) setSuccess('')
  }, [error, success])

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setCurrentPassword(e.target.value); clearMessages() }
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setNewPassword(e.target.value); clearMessages() }
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setConfirmPassword(e.target.value); clearMessages() }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await authService.changePassword({ currentPassword, newPassword })
      setSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      let message = 'Failed to change password. Please try again.'
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { error?: string }; status?: number } }
        if (axiosErr.response?.data?.error) {
          message = axiosErr.response.data.error
        }
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'N/A'
    return new Date(isoString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
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
            <button onClick={handleSignOut} className="btn-primary text-sm flex items-center gap-1.5"><LogOut size={14} /> Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-cyan-400" size={28} />
            <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          </div>
          <p className="text-slate-400">Manage your profile and security preferences.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <User className="text-slate-400" size={18} />
                <h2 className="text-lg font-semibold text-slate-200">Account Information</h2>
              </div>
              
              <div className="space-y-6 flex-1">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">User ID</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <Key size={14} className="text-slate-500" />
                    <span className="text-sm font-mono text-slate-300 truncate">{user?.id || 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <Mail size={14} className="text-slate-500" />
                    <span className="text-sm text-slate-300">{user?.email || 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Member Since</label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <Calendar size={14} className="text-slate-500" />
                    <span className="text-sm text-slate-300">{formatDate(user?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="text-slate-400" size={18} />
                <h2 className="text-lg font-semibold text-slate-200">Security</h2>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4 flex-1">
                {error && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25">
                    <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-red-400 text-sm leading-relaxed">{error}</span>
                  </div>
                )}
                
                {success && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                    <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-emerald-400 text-sm leading-relaxed">{success}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={handleCurrentPasswordChange} 
                    className="input-field" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={handleNewPasswordChange} 
                    className="input-field" 
                    placeholder="••••••••" 
                    required 
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                    className="input-field" 
                    placeholder="••••••••" 
                    required 
                    minLength={6}
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loading || !currentPassword || !newPassword || !confirmPassword} 
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Change Password'}
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
