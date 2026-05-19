'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

const featured = products.find((p) => p.slug === 'sony-wh1000xm6')!

export default function FeaturedCollection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />

      <div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(22,163,74,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left, Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-4">Editor&apos;s Choice</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.97] mb-6">
              Professional Audio,
              <br />
              <span className="text-gradient">Redefined.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-4 max-w-lg">
              The Sony WH-1000XM6 represents a generational leap in wireless audio technology.
              Industry-leading AI-powered noise cancellation, LDAC Hi-Res wireless, and 40 hours of playtime.
            </p>
            <p className="text-slate-500 mb-10">
              The reference-standard wireless headphone for musicians, engineers, and frequent travellers
              who refuse to compromise.
            </p>

            <div className="flex items-center gap-8 mb-10">
              {[
                { value: '40h', label: 'Battery Life' },
                { value: 'LDAC', label: 'Hi-Res Audio' },
                { value: '#1', label: 'ANC Rating' },
              ].map((spec, i) => (
                <div key={spec.label} className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-black text-white tracking-tight mb-0.5">{spec.value}</div>
                    <div className="text-xs text-slate-500 font-medium">{spec.label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/[0.1]" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href={`/products/${featured.slug}`} className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
                View Product <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products?category=audio" className="btn-ghost">
                All Audio
              </Link>
            </div>
          </motion.div>

          {/* Right, Headphone stage */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden border border-white/[0.06] bg-navy-950">

              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Bottom fade for label legibility */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-navy-950/95 to-transparent" />

              {/* Corner accents */}
              {[
                'top-4 left-4 border-t border-l',
                'top-4 right-4 border-t border-r',
                'bottom-4 left-4 border-b border-l',
                'bottom-4 right-4 border-b border-r',
              ].map((cls) => (
                <div key={cls} className={`absolute w-5 h-5 border-emerald-500/50 ${cls}`} />
              ))}

              {/* In Stock pill, top right, inside stage */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-4 right-4 glass-panel rounded-full px-3 py-1.5 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-300">In Stock</span>
              </motion.div>

              {/* Product identity, bottom, over gradient */}
              <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-0.5">{featured.brand}</p>
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-lg font-black text-white tracking-tight leading-tight">{featured.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{featured.categoryLabel}</p>
                  </div>
                  {/* Price inline */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="glass-panel rounded-xl px-4 py-2.5 shrink-0"
                  >
                    <p className="text-[10px] text-slate-400 mb-0.5">Editor&apos;s Price</p>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white">{formatPrice(featured.price)}</span>
                      <span className="badge-sale text-[10px]">-10%</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
