import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function GlassCard({ children, className, hover = true, padding = 'md', onClick }: GlassCardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        hover ? 'glass-card' : 'glass-card-static',
        paddings[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
