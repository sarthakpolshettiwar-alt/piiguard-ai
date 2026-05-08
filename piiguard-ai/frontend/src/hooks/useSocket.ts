import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useSocket(room?: string) {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('piiguard_token')
    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
    })

    if (room) {
      socketRef.current.emit('join', room)
    }

    return () => {
      socketRef.current?.disconnect()
    }
  }, [room])

  const on = useCallback((event: string, callback: (...args: unknown[]) => void) => {
    socketRef.current?.on(event, callback)
    return () => {
      socketRef.current?.off(event, callback)
    }
  }, [])

  const emit = useCallback((event: string, data?: unknown) => {
    socketRef.current?.emit(event, data)
  }, [])

  return { on, emit, socket: socketRef.current }
}
