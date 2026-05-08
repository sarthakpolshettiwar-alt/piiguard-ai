# PIIGuard AI — Deployment Guide

## Prerequisites
- Node.js ≥ 18
- PostgreSQL database (Supabase recommended)
- Redis instance (Upstash recommended)

---

## Frontend Deployment (Vercel)

### 1. Connect Repository
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend/
cd frontend
vercel
```

### 2. Environment Variables (Vercel Dashboard)
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your backend URL (e.g., `https://piiguard-api.railway.app`) |

### 3. Build Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `frontend`

---

## Backend Deployment (Railway)

### 1. Connect Repository
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy from backend/
cd backend
railway up
```

### 2. Environment Variables (Railway Dashboard)
| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase PostgreSQL URL |
| `REDIS_URL` | Your Upstash Redis URL |
| `JWT_SECRET` | Strong random secret (min 32 chars) |
| `ENCRYPTION_KEY` | 32-character AES key |
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | Your Vercel frontend URL |

### 3. Build Settings
- **Build Command**: `npx prisma generate && npm run build`
- **Start Command**: `node dist/server.js`

---

## Database Setup (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy the PostgreSQL connection string from Settings → Database
3. Run migrations:
```bash
cd backend
DATABASE_URL="your-supabase-url" npx prisma migrate deploy
```

---

## Redis Setup (Upstash)

1. Create a Redis database at [upstash.com](https://upstash.com)
2. Copy the Redis URL from the dashboard
3. Set `REDIS_URL` in your backend environment

---

## Docker Deployment

```bash
cd docker
docker-compose up -d
```

This starts all 4 services:
- Frontend on port 80
- Backend on port 3001
- PostgreSQL on port 5432
- Redis on port 6379

---

## Health Check

After deployment, verify:
```bash
curl https://your-backend-url/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "postgres": { "connected": true },
  "redis": { "connected": true },
  "uptime": 12345,
  "version": "1.0.0"
}
```
