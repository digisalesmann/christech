'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import { Mail, Phone, MessageCircle, MapPin, Clock, CheckCircle, Send } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const contactMethods = [
  {
    icon: MessageCircle,
    label: 'Live Chat',
    description: 'Instant answers from our support team',
    detail: 'Available 24 / 7',
    action: 'Start Chat',
    color: 'blue',
  },
  {
    icon: Mail,
    label: 'Email Support',
    description: 'Detailed responses within 2 hours',
    detail: 'support@christech.com.ng',
    action: 'Send Email',
    color: 'purple',
  },
  {
    icon: Phone,
    label: 'Phone Support',
    description: 'Speak with a certified specialist',
    detail: '+234 (0) 803 000 2025',
    action: 'Call Now',
    color: 'emerald',
  },
]

const subjects = [
  'Order Inquiry',
  'Return or Exchange',
  'Technical Support',
  'Warranty Claim',
  'Shipping Issue',
  'Product Question',
  'Billing Issue',
  'Partnership',
  'Press Inquiry',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', orderId: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await addDoc(collection(db, 'contact_submissions'), {
        ...form,
        createdAt: serverTimestamp(),
      })
      setSent(true)
    } catch {
      setError('Failed to send message. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Get in Touch"
        title="We're Here to Help"
        description="Our team of certified technology specialists is available around the clock. Choose the support channel that works best for you."
        gradient
      />

      {/* Contact methods */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactMethods.map((method) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400',
                purple: 'bg-purple-600/10 border-purple-500/20 text-purple-400',
                emerald: 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400',
              }
              const btnMap: Record<string, string> = {
                blue: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25',
                purple: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/25',
                emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25',
              }
              return (
                <div key={method.label} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${colorMap[method.color]}`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{method.label}</h3>
                  <p className="text-sm text-slate-400 mb-2 leading-relaxed">{method.description}</p>
                  <p className="text-sm font-semibold text-white mb-6">{method.detail}</p>
                  <button className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 ${btnMap[method.color]}`}>
                    {method.action}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
            {/* Form */}
            <div>
              <p className="section-label mb-3">Send a Message</p>
              <h2 className="text-3xl font-black tracking-tighter text-white mb-8">Contact Form</h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-emerald-500/20 rounded-2xl bg-emerald-600/5">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mb-5" />
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Message Received</h3>
                  <p className="text-slate-400 max-w-sm">
                    Thank you, {form.name}. Our team will respond to <span className="text-white">{form.email}</span> within 2 hours.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '', orderId: '' }) }} className="btn-ghost mt-6">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Full Name</label>
                      <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Smith" className="input-field" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Email Address</label>
                      <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="john@example.com" className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Subject</label>
                      <select value={form.subject} onChange={(e) => update('subject', e.target.value)} required className="input-field appearance-none">
                        <option value="" className="bg-navy-800">Select a subject</option>
                        {subjects.map((s) => <option key={s} value={s} className="bg-navy-800">{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">
                        Order ID <span className="text-slate-600 font-normal">(optional)</span>
                      </label>
                      <input type="text" value={form.orderId} onChange={(e) => update('orderId', e.target.value)} placeholder="CT-XXXXXXXX" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Describe your issue or question in detail..."
                      rows={6}
                      className="input-field resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
                  )}
                  <button type="submit" disabled={loading} className="btn-primary px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/25 disabled:opacity-50">
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              {/* Response times */}
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Response Times</h3>
                </div>
                {[
                  { method: 'Live Chat', time: '< 2 minutes' },
                  { method: 'Email', time: '< 2 hours' },
                  { method: 'Phone', time: 'Immediate' },
                  { method: 'Contact Form', time: '< 4 hours' },
                ].map((r) => (
                  <div key={r.method} className="flex justify-between py-3 border-b border-white/[0.06] last:border-0">
                    <span className="text-sm text-slate-400">{r.method}</span>
                    <span className="text-sm font-semibold text-emerald-400">{r.time}</span>
                  </div>
                ))}
              </div>

              {/* Offices */}
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-5">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Our Location</h3>
                </div>
                {[
                  { city: 'Owerri', addr: '87 Tetlow Rd, Owerri 460241, Imo', role: 'Headquarters' },
                  { city: 'Lagos', addr: 'Victoria Island (by appointment)', role: 'Lagos Office' },
                  { city: 'Abuja', addr: 'Central Business District (coming soon)', role: 'FCT Office' },
                ].map((o) => (
                  <div key={o.city} className="mb-5 last:mb-0">
                    <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-1">{o.role}</p>
                    <p className="text-sm font-semibold text-white">{o.city}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{o.addr}</p>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-600/5">
                <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-2">Support Hours</p>
                <p className="text-2xl font-black text-white tracking-tight">24 / 7</p>
                <p className="text-sm text-slate-400 mt-1">Live chat and phone support available every day, including holidays.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
