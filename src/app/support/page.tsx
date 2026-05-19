'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import Accordion from '@/components/ui/Accordion'
import {
  Package,
  RotateCcw,
  Truck,
  CreditCard,
  Shield,
  User,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
} from 'lucide-react'

const categories = [
  {
    icon: Package,
    label: 'Orders',
    description: 'Track, modify, or cancel your orders',
    articles: 18,
    href: '/account',
  },
  {
    icon: RotateCcw,
    label: 'Returns & Refunds',
    description: 'Start a return or check refund status',
    articles: 12,
    href: '/returns',
  },
  {
    icon: Truck,
    label: 'Shipping & Delivery',
    description: 'Delivery timelines, tracking, and issues',
    articles: 15,
    href: '/contact',
  },
  {
    icon: CreditCard,
    label: 'Payments & Billing',
    description: 'Billing, invoices, and payment methods',
    articles: 9,
    href: '/contact',
  },
  {
    icon: Shield,
    label: 'Warranty & Repairs',
    description: 'Warranty claims and service requests',
    articles: 11,
    href: '/warranty',
  },
  {
    icon: User,
    label: 'My Account',
    description: 'Account settings, security, and preferences',
    articles: 8,
    href: '/account',
  },
]

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking email with a real-time tracking link. You can also track your order at any time from the "Orders" section in your ChrisTech account dashboard.',
  },
  {
    question: 'What is the return window for products?',
    answer: 'All products purchased on ChrisTech are eligible for a 30-day return window from the date of delivery. Products must be in their original packaging and unused condition. Return shipping is free for all orders.',
  },
  {
    question: 'How long does international shipping take?',
    answer: 'Standard international shipping takes 3–7 business days. Express shipping (available at checkout) delivers in 2–3 business days to most countries. Some remote regions may take 5–10 business days.',
  },
  {
    question: 'Are all products on ChrisTech authentic?',
    answer: 'Absolutely. ChrisTech sources 100% of its products directly from manufacturers and authorized distributors. Every product is covered by a full manufacturer warranty and our ChrisTech Authenticity Guarantee.',
  },
  {
    question: 'Can I change or cancel my order after placing it?',
    answer: 'Orders can be modified or cancelled within 1 hour of placement. After that window, if the order has been fulfilled, you can initiate a free return once the package is delivered.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with 256-bit SSL encryption and are PCI DSS compliant.',
  },
  {
    question: 'How does the 2-year warranty work?',
    answer: 'All products come with a 2-year ChrisTech warranty covering manufacturing defects and hardware failures. To initiate a claim, log in to your account, navigate to your order, and click "Warranty Claim". Our team will respond within 24 hours.',
  },
  {
    question: 'Do you offer business/enterprise pricing?',
    answer: 'Yes. ChrisTech for Business offers volume discounts, priority support, dedicated account management, and consolidated invoicing for teams of 5 or more. Contact our enterprise team at business@christech.com.',
  },
]

export default function SupportPage() {
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(
    (f) =>
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Help Center"
        title="How Can We Help?"
        description="Find answers instantly or connect with our certified support specialists."
        gradient
      />

      {/* Search */}
      <section className="py-10 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles, topics, or order issues..."
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-2xl pl-14 pr-6 py-5 text-white text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-200"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Browse Topics</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Support Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex items-start gap-4 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-600/5 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-600/20 transition-colors">
                  <cat.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{cat.label}</h3>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>
                  <p className="text-xs text-slate-600 mt-2">{cat.articles} articles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Quick Answers</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">
              {search ? `Results for "${search}"` : 'Frequently Asked Questions'}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {filtered.length > 0 ? (
              <Accordion items={filtered} />
            ) : (
              <div className="text-center py-12 text-slate-400">
                <p>No results found for &ldquo;{search}&rdquo;.</p>
                <button onClick={() => setSearch('')} className="btn-ghost mt-4">Clear search</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still need help */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Still Need Help?</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Contact Our Team</h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto">
              Our certified specialists are available 24/7 via live chat, email, or phone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: MessageCircle, label: 'Live Chat', detail: 'Avg. wait: 2 min', href: '/contact' },
              { icon: Mail, label: 'Email Us', detail: 'support@christech.com.ng', href: '/contact' },
              { icon: Phone, label: 'Call Us', detail: '+1 (888) 500-2025', href: '/contact' },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-600/5 transition-all duration-200 text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-600/20 transition-colors">
                  <c.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-white">{c.label}</p>
                <p className="text-xs text-slate-500">{c.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
