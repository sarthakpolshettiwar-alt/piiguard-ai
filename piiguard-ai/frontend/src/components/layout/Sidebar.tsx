import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import {
  LayoutDashboard,
  ScrollText,
  Coins,
  ShieldAlert,
  Activity,
  HeartPulse,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Audit Logs', path: '/dashboard/audit', icon: ScrollText },
  { label: 'Token Analytics', path: '/dashboard/tokens', icon: Coins },
  { label: 'Threat Monitor', path: '/dashboard/threats', icon: ShieldAlert },
  { label: 'API Metrics', path: '/dashboard/api', icon: Activity },
  { label: 'System Health', path: '/dashboard/health', icon: HeartPulse },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 bottom-0 z-40 glass-card-static flex flex-col border-r border-slate-700/50 rounded-none"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-700/40">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-base font-bold text-gradient">PIIGuard</span>
              <span className="text-base font-light text-slate-400 ml-1">AI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              )
            }
          >
            <item.icon size={20} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-2">
        <button
          onClick={() => { onLogout(); navigate('/login'); }}
          className={clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400',
            'hover:text-red-400 hover:bg-red-500/10 transition-all w-full'
          )}
        >
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </motion.aside>
  )
}
