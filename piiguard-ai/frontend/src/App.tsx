import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { LandingPage } from '@/pages/LandingPage'
import { DemoPage } from '@/pages/DemoPage'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { AuditLogsPage } from '@/pages/AuditLogsPage'
import { TokenAnalyticsPage } from '@/pages/TokenAnalyticsPage'
import { ThreatMonitoringPage } from '@/pages/ThreatMonitoringPage'
import { ApiMetricsPage } from '@/pages/ApiMetricsPage'
import { SystemHealthPage } from '@/pages/SystemHealthPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <div className="min-h-screen bg-surface-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"/></div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { user, login, register, logout, isAuthenticated } = useAuth()

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password })
  }

  const handleRegister = async (name: string, email: string, password: string) => {
    await register({ name, email, password })
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<ProtectedRoute><DemoPage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/demo" replace /> : <LoginPage onLogin={handleLogin} onRegister={handleRegister} redirectTo="/demo" />} />
      <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/demo" replace /> : <ForgotPasswordPage />} />
      <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/demo" replace /> : <ResetPasswordPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout user={user} onLogout={logout} /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="audit" element={<AuditLogsPage />} />
        <Route path="tokens" element={<TokenAnalyticsPage />} />
        <Route path="threats" element={<ThreatMonitoringPage />} />
        <Route path="api" element={<ApiMetricsPage />} />
        <Route path="health" element={<SystemHealthPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
