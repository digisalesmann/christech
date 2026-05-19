'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react'

const pillars = [
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Free express delivery on orders over ₦50,000. Ships across Nigeria with real-time tracking.',
    detail: '1-3 day delivery nationwide',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    description: 'Every product is covered by our comprehensive 2-year manufacturer warranty with no exceptions.',
    detail: 'Full coverage, no fine print',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Not satisfied? Return any product within 30 days for a full refund, no questions asked.',
    detail: 'Free return shipping included',
  },
  {
    icon: Headphones,
    title: '24 / 7 Expert Support',
    description: 'Our team of certified technology specialists is available around the clock via live chat, phone, or email.',
    detail: 'Average response: < 2 minutes',
  },
]

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 bg-navy-900 relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Our Promise</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            The ChrisTech Standard
          </h2>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group px-8 py-10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-600/20 transition-colors duration-300">
                <pillar.icon className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-3 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {pillar.description}
              </p>
              <p className="text-xs font-semibold text-emerald-400 tracking-wide">
                {pillar.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
