import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import app from './app'
import { env } from './config/env'
import { checkDatabaseConnection } from './config/database'

const server = http.createServer(app)

// Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`)

  socket.on('join', (room: string) => {
    socket.join(room)
    console.log(`📡 Socket ${socket.id} joined room: ${room}`)
  })

  socket.on('disconnect', () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`)
  })
})

// Make io accessible to routes
app.set('io', io)

// Start server
async function start() {
  try {
    // Check database connection
    const dbCheck = await checkDatabaseConnection()
    if (dbCheck.connected) {
      console.log(`✅ PostgreSQL connected (${dbCheck.latency}ms)`)
    } else {
      console.warn('⚠️  PostgreSQL connection failed — some features will be limited')
    }

    server.listen(env.PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════╗
║         🛡️  PIIGuard AI Backend Server          ║
╠══════════════════════════════════════════════════╣
║  Port:        ${String(env.PORT).padEnd(35)}║
║  Environment: ${env.NODE_ENV.padEnd(35)}║
║  API:         http://localhost:${env.PORT}/api${' '.repeat(13)}║
║  Health:      http://localhost:${env.PORT}/api/health${' '.repeat(6)}║
║  Socket.IO:   Enabled${' '.repeat(27)}║
╚══════════════════════════════════════════════════╝
      `)
    })
  } catch (err) {
    console.error('❌ Server startup failed:', err)
    process.exit(1)
  }
}

start()

export { server, io }
