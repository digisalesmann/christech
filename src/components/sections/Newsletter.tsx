'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={ref} className="py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(22, 163, 74, 0.08) 0%, transparent 60%)' }} />

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4">Stay Ahead</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
              The Latest in Technology,
              <br />
              <span className="text-gradient">First in Your Inbox.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Subscribe for early access to new releases, exclusive deals, and expert technology insights.
              No spam. Unsubscribe anytime.
            </p>

            {!submitted ? (
              <>
                <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="input-field w-full py-4 pl-6 pr-36 text-base rounded-full"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-primary py-2.5 px-5 rounded-full whitespace-nowrap shadow-lg shadow-emerald-600/25 disabled:opacity-50 text-sm"
                  >
                    {loading ? 'Subscribing…' : <><span>Subscribe</span><ArrowRight className="w-3.5 h-3.5" /></>}
                  </button>
                </form>
                {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-5"
              >
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <p className="text-white font-semibold text-lg">
                  You&apos;re subscribed. Welcome to ChrisTech.
                </p>
              </motion.div>
            )}

            <p className="text-xs text-slate-600 mt-6">
              Your privacy is respected. Read our{' '}
              <a href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
