'use client'

import { useState, use, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  ChevronLeft,
  Shield,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { formatPrice, formatDiscount } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Props {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const displayImages = [product.image, ...product.images.filter((img) => img !== product.image)]

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview')
  const { addItem } = useCartStore()
  const { user } = useAuthStore()

  type Review = { id: string; name: string; rating: number; title: string; body: string; createdAt: Timestamp | null }
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsLoaded, setReviewsLoaded] = useState(false)
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, title: '', body: '' })
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviewError, setReviewError] = useState('')

  useEffect(() => {
    if (activeTab !== 'reviews' || reviewsLoaded) return
    const q = query(
      collection(db, 'product_reviews'),
      where('productSlug', '==', slug),
      orderBy('createdAt', 'desc')
    )
    getDocs(q).then((snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review)))
      setReviewsLoaded(true)
    })
  }, [activeTab, reviewsLoaded, slug])

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewForm.rating) return
    setReviewSubmitting(true)
    setReviewError('')
    try {
      const data = {
        productSlug: slug,
        name: reviewForm.name.trim() || (user?.displayName ?? 'Anonymous'),
        rating: reviewForm.rating,
        title: reviewForm.title.trim(),
        body: reviewForm.body.trim(),
        createdAt: serverTimestamp(),
      }
      const ref = await addDoc(collection(db, 'product_reviews'), data)
      setReviews((prev) => [{ id: ref.id, ...data, createdAt: null }, ...prev])
      setReviewForm({ name: '', rating: 0, title: '', body: '' })
      setReviewSubmitted(true)
    } catch {
      setReviewError('Failed to submit review. Please try again.')
    } finally {
      setReviewSubmitting(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-navy-900 pt-24 overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="section-container pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link href="/products" className="hover:text-white transition-colors shrink-0">Products</Link>
          <span className="shrink-0">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors shrink-0">
            {product.categoryLabel}
          </Link>
          <span className="shrink-0">/</span>
          <span className="text-slate-300 truncate min-w-0">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left, Images */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4">
              <Image
                src={displayImages[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-6 mix-blend-multiply"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail strip */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 bg-white transition-all duration-200 ${
                      activeImage === i ? 'border-emerald-500' : 'border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-contain mix-blend-multiply p-1" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right, Info */}
          <div>
            {/* Brand + Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">{product.brand}</span>
              {product.badge && (
                <span className={`badge ${
                  product.badge === 'New' ? 'badge-new' :
                  product.badge === 'Hot' ? 'badge-hot' :
                  product.badge === 'Sale' ? 'badge-sale' : 'badge-limited'
                }`}>
                  {product.badge === 'Sale' && product.originalPrice
                    ? `-${formatDiscount(product.originalPrice, product.price)}%`
                    : product.badge}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                ))}
              </div>
              <span className="text-sm text-white font-semibold">{product.rating}</span>
              <span className="text-sm text-slate-500">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center flex-wrap gap-3 mb-6 pb-6 border-b border-white/[0.06]">
              <span className="text-4xl font-black text-white tracking-tight">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="badge-sale text-sm px-3 py-1">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="text-slate-400 leading-relaxed mb-8">{product.shortDescription}</p>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-white mb-3">
                  Color: <span className="text-slate-400 font-normal">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-emerald-500 bg-emerald-600/20 text-emerald-300'
                          : 'border-white/[0.1] text-slate-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="mb-8 space-y-3">
              {/* Row 1: quantity + wishlist + share */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1" />
                <button
                  onClick={() => setWishlist((v) => !v)}
                  className="w-12 h-12 rounded-xl border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-400 text-red-400' : ''}`} />
                </button>
                <button className="w-12 h-12 rounded-xl border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Row 2: Add to cart full width */}
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  added
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40'
                }`}
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Stock indicator */}
            {product.stock < 20 && (
              <p className="text-sm text-orange-400 font-medium mb-6">
                Only {product.stock} left in stock, order soon.
              </p>
            )}

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/[0.06]">
              {[
                { icon: Shield, label: '2-Year Warranty', sub: 'Full coverage' },
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over ₦50k' },
                { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight">{item.label}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Overview / Specs / Reviews */}
      <div className="border-t border-white/[0.06]">
        <div className="section-container">
          <div className="flex items-center gap-1 border-b border-white/[0.06] overflow-x-auto hide-scrollbar">
            {(['overview', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-emerald-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-12">
            {activeTab === 'overview' && (
              <div className="max-w-3xl">
                <p className="text-slate-300 leading-relaxed text-base mb-8">{product.description}</p>
                <h3 className="text-lg font-bold text-white mb-5 tracking-tight">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <div className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div key={key} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <div className="px-4 sm:px-6 py-4 text-sm font-semibold text-slate-400 break-words">{key}</div>
                      <div className="px-4 sm:px-6 py-4 text-sm text-white border-l border-white/[0.06] break-words min-w-0">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                {/* Rating summary */}
                <div className="flex items-center gap-4 mb-10 p-6 border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                  <div className="text-center shrink-0">
                    <div className="text-6xl font-black text-white tracking-tighter">{product.rating}</div>
                    <div className="flex items-center gap-1 justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{product.reviewCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2 pl-6 border-l border-white/[0.06]">
                    {[5, 4, 3, 2, 1].map((n) => {
                      const pct = n === 5 ? 78 : n === 4 ? 14 : n === 3 ? 5 : n === 2 ? 2 : 1
                      return (
                        <div key={n} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-3">{n}</span>
                          <div className="flex-1 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-slate-500 w-7 text-right">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Write a review */}
                <div className="mb-10 p-6 border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                  <h3 className="text-base font-bold text-white mb-5">Write a Review</h3>
                  {reviewSubmitted ? (
                    <div className="flex items-center gap-3 py-4 text-emerald-400">
                      <Check className="w-5 h-5" />
                      <p className="font-semibold">Thank you! Your review has been submitted.</p>
                    </div>
                  ) : (
                    <form onSubmit={submitReview} className="space-y-4">
                      {/* Star rating picker */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-2">Your Rating <span className="text-red-400">*</span></p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onMouseEnter={() => setHoverRating(n)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setReviewForm((f) => ({ ...f, rating: n }))}
                              className="p-0.5"
                            >
                              <Star className={`w-7 h-7 transition-colors ${
                                n <= (hoverRating || reviewForm.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-700'
                              }`} />
                            </button>
                          ))}
                          {reviewForm.rating > 0 && (
                            <span className="text-xs text-slate-500 ml-2">
                              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewForm.rating]}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-400 block mb-1.5">Name</label>
                          <input
                            type="text"
                            value={reviewForm.name}
                            onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder={user?.displayName ?? 'Anonymous'}
                            className="input-field rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-400 block mb-1.5">Review Title</label>
                          <input
                            type="text"
                            value={reviewForm.title}
                            onChange={(e) => setReviewForm((f) => ({ ...f, title: e.target.value }))}
                            placeholder="Summarise your experience"
                            className="input-field rounded-xl text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1.5">Review <span className="text-red-400">*</span></label>
                        <textarea
                          value={reviewForm.body}
                          onChange={(e) => setReviewForm((f) => ({ ...f, body: e.target.value }))}
                          placeholder="Share your experience with this product…"
                          required
                          rows={4}
                          className="input-field rounded-xl text-sm w-full resize-none"
                        />
                      </div>

                      {reviewError && <p className="text-sm text-red-400">{reviewError}</p>}

                      <button
                        type="submit"
                        disabled={reviewSubmitting || !reviewForm.rating || !reviewForm.body.trim()}
                        className="btn-primary px-6 py-2.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reviewSubmitting ? 'Submitting…' : 'Submit Review'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Review list */}
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">Customer Reviews</h3>
                    {reviews.map((r) => (
                      <div key={r.id} className="p-5 border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <p className="text-sm font-semibold text-white">{r.name}</p>
                            {r.title && <p className="text-sm text-slate-300 mt-0.5">{r.title}</p>}
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{r.body}</p>
                        {r.createdAt && (
                          <p className="text-xs text-slate-600 mt-3">
                            {r.createdAt.toDate?.().toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : reviewsLoaded ? (
                  <p className="text-sm text-slate-500">No reviews yet. Be the first to review this product.</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 border-t border-white/[0.06] bg-navy-800">
          <div className="section-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-2">More Like This</p>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Related Products</h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="btn-ghost">
                View all <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
