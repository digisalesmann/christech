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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-white/[0.06] pt-10">
            {[
              { icon: Package, value: '500+', label: 'Curated Products' },
              { icon: Globe, value: '36', label: 'States Delivered To' },
              { icon: Users, value: 'Growing', label: 'Customer Base' },
              { icon: Star, value: '4.9', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-start gap-3">
                <stat.icon className="w-5 h-5 text-emerald-400" />
                <div className="text-4xl font-black text-white tracking-tighter">{stat.value}</div>
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
                We built ChrisTech to fix that. By partnering directly with manufacturers and authorized distributors, we eliminated middlemen, standardized pricing globally, and built a logistics network that delivers to every state in Nigeria.
              </p>
              <Link href="/products" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image with overlaid pull-quote */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=90&auto=format&fit=crop"
                alt="ChrisTech headquarters"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
              {/* Pull quote */}
              <div className="absolute bottom-0 inset-x-0 p-8">
                <p className="text-white text-lg font-bold leading-snug tracking-tight mb-3">
                  &ldquo;Premium technology should be genuinely accessible to every Nigerian.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">ChrisTech, Founded 2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy-800 border-y border-white/[0.06]">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row lg:items-start gap-16">
            {/* Left label */}
            <div className="lg:w-64 shrink-0">
              <p className="section-label mb-3">What We Stand For</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-tight">Our Core Values</h2>
            </div>
            {/* Right values list */}
            <div className="flex-1 divide-y divide-white/[0.06]">
              {values.map((value, i) => (
                <div key={value.title} className="flex items-start gap-6 py-8 first:pt-0 last:pb-0">
                  <span className="text-[11px] font-black text-emerald-400/50 tracking-widest mt-1 shrink-0 w-6">0{i + 1}</span>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 overflow-hidden">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Journey</p>
            <h2 className="section-heading">Six Years of Growth</h2>
          </div>

          {/* Desktop: alternating layout */}
          <div className="hidden md:block max-w-4xl mx-auto">
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`relative flex items-center gap-0 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content side */}
                    <div className={`w-1/2 py-10 ${i % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 block mb-2">{m.year}</span>
                      <h3 className="text-lg font-black text-white tracking-tight mb-2">{m.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
                    </div>
                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-navy-900 border-2 border-emerald-500 z-10" />
                    {/* Empty side */}
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: stacked with left accent */}
          <div className="md:hidden space-y-0 border-l border-white/[0.06] ml-4 pl-6">
            {milestones.map((m) => (
              <div key={m.year} className="relative pb-10">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-navy-900 border-2 border-emerald-500" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 block mb-1">{m.year}</span>
                <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">{m.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="py-20 bg-navy-800 border-y border-white/[0.06]">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-3">Headquarters</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none mb-1">Owerri</h2>
              <p className="text-slate-500 text-lg">Imo State, Nigeria</p>
            </div>
            <div className="w-px h-16 bg-white/[0.06] hidden sm:block shrink-0" />
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>87 Tetlow Rd, Owerri 460241, Imo State</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 shrink-0 flex items-center justify-center text-emerald-400 text-xs font-bold">@</span>
                <a href="mailto:support@christech.com.ng" className="hover:text-white transition-colors">support@christech.com.ng</a>
              </div>
            </div>
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
