import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'ChrisTech Cookie Policy, how we use cookies and how you can control them.',
}

const cookieTypes = [
  {
    name: 'Essential Cookies',
    required: true,
    description: 'These cookies are strictly necessary for the platform to function. They enable core features such as authentication, cart persistence, and security. You cannot opt out of these cookies.',
    examples: ['session_id', 'csrf_token', 'cart_data', 'auth_token'],
    retention: 'Session or up to 30 days',
  },
  {
    name: 'Analytics Cookies',
    required: false,
    description: 'These cookies help us understand how visitors interact with our platform, which pages are visited, how long users spend on pages, and where visitors come from. This data is anonymized.',
    examples: ['_ga', '_gid', 'mp_analytics', 'heatmap_session'],
    retention: 'Up to 2 years',
  },
  {
    name: 'Personalization Cookies',
    required: false,
    description: 'These cookies allow us to remember your preferences, such as currency, language, and recently viewed products, to provide a more tailored experience.',
    examples: ['preferred_currency', 'recently_viewed', 'language_pref'],
    retention: 'Up to 1 year',
  },
  {
    name: 'Marketing Cookies',
    required: false,
    description: 'These cookies are used to deliver advertisements relevant to you on third-party platforms such as Google, Meta, and LinkedIn. They track your browsing across websites.',
    examples: ['_fbp', 'google_ads', 'li_sugr', 'ttclid'],
    retention: 'Up to 90 days',
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Legal"
        title="Cookie Policy"
        description="Last updated January 1, 2025. This policy explains how ChrisTech uses cookies and how you can control your preferences."
      />

      <section className="py-20">
        <div className="section-container max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-600/5 mb-10">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Cookie Preferences:</strong> You can update your cookie preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link in the footer, or through your browser settings. Note that disabling certain cookies may impact your experience on our platform.
              </p>
            </div>

            <h2 className="text-xl font-bold text-white mb-3">What Are Cookies?</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-10">
              Cookies are small text files placed on your device by websites you visit. They serve many functions: remembering your preferences, keeping you logged in, and helping us understand how our platform is used. ChrisTech uses both first-party cookies (set by us) and third-party cookies (set by our partners).
            </p>
            <div className="h-px bg-white/[0.06] mb-10" />

            <h2 className="text-xl font-bold text-white mb-8">Types of Cookies We Use</h2>

            <div className="space-y-6">
              {cookieTypes.map((type) => (
                <div key={type.name} className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-base font-bold text-white">{type.name}</h3>
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${type.required ? 'text-emerald-400 bg-emerald-600/10 border-emerald-500/20' : 'text-slate-400 bg-white/[0.04] border-white/[0.1]'}`}>
                      {type.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{type.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 tracking-wide mb-2">Examples</p>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((ex) => (
                          <code key={ex} className="text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] rounded-md px-2 py-1 text-slate-400">
                            {ex}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 tracking-wide mb-2">Retention Period</p>
                      <p className="text-sm text-slate-300">{type.retention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 h-px bg-white/[0.06]" />

            <h2 className="text-xl font-bold text-white mt-10 mb-4">How to Control Cookies</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              You can control cookie usage through the following methods:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Cookie Preference Center: Access via the "Cookie Settings" link in our footer.',
                'Browser Settings: Most browsers allow you to block, delete, or configure cookies via settings.',
                'Browser Extensions: Tools like Privacy Badger or uBlock Origin provide granular control.',
                'Opt-Out Links: For analytics, visit Google Analytics Opt-out at tools.google.com/dlpage/gaoptout.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-sm text-slate-400 leading-relaxed">
              For questions about our use of cookies, contact <a href="mailto:privacy@christech.com.ng" className="text-emerald-400 hover:text-emerald-300 transition-colors">privacy@christech.com.ng</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
