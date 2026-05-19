import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ChrisTech Terms of Service, the rules and conditions governing use of our platform.',
}

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the ChrisTech platform, including our website, mobile applications, and related services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use our services. ChrisTech reserves the right to modify these Terms at any time; continued use of the platform constitutes acceptance of the updated Terms.',
  },
  {
    id: 'accounts',
    title: '2. User Accounts',
    content: 'You must be at least 18 years of age or the age of majority in your jurisdiction to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information and keep it updated. ChrisTech reserves the right to terminate accounts that violate these Terms.',
  },
  {
    id: 'purchases',
    title: '3. Orders and Purchases',
    content: 'All product listings are subject to availability. Prices are displayed in USD and may vary by region. ChrisTech reserves the right to correct pricing errors and to refuse or cancel orders placed at incorrect prices. Your order constitutes an offer to purchase; a contract is formed only when we send you an order confirmation email. Delivery timelines are estimates and may vary based on your location and carrier.',
  },
  {
    id: 'returns',
    title: '4. Returns and Refunds',
    content: 'Products may be returned within 30 days of delivery in accordance with our Returns Policy. Refunds are issued to the original payment method. ChrisTech reserves the right to refuse returns that do not comply with our Returns Policy. See our Returns & Exchanges page for complete details.',
  },
  {
    id: 'prohibited',
    title: '5. Prohibited Conduct',
    content: 'You agree not to: (a) use the platform for any unlawful purpose; (b) attempt to gain unauthorized access to any portion of the platform; (c) engage in fraudulent activities including submitting false orders; (d) scrape, mine, or harvest data from the platform without written consent; (e) post false or misleading reviews; (f) interfere with the platform\'s operation through any automated means; (g) resell products purchased on ChrisTech in violation of manufacturer restrictions.',
  },
  {
    id: 'ip',
    title: '6. Intellectual Property',
    content: 'All content on the ChrisTech platform, including text, graphics, logos, images, and software, is the property of ChrisTech International Ltd or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.',
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: 'To the maximum extent permitted by law, ChrisTech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or products purchased. Our total liability for any claim arising from these Terms shall not exceed the amount you paid for the specific product or service giving rise to the claim.',
  },
  {
    id: 'governing',
    title: '8. Governing Law',
    content: 'These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict of law principles. Any disputes shall be resolved by the appropriate courts in Imo State, Nigeria. You waive the right to participate in class action lawsuits to the extent permitted by applicable law.',
  },
  {
    id: 'contact',
    title: '9. Contact',
    content: 'For questions about these Terms, contact our Legal Team at legal@christech.com.ng. ChrisTech Nigeria Ltd, 87 Tetlow Rd, Owerri 460241, Imo State, Nigeria.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <PageHero
        label="Legal"
        title="Terms of Service"
        description="Last updated January 1, 2025. Please read these Terms carefully before using ChrisTech."
      />
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-5">Contents</p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="block text-sm text-slate-400 hover:text-white py-1.5 border-l-2 border-transparent hover:border-emerald-500 pl-4 transition-all duration-150">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
            <div className="space-y-12 max-w-2xl">
              {sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2 className="text-xl font-bold text-white mb-4 tracking-tight">{section.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{section.content}</p>
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
