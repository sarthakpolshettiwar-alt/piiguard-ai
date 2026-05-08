import axios from 'axios'

// Use relative URL in development — Vite proxy forwards /api → backend
// Use VITE_API_URL in production builds where no proxy exists
const isDev = import.meta.env.DEV
const API_URL = isDev ? '' : (import.meta.env.VITE_API_URL || '')

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('piiguard_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('piiguard_token')
      localStorage.removeItem('piiguard_user')
      if (window.location.pathname.startsWith('/dashboard')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
