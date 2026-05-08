import api from './api'
import { supabase } from '@/lib/supabase'
import type { LoginCredentials, RegisterCredentials, User } from '@/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  async register(credentials: RegisterCredentials): Promise<{ token: string; user: User }> {
    // 1. Sign up on Supabase
    const { data: sbData, error: sbError } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        }
      }
    })

    if (sbError) {
      throw sbError
    }

    if (!sbData.user) {
      throw new Error('Registration failed with Supabase.')
    }

    // 2. Register on local backend to keep databases in sync
    const { data } = await api.post('/auth/register', credentials)
    return data
  },

  async changePassword(credentials: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    const { data } = await api.put('/auth/password', credentials)
    return data
  },

  async forgotPassword(email: string): Promise<{ message: string; devToken?: string }> {
    // 1. Trigger backend forgot-password first to get the local reset token
    const { data } = await api.post('/auth/forgot-password', { email })
    const devToken = data.devToken

    // 2. Construct redirectTo URL including the backend token
    const redirectTo = devToken
      ? `http://localhost:5173/reset-password?token=${devToken}`
      : 'http://localhost:5173/reset-password'

    // 3. Send reset password email via Supabase
    const { error: sbError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (sbError) {
      throw sbError
    }

    return data
  },

  async resetPassword(credentials: { token: string; newPassword: string }): Promise<{ message: string }> {
    // 1. Reset password on local backend
    const { data } = await api.post('/auth/reset-password', credentials)

    // 2. Also try to reset on Supabase if they are recovery-authenticated
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { error: sbError } = await supabase.auth.updateUser({ password: credentials.newPassword })
        if (sbError) {
          console.warn('Supabase password update error:', sbError.message)
        }
      }
    } catch (err) {
      console.warn('Could not update password in Supabase:', err)
    }

    return data
  },

  async me(): Promise<User> {
    const { data } = await api.get('/auth/me')
    return data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
    localStorage.removeItem('piiguard_token')
    localStorage.removeItem('piiguard_user')
  },
}
