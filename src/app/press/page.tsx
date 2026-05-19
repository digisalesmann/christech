import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Download, Mail, ArrowRight, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Press kit, media assets, and PR contact information for ChrisTech.',
}

const assets = [
  { name: 'ChrisTech Logo Pack', format: 'SVG, PNG (All variants)', size: '4.2 MB' },
  { name: 'Brand Guidelines', format: 'PDF', size: '8.1 MB' },
  { name: 'Product Photography', format: 'ZIP (JPEG, PNG, 4K)', size: '142 MB' },
  { name: 'Executive Headshots', format: 'ZIP (JPEG, 4K)', size: '28 MB' },
  { name: 'Company Fact Sheet', format: 'PDF', size: '1.3 MB' },
  { name: 'Office & Team Photos', format: 'ZIP (JPEG, 4K)', size: '96 MB' },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Press & Media"
        title="Press Room"
        description="Official media assets, press coverage, and PR contact information for journalists and content creators."
        gradient
      />

      {/* PR Contact */}
      <section className="py-14 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3">Press Inquiries</p>
              <p className="text-lg font-bold text-white mb-1">Media Relations Team</p>
              <a href="mailto:press@christech.com.ng" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors mt-2">
                <Mail className="w-4 h-4" />
                press@christech.com.ng
              </a>
              <p className="text-xs text-slate-500 mt-3">Response within 4 hours on business days</p>
            </div>
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-600/5">
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3">Press Kit</p>
              <p className="text-sm text-slate-300 mb-4">Download our complete press kit with all brand assets, fact sheets, and approved imagery.</p>
              <button className="btn-primary py-3 px-6 rounded-xl text-sm shadow-lg shadow-emerald-600/25">
                <Download className="w-4 h-4" />
                Download Press Kit (280 MB)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Media assets */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="mb-12">
            <p className="section-label mb-3">Brand Assets</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Media Downloads</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-600/5 transition-all duration-200 group cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">{asset.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{asset.format} · {asset.size}</p>
                </div>
                <Download className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 ml-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press coverage */}
      <section className="py-24 bg-navy-800 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="mb-12">
            <p className="section-label mb-3">Media Coverage</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">In the News</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
              <Newspaper className="w-7 h-7 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No coverage published yet</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Press articles and media mentions will appear here as they are published.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-3xl font-black tracking-tighter text-white mb-4">Writing About ChrisTech?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Our PR team is available to arrange interviews, provide statements, or supply additional materials for your story.</p>
          <Link href="/contact" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
            Contact PR Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
