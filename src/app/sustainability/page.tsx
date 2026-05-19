import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Leaf, Recycle, Sun, Globe, ArrowRight, TrendingDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sustainability',
  description: 'ChrisTech\'s commitments to environmental sustainability, carbon reduction, and responsible global commerce.',
}

const commitments = [
  {
    icon: TrendingDown,
    title: 'Carbon Neutral by 2030',
    description: 'We have committed to achieving net-zero carbon emissions across our entire operations, including logistics, packaging, and data centers, by 2030.',
    progress: 42,
    metric: '42% reduction since 2022',
  },
  {
    icon: Recycle,
    title: '100% Recycled Packaging',
    description: 'By end of 2025, all ChrisTech packaging will be made from 100% post-consumer recycled materials and will be fully recyclable or compostable.',
    progress: 78,
    metric: '78% of packaging recycled today',
  },
  {
    icon: Sun,
    title: 'Renewable Energy Operations',
    description: 'Our warehouses and data centers are transitioning to 100% renewable energy. We currently source 65% of our operational energy from wind and solar.',
    progress: 65,
    metric: '65% renewable energy today',
  },
  {
    icon: Leaf,
    title: 'Product Longevity Initiative',
    description: 'We partner with brands that offer extended warranty, repairability, and trade-in programs, reducing e-waste and extending product life cycles.',
    progress: 90,
    metric: '90% of products have repair programs',
  },
]

const initiatives = [
  {
    category: 'Logistics',
    title: 'Electric Last-Mile Delivery',
    description: 'Partnering with last-mile carriers to transition to EV fleets in our top 20 markets by 2026.',
    status: 'In Progress',
  },
  {
    category: 'Packaging',
    title: 'Plastic-Free by 2025',
    description: 'Eliminating all single-use plastic from our fulfillment centers and replacing with paper-based alternatives.',
    status: 'In Progress',
  },
  {
    category: 'Products',
    title: 'Refurbished Product Line',
    description: 'Launching ChrisTech Certified Refurbished, professionally restored devices with full warranty at reduced prices.',
    status: 'Launching Q3 2025',
  },
  {
    category: 'Community',
    title: 'Tech Access for Schools',
    description: 'Donating 1% of profits to provide technology to under-resourced schools across Africa, Asia, and Latin America.',
    status: 'Active',
  },
  {
    category: 'Supply Chain',
    title: 'Supplier Sustainability Audit',
    description: 'Requiring all suppliers to meet our Environmental and Social Governance (ESG) standards by 2026.',
    status: 'Active',
  },
  {
    category: 'Carbon',
    title: 'Offset Partnership',
    description: 'Working with Gold Standard-certified projects to offset unavoidable emissions through reforestation and clean energy.',
    status: 'Active',
  },
]

const statusColor: Record<string, string> = {
  'In Progress': 'text-amber-400 bg-amber-600/10 border-amber-500/20',
  'Launching Q3 2025': 'text-purple-400 bg-purple-600/10 border-purple-500/20',
  Active: 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20',
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Sustainability"
        title="Technology Without Compromise."
        description="ChrisTech is committed to building a marketplace that is not only world-class in experience, but responsible in impact."
        gradient
      />

      {/* Impact numbers */}
      <section className="py-14 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { value: '42%', label: 'Carbon Reduction', sub: 'Since 2022 baseline' },
              { value: '78%', label: 'Recycled Packaging', sub: 'By weight' },
              { value: '65%', label: 'Renewable Energy', sub: 'Operations powered' },
              { value: '2030', label: 'Net-Zero Target', sub: 'Full operations' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-8 text-center">
                <div className="text-3xl font-black text-emerald-400 tracking-tighter mb-1">{s.value}</div>
                <div className="text-sm font-bold text-white mb-0.5">{s.label}</div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments with progress */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Commitments</p>
            <h2 className="section-heading">Four Pillars of Sustainability</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commitments.map((c) => (
              <div key={c.title} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{c.title}</h3>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">{c.metric}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{c.description}</p>
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-emerald-400 font-bold">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives table */}
      <section className="py-24 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Active Programs</p>
            <h2 className="section-heading">Sustainability Initiatives</h2>
          </div>
          <div className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {initiatives.map((item) => (
              <div key={item.title} className="grid grid-cols-1 md:grid-cols-[140px_1fr_120px] gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors items-center">
                <span className={`text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg border w-fit ${categoryColor[item.category] ?? 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20'}`}>
                  {item.category}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
                <span className={`text-[11px] font-bold tracking-wide px-3 py-1 rounded-full border w-fit ${statusColor[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <Globe className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black tracking-tighter text-white mb-4">Read Our Sustainability Report</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Our annual Sustainability Report details progress against all targets, third-party audits, and forward commitments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-500">
              Download 2024 Report
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link href="/contact" className="btn-secondary px-8 py-4 rounded-full">
              ESG Inquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const categoryColor: Record<string, string> = {}
