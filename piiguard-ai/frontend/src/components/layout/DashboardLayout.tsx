import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import type { User } from '@/types'

interface DashboardLayoutProps {
  user: User | null
  onLogout: () => void
}

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-950 grid-bg">
      <Sidebar onLogout={onLogout} />
      <div className="ml-[260px] transition-all duration-300">
        <Header user={user} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
