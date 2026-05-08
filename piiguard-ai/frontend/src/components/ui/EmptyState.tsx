import { FileQuestion } from 'lucide-react'
import type { ComponentType } from 'react'

interface EmptyStateProps {
  icon?: ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon = FileQuestion, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-4">
        <Icon size={32} className="text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  )
}
