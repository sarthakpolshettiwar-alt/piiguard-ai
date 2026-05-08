<div align="center">

<img src="https://img.shields.io/badge/PIIGuard-AI-00d4ff?style=for-the-badge&logo=shield&logoColor=white" alt="PIIGuard AI" />

# 🛡️ PIIGuard AI

### *Privacy-First AI Security Infrastructure Platform*

> **Detect. Tokenize. Protect.** — Secure your AI workflows before sensitive data ever reaches your LLM.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<br />

![PIIGuard Hero](./screenshots/hero.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [Authentication Flow](#-authentication-flow)
- [Tokenization Workflow](#-tokenization-workflow)
- [History Feature](#-history-feature)
- [Security Features](#-security-features)
- [API Overview](#-api-overview)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🔍 Overview

**PIIGuard AI** is a production-grade, privacy-first AI security infrastructure platform designed to intercept, detect, and neutralize Personally Identifiable Information (PII) *before* it reaches any Large Language Model (LLM) or downstream AI system.

In a world where developers and enterprises integrate AI into sensitive workflows daily, accidental PII exposure to third-party AI APIs poses a critical compliance and security risk. PIIGuard AI solves this by acting as a **secure middleware layer** — sitting between your application and your AI, ensuring zero sensitive data leakage.

### 🎯 Who Is This For?

| Audience | Use Case |
|---|---|
| **Enterprises** | Ensure GDPR / HIPAA compliance in AI pipelines |
| **Developers** | Protect user data when calling GPT, Claude, Gemini, etc. |
| **Security Teams** | Audit and monitor PII exposure in real-time |
| **Startups** | Ship privacy-compliant AI features from day one |

---

## ✨ Features

### 🔐 Core Security
- **Real-time PII Detection** — Scans input text and identifies emails, phone numbers, SSNs, names, addresses, and more with high accuracy
- **PII Tokenization Engine** — Replaces detected PII with unique cryptographic tokens (e.g., `john@acme.com` → `[TOKEN_EMAIL_a1b2c3]`)
- **AES Encryption** — All token-to-PII mappings are encrypted at rest using industry-standard AES encryption
- **Zero-Trust Architecture** — Sensitive data never persists in plaintext; only encrypted mappings are stored

### 👤 Authentication & Access
- **Supabase Authentication** — Secure signup, login, and session management
- **JWT-Protected Routes** — All API endpoints require valid JWT tokens
- **Forgot / Reset Password Flow** — Full email-based password recovery
- **Protected Frontend Routes** — Unauthenticated users cannot access the dashboard

### 📊 Dashboard & UX
- **Interactive PII Detection Demo** — Paste any text and watch tokenization happen in real-time
- **Tokenization History** — Per-user log of all past tokenization requests with original and sanitized output
- **Copy-to-Clipboard** — One-click copy for both original and tokenized outputs
- **Settings Page** — User preferences and account management
- **Cybersecurity-Themed UI** — Dark, terminal-inspired aesthetic built with TailwindCSS

### ⚡ Infrastructure
- **Redis (Upstash)** — Ultra-fast token caching and rate limiting layer
- **PostgreSQL (Supabase)** — Durable, relational storage for users, history, and encrypted token mappings
- **Prisma ORM** — Type-safe database access with automatic migrations
- **Vite + React** — Blazing-fast frontend with TypeScript for type safety end-to-end

---

## 📸 Screenshots

> *Screenshots of the live application*

### 🏠 Landing Page
![Landing Page](./screenshots/landing.png)
*Privacy-first hero section with live code preview demonstrating the tokenization API*

### 🔐 Authentication — Sign Up
![Sign Up](./screenshots/signup.png)
*Clean, dark-themed authentication flow powered by Supabase*

### 🧪 Interactive PII Detection Demo
![Demo](./screenshots/demo.png)
*Real-time PII detection: input text on the left, tokenized output on the right with labeled detections*

### 📜 Tokenization History
![History](./screenshots/history.png)
*Per-user audit trail of all tokenization requests with timestamps and copy functionality*

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI framework |
| **Vite** | Lightning-fast build tool and dev server |
| **TypeScript** | Static typing for maintainability |
| **TailwindCSS** | Utility-first CSS framework |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the API server |
| **Express** | Minimal, flexible HTTP framework |
| **TypeScript** | Type-safe server-side code |

### Database & Storage
| Technology | Purpose |
|---|---|
| **PostgreSQL (Supabase)** | Primary relational database |
| **Prisma ORM** | Type-safe database client & migration tool |
| **Redis (Upstash)** | Token cache, session store, rate limiting |

### Auth & Security
| Technology | Purpose |
|---|---|
| **Supabase Auth** | User authentication & session management |
| **JWT** | Stateless API authorization |
| **AES Encryption** | Encrypting PII-token mappings at rest |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│              React + Vite + TypeScript + TailwindCSS            │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTPS Requests (JWT in Header)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXPRESS API SERVER                          │
│                   Node.js + TypeScript                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Auth Routes │  │  PII Routes  │  │   History Routes     │  │
│  │  /auth/*     │  │  /api/pii/*  │  │   /api/history/*     │  │
│  └──────────────┘  └──────┬───────┘  └──────────────────────┘  │
│                           │                                     │
│                  ┌────────▼────────┐                            │
│                  │  PII Detection  │                            │
│                  │    Engine       │                            │
│                  │  (Regex + NLP)  │                            │
│                  └────────┬────────┘                            │
│                           │                                     │
│                  ┌────────▼────────┐                            │
│                  │  Tokenization   │                            │
│                  │    Service      │                            │
│                  │  (AES Encrypt)  │                            │
│                  └────────┬────────┘                            │
└───────────────────────────┼─────────────────────────────────────┘
                            │
          ┌─────────────────┼──────────────────┐
          ▼                 ▼                  ▼
┌─────────────────┐ ┌──────────────┐ ┌────────────────┐
│   PostgreSQL    │ │    Redis     │ │  Supabase Auth │
│   (Supabase)   │ │  (Upstash)   │ │                │
│                 │ │              │ │  - JWT Tokens  │
│  - Users        │ │  - Token     │ │  - Sessions    │
│  - History      │ │    Cache     │ │  - Email Flow  │
│  - Encrypted    │ │  - Rate      │ └────────────────┘
│    Mappings     │ │    Limiting  │
└─────────────────┘ └──────────────┘
```

### Privacy-First Data Flow

```
User Input ──► PII Detection ──► Tokenization ──► Encrypted Storage
                                      │
                                      ▼
                              Sanitized Output ──► Safe for LLM ✅
```

---

## 📁 Folder Structure

```
piiguard-ai/
├── frontend/                     # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Static assets
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ...
│   │   ├── pages/                # Route-level page components
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Demo.tsx
│   │   │   ├── History.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── lib/                  # Supabase client, API helpers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.local
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                      # Express API server
│   ├── src/
│   │   ├── routes/               # Express route handlers
│   │   │   ├── auth.ts
│   │   │   ├── pii.ts
│   │   │   └── history.ts
│   │   ├── services/             # Core business logic
│   │   │   ├── piiDetector.ts    # PII detection engine
│   │   │   ├── tokenizer.ts      # Tokenization service
│   │   │   ├── encryption.ts     # AES encrypt/decrypt
│   │   │   └── redis.ts          # Upstash Redis client
│   │   ├── middleware/           # Auth & validation middleware
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorHandler.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma     # Database schema
│   │   └── index.ts              # Server entry point
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Installation Guide

### Prerequisites

Ensure you have the following installed:

- **Node.js** `>= 18.x`
- **npm** or **yarn**
- **PostgreSQL** database (or a [Supabase](https://supabase.com) project)
- **Redis** instance (or an [Upstash](https://upstash.com) Redis database)

---

### 1. Clone the Repository

```bash
git clone https://github.com/sarthakpolshettiwar/piiguard-ai.git
cd piiguard-ai
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

---

### 3. Backend Setup

```bash
cd ../backend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

---

### 4. Prisma Migration

Run database migrations to set up all tables:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

To view your database in Prisma Studio:

```bash
npx prisma studio
```

---

### 5. Redis Setup (Upstash)

1. Create a free account at [upstash.com](https://upstash.com)
2. Create a new **Redis** database
3. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the dashboard
4. Paste them into your backend `.env` file

---

## 🔧 Environment Variables

### Frontend (`frontend/.env.local`)

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend API
VITE_API_URL=http://localhost:3001
```

### Backend (`backend/.env`)

```env
# PostgreSQL via Supabase
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

# Security
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
SECRET_KEY=your-aes-encryption-key-32-chars
```

> ⚠️ **Never commit `.env` files to version control.** All secrets must be kept out of your repository.

---

## ▶️ Running Locally

### Start the Backend Server

```bash
cd backend
npm run dev
```

The API server will start at `http://localhost:3001`

### Start the Frontend Dev Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build for Production

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build && npm start
```

---

## 🔑 Authentication Flow

PIIGuard AI uses **Supabase Auth** for identity management with JWT-based API protection.

```
┌──────────┐     1. Sign Up / Login      ┌──────────────┐
│  Client  │ ──────────────────────────► │  Supabase    │
│          │ ◄────────────────────────── │  Auth        │
└──────────┘     2. JWT Access Token     └──────────────┘
     │
     │  3. API Request + Bearer Token
     ▼
┌──────────────────┐
│  Express Backend │  ──► Validates JWT ──► Processes Request
└──────────────────┘
```

### Supported Auth Actions

| Action | Endpoint | Description |
|---|---|---|
| Sign Up | `/auth/signup` | Register with email + password |
| Sign In | `/auth/signin` | Login and receive JWT |
| Sign Out | `/auth/signout` | Invalidate current session |
| Forgot Password | `/auth/forgot-password` | Send password reset email |
| Reset Password | `/auth/reset-password` | Set new password via reset link |

### Protected Routes (Frontend)

All dashboard routes are wrapped with a `<ProtectedRoute />` component that validates the active Supabase session. Unauthenticated users are automatically redirected to `/login`.

```tsx
<Route
  path="/demo"
  element={
    <ProtectedRoute>
      <Demo />
    </ProtectedRoute>
  }
/>
```

---

## 🔄 Tokenization Workflow

This is the core of PIIGuard AI — a multi-step security pipeline that sanitizes any text before it can reach an LLM.

```
Step 1: User Submits Prompt
─────────────────────────────────────────────────────
  Input: "Please contact john@acme.com or call 555-123-4567"


Step 2: PII Detection Engine Scans Input
─────────────────────────────────────────────────────
  Detected:
  ├── EMAIL  → john@acme.com
  └── PHONE  → 555-123-4567


Step 3: Tokenization — PII Replaced with Secure Tokens
─────────────────────────────────────────────────────
  Mapping:
  ├── [TOKEN_EMAIL_a1b2c3] → john@acme.com
  └── [TOKEN_PHONE_d4e5f6] → 555-123-4567


Step 4: Encrypted Mapping Stored Securely
─────────────────────────────────────────────────────
  ├── Redis  → Token cache (fast lookup, TTL-based)
  └── PostgreSQL → Encrypted persistent mapping


Step 5: Sanitized Prompt Returned to Client
─────────────────────────────────────────────────────
  Output: "Please contact [TOKEN_EMAIL_a1b2c3] or call [TOKEN_PHONE_d4e5f6]"


Step 6: History Record Saved
─────────────────────────────────────────────────────
  Stored: { userId, originalPrompt, tokenizedOutput, detections, timestamp }


Step 7: Safe AI Workflow Maintained ✅
─────────────────────────────────────────────────────
  → Sanitized prompt is now safe to pass to any LLM API
```

### Supported PII Types

| Type | Example | Token Format |
|---|---|---|
| Email Address | `john@acme.com` | `[TOKEN_EMAIL_xxxxx]` |
| Phone Number | `555-123-4567` | `[TOKEN_PHONE_xxxxx]` |
| Social Security Number | `123-45-6789` | `[TOKEN_SSN_xxxxx]` |
| Credit Card | `4111 1111 1111 1111` | `[TOKEN_CC_xxxxx]` |
| Full Name | `John Doe` | `[TOKEN_NAME_xxxxx]` |
| IP Address | `192.168.1.1` | `[TOKEN_IP_xxxxx]` |
| Date of Birth | `01/15/1990` | `[TOKEN_DOB_xxxxx]` |

---

## 📜 History Feature

Every authenticated user has a personal **Tokenization History** — a full audit trail of all tokenization requests.

### What Gets Stored

```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "originalPrompt": "Contact john@acme.com or call 555-123-4567",
  "tokenizedOutput": "Contact [TOKEN_EMAIL_z42n9w] or call [TOKEN_PHONE_kfmlle]",
  "detections": [
    { "type": "email", "value": "john@acme.com" },
    { "type": "phone", "value": "555-123-4567" }
  ],
  "createdAt": "2026-05-08T17:24:44.000Z"
}
```

### Features

- 📋 **Side-by-side view** — Original prompt alongside tokenized output
- 📅 **Timestamp** — Exact date and time of each request
- 📋 **Copy button** — One-click clipboard copy for both versions
- 🔒 **User-scoped** — Each user only sees their own history

---

## 🔒 Security Features

PIIGuard AI is built with a **security-first** mindset at every layer of the stack.

### Encryption at Rest
All PII-to-token mappings are encrypted using **AES (Advanced Encryption Standard)** before being written to the database. The encryption key is stored as an environment variable and never hardcoded.

### JWT Authentication
Every API request to the Express backend must include a valid **Bearer token** in the `Authorization` header. Tokens are issued by Supabase and validated server-side on each request.

### Input Validation & Sanitization
All incoming request bodies are validated and sanitized before processing, preventing injection attacks and malformed data from reaching the detection engine.

### Rate Limiting via Redis
Upstash Redis is used to enforce **per-user rate limits**, preventing abuse and brute-force attacks on the tokenization endpoint.

### Protected Routes
The frontend enforces route-level authentication. Any attempt to access `/demo`, `/history`, or `/settings` without a valid session results in an immediate redirect to `/login`.

### Zero Plaintext Storage
The system is designed so that **no PII is ever stored in plaintext**. Original prompts in history are stored for audit purposes under the user's own account but the sensitive tokens are always encrypted.

---

## 📡 API Overview

Base URL: `http://localhost:3001`

### Authentication

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | ❌ | Register a new user |
| `POST` | `/auth/signin` | ❌ | Sign in and receive JWT |
| `POST` | `/auth/signout` | ✅ | Sign out current user |
| `POST` | `/auth/forgot-password` | ❌ | Trigger password reset email |

### PII Tokenization

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/pii/tokenize` | ✅ | Tokenize PII in submitted text |
| `POST` | `/api/pii/detect` | ✅ | Detect PII without tokenizing |

### History

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/history` | ✅ | Get all history for current user |
| `DELETE` | `/api/history/:id` | ✅ | Delete a specific history record |

### Request / Response Example

**`POST /api/pii/tokenize`**

```json
// Request Body
{
  "text": "Contact john.doe@acme.com or call 555-123-4567 for support."
}

// Response
{
  "tokenizedText": "Contact [TOKEN_EMAIL_u5pz7j] or call [TOKEN_PHONE_yiwak1] for support.",
  "detections": [
    { "type": "email", "original": "john.doe@acme.com", "token": "TOKEN_EMAIL_u5pz7j" },
    { "type": "phone", "original": "555-123-4567", "token": "TOKEN_PHONE_yiwak1" }
  ],
  "detectionCount": 2
}
```

---

## 🔮 Future Improvements

| Feature | Priority | Description |
|---|---|---|
| 🤖 **LLM Proxy Mode** | High | Act as a transparent proxy to OpenAI/Anthropic APIs |
| 🔁 **De-tokenization API** | High | Reverse tokens back to original PII for authorized users |
| 📊 **Analytics Dashboard** | Medium | Charts and insights on PII detection trends |
| 🌍 **Internationalization** | Medium | Support for non-English PII patterns |
| 🔌 **SDK / npm Package** | High | `npm install piiguard` for easy integration |
| 📧 **Webhook Alerts** | Medium | Notify teams when high-risk PII is detected |
| 🏢 **Team / Org Accounts** | High | Multi-user workspaces with role-based access |
| 📋 **Compliance Reports** | Medium | Auto-generate GDPR/HIPAA compliance reports |
| 🧠 **ML-Based Detection** | High | Replace regex with fine-tuned NLP model for higher accuracy |

---

## 🚢 Deployment

### Frontend → Vercel

1. Push the `frontend/` directory to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Set the **root directory** to `frontend`
4. Add all `VITE_*` environment variables in the Vercel dashboard
5. Deploy — Vercel auto-detects Vite and builds correctly

```bash
# Or deploy via CLI
npm i -g vercel
cd frontend && vercel --prod
```

### Backend → Railway or Render

**Railway:**
1. Connect your GitHub repo at [railway.app](https://railway.app)
2. Set the root to `backend/`
3. Set the start command: `npm run build && npm start`
4. Add all backend environment variables
5. Deploy

**Render:**
1. Create a new **Web Service** at [render.com](https://render.com)
2. Connect your GitHub repo
3. Build command: `cd backend && npm install && npm run build`
4. Start command: `cd backend && npm start`
5. Add environment variables

### Database → Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Navigate to **Settings → Database** and copy the `DATABASE_URL`
3. Run `npx prisma migrate deploy` to apply migrations to production
4. Enable **Email Auth** under Authentication settings

### Cache → Upstash Redis

1. Create an account at [upstash.com](https://upstash.com)
2. Create a new **Redis** database (select the region closest to your backend)
3. Copy the `REST URL` and `REST Token`
4. Add them to your production environment variables

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear, descriptive commits
4. Ensure all existing functionality still works
5. Open a **Pull Request** with a clear description of your changes

### Code Standards

- All code must be written in **TypeScript**
- Follow existing naming conventions and file structure
- Keep components small and focused (single responsibility)
- Add comments for complex business logic

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Sarthak Polshettiwar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

See [LICENSE](./LICENSE) for the full license text.

---

## 👨‍💻 Author

<div align="center">

### Sarthak Polshettiwar

*Full-Stack Developer | Security Enthusiast | Open Source Contributor*

[![GitHub](https://img.shields.io/badge/GitHub-@sarthakpolshettiwar-181717?style=for-the-badge&logo=github)](https://github.com/sarthakpolshettiwar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sarthak_Polshettiwar-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sarthakpolshettiwar)

</div>

---

<div align="center">

**Built with 🛡️ and ❤️ to protect privacy in the age of AI.**

*If this project helped you, consider giving it a ⭐ on GitHub!*

</div>
