import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'ChrisTech is committed to making our platform accessible to all users, including those with disabilities.',
}

const features = [
  { title: 'Keyboard Navigation', description: 'All interactive elements are accessible via keyboard. Tab order is logical and skip-to-content links are provided.' },
  { title: 'Screen Reader Support', description: 'Our interface uses semantic HTML and ARIA attributes to provide a rich experience for screen reader users.' },
  { title: 'Color Contrast', description: 'All text meets WCAG 2.1 AA minimum contrast ratios of 4.5:1 for body text and 3:1 for large text.' },
  { title: 'Focus Indicators', description: 'Clear, visible focus indicators are present on all interactive elements for keyboard and switch access users.' },
  { title: 'Image Alternative Text', description: 'All meaningful images include descriptive alternative text. Decorative images have empty alt attributes.' },
  { title: 'Resizable Text', description: 'Text can be resized up to 200% without loss of content or functionality using browser zoom.' },
  { title: 'Motion Preferences', description: 'Animations respect the prefers-reduced-motion media query for users sensitive to motion.' },
  { title: 'Form Labels', description: 'All form inputs have associated labels and descriptive error messages to aid completion.' },
]

const standards = [
  { name: 'WCAG 2.1 Level AA', status: 'Target Compliance' },
  { name: 'Section 508 (USA)', status: 'Compliant' },
  { name: 'EN 301 549 (EU)', status: 'Target Compliance' },
  { name: 'ADA Title III', status: 'Ongoing Effort' },
]

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Accessibility"
        title="Technology for Everyone"
        description="ChrisTech is committed to ensuring our platform is accessible to all users, including those with disabilities."
      />

      {/* Commitment statement */}
      <section className="py-14 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container max-w-3xl">
          <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-600/5">
            <p className="text-base text-slate-200 leading-relaxed">
              ChrisTech believes that access to technology should have no barriers. We are actively working to ensure our platform meets or exceeds WCAG 2.1 Level AA standards. This is an ongoing commitment, and we regularly test our interface with assistive technologies and users with disabilities.
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Statement last reviewed: <span className="text-white">January 1, 2025</span>
            </p>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Compliance</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Standards We Follow</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {standards.map((s) => (
              <div key={s.name} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center">
                <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-white mb-1">{s.name}</p>
                <p className="text-xs text-slate-500">{s.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-b border-white/[0.06] bg-navy-800">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Platform Features</p>
            <h2 className="text-3xl font-black tracking-tighter text-white">Accessibility Features</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <CheckCircle className="w-5 h-5 text-emerald-400 mb-4" />
                <h3 className="text-sm font-bold text-white mb-2 tracking-tight">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Known issues */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="section-container max-w-3xl">
          <div className="mb-10">
            <p className="section-label mb-3">Transparency</p>
            <h2 className="text-3xl font-black tracking-tighter text-white mb-4">Known Limitations</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We are aware of the following accessibility limitations that we are actively working to resolve:
            </p>
          </div>
          <div className="space-y-4">
            {[
              { issue: 'Product image carousels on mobile', status: 'In Progress', target: 'Q2 2025' },
              { issue: 'PDF documents (press kit, reports)', status: 'Planned', target: 'Q3 2025' },
              { issue: 'Video content lacks closed captions', status: 'Planned', target: 'Q3 2025' },
            ].map((item) => (
              <div key={item.issue} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-sm text-slate-300">{item.issue}</p>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold tracking-wide text-amber-400 bg-amber-600/10 border border-amber-500/20 px-3 py-1 rounded-full">{item.status}</span>
                  <span className="text-xs text-slate-500">Target: {item.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="py-20">
        <div className="section-container text-center max-w-xl">
          <Mail className="w-10 h-10 text-emerald-400 mx-auto mb-5" />
          <h2 className="text-2xl font-black tracking-tighter text-white mb-4">Report an Accessibility Issue</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            If you experience an accessibility barrier on ChrisTech, please contact our accessibility team. We commit to responding within 2 business days and resolving confirmed issues within 10 business days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:accessibility@christech.com.ng" className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25">
              Email Accessibility Team <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="btn-secondary px-8 py-4 rounded-full">
              Contact Support
            </Link>
          </div>
          <p className="text-xs text-slate-600 mt-6">accessibility@christech.com.ng</p>
        </div>
      </section>
    </div>
  )
}
