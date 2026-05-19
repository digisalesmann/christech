import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ChrisTech Privacy Policy, how we collect, use, and protect your personal data.',
}

const sections = [
  {
    id: 'collection',
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, place an order, contact us for support, or subscribe to our newsletter.

**Personal Information:** Name, email address, shipping address, phone number, and payment details (processed securely through our PCI DSS-compliant payment providers. We do not store raw card data).

**Account Information:** Purchase history, wishlist, saved addresses, and communication preferences.

**Device and Usage Information:** IP address, browser type, operating system, referring URLs, pages visited, and time spent on our platform. This data is collected via cookies and similar tracking technologies.

**Location Information:** General location based on IP address, or precise location if you grant permission on mobile devices.`,
  },
  {
    id: 'use',
    title: '2. How We Use Your Information',
    content: `We use the information we collect to provide, maintain, and improve our services:

- Process and fulfill your orders, including sending order confirmations and tracking updates
- Communicate with you about products, services, promotions, and company news (with your consent)
- Provide customer support and respond to inquiries
- Detect and prevent fraudulent transactions and abuse of our platform
- Analyze usage patterns to improve website performance and user experience
- Comply with legal obligations and enforce our Terms of Service
- Personalize your shopping experience and provide relevant product recommendations`,
  },
  {
    id: 'sharing',
    title: '3. Information Sharing',
    content: `ChrisTech does not sell, rent, or trade your personal information to third parties for marketing purposes.

We share your information only in the following circumstances:

**Service Providers:** Trusted third-party vendors who assist us in operating our platform, including logistics partners (FedEx, DHL, UPS), payment processors (Stripe, PayPal), cloud infrastructure (AWS), and email service providers. These parties are contractually bound to protect your data.

**Legal Requirements:** We may disclose information if required by law, court order, or governmental authority.

**Business Transfers:** In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction, subject to the same privacy protections.

**With Your Consent:** We may share information for purposes not described above with your explicit consent.`,
  },
  {
    id: 'cookies',
    title: '4. Cookies and Tracking',
    content: `We use cookies and similar tracking technologies to enhance your experience on ChrisTech. You can control cookie preferences through your browser settings or our Cookie Preference Center.

**Essential Cookies:** Required for the platform to function, including authentication, cart persistence, and security.

**Analytics Cookies:** Used to understand how visitors interact with our platform (Google Analytics, Mixpanel).

**Marketing Cookies:** Used to deliver relevant advertisements on third-party platforms (with your consent only).`,
  },
  {
    id: 'rights',
    title: '5. Your Privacy Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

- **Access:** Request a copy of the personal information we hold about you
- **Correction:** Request correction of inaccurate or incomplete data
- **Deletion:** Request deletion of your personal data, subject to legal retention requirements
- **Portability:** Request your data in a structured, machine-readable format
- **Objection:** Object to processing of your data for direct marketing purposes
- **Withdrawal of Consent:** Withdraw consent at any time where processing is based on consent

To exercise any of these rights, contact our Privacy Team at privacy@christech.com.ng. We will respond within 30 days.`,
  },
  {
    id: 'security',
    title: '6. Data Security',
    content: `ChrisTech employs industry-standard security measures to protect your personal information:

- 256-bit TLS/SSL encryption for all data in transit
- AES-256 encryption for sensitive data at rest
- PCI DSS Level 1 compliance for payment processing
- Regular third-party security audits and penetration testing
- Multi-factor authentication for all internal systems
- Strict access controls. Employees only access data on a need-to-know basis
- Automated threat detection and 24/7 security monitoring

Despite these measures, no internet transmission is 100% secure. We encourage you to use strong, unique passwords and enable two-factor authentication on your ChrisTech account.`,
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes described in this policy, plus any additional period required by law.

Account information is retained for the duration of your account plus 3 years after account closure. Order information is retained for 7 years to comply with tax and legal requirements. Marketing preferences are retained until you unsubscribe or request deletion.`,
  },
  {
    id: 'contact',
    title: '8. Contact Our Privacy Team',
    content: `For any privacy-related questions, requests, or concerns, contact:

**ChrisTech Privacy Team**
Email: privacy@christech.com.ng
Address: ChrisTech Nigeria Ltd, 87 Tetlow Rd, Owerri 460241, Imo State, Nigeria

For data enquiries, contact our Data Protection Officer at: dpo@christech.com.ng

This Privacy Policy was last updated on January 1, 2025. We will notify registered users of material changes via email.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="Last updated January 1, 2025. This policy explains how ChrisTech collects, uses, and protects your personal data."
      />

      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">
            {/* Table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-5">Contents</p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-slate-400 hover:text-white py-1.5 border-l-2 border-transparent hover:border-emerald-500 pl-4 transition-all duration-150"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-14 max-w-2xl">
              {sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="text-xl font-bold text-white mb-5 tracking-tight">{section.title}</h2>
                  <div className="space-y-4">
                    {section.content.split('\n\n').map((para, i) => {
                      if (para.startsWith('**') && para.includes(':**')) {
                        const [term, ...rest] = para.split(':**')
                        return (
                          <div key={i}>
                            <span className="text-sm font-bold text-white">{term.replace('**', '')}:</span>
                            <span className="text-sm text-slate-400 leading-relaxed"> {rest.join(':**')}</span>
                          </div>
                        )
                      }
                      if (para.startsWith('-')) {
                        return (
                          <ul key={i} className="space-y-2">
                            {para.split('\n').map((line, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                {line.replace(/^- \*\*(.+?)\*\*:/, (_, g) => g + ': ').replace(/^- /, '')}
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      return <p key={i} className="text-sm text-slate-400 leading-relaxed">{para}</p>
                    })}
                  </div>
                  <div className="mt-10 h-px bg-white/[0.06]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
