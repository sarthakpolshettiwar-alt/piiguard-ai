# PIIGuard AI — API Reference

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints

### POST /api/auth/register
Register a new user.

**Body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "password123" }
```

**Response (201):**
```json
{ "token": "jwt...", "user": { "id": "...", "email": "...", "name": "...", "role": "user" } }
```

### POST /api/auth/login
Authenticate and receive JWT.

**Body:**
```json
{ "email": "john@example.com", "password": "password123" }
```

### GET /api/auth/me 🔒
Get current user profile.

### POST /api/auth/logout 🔒
Invalidate current session.

---

## PII Endpoints

### POST /api/pii/tokenize 🔒
Detect and tokenize PII in text.

**Body:**
```json
{ "text": "Contact john@acme.com or call 555-123-4567" }
```

**Response:**
```json
{
  "tokenizedText": "Contact [TOKEN_EMAIL_a1b2c3] or call [TOKEN_PHONE_d4e5f6]",
  "detections": [
    { "type": "email", "value": "john@acme.com", "confidence": 0.99 }
  ],
  "tokenCount": 2,
  "processingTime": 12
}
```

### POST /api/pii/detokenize 🔒
Restore original text from tokens.

### POST /api/pii/detect 🔒
Detect PII without tokenizing.

---

## Analytics Endpoints

### GET /api/analytics/dashboard 🔒
Dashboard summary stats.

### GET /api/analytics/tokens 🔒
Token analytics with charts.

### GET /api/analytics/threats 🔒
Threat analytics with severity breakdown.

### GET /api/analytics/api-metrics 🔒
API performance metrics.

---

## Audit

### GET /api/audit/logs?page=1&limit=20 🔒
Paginated audit logs.

---

## Health

### GET /api/health
System health check (no auth required).

**Response:**
```json
{
  "status": "healthy",
  "postgres": { "connected": true, "latency": 3 },
  "redis": { "connected": true, "latency": 1 },
  "uptime": 86400,
  "memory": { "used": 256000000, "total": 512000000, "percentage": 50 },
  "version": "1.0.0"
}
```

---

🔒 = Requires `Authorization: Bearer <token>` header
