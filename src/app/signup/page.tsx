'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, AlertCircle, Zap, Gift, HeadphonesIcon } from 'lucide-react'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const benefits = [
  { icon: Zap, text: 'Early access to new arrivals & drops' },
  { icon: Gift, text: 'Exclusive member-only deals' },
  { icon: HeadphonesIcon, text: 'Priority customer support' },
]

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length
  const levels = ['Weak', 'Fair', 'Good', 'Strong']
  const colors = ['bg-red-500', 'bg-amber-500', 'bg-yellow-400', 'bg-emerald-500']
  const textColors = ['text-red-400', 'text-amber-400', 'text-yellow-400', 'text-emerald-400']
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < score ? colors[score - 1] : 'bg-white/[0.08]'}`} />
        ))}
      </div>
      <p className={`text-xs font-medium ${textColors[score - 1] ?? 'text-slate-600'}`}>
        {levels[score - 1] ?? 'Too short'}
      </p>
    </div>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const friendlyError = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use': return 'An account with this email already exists.'
      case 'auth/weak-password': return 'Password must be at least 6 characters.'
      case 'auth/invalid-email': return 'Please enter a valid email address.'
      case 'auth/operation-not-allowed': return 'Email/Password sign-in is not enabled. Please contact support.'
      case 'auth/network-request-failed': return 'Network error. Check your connection and try again.'
      default: return `Something went wrong (${code || 'unknown'}). Please try again.`
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: name })
      router.push('/account')
    } catch (err: unknown) {
      setError(friendlyError((err as { code?: string }).code ?? ''))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/account')
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      if (code !== 'auth/popup-closed-by-user') setError(friendlyError(code))
    } finally {
      setGoogleLoading(false)
    }
  }

  const passwordsMatch = confirmPassword === '' || password === confirmPassword

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
          <p className="section-label mb-4">Join ChrisTech</p>
          <h2 className="text-4xl xl:text-5xl font-black tracking-tighter text-white leading-[0.97] mb-6">
            Shop smarter.<br />
            <span className="text-gradient">Live better.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-10 max-w-sm">
            Create a free account and unlock exclusive deals, fast checkout, order tracking, and more.
          </p>

          <div className="space-y-4">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center gap-8 pt-8 border-t border-white/[0.06]">
          {[['Free', 'Always'], ['Fast', 'Delivery'], ['Genuine', 'Products']].map(([val, label]) => (
            <div key={label}>
              <p className="text-xl font-black text-white">{val}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right, Form panel ── */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 lg:overflow-y-auto pt-16">
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
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create account</h1>
              <p className="text-slate-400">Join ChrisTech, it&apos;s free</p>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-200 text-sm font-semibold text-white mb-6 disabled:opacity-50"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {googleLoading ? 'Signing up…' : 'Continue with Google'}
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.08]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-navy-900 px-3 text-xs text-slate-500">or sign up with email</span>
              </div>
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

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Chris Obi"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">Email</label>
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

              {/* Phone (optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">
                  Phone <span className="normal-case font-normal text-slate-600">— optional, for delivery updates</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Min. 6 characters"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-2xl pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repeat your password"
                    className={`w-full bg-white/[0.05] border rounded-2xl pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:bg-white/[0.07] transition-all ${
                      !passwordsMatch
                        ? 'border-red-500/40 focus:border-red-500/60'
                        : 'border-white/[0.08] focus:border-emerald-500/60'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {!passwordsMatch && (
                  <p className="text-xs text-red-400 mt-1.5">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !passwordsMatch}
                className="btn-primary w-full py-3.5 rounded-2xl justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
              >
                {loading ? 'Creating account…' : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-600">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            </p>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Sign in
              </Link>
            </p>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
