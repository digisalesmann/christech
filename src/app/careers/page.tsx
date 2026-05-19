import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { ArrowRight, MapPin, Clock, Zap, Globe, Users, TrendingUp, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers at ChrisTech',
  description: 'Join the team building the world\'s premier technology marketplace. Open roles across engineering, design, product, and operations.',
}

const perks = [
  { icon: Globe, title: 'Work from Anywhere', description: 'Fully remote-first culture with flexible hours across all time zones.' },
  { icon: TrendingUp, title: 'Equity & Growth', description: 'Competitive salary, meaningful equity, and clear career progression frameworks.' },
  { icon: Heart, title: 'Premium Benefits', description: 'HMO cover plus ₦3,200,000 annual wellness budget.' },
  { icon: Zap, title: 'Latest Technology', description: '₦8,000,000 equipment budget to build your ideal home or studio setup.' },
  { icon: Users, title: 'World-Class Team', description: 'Colleagues from Google, Apple, Amazon, and the world\'s top universities.' },
  { icon: MapPin, title: 'Annual Retreats', description: 'Full-company offsites twice a year in world-class destinations.' },
]

const openRoles = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', location: 'Remote (Global)', type: 'Full-time', level: 'Senior' },
  { title: 'Staff Product Designer', dept: 'Design', location: 'Remote (Global)', type: 'Full-time', level: 'Staff' },
  { title: 'Director of Product', dept: 'Product', location: 'Owerri / Remote', type: 'Full-time', level: 'Director' },
  { title: 'Logistics Operations Manager', dept: 'Operations', location: 'Singapore / Dubai', type: 'Full-time', level: 'Manager' },
  { title: 'Brand Partnerships Lead', dept: 'Business Development', location: 'Remote (EMEA)', type: 'Full-time', level: 'Lead' },
  { title: 'Customer Experience Specialist', dept: 'Support', location: 'Remote (Global)', type: 'Full-time', level: 'Mid' },
  { title: 'Data Engineer', dept: 'Engineering', location: 'Remote (Global)', type: 'Full-time', level: 'Mid-Senior' },
  { title: 'Content & SEO Strategist', dept: 'Marketing', location: 'Remote (Global)', type: 'Full-time', level: 'Mid' },
]

const deptColors: Record<string, string> = {
  Engineering: 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20',
  Design: 'text-purple-400 bg-purple-600/10 border-purple-500/20',
  Product: 'text-cyan-400 bg-cyan-600/10 border-cyan-500/20',
  Operations: 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20',
  'Business Development': 'text-amber-400 bg-amber-600/10 border-amber-500/20',
  Support: 'text-pink-400 bg-pink-600/10 border-pink-500/20',
  Marketing: 'text-orange-400 bg-orange-600/10 border-orange-500/20',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Join ChrisTech"
        title="Build the Future of Global Commerce"
        description="We're a team of builders, designers, and technologists on a mission to make the world's finest technology accessible to everyone."
        gradient
      />

      {/* Culture banner */}
      <section className="py-16 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="grid grid-cols-3 divide-x divide-white/[0.06] text-center">
            {[
              { value: 'Growing', label: 'Team' },
              { value: 'Nigeria', label: 'Headquartered' },
              { value: '100%', label: 'Remote-Friendly' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-6">
                <div className="text-4xl font-black text-white tracking-tighter mb-1">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Why ChrisTech</p>
            <h2 className="section-heading">Benefits & Culture</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk) => (
              <div key={perk.title} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-600/20 transition-colors">
                  <perk.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">{perk.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="section-label mb-3">Now Hiring</p>
              <h2 className="text-3xl font-black tracking-tighter text-white">
                Open Positions <span className="text-slate-500 font-normal">({openRoles.length})</span>
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-600/5 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-widest uppercase border ${deptColors[role.dept] ?? 'text-slate-400 bg-white/[0.04] border-white/[0.1]'} w-fit`}>
                    {role.dept}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{role.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />{role.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />{role.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-slate-500 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03]">{role.level}</span>
                  <a href={`mailto:careers@christech.com.ng?subject=Application: ${role.title}`} className="btn-primary py-2.5 px-5 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0">
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm mb-4">Don&apos;t see your role? We&apos;re always looking for exceptional people.</p>
            <Link href="/contact" className="btn-secondary px-8 py-3.5 rounded-full">
              Send a Speculative Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
