export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  categoryLabel: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  images: string[]
  badge?: 'New' | 'Hot' | 'Sale' | 'Limited'
  description: string
  shortDescription: string
  specs: Record<string, string>
  features: string[]
  stock: number
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
  colors?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
}

export interface Review {
  id: string
  author: string
  location: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  helpful: number
}

export interface Category {
  id: string
  slug: string
  label: string
  description: string
  productCount: number
  image: string
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
