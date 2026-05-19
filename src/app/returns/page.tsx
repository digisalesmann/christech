import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import Accordion from '@/components/ui/Accordion'
import { PackageCheck, Truck, RefreshCw, Clock, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
  description: 'ChrisTech offers free 30-day returns on all products with no questions asked. Learn how to start your return.',
}

const steps = [
  { icon: PackageCheck, step: '01', title: 'Initiate Your Return', description: 'Log in to your account, navigate to your order, and click "Start Return". Select the items and reason. Takes under 60 seconds.' },
  { icon: Truck, step: '02', title: 'Ship It Back for Free', description: 'Download your prepaid return label and drop your package at any authorized carrier location, at no cost to you.' },
  { icon: RefreshCw, step: '03', title: 'We Process It', description: 'Once we receive your return, our team inspects and processes it within 1–2 business days.' },
  { icon: Clock, step: '04', title: 'Refund Issued', description: 'Your refund is issued to your original payment method within 3–5 business days of processing.' },
]

const eligible = [
  'Unused products in original packaging',
  'Items returned within 30 days of delivery',
  'Products with all original accessories included',
  'Items that are not damaged by the customer',
  'Software that has not been activated or registered',
]

const ineligible = [
  'Items returned after 30 days from delivery date',
  'Products with missing original packaging or accessories',
  'Customer-damaged items',
  'Opened software, digital downloads, or gift cards',
  'Products with removed or tampered serial number labels',
  'Hygiene products (earbuds, earphones) once opened',
]

const faqs = [
  {
    question: 'How long do I have to return an item?',
    answer: 'All products on ChrisTech are eligible for return within 30 days of the delivery date. After 30 days, items are no longer eligible for return unless there is a manufacturing defect covered under warranty.',
  },
  {
    question: 'Is return shipping free?',
    answer: 'Yes. ChrisTech provides a free prepaid return shipping label for all eligible returns. There are no return shipping charges under any circumstances.',
  },
  {
    question: 'How long does it take to receive my refund?',
    answer: 'Once we receive and inspect your return (1–2 business days), we issue the refund immediately. Your bank or payment provider typically takes 3–5 business days to reflect the credit.',
  },
  {
    question: 'Can I exchange instead of returning?',
    answer: 'Yes. When initiating a return, you can select "Exchange" and choose a replacement product. Exchanges are processed at the same price. If the replacement costs more, you\'ll pay the difference; if less, the difference is refunded.',
  },
  {
    question: 'What if my item arrived damaged or defective?',
    answer: 'Contact us within 72 hours of delivery. We\'ll arrange an immediate replacement or full refund at no cost, and we\'ll also organize a free pickup of the damaged item. You won\'t need to ship it back yourself.',
  },
  {
    question: 'Can I return an item bought as a gift?',
    answer: 'Yes. Gift returns can be processed for store credit without notifying the original purchaser. The refund will be issued as ChrisTech credit to your account.',
  },
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Returns & Exchanges"
        title="30-Day Free Returns. No Questions Asked."
        description="Not satisfied with your purchase? Return any product within 30 days for a full refund. Return shipping is always free."
        gradient
      />

      {/* Key promise */}
      <section className="py-12 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { value: '30 Days', label: 'Return Window', sub: 'From date of delivery' },
              { value: '₦0', label: 'Return Shipping', sub: 'Free prepaid label' },
              { value: '1–2 Days', label: 'Processing Time', sub: 'Once received' },
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

      {/* How it works */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">The Process</p>
            <h2 className="section-heading">How Returns Work</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs font-black tracking-widest text-emerald-400 mb-2">{step.step}</div>
                <h3 className="text-base font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-navy-900 border border-white/[0.06] rounded-full items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/account" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
              Start a Return
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Return Policy</p>
            <h2 className="section-heading">What Can Be Returned</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligible.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-base font-bold text-white">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {ineligible.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Common Questions</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Return FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm mb-4">Still have questions about your return?</p>
            <Link href="/contact" className="btn-secondary px-8 py-3.5 rounded-full">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
