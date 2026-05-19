'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Star } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, formatDiscount, cn } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  product: Product
  index?: number
}

const badgeClass: Record<string, string> = {
  New: 'badge-new',
  Hot: 'badge-hot',
  Sale: 'badge-sale',
  Limited: 'badge-limited',
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [wishlist, setWishlist] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setWishlist((v) => !v)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block relative"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-white rounded-2xl mb-5">
          {/* Blurred ambient fill, softens edges and fills dead space with product colour */}
          <Image
            src={product.image}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover scale-110 blur-2xl opacity-40 pointer-events-none"
            sizes="4px"
          />
          {/* Full product, multiply on white background: white areas vanish, colours stay vivid */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300" />

          {/* Badge */}
          {product.badge && (
            <div className={cn('absolute top-4 left-4', badgeClass[product.badge] ?? 'badge-new')}>
              {product.badge === 'Sale' && product.originalPrice
                ? `-${formatDiscount(product.originalPrice, product.price)}%`
                : product.badge}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          >
            <Heart
              className={cn('w-4 h-4 transition-colors', wishlist ? 'fill-red-400 text-red-400' : 'text-white')}
            />
          </button>

          {/* Quick add */}
          <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleAddToCart}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-navy-900 hover:bg-emerald-50'
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? 'Added to Cart' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="px-1">
          <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-white tracking-tight leading-snug mb-2 group-hover:text-emerald-300 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn('w-3 h-3', i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700')}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
