'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      setError(
        code === 'auth/user-not-found' || code === 'auth/invalid-email'
          ? 'No account found with that email address.'
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-navy-900">

      {/* ── Left, Brand panel ── */}
      <div className="relative hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between px-12 pb-12 pt-24 overflow-hidden bg-navy-950">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label mb-4">Account Recovery</p>
          <h2 className="text-4xl xl:text-5xl font-black tracking-tighter text-white leading-[0.97] mb-6">
            Locked out?<br />
            <span className="text-gradient">We&apos;ve got you.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Enter your email address and we&apos;ll send you a link to reset your password in seconds.
          </p>
        </motion.div>

        <div className="pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-slate-600">
            Need help?{' '}
            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Contact support
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right, Form panel ── */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 pt-16">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 lg:hidden">
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            ← Home
          </Link>
          <Link href="/login" className="text-sm font-semibold text-emerald-400">Sign in</Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-3">Check your inbox</h1>
                <p className="text-slate-400 mb-2">
                  We sent a reset link to
                </p>
                <p className="text-white font-semibold mb-10">{email}</p>
                <Link href="/login" className="btn-primary py-3.5 px-10 rounded-2xl justify-center">
                  Back to Sign In
                </Link>
                <p className="mt-6 text-sm text-slate-600">
                  Didn&apos;t receive it?{' '}
                  <button onClick={() => setSent(false)} className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                    Try again
                  </button>
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-6">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Sign In
                  </Link>
                  <h1 className="text-3xl font-black text-white tracking-tight mb-2">Reset password</h1>
                  <p className="text-slate-400">Enter your email to receive a reset link</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 rounded-2xl justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
                  >
                    {loading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
