import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[PIIGuard] Uncaught app error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: '#020617', color: '#e2e8f0',
          flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem' }}>⚠️</div>
          <h2 style={{ color: '#ef4444', margin: 0 }}>Application Error</h2>
          <p style={{ color: '#94a3b8', margin: 0, maxWidth: '480px' }}>
            The application failed to start. Check the browser console for details.
            {this.state.error && (
              <span style={{ display: 'block', marginTop: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#64748b' }}>
                {this.state.error.message}
              </span>
            )}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
