import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'ChrisTech | Smart gadgets, smart choices',
    template: '%s | ChrisTech',
  },
  description:
    'ChrisTech is Nigeria\'s premier destination for flagship electronics and gadgets. Shop the latest smartphones, laptops, audio, and more, delivered across Owerri, Lagos, Abuja and nationwide.',
  keywords: ['electronics', 'gadgets', 'smartphones', 'laptops', 'audio', 'technology', 'Nigeria', 'Owerri', 'Imo'],
  openGraph: {
    title: 'ChrisTech, Nigeria\'s Premium Tech Store',
    description: 'Nigeria\'s premier destination for flagship electronics and gadgets.',
    type: 'website',
    locale: 'en_NG',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-navy-900 text-white antialiased">
        <AuthProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
