import HeroSection from '@/components/HeroSection'
import CategoryShowcase from '@/components/sections/CategoryShowcase'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import FeaturedCollection from '@/components/sections/FeaturedCollection'
import TrustSection from '@/components/sections/TrustSection'
import Newsletter from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <FeaturedCollection />
      <TrustSection />
      <Newsletter />
    </>
  )
}
