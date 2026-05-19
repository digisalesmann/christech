'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/data/products'

export default function CategoryShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = categories.slice(0, 4)
  const secondary = categories.slice(4, 8)

  return (
    <section className="py-28 bg-navy-900 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="section-label mb-3">Browse the Collection</p>
            <h2 className="section-heading">Shop by Category</h2>
          </div>
          <Link href="/products" className="btn-ghost group">
            View all categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/products?category=${cat.slug}`} className="group block">
                {/* Image, same pattern as ProductCard */}
                <div className="relative aspect-[4/3] overflow-hidden bg-white rounded-2xl mb-4">
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    aria-hidden="true"
                    className="object-cover scale-110 blur-2xl opacity-40 pointer-events-none"
                    sizes="4px"
                  />
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/10 transition-all duration-300" />
                </div>

                {/* Info */}
                <div className="px-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-1">
                    {cat.productCount.toLocaleString()} Products
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-200">
                      {cat.label}
                    </h3>
                    <ArrowRight className="w-4 h-4 shrink-0 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Secondary categories */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {secondary.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="flex items-center justify-between px-6 py-5 bg-navy-800 hover:bg-navy-700 transition-colors duration-200 group"
              >
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                    {cat.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{cat.productCount} items</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
