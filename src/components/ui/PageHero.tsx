'use client'

import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  description?: string
  gradient?: boolean
}

export default function PageHero({ label, title, description, gradient = false }: Props) {
  return (
    <div className="relative pt-32 pb-20 bg-navy-900 border-b border-white/[0.06] overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: gradient
            ? 'radial-gradient(ellipse at 30% 60%, rgba(22, 163, 74, 0.08) 0%, transparent 60%)'
            : undefined,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">{label}</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-5">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">{description}</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
