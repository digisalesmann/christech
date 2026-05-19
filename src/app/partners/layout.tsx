import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Join the ChrisTech partner program. Earn commissions, access exclusive inventory, and grow with Nigeria\'s premier tech retailer.',
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
