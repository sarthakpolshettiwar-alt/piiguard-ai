# PIIGuard AI

**Privacy-First AI Middleware Platform**

PIIGuard AI is a production-grade SaaS platform that detects PII in prompts, tokenizes sensitive data, securely stores encrypted mappings, and protects LLM workflows — all with real-time analytics, authentication, and admin monitoring.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   Frontend  │────▶│   Backend   │────▶│  PostgreSQL  │
│  React/Vite │     │  Express/TS │     │   (Supabase) │
└─────────────┘     └──────┬──────┘     └──────────────┘
                           │
                    ┌──────▼──────┐
                    │    Redis    │
                    │  (Upstash)  │
                    └─────────────┘
```

## Quick Start

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, TypeScript, TailwindCSS, Recharts, Framer Motion |
| Backend | Node.js, Express, TypeScript, Prisma, Socket.IO |
| Database | PostgreSQL (Supabase) |
| Cache | Redis (Upstash) |
| Auth | JWT + bcrypt |
| Encryption | AES-256-CBC |

## License

MIT
