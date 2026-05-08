import api from './api'
import type { LoginCredentials, RegisterCredentials, User } from '@/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  async register(credentials: RegisterCredentials): Promise<{ token: string; user: User }> {
    const { data } = await api.post('/auth/register', credentials)
    return data
  },

  async changePassword(credentials: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    const { data } = await api.put('/auth/password', credentials)
    return data
  },

  async forgotPassword(email: string): Promise<{ message: string; devToken?: string }> {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  },

  async resetPassword(credentials: { token: string; newPassword: string }): Promise<{ message: string }> {
    const { data } = await api.post('/auth/reset-password', credentials)
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
