import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { ArrowRight, Globe, Users, Package, Star, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About ChrisTech',
  description: 'Learn about ChrisTech, Nigeria\'s premier technology store, headquartered in Owerri, Imo State.',
}

const milestones = [
  { year: '2019', title: 'Founded in Owerri', description: 'ChrisTech was established in Owerri, Imo State with a single mission: bring genuine premium technology to Nigerian consumers.' },
  { year: '2020', title: 'Online Store Launch', description: 'Launched our e-commerce platform, making it easier for customers across Nigeria to order and receive gadgets at their doorstep.' },
  { year: '2021', title: '10,000 Customers', description: 'Reached our first major milestone. 10,000 Nigerians trusting ChrisTech for their technology purchases.' },
  { year: '2022', title: 'Nationwide Delivery', description: 'Expanded delivery coverage to all 36 states and the FCT, with same-day delivery in Owerri and Lagos.' },
  { year: '2023', title: '500+ Products, 50+ Brands', description: 'Curated Nigeria\'s widest selection of genuine premium gadgets from Apple, Samsung, Sony, Dell, ASUS and more.' },
  { year: '2025', title: 'Serving Nigeria & Beyond', description: 'Trusted by customers across Nigeria with plans to expand to other West African markets.' },
]

const values = [
  { title: 'Authenticity Guaranteed', description: 'Every product on ChrisTech is 100% genuine. We source exclusively from authorized distributors and brand-certified partners.' },
  { title: 'Customer Obsession', description: 'From pre-purchase guidance to post-sale support, our team of certified specialists is dedicated to extraordinary experiences.' },
  { title: 'Radical Transparency', description: 'No hidden fees. Clear pricing. Honest reviews. We believe trust is built through radical transparency at every touchpoint.' },
  { title: 'Global Accessibility', description: 'We believe everyone deserves access to the world\'s best technology, regardless of geography.' },
]

const offices = [
  { city: 'Owerri', country: 'IMO', role: 'Headquarters' },
  { city: 'Lagos', country: 'NGA', role: 'Lagos Office' },
  { city: 'Abuja', country: 'FCT', role: 'FCT Office (Coming Soon)' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Our Story"
        title="Built for Those Who Demand the Best"
        description="ChrisTech was founded in Owerri, Nigeria in 2019 with a single conviction: premium technology should be genuinely accessible to Nigerians."
        gradient
      />

      {/* Stats */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { icon: Package, value: '500+', label: 'Curated Products' },
              { icon: Globe, value: '36', label: 'States Delivered To' },
              { icon: Users, value: 'Growing', label: 'Customer Base' },
              { icon: Star, value: '4.9', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <stat.icon className="w-6 h-6 text-emerald-400 mb-4" />
                <div className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-[0.97]">
                Technology Without
                <span className="text-gradient"> Borders.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                In 2019, our founders identified a broken reality: consumers in Lagos paid three times more than consumers in London for the same laptop. Supply chains were fragmented, grey markets were rampant, and authentic products were hard to find outside major markets.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                We built ChrisTech to fix that. By partnering directly with manufacturers and authorized distributors, we eliminated middlemen, standardized pricing globally, and built a logistics infrastructure that delivers to the most remote addresses on earth, in three days or less.
              </p>
              <Link href="/products" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=90&auto=format&fit=crop"
                alt="ChrisTech global operations"
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy-800 border-y border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="section-heading">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div key={value.title} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <span className="text-emerald-400 font-black text-sm">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-3">{value.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Journey</p>
            <h2 className="section-heading">Six Years of Growth</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[52px] top-0 bottom-0 w-px bg-white/[0.06] hidden sm:block" />
              <div className="space-y-10">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-8 items-start">
                    <div className="shrink-0 w-[104px] text-right hidden sm:block">
                      <span className="text-sm font-black text-emerald-400 tracking-wide">{m.year}</span>
                    </div>
                    <div className="relative hidden sm:flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-600/20 relative z-10" />
                    </div>
                    <div className="flex-1 pb-2">
                      <span className="sm:hidden text-xs font-black text-emerald-400 tracking-widest uppercase block mb-2">{m.year}</span>
                      <h3 className="text-base font-bold text-white mb-2 tracking-tight">{m.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 bg-navy-800 border-y border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Global Presence</p>
            <h2 className="section-heading">Our Offices</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {offices.map((office) => (
              <div key={office.city} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center hover:border-emerald-500/20 hover:bg-emerald-600/5 transition-all duration-300 group">
                <MapPin className="w-5 h-5 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-base font-bold text-white tracking-tight">{office.city}</p>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">{office.country}</p>
                <p className="text-[10px] font-semibold text-emerald-400 tracking-wide leading-tight">{office.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Join the ChrisTech Community
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Nigerians trust ChrisTech. Discover why the country&apos;s most discerning technology buyers choose us.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-primary px-10 py-4 rounded-full shadow-lg shadow-emerald-600/25">
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary px-10 py-4 rounded-full">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
