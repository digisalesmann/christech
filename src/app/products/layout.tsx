import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse ChrisTech\'s full catalog of smartphones, laptops, audio, cameras, tablets, gaming, and smart home devices.',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
