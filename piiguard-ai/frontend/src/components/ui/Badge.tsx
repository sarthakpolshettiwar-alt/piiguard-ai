import { clsx } from 'clsx'

interface BadgeProps {
  variant: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variant === 'critical' && 'badge-critical',
      variant === 'high' && 'badge-high',
      variant === 'medium' && 'badge-medium',
      variant === 'low' && 'badge-low',
      variant === 'info' && 'badge-info',
      variant === 'success' && 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      className
    )}>
      {children}
    </span>
  )
}
