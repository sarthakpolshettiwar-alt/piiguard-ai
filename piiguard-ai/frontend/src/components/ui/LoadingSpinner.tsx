import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const sizes = { sm: 16, md: 24, lg: 40 }

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 size={sizes[size]} className="animate-spin text-cyan-400" />
      {text && <p className="text-sm text-slate-400">{text}</p>}
    </div>
  )
}
