import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help & Support',
  description: 'Find answers to common questions about orders, shipping, returns, and your ChrisTech account.',
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
