'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'bestseller', label: 'Best Sellers' },
]

export default function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeTab, setActiveTab] = useState('all')

  const filtered = products.filter((p) => {
    if (activeTab === 'all') return true
    if (activeTab === 'featured') return p.featured
    if (activeTab === 'new') return p.newArrival
    if (activeTab === 'bestseller') return p.bestSeller
    return true
  })

  return (
    <section className="py-28 bg-navy-800 relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="section-label mb-3">Our Selection</p>
            <h2 className="section-heading">Premium Products</h2>
          </div>
          <Link href="/products" className="btn-ghost group">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1 mb-12 overflow-x-auto hide-scrollbar"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/products" className="btn-secondary px-10 py-4 rounded-full">
            Explore Full Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
