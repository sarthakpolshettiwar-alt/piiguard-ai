[README.md](https://github.com/user-attachments/files/27517221/README.md)
<div align="center">

# 🛡️ PIIGuard AI

### *Privacy-First AI Security Infrastructure Platform*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)
[![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

---

**Detect. Tokenize. Secure.**
*Enterprise-grade PII protection layer for AI pipelines — before sensitive data ever reaches an LLM.*

[Features](#-features) • [Architecture](#-system-architecture) • [Installation](#-installation) • [API](#-api-overview) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**PIIGuard AI** is a production-grade, privacy-first security infrastructure platform designed to intercept, detect, and neutralize Personally Identifiable Information (PII) before it reaches any AI system or Large Language Model (LLM).

In a world where AI usage is accelerating across every industry, the accidental leakage of sensitive data — names, emails, phone numbers, social security numbers, financial identifiers — into AI systems represents a critical compliance and privacy risk. PIIGuard AI solves this problem at the infrastructure level.

By sitting between your users and your AI backend, PIIGuard AI:

- 🔍 **Detects** PII in real-time using intelligent pattern recognition
- 🔑 **Tokenizes** sensitive values into reversible, encrypted placeholders
- 🔒 **Stores** encrypted mappings securely in a tamper-resistant data layer
- 📋 **Returns** sanitized prompts safe for AI consumption
- 📝 **Tracks** full prompt history for audit trails and compliance

This platform is built for developers, security engineers, and compliance teams who need a reliable, scalable, and developer-friendly solution to protect sensitive user data in AI-powered applications.

---

## ✨ Features

### 🔐 Security & Privacy
| Feature | Description |
|---|---|
| **Real-time PII Detection** | Identify PII patterns (emails, phone numbers, SSNs, credit cards, names, addresses) in submitted prompts instantly |
| **PII Tokenization** | Replace detected PII with cryptographically unique tokens, preserving prompt structure |
| **AES Encryption** | All token-to-PII mappings are encrypted at rest using AES before storage |
| **JWT Authentication** | Stateless, secure API access with signed JSON Web Tokens |
| **Protected Routes** | Frontend routes and backend endpoints are fully protected; unauthenticated access is blocked |

### 🧠 AI Pipeline Protection
| Feature | Description |
|---|---|
| **Secure Prompt Processing** | Sanitized prompts are returned for safe downstream AI consumption |
| **Prompt History Tracking** | Every processed prompt is logged with metadata for review and audit |
| **Token Vault** | Encrypted mappings stored in PostgreSQL via Prisma ORM for durability |
| **Redis Caching** | Upstash Redis provides fast ephemeral token lookups and session support |

### 🖥️ Platform & UX
| Feature | Description |
|---|---|
| **Cybersecurity-Themed UI** | Dark, professional UI built with TailwindCSS for a security-first aesthetic |
| **Authentication System** | Full sign-up, login, and session management powered by Supabase Auth |
| **Forgot/Reset Password** | Secure password reset flow with email-based verification |
| **Settings Page** | User preference and account management interface |
| **Copy-to-Clipboard** | One-click copying of sanitized prompts and token results |

---

## 📸 Screenshots

> 📌 *Screenshots coming soon — replace placeholders below with actual images.*

```
screenshots/
├── dashboard.png        # Main dashboard with prompt input
├── pii-detection.png    # Real-time PII detection in action
├── token-output.png     # Tokenized output view
├── history.png          # Prompt history log
├── settings.png         # Settings page
└── login.png            # Authentication screen
```

| Dashboard | PII Detection |
|---|---|
| ![Dashboard](screenshots/dashboard.png) | ![Detection](screenshots/pii-detection.png) |

| Token Output | Prompt History |
|---|---|
| ![Token Output](screenshots/token-output.png) | ![History](screenshots/history.png) |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI component framework |
| [Vite](https://vitejs.dev/) | Next-generation frontend build tool |
| [TypeScript](https://www.typescriptlang.org/) | Static typing for reliability |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS for cybersecurity-themed UI |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | Lightweight HTTP server framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe backend development |

### Data & Storage
| Technology | Purpose |
|---|---|
| [PostgreSQL (Supabase)](https://supabase.com/) | Primary relational database for users, tokens, and history |
| [Prisma ORM](https://www.prisma.io/) | Type-safe database access and schema migrations |
| [Redis (Upstash)](https://upstash.com/) | Serverless Redis for caching and ephemeral token storage |

### Auth & Security
| Technology | Purpose |
|---|---|
| [Supabase Auth](https://supabase.com/docs/guides/auth) | Authentication, session management, password reset |
| [AES Encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) | Symmetric encryption for stored PII token mappings |
| [JWT](https://jwt.io/) | API authentication tokens |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                    │
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐ │
│   │  Auth Pages  │    │   Dashboard  │    │  History/Settings│ │
│   └──────┬───────┘    └──────┬───────┘    └────────┬─────────┘ │
└──────────┼───────────────────┼─────────────────────┼───────────┘
           │                   │                     │
           ▼                   ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE AUTH                                 │
│               (JWT Tokens · Session Management)                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Authenticated Requests (JWT)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND API (Express + Node.js)                 │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │               PII Detection Engine                       │  │
│   │   (Regex Patterns · Named Entity Recognition · Rules)    │  │
│   └──────────────────────────┬───────────────────────────────┘  │
│                              │                                  │
│   ┌──────────────────────────▼───────────────────────────────┐  │
│   │               Tokenization Engine                        │  │
│   │         (UUID Tokens · AES Encrypted Mappings)           │  │
│   └──────────┬─────────────────────────────┬─────────────────┘  │
│              │                             │                     │
└──────────────┼─────────────────────────────┼────────────────────┘
               │                             │
               ▼                             ▼
┌──────────────────────┐         ┌────────────────────────┐
│   PostgreSQL         │         │   Upstash Redis         │
│   (via Supabase)     │         │   (Serverless Cache)    │
│                      │         │                         │
│ • users              │         │ • ephemeral tokens      │
│ • token_mappings     │         │ • session cache         │
│ • prompt_history     │         │ • rate limiting         │
│ • settings           │         │                         │
└──────────────────────┘         └────────────────────────┘
         ▲
         │ Prisma ORM
         │ (Type-safe queries · Migrations)
         │
┌────────┴──────────────────────┐
│         Prisma Schema         │
│   (schema.prisma — source     │
│    of truth for DB structure) │
└───────────────────────────────┘
```

### Data Flow Summary

```
User Prompt ──► PII Detection ──► Tokenization ──► Encrypted Storage
                                       │
                                       ▼
                              Sanitized Prompt ──► AI System (Safe)
                                       │
                                       ▼
                              History Logged ──► Audit Trail
```

---

## 📁 Folder Structure

```
piiguard-ai/
│
├── frontend/                        # React + Vite + TypeScript frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, icons, fonts
│   │   ├── components/              # Reusable UI components
│   │   │   ├── auth/                # Login, Register, ForgotPassword
│   │   │   ├── dashboard/           # Main prompt interface
│   │   │   ├── history/             # Prompt history view
│   │   │   ├── settings/            # Settings page
│   │   │   └── shared/              # Navbar, Layout, Protected routes
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Supabase client, API helpers
│   │   ├── pages/                   # Top-level page components
│   │   ├── types/                   # TypeScript interfaces & types
│   │   ├── App.tsx                  # Root component with routing
│   │   └── main.tsx                 # Entry point
│   ├── .env                         # Frontend environment variables
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                         # Express + Node.js + TypeScript API
│   ├── src/
│   │   ├── controllers/             # Route handler logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── pii.controller.ts
│   │   │   └── history.controller.ts
│   │   ├── middleware/              # JWT auth, error handling, validation
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── routes/                  # Express route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── pii.routes.ts
│   │   │   └── history.routes.ts
│   │   ├── services/                # Business logic
│   │   │   ├── pii.service.ts       # PII detection engine
│   │   │   ├── tokenizer.service.ts # Tokenization & encryption
│   │   │   ├── redis.service.ts     # Upstash Redis integration
│   │   │   └── history.service.ts   # Prompt history management
│   │   ├── lib/                     # Prisma client, Redis client
│   │   ├── types/                   # Shared TypeScript types
│   │   └── index.ts                 # Express app entry point
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema definition
│   │   └── migrations/              # Auto-generated Prisma migrations
│   ├── .env                         # Backend environment variables
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn**
- A **Supabase** project (free tier works)
- An **Upstash Redis** database (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/sarthakpolshettiwar/piiguard-ai.git
cd piiguard-ai
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
# Edit .env with your Supabase credentials and API URL
```

### 3. Backend Setup

```bash
cd ../backend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
# Edit .env with your database URL, Redis credentials, and secrets
```

### 4. Database Setup (Prisma Migration)

With your `DATABASE_URL` set in `/backend/.env`, run:

```bash
cd backend
npx prisma generate       # Generate Prisma client
npx prisma migrate dev    # Apply migrations to your database
```

To view your database visually:

```bash
npx prisma studio
```

### 5. Redis Setup (Upstash)

1. Go to [console.upstash.com](https://console.upstash.com/) and create a new Redis database
2. Copy the **REST URL** and **REST Token** from the dashboard
3. Add them to your `/backend/.env` file

### 6. Supabase Auth Setup

1. Go to your [Supabase project dashboard](https://app.supabase.com/)
2. Navigate to **Authentication → Providers** and ensure Email is enabled
3. Under **Authentication → URL Configuration**, add your frontend URL to the redirect allowlist
4. Copy your **Project URL** and **Anon Key** from **Settings → API**

---

## 🔧 Environment Variables

### Frontend (`frontend/.env`)

```env
# Supabase configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend API URL
VITE_API_URL=http://localhost:4000
```

### Backend (`backend/.env`)

```env
# PostgreSQL via Supabase
DATABASE_URL=postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres

# Upstash Redis (Serverless)
UPSTASH_REDIS_REST_URL=https://your-redis-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
SECRET_KEY=your-aes-encryption-secret-key-32-characters
```

> ⚠️ **Security Notice:** Never commit `.env` files to version control. Use `.env.example` files with placeholder values as templates.

---

## 🖥️ Running Locally

Start the backend server:

```bash
cd backend
npm run dev
# Backend API running at http://localhost:4000
```

In a separate terminal, start the frontend dev server:

```bash
cd frontend
npm run dev
# Frontend running at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Authentication Flow

PIIGuard AI uses **Supabase Auth** for full user lifecycle management, with JWT-based API protection on the backend.

```
┌─────────┐        ┌──────────────┐        ┌────────────┐
│  User   │        │ Supabase Auth│        │  Backend   │
└────┬────┘        └──────┬───────┘        └─────┬──────┘
     │                    │                      │
     │  Sign Up / Login   │                      │
     │──────────────────► │                      │
     │                    │                      │
     │  JWT Access Token  │                      │
     │ ◄────────────────  │                      │
     │                    │                      │
     │  API Request + JWT Bearer Token           │
     │──────────────────────────────────────────►│
     │                    │                      │
     │                    │  Verify JWT Signature │
     │                    │ ◄─────────────────── │
     │                    │                      │
     │  Protected Response│                      │
     │ ◄────────────────────────────────────────-│
```

### Key Authentication Features

- **Signup/Login** — Supabase handles credential storage and session creation
- **JWT Verification** — Every protected backend route validates the JWT from the Authorization header
- **Password Reset** — Email-based magic link reset flow, handled through Supabase Auth
- **Session Persistence** — Supabase client SDK manages token refresh automatically
- **Protected Frontend Routes** — React Router guards redirect unauthenticated users to login

---

## 🔄 Tokenization Workflow

The core of PIIGuard AI is a multi-stage PII sanitization pipeline designed for security and reversibility.

```
╔══════════════════════════════════════════════════════════════╗
║                  TOKENIZATION PIPELINE                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  1. USER SUBMITS PROMPT                                      ║
║     "Please help John Doe at john@example.com, SSN 123-45"  ║
║                              │                               ║
║                              ▼                               ║
║  2. PII DETECTION ENGINE                                     ║
║     ┌─────────────────────────────────────┐                  ║
║     │ Detected:                           │                  ║
║     │  • NAME:  "John Doe"                │                  ║
║     │  • EMAIL: "john@example.com"        │                  ║
║     │  • SSN:   "123-45-..."              │                  ║
║     └─────────────────────────────────────┘                  ║
║                              │                               ║
║                              ▼                               ║
║  3. TOKENIZATION                                             ║
║     ┌─────────────────────────────────────────────────────┐  ║
║     │ "John Doe"          → [TOKEN_a8f2c1d4]              │  ║
║     │ "john@example.com"  → [TOKEN_9e3b7f22]              │  ║
║     │ "123-45-..."        → [TOKEN_c1d56a90]              │  ║
║     └─────────────────────────────────────────────────────┘  ║
║                              │                               ║
║                              ▼                               ║
║  4. ENCRYPTED STORAGE                                        ║
║     AES-encrypt token↔value mappings                         ║
║     Persist to PostgreSQL (Prisma) + Redis cache             ║
║                              │                               ║
║                              ▼                               ║
║  5. SANITIZED PROMPT RETURNED                                ║
║     "Please help [TOKEN_a8f2c1d4] at [TOKEN_9e3b7f22]..."   ║
║                              │                               ║
║                              ▼                               ║
║  6. HISTORY SAVED                                            ║
║     Original metadata + sanitized version logged with        ║
║     timestamp, user ID, PII type count                       ║
║                              │                               ║
║                              ▼                               ║
║  7. SECURE AI WORKFLOW                                       ║
║     Sanitized prompt forwarded to AI system — zero PII       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### PII Types Detected

| Category | Examples |
|---|---|
| **Email Address** | `john@example.com` |
| **Phone Number** | `+1-555-123-4567`, `(555) 123-4567` |
| **Social Security Number** | `123-45-6789` |
| **Credit Card Number** | `4111 1111 1111 1111` |
| **Full Name** | `John Doe`, `Dr. Jane Smith` |
| **Date of Birth** | `01/15/1990`, `January 15, 1990` |
| **Physical Address** | `123 Main Street, New York, NY 10001` |
| **IP Address** | `192.168.1.1` |

---

## 📋 History Feature

Every prompt processed through PIIGuard AI is automatically logged to provide:

- **Audit Trail** — Full record of when prompts were processed and by whom
- **PII Summary** — Count and types of PII detected per prompt
- **Before/After View** — Original prompt context vs. sanitized version
- **Timestamp Metadata** — UTC timestamps for compliance record-keeping
- **User-Scoped History** — Each user can only access their own prompt history

History records are stored in PostgreSQL via Prisma and can be reviewed from the History page in the dashboard. Sensitive raw PII is never stored — only token references and PII type metadata are logged.

---

## 🔒 Security Features

### Defense in Depth

PIIGuard AI implements multiple layers of security:

```
Layer 1: Authentication Gate
  └── Supabase Auth · JWT Token Verification · Protected Routes

Layer 2: Transport Security
  └── HTTPS Enforced · Secure Headers · CORS Configuration

Layer 3: Data-at-Rest Encryption
  └── AES Encryption on all PII token mappings before storage

Layer 4: Database Security
  └── Prisma parameterized queries (SQL injection prevention)
  └── Row-level isolation by user ID

Layer 5: Secret Management
  └── Environment variable isolation · No secrets in source code
```

### Encryption Details

| Component | Method | Notes |
|---|---|---|
| PII Token Mappings | AES-256 | Encrypted before writing to PostgreSQL |
| API Communication | JWT (RS256/HS256) | Signed tokens, verified on every request |
| Password Storage | Supabase Auth (bcrypt) | Managed by Supabase Auth infrastructure |
| Redis Cache Entries | Encrypted values | Token data encrypted before caching |

---

## 📡 API Overview

All API endpoints are prefixed with `/api/v1` and require a valid `Authorization: Bearer <JWT>` header unless marked as public.

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register a new user |
| `POST` | `/api/v1/auth/login` | Public | Login and receive JWT |
| `POST` | `/api/v1/auth/forgot-password` | Public | Trigger password reset email |
| `POST` | `/api/v1/auth/reset-password` | Public | Set new password with reset token |
| `GET` | `/api/v1/auth/me` | Protected | Get current user profile |

### PII Processing

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/pii/process` | Protected | Submit prompt for PII detection and tokenization |
| `POST` | `/api/v1/pii/detokenize` | Protected | Reverse tokens back to original PII values |
| `GET` | `/api/v1/pii/types` | Protected | List all supported PII detection types |

### Prompt History

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/history` | Protected | Fetch paginated prompt history for current user |
| `GET` | `/api/v1/history/:id` | Protected | Fetch a single history record by ID |
| `DELETE` | `/api/v1/history/:id` | Protected | Delete a specific history record |
| `DELETE` | `/api/v1/history` | Protected | Clear all history for current user |

### Settings

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/settings` | Protected | Fetch user settings |
| `PATCH` | `/api/v1/settings` | Protected | Update user settings |

### Example Request — Process Prompt

```bash
curl -X POST https://your-api-url/api/v1/pii/process \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Please send a report to Jane Smith at jane.smith@corp.com, her phone is 555-987-6543"
  }'
```

**Response:**

```json
{
  "success": true,
  "sanitizedPrompt": "Please send a report to [TOKEN_d4f1a092] at [TOKEN_88c3e710], her phone is [TOKEN_f2b9c441]",
  "detectedPII": [
    { "type": "NAME", "token": "TOKEN_d4f1a092" },
    { "type": "EMAIL", "token": "TOKEN_88c3e710" },
    { "type": "PHONE", "token": "TOKEN_f2b9c441" }
  ],
  "piiCount": 3,
  "historyId": "clx8f2k9m0000abc123"
}
```

---

## 🚀 Future Improvements

| Feature | Priority | Description |
|---|---|---|
| **LLM Integration** | 🔴 High | Direct integration with OpenAI, Anthropic, and Gemini APIs for end-to-end secure prompting |
| **Detokenization API** | 🔴 High | Reverse-tokenize AI responses to restore original values in the output |
| **Named Entity Recognition** | 🟡 Medium | ML-based NER for higher accuracy detection beyond regex patterns |
| **Compliance Reports** | 🟡 Medium | GDPR/HIPAA/CCPA-ready audit report exports (PDF/CSV) |
| **Webhook Support** | 🟡 Medium | Event-driven notifications when PII is detected above threshold |
| **Team/Organization Mode** | 🟡 Medium | Multi-user workspaces with role-based access control |
| **SDK / npm Package** | 🟢 Low | Publish `@piiguard/client` SDK for easy integration into any JavaScript app |
| **PII Scoring** | 🟢 Low | Risk scoring per prompt based on type and count of PII detected |
| **Data Residency Controls** | 🟢 Low | Region-specific storage for data sovereignty compliance |

---

## 🌐 Deployment

### Frontend — Vercel

1. Import your repository at [vercel.com/new](https://vercel.com/new)
2. Set the **Root Directory** to `frontend`
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (your deployed backend URL)
4. Deploy — Vercel auto-detects Vite and configures the build

### Backend — Railway or Render

**Railway:**
1. Create a new project at [railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Set the **Root Directory** to `backend`
4. Add all backend environment variables in the Variables panel
5. Set the **Start Command** to `npm run start`
6. Deploy

**Render:**
1. Create a new **Web Service** at [render.com](https://render.com/)
2. Connect your repository and set Root Directory to `backend`
3. Set Build Command: `npm install && npm run build`
4. Set Start Command: `npm run start`
5. Add environment variables in the Environment panel

### Database — Supabase

1. Your Supabase PostgreSQL database is provisioned automatically when you create a project
2. Run Prisma migrations against your production database:
   ```bash
   DATABASE_URL=your-production-url npx prisma migrate deploy
   ```
3. Enable Row Level Security (RLS) in Supabase if not using service-role key

### Redis — Upstash

1. Create a Redis database at [console.upstash.com](https://console.upstash.com/)
2. Choose your preferred region (closest to your backend deployment)
3. Copy the **REST URL** and **REST Token** to your backend environment variables
4. Upstash Redis is serverless — no further configuration required

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements, bug fixes, or new features, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against the `main` branch

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

### Development Guidelines

- All new code must be written in TypeScript
- Run `npm run lint` before submitting a PR
- Add or update tests for any changed business logic
- Update this README if your changes affect setup, architecture, or environment variables

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Sarthak Polshettiwar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

**Sarthak Polshettiwar**

> Building secure, privacy-first infrastructure for the AI era.

[![GitHub](https://img.shields.io/badge/GitHub-sarthakpolshettiwar-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sarthakpolshettiwar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sarthakpolshettiwar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sarthakpolshettiwar)

---

<div align="center">

**⭐ If PIIGuard AI helped you, consider starring the repository!**

*Built with 🔐 for a safer AI ecosystem.*

</div>
