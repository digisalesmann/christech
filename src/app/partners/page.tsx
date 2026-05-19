'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { ArrowRight, CheckCircle, TrendingUp, Globe, Users, Zap, Send } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const benefits = [
  { icon: TrendingUp, title: 'Revenue Share', description: 'Earn competitive commission on every sale driven through your partnership. Tiered rates that grow with your volume.' },
  { icon: Globe, title: 'Global Reach', description: 'Tap into ChrisTech\'s 180+ country distribution network and 10 million active customer base immediately.' },
  { icon: Users, title: 'Dedicated Support', description: 'A dedicated partner success manager to help you maximize results, optimize campaigns, and resolve issues fast.' },
  { icon: Zap, title: 'Co-Marketing', description: 'Joint marketing campaigns, co-branded promotions, featured placement in newsletters and social channels.' },
]

const tiers = [
  {
    name: 'Affiliate',
    commission: '3-5%',
    features: ['Partner dashboard access', 'Real-time analytics', 'Custom tracking links', 'Monthly payouts', 'Standard support'],
    ideal: 'Content creators, bloggers, review sites',
    primary: false,
  },
  {
    name: 'Reseller',
    commission: '8-12%',
    features: ['Everything in Affiliate', 'Custom pricing for clients', 'White-label options', 'Priority support', 'Bi-weekly payouts', 'Co-branded marketing'],
    ideal: 'Retailers, distributors, IT consultants',
    primary: true,
  },
  {
    name: 'Strategic',
    commission: 'Custom',
    features: ['Everything in Reseller', 'API integration', 'Dedicated account manager', 'Joint go-to-market', 'Daily payouts available', 'Bespoke SLAs'],
    ideal: 'Enterprise, large retailers, platforms',
    primary: false,
  },
]

export default function PartnersPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', website: '', type: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Partner Program"
        title="Grow Together with ChrisTech"
        description="Join 2,000+ partners globally who earn revenue by connecting customers to the world's finest technology."
        gradient
      />

      {/* Partner stats */}
      <section className="py-12 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { value: '200+', label: 'Active Partners' },
              { value: '₦76B+', label: 'Partner Earnings (2024)' },
              { value: '36', label: 'States Reached' },
              { value: '12%', label: 'Max Commission Rate' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-8 text-center">
                <div className="text-3xl font-black text-white tracking-tighter mb-1">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Why Partner With Us</p>
            <h2 className="section-heading">Partner Benefits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-600/20 transition-colors">
                  <b.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Partnership Tiers</p>
            <h2 className="section-heading">Choose Your Level</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 border flex flex-col ${
                  tier.primary
                    ? 'border-emerald-500/40 bg-emerald-600/10'
                    : 'border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                {tier.primary && (
                  <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-3 py-1 w-fit mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-black text-white tracking-tight mb-1">{tier.name}</h3>
                <div className="text-3xl font-black text-emerald-400 tracking-tighter mb-1">{tier.commission}</div>
                <p className="text-xs text-slate-500 mb-6">Commission rate</p>
                <p className="text-xs font-semibold text-slate-400 mb-5">Ideal for: <span className="text-slate-300">{tier.ideal}</span></p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={tier.primary ? 'btn-primary justify-center py-3.5 rounded-xl' : 'btn-secondary justify-center py-3.5 rounded-xl'}>
                  Apply for {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="section-label mb-3">Apply Now</p>
              <h2 className="text-3xl font-black tracking-tighter text-white">Become a Partner</h2>
              <p className="text-slate-400 mt-3">Complete the form and our partner team will respond within 1 business day.</p>
            </div>
            {sent ? (
              <div className="text-center py-16 border border-emerald-500/20 rounded-2xl bg-emerald-600/5">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Application Received</h3>
                <p className="text-slate-400">Our partner team will reach out to {form.email} within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                setError('')
                try {
                  await addDoc(collection(db, 'partner_applications'), {
                    ...form,
                    createdAt: serverTimestamp(),
                  })
                  setSent(true)
                } catch {
                  setError('Failed to submit. Please try again.')
                } finally {
                  setLoading(false)
                }
              }} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Your Name</label>
                    <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Company Name</label>
                    <input type="text" required value={form.company} onChange={(e) => update('company', e.target.value)} className="input-field" placeholder="Acme Corp" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Business Email</label>
                    <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Website</label>
                    <input type="url" value={form.website} onChange={(e) => update('website', e.target.value)} className="input-field" placeholder="https://example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Partnership Type</label>
                  <select required value={form.type} onChange={(e) => update('type', e.target.value)} className="input-field appearance-none">
                    <option value="" className="bg-navy-800">Select a tier</option>
                    <option value="affiliate" className="bg-navy-800">Affiliate</option>
                    <option value="reseller" className="bg-navy-800">Reseller</option>
                    <option value="strategic" className="bg-navy-800">Strategic</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Tell Us About Your Business</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} className="input-field resize-none" placeholder="Describe your audience, reach, and why you want to partner with ChrisTech..." />
                </div>
                {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/25 disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  {loading ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
