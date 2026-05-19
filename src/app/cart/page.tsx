'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const cartTotal = total()
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const shipping = cartTotal >= 99 ? 0 : 9.99
  const orderTotal = cartTotal - discount + shipping

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return (
    <div className="min-h-screen bg-navy-900 pt-24">
      <div className="section-container py-12">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingBag className="w-6 h-6 text-emerald-400" />
          <h1 className="text-3xl font-black tracking-tighter text-white">
            Shopping Cart
            {items.length > 0 && (
              <span className="ml-3 text-lg text-slate-400 font-normal">({items.length} items)</span>
            )}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-28">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Your cart is empty</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Explore our premium collection of electronics and gadgets.
            </p>
            <Link href="/products" className="btn-primary px-10 py-4 rounded-full shadow-lg shadow-emerald-600/25">
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            {/* Cart items */}
            <div className="space-y-0">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[1fr_120px_120px_40px] gap-4 pb-4 border-b border-white/[0.06] text-xs font-bold tracking-widest uppercase text-slate-500">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
                <span />
              </div>

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_40px] gap-6 items-center py-8 border-b border-white/[0.06]"
                  >
                    {/* Product */}
                    <div className="flex gap-5">
                      <Link href={`/products/${item.product.slug}`}>
                        <div className="w-24 h-20 rounded-xl overflow-hidden bg-navy-800 relative shrink-0 border border-white/[0.06]">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="96px" />
                        </div>
                      </Link>
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-1">{item.product.brand}</p>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors leading-snug mb-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.selectedColor && (
                          <p className="text-xs text-slate-500">{item.selectedColor}</p>
                        )}
                        <p className="text-sm font-bold text-white mt-2">{formatPrice(item.product.price)}</p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-start md:justify-center">
                      <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-lg p-1 gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="text-base font-bold text-white">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="sticky top-24 border border-white/[0.08] rounded-2xl p-8 bg-white/[0.02]">
                <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Order Summary</h2>

                {/* Promo code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="input-field pl-10 rounded-xl"
                        disabled={promoApplied}
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (promoCode.trim().toUpperCase() === 'CHRISTECH10') {
                          setPromoApplied(true)
                        } else if (promoCode.trim()) {
                          setPromoApplied(false)
                          alert('Invalid promo code.')
                        }
                      }}
                      className="px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm font-semibold text-white hover:bg-white/[0.1] transition-colors whitespace-nowrap"
                      disabled={promoApplied}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-400 mt-2 font-medium">10% discount applied!</p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 pb-6 border-b border-white/[0.06]">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="text-white">{formatPrice(cartTotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-400">
                      <span>Promo discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className={shipping === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-slate-500">
                      Add {formatPrice(99 - cartTotal)} more for free shipping
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-6">
                  <span className="text-lg font-bold text-white">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-white tracking-tight">{formatPrice(orderTotal)}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Tax calculated at checkout</div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="btn-primary w-full justify-center py-4 rounded-xl text-base shadow-lg shadow-emerald-600/25"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link href="/products" className="btn-ghost w-full justify-center mt-3">
                  Continue Shopping
                </Link>

                {/* Trust */}
                <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2">
                  {['SSL Encrypted Checkout', 'Free Returns within 30 Days', '2-Year Warranty Included'].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
