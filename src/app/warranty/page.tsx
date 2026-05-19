import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import Accordion from '@/components/ui/Accordion'
import { Shield, Wrench, FileText, Phone, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Warranty',
  description: 'Every product on ChrisTech comes with a comprehensive 2-year warranty covering manufacturing defects and hardware failures.',
}

const covered = [
  'Manufacturing defects in materials and workmanship',
  'Hardware component failures under normal use',
  'Battery defects (capacity below 80% within warranty period)',
  'Display defects: dead pixels, backlight issues, discoloration',
  'Connectivity failures: Wi-Fi, Bluetooth, USB ports',
  'Speaker or microphone failures',
  'Sensor malfunctions: cameras, touch screens, biometrics',
  'Charging system failures under normal use',
]

const notCovered = [
  'Physical damage caused by drops, impacts, or mishandling',
  'Liquid or moisture damage',
  'Damage from unauthorized modifications or repairs',
  'Cosmetic damage: scratches, dents, broken plastic',
  'Consumable parts: cases, cables, screen protectors',
  'Products with tampered or missing serial numbers',
  'Issues caused by third-party software or accessories',
]

const claimSteps = [
  { icon: FileText, title: 'Submit a Claim', description: 'Log in to your account and navigate to your order. Click "Warranty Claim" and describe the issue with photos if applicable.' },
  { icon: Phone, title: 'Specialist Review', description: 'A certified technician reviews your claim within 24 hours and contacts you to confirm eligibility and next steps.' },
  { icon: Wrench, title: 'Repair or Replace', description: 'We repair the product at our service center or replace it with the same or equivalent model at no cost to you.' },
  { icon: Shield, title: 'Return to You', description: 'Repaired or replacement units are shipped back with express delivery within 5–7 business days from claim approval.' },
]

const faqs = [
  {
    question: 'How long is the warranty period?',
    answer: 'All products on ChrisTech include a 2-year warranty from the date of delivery. This covers manufacturing defects and hardware failures under normal use.',
  },
  {
    question: 'Do I need to register my product for warranty?',
    answer: 'No registration required. Your warranty is automatically tied to your ChrisTech order. Your purchase record serves as proof of warranty.',
  },
  {
    question: 'Is the warranty valid internationally?',
    answer: 'Yes. The ChrisTech warranty is honored nationwide. Some repairs may require the product to be shipped to our Owerri service centre.',
  },
  {
    question: 'How long does a warranty repair take?',
    answer: 'From claim approval, repairs typically take 5–10 business days including shipping. Replacements are usually dispatched within 3–5 business days.',
  },
  {
    question: 'Can I get an extended warranty?',
    answer: 'Yes. ChrisTech Extended Protection adds 2 additional years of coverage (4 years total) and includes accidental damage. It can be purchased within 60 days of your original purchase.',
  },
  {
    question: 'What if my product fails after the warranty period?',
    answer: 'Products out of warranty may still be eligible for paid repair services. Contact our support team for a quote. We partner with certified repair centers globally.',
  },
]

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Warranty"
        title="2-Year Warranty. Zero Fine Print."
        description="Every product on ChrisTech is backed by a comprehensive 2-year warranty covering manufacturing defects and hardware failures."
        gradient
      />

      {/* Key stats */}
      <section className="py-12 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { value: '2 Years', label: 'Standard Coverage', sub: 'All products' },
              { value: '4 Years', label: 'Extended Coverage', sub: 'With Extended Protection' },
              { value: '24h', label: 'Claim Review', sub: 'Specialist response' },
              { value: '100%', label: 'Cost Coverage', sub: 'Parts and labor' },
            ].map((s) => (
              <div key={s.label} className="px-8 py-8 text-center">
                <div className="text-3xl font-black text-white tracking-tighter mb-1">{s.value}</div>
                <div className="text-sm font-bold text-white mb-0.5">{s.label}</div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's covered */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Coverage Details</p>
            <h2 className="section-heading">What&apos;s Included</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div>
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Covered by Warranty
              </h3>
              <ul className="space-y-3">
                {covered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300 py-2 border-b border-white/[0.04]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Not Covered
              </h3>
              <ul className="space-y-3">
                {notCovered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400 py-2 border-b border-white/[0.04]">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claim process */}
      <section className="py-24 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Filing a Claim</p>
            <h2 className="section-heading">How to Claim Warranty</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {claimSteps.map((step, i) => (
              <div key={step.title} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs font-black text-emerald-400 tracking-widest mb-2">0{i + 1}</div>
                <h3 className="text-sm font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/account" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
              Submit a Warranty Claim
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Warranty FAQ</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Common Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  )
}
