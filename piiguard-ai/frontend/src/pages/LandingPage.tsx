import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Lock, Zap, BarChart3, Eye, Server, ArrowRight, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: Eye, title: 'PII Detection', desc: 'Detect emails, SSNs, credit cards, phone numbers, and IP addresses in real-time using advanced pattern matching.' },
  { icon: Lock, title: 'AES-256 Tokenization', desc: 'Replace sensitive data with secure tokens. Original data is encrypted with AES-256-CBC and stored in Redis.' },
  { icon: Shield, title: 'Threat Detection', desc: 'Block prompt injection, SQL injection, XSS attempts, and abnormal payloads before they reach your LLM.' },
  { icon: Zap, title: 'Sub-30ms Latency', desc: 'Optimized tokenization pipeline delivers enterprise-grade performance without slowing down your AI workflows.' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Monitor request volume, token events, threat alerts, and API health through a live WebSocket dashboard.' },
  { icon: Server, title: 'Production Ready', desc: 'JWT auth, rate limiting, Helmet security, CORS, Docker support, and deployment configs included.' },
]

const stats = [
  { label: 'Requests Processed', value: '284K+' },
  { label: 'PII Tokens Created', value: '47K+' },
  { label: 'Threats Blocked', value: '1.2K+' },
  { label: 'Uptime', value: '99.97%' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 grid-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-700/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">PIIGuard</span>
            <span className="text-lg font-light text-slate-400">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn-secondary text-sm">Try Demo</Link>
            <Link to="/login" className="btn-primary text-sm">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Privacy-First AI Infrastructure
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="text-white">Protect Your </span>
              <span className="text-gradient">AI Workflows</span>
              <br />
              <span className="text-white">From PII Leaks</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              PIIGuard AI detects and tokenizes personally identifiable information before it reaches your LLM.
              Enterprise-grade encryption, real-time monitoring, and zero-trust architecture — built for production.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/login" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
                Try Live Demo <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3">
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* Code preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 glass-card-static p-6 text-left max-w-3xl mx-auto font-mono text-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-xs text-slate-500 ml-3">piiguard-demo.ts</span>
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`// Send text containing PII through PIIGuard
const response = await fetch("/api/pii/tokenize", {
  method: "POST",
  body: JSON.stringify({
    text: "Contact john@acme.com or call 555-123-4567"
  })
});

// PII is replaced with secure tokens
{
  "tokenizedText": "Contact [TOKEN_EMAIL_a1b2c3] or call [TOKEN_PHONE_d4e5f6]",
  "detections": [
    { "type": "email", "confidence": 0.99 },
    { "type": "phone", "confidence": 0.97 }
  ]
}`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise Security Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to secure AI workflows at scale.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4 border border-cyan-500/20">
                  <feature.icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card-static p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your AI?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Start tokenizing PII in under 5 minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
                <CheckCircle2 size={18} /> Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3">
                View Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            <span className="text-sm text-slate-500">© 2026 PIIGuard AI. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
