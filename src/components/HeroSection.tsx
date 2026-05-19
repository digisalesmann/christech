'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Products' },
  { value: '36', label: 'States' },
  { value: '50K+', label: 'Customers' },
  { value: '4.9', label: 'Avg. Rating' },
]

function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[480px] animate-float drop-shadow-2xl">
      {/* ── Screen ── */}
      <div className="relative rounded-t-2xl overflow-hidden border border-white/[0.14]"
           style={{ background: 'linear-gradient(160deg,#1c1c1e,#111)', paddingTop: '63%' }}>
        {/* inner display */}
        <div className="absolute inset-[5px] rounded-xl overflow-hidden bg-navy-950">
          {/* emerald ambient */}
          <div className="absolute inset-0"
               style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(22,163,74,0.22) 0%, transparent 68%)' }} />
          {/* dot grid */}
          <div className="absolute inset-0 opacity-25"
               style={{
                 backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
                 backgroundSize: '22px 22px',
               }} />
          {/* horizontal scan */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          {/* brand lock-up */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image src="/images/logo.png" alt="ChrisTech" width={606} height={442} className="h-12 w-auto object-contain" />
          </div>
        </div>
        {/* webcam dot */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-white/20" />
        {/* bottom lip of screen bezel */}
        <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* ── Hinge strip ── */}
      <div className="h-[7px] bg-gradient-to-b from-[#282828] to-[#1a1a1a] border-x border-white/[0.06]" />

      {/* ── Base / keyboard ── */}
      <div className="rounded-b-[14px] border border-t-0 border-white/[0.1] px-5 pt-3.5 pb-4"
           style={{ background: 'linear-gradient(180deg,#1e1e20,#141416)' }}>
        {/* keyboard rows */}
        <div className="space-y-[5px] mb-3">
          {[14, 13, 12, 11].map((count, row) => (
            <div key={row} className={`flex gap-[4px] ${row === 3 ? 'mx-6' : row === 0 ? 'mx-1' : ''}`}>
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className="h-[6px] rounded-[3px] flex-1"
                  style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.04)' }}
                />
              ))}
            </div>
          ))}
        </div>
        {/* trackpad */}
        <div className="w-24 h-[18px] rounded-[6px] mx-auto"
             style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }} />
      </div>

      {/* ── Ground reflection ── */}
      <div className="absolute -bottom-2 left-6 right-6 h-3 rounded-full blur-md bg-black/40" />
    </div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 left-1/4 w-[800px] h-[800px] rounded-full animate-orb"
             style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.12) 0%, rgba(22,163,74,0.04) 40%, transparent 70%)' }} />
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full animate-orb"
             style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)', animationDelay: '3s' }} />
        <div className="absolute inset-0"
             style={{
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
               backgroundSize: '60px 60px',
             }} />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-900 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-900 to-transparent" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full pt-24 pb-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] py-12">

            {/* Left */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.p variants={itemVariants} className="section-label mb-5">
                Nigeria&apos;s Premier Tech Store
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tighter leading-[0.95] mb-6"
              >
                <span className="text-white">The Future</span><br />
                <span className="text-white">of Technology,</span><br />
                <span className="text-gradient">Delivered.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
                Genuine flagship electronics, curated and delivered nationwide.
                From Owerri to Lagos, the tech you want, at your doorstep.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-14">
                <Link href="/products" className="btn-primary text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products?filter=new" className="btn-secondary text-base px-8 py-4 rounded-full">
                  New Arrivals
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-0">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="px-6 first:pl-0">
                      <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                      <div className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">{stat.label}</div>
                    </div>
                    {i < stats.length - 1 && <div className="w-px h-8 bg-white/[0.08]" />}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right, laptop mockup + floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <LaptopMockup />

              {/* Floating card, Rating (bottom left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute left-0 bottom-16 glass-panel rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Customer Rating</p>
                  <p className="text-lg font-black text-white tracking-tight">4.9 / 5.0</p>
                </div>
              </motion.div>

              {/* Floating card, Delivery (top right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute right-0 top-8 glass-panel rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Express Delivery</p>
                  <p className="text-sm font-bold text-white">1-3 Business Days</p>
                </div>
              </motion.div>

              {/* Floating card, Warranty (bottom right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute right-4 bottom-8 glass-panel rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Warranty</p>
                  <p className="text-sm font-bold text-white">2-Year Coverage</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  )
}
