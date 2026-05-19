import Link from 'next/link'
import { ArrowRight, Search, Home } from 'lucide-react'

const suggestions = [
  { label: 'Smartphones', href: '/products?category=smartphones' },
  { label: 'Laptops', href: '/products?category=laptops' },
  { label: 'Audio', href: '/products?category=audio' },
  { label: 'New Arrivals', href: '/products?filter=new' },
  { label: 'Deals', href: '/products?filter=deals' },
  { label: 'Help Center', href: '/support' },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(22, 163, 74, 0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 py-24 max-w-2xl mx-auto">
        {/* 404 display */}
        <div className="mb-8">
          <span
            className="text-[160px] md:text-[200px] font-black leading-none tracking-tighter select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(22, 163, 74, 0.1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>
        </div>

        <div className="w-16 h-px bg-emerald-600/50 mx-auto mb-8" />

        <p className="section-label mb-4">Page Not Found</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-5">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved, renamed, or removed. Try one of these options below.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link href="/" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/products" className="btn-secondary px-8 py-4 rounded-full">
            <Search className="w-4 h-4" />
            Browse Products
          </Link>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-5">Quick Links</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 group"
              >
                {s.label}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
