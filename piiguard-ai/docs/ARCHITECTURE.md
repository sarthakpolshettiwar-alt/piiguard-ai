# PIIGuard AI — Architecture

## System Overview

```
┌──────────────────────────────────────────────────────┐
│                     FRONTEND                          │
│          React + Vite + TypeScript + Tailwind         │
│                                                       │
│  ┌─────────┐  ┌──────────┐  ┌────────────────┐      │
│  │ Landing  │  │   Demo   │  │   Dashboard    │      │
│  │  Page    │  │  Page    │  │  (10 pages)    │      │
│  └─────────┘  └──────────┘  └────────────────┘      │
│                      │                                │
│              Axios + Socket.IO Client                 │
└──────────────────────┬───────────────────────────────┘
                       │ HTTPS / WSS
┌──────────────────────▼───────────────────────────────┐
│                     BACKEND                           │
│          Express + TypeScript + Socket.IO             │
│                                                       │
│  ┌──────────────────────────────────────────┐        │
│  │              Security Layer               │        │
│  │  Helmet · CORS · Rate Limit · JWT Auth    │        │
│  └──────────────────────────────────────────┘        │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐       │
│  │   PII    │  │  Threat  │  │  Analytics   │       │
│  │ Engine   │  │ Detector │  │  Service     │       │
│  │          │  │          │  │              │       │
│  │ Detect → │  │ Prompt   │  │ Dashboard    │       │
│  │ Token  → │  │ SQL Inj  │  │ Tokens       │       │
│  │ Encrypt  │  │ XSS      │  │ Threats      │       │
│  │ Store    │  │ Abnormal │  │ API Metrics  │       │
│  └──────────┘  └──────────┘  └──────────────┘       │
│                                                       │
│  ┌──────────────────────────────────────────┐        │
│  │           Zod Validation Layer            │        │
│  └──────────────────────────────────────────┘        │
└──────────┬────────────────────────────┬──────────────┘
           │                            │
┌──────────▼──────────┐    ┌───────────▼───────────┐
│    PostgreSQL       │    │       Redis            │
│    (Supabase)       │    │     (Upstash)          │
│                     │    │                        │
│  Users              │    │  Token Mappings (TTL)  │
│  Sessions           │    │  (Encrypted AES-256)   │
│  AuditLogs          │    │                        │
│  TokenEvents        │    │  Session Cache         │
│  ThreatEvents       │    │                        │
│  ApiMetrics         │    │                        │
└─────────────────────┘    └────────────────────────┘
```

## Data Flow: PII Tokenization

```
1. Client sends text → POST /api/pii/tokenize
2. JWT Auth middleware validates token
3. Threat Detector scans for injection attacks
4. PII Detector finds sensitive patterns (regex)
5. For each PII match:
   a. Generate UUID token
   b. Encrypt original value (AES-256-CBC)
   c. Store encrypted mapping in Redis (TTL: 1hr)
   d. Log TokenEvent in PostgreSQL
6. Return tokenized text + detection metadata
7. Emit Socket.IO event for live dashboard
```

## Security Architecture

- **Zero PII Storage**: Raw PII is never stored in PostgreSQL
- **AES-256 Encryption**: All token mappings encrypted at rest
- **Redis TTL**: Token mappings auto-expire after 1 hour
- **JWT + bcrypt**: Secure authentication with password hashing
- **Helmet**: HTTP security headers
- **Rate Limiting**: 200 requests per 15-minute window
- **Zod Validation**: Input validation on all endpoints
- **Threat Detection**: Real-time pattern matching for attacks
