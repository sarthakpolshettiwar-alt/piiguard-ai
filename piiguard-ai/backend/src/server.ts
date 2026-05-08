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

    let currentPort = env.PORT

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️  Port ${currentPort} is occupied.`)
        if (env.NODE_ENV !== 'production') {
          currentPort++
          console.log(`🔄 Trying next available port: ${currentPort}...`)
          server.listen(currentPort)
        } else {
          console.error('❌ In production, cannot fallback to another port. Exiting.')
          process.exit(1)
        }
      } else {
        console.error('❌ Server startup failed:', err)
        process.exit(1)
      }
    })

    server.on('listening', () => {
      console.log(`
╔══════════════════════════════════════════════════╗
║         🛡️  PIIGuard AI Backend Server          ║
╠══════════════════════════════════════════════════╣
║  Port:        ${String(currentPort).padEnd(35)}║
║  Environment: ${env.NODE_ENV.padEnd(35)}║
║  API:         http://localhost:${currentPort}/api${' '.repeat(Math.max(0, 13 - (currentPort.toString().length - 4)))}║
║  Health:      http://localhost:${currentPort}/api/health${' '.repeat(Math.max(0, 6 - (currentPort.toString().length - 4)))}║
║  Socket.IO:   Enabled${' '.repeat(27)}║
╚══════════════════════════════════════════════════╝
      `)
    })

    server.listen(currentPort)
  } catch (err) {
    console.error('❌ Server initialization failed:', err)
    process.exit(1)
  }
}

start()

export { server, io }
