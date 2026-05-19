'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { reviews } from '@/data/products'

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-28 bg-navy-800 relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Customer Voices</p>
          <h2 className="section-heading mb-4">Trusted by Millions</h2>
          <p className="section-subheading mx-auto text-center">
            Real experiences from verified customers across Nigeria.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl mb-16 overflow-hidden"
        >
          {[
            { value: '4.9', label: 'Average Rating', sub: 'Out of 5.0' },
            { value: '2.4M+', label: 'Reviews', sub: 'Verified purchases' },
            { value: '98%', label: 'Satisfaction Rate', sub: 'Would recommend' },
          ].map((stat) => (
            <div key={stat.label} className="px-6 md:px-12 py-8 text-center">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-white mb-0.5">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
            >
              {/* Quote mark */}
              <Quote className="w-8 h-8 text-emerald-500/30 mb-6" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white tracking-tight mb-3">{review.title}</h4>

              {/* Body */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{review.body}</p>

              {/* Author */}
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                <div>
                  <p className="text-sm font-semibold text-white">{review.author}</p>
                  <p className="text-xs text-slate-500">{review.location}</p>
                </div>
                {review.verified && (
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
