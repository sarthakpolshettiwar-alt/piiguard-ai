import { Bell, Search } from 'lucide-react'
import type { User } from '@/types'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 glass-card-static rounded-none border-b border-slate-700/40 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search events, tokens, threats..."
          className="input-field pl-10 py-2 text-sm bg-slate-800/30"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-800/50 transition-colors group">
          <Bell size={18} className="text-slate-400 group-hover:text-slate-200" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        </button>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">Live</span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-200">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'admin'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
