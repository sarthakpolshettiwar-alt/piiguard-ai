import { useState, useEffect, useCallback } from 'react'
import { authService } from '@/services/auth.service'
import type { User, AuthState, LoginCredentials, RegisterCredentials } from '@/types'

export function useAuth(): AuthState & {
  login: (creds: LoginCredentials) => Promise<void>
  register: (creds: RegisterCredentials) => Promise<void>
  logout: () => void
} {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('piiguard_token')
      const userStr = localStorage.getItem('piiguard_user')
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User
          setState({ user, token, isAuthenticated: true, isLoading: false })
        } catch {
          localStorage.removeItem('piiguard_token')
          localStorage.removeItem('piiguard_user')
          setState((s) => ({ ...s, user: null, token: null, isAuthenticated: false, isLoading: false }))
        }
      } else {
        setState((s) => ({ ...s, user: null, token: null, isAuthenticated: false, isLoading: false }))
      }
    }

    checkAuth()
    
    window.addEventListener('piiguard_auth_change', checkAuth)
    return () => window.removeEventListener('piiguard_auth_change', checkAuth)
  }, [])

  const login = useCallback(async (creds: LoginCredentials) => {
    const { token, user } = await authService.login(creds)
    localStorage.setItem('piiguard_token', token)
    localStorage.setItem('piiguard_user', JSON.stringify(user))
    window.dispatchEvent(new Event('piiguard_auth_change'))
  }, [])

  const register = useCallback(async (creds: RegisterCredentials) => {
    const { token, user } = await authService.register(creds)
    localStorage.setItem('piiguard_token', token)
    localStorage.setItem('piiguard_user', JSON.stringify(user))
    window.dispatchEvent(new Event('piiguard_auth_change'))
  }, [])

  const logout = useCallback(() => {
    authService.logout().catch(() => {})
    localStorage.removeItem('piiguard_token')
    localStorage.removeItem('piiguard_user')
    window.dispatchEvent(new Event('piiguard_auth_change'))
  }, [])

  return { ...state, login, register, logout }
}
