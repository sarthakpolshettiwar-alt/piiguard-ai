import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatNumber } from '@/utils/formatters'
import type { ComponentType } from 'react'

interface StatCardProps {
  title: string
  value: number | string
  trend?: number
  icon: ComponentType<{ size?: number; className?: string }>
  color?: 'cyan' | 'violet' | 'emerald' | 'red' | 'orange' | 'yellow'
  suffix?: string
  format?: boolean
  delay?: number
}

const colorMap = {
  cyan: { bg: 'from-cyan-500/20 to-cyan-600/5', text: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10' },
  violet: { bg: 'from-violet-500/20 to-violet-600/5', text: 'text-violet-400', border: 'border-violet-500/20', glow: 'shadow-violet-500/10' },
  emerald: { bg: 'from-emerald-500/20 to-emerald-600/5', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
  red: { bg: 'from-red-500/20 to-red-600/5', text: 'text-red-400', border: 'border-red-500/20', glow: 'shadow-red-500/10' },
  orange: { bg: 'from-orange-500/20 to-orange-600/5', text: 'text-orange-400', border: 'border-orange-500/20', glow: 'shadow-orange-500/10' },
  yellow: { bg: 'from-yellow-500/20 to-yellow-600/5', text: 'text-yellow-400', border: 'border-yellow-500/20', glow: 'shadow-yellow-500/10' },
}

export function StatCard({ title, value, trend, icon: Icon, color = 'cyan', suffix, format = true, delay = 0 }: StatCardProps) {
  const colors = colorMap[color]
  const displayValue = typeof value === 'number' && format ? formatNumber(value) : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        'glass-card p-6 relative overflow-hidden group',
        `shadow-lg ${colors.glow}`
      )}
    >
      {/* Background gradient */}
      <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-50', colors.bg)} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={clsx('p-2.5 rounded-xl bg-gradient-to-br', colors.bg, 'border', colors.border)}>
            <Icon size={20} className={colors.text} />
          </div>
          {trend !== undefined && (
            <div className={clsx(
              'flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
              trend > 0 ? 'bg-emerald-500/15 text-emerald-400' :
              trend < 0 ? 'bg-red-500/15 text-red-400' :
              'bg-slate-500/15 text-slate-400'
            )}>
              {trend > 0 ? <TrendingUp size={12} /> : trend < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white tracking-tight">
          {displayValue}{suffix && <span className="text-sm font-normal text-slate-400 ml-1">{suffix}</span>}
        </p>
      </div>
    </motion.div>
  )
}
