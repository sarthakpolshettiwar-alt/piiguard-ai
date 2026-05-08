import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export async function checkDatabaseConnection(): Promise<{ connected: boolean; latency: number }> {
  const start = Date.now()
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, latency: Date.now() - start }
  } catch {
    return { connected: false, latency: Date.now() - start }
  }
}
