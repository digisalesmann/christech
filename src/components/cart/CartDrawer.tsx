'use client'

import { useCartStore } from '@/store/cartStore'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore()
  const cartTotal = total()

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[120] w-full max-w-[440px] bg-navy-800 border-l border-white/[0.06] flex flex-col overflow-hidden"
            style={{ boxShadow: '-32px 0 80px rgba(0,0,0,0.6)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-lg tracking-tight">Your Cart</span>
                {items.length > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-0">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6">
                    <ShoppingBag className="w-7 h-7 text-slate-500" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-2">Your cart is empty</p>
                  <p className="text-slate-400 text-sm mb-8 max-w-[220px]">
                    Discover our premium collection of electronics and gadgets.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="btn-primary"
                  >
                    Browse Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={item.product.id}>
                      {index > 0 && <hr className="divider mb-6" />}
                      <div className="flex gap-4">
                        {/* Product image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06] shrink-0 relative">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[11px] font-semibold tracking-widest uppercase text-emerald-400 mb-0.5">
                                {item.product.brand}
                              </p>
                              <p className="text-sm font-semibold text-white leading-tight line-clamp-2">
                                {item.product.name}
                              </p>
                              {item.selectedColor && (
                                <p className="text-xs text-slate-500 mt-0.5">{item.selectedColor}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-slate-600 hover:text-red-400 transition-colors shrink-0 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-sm font-bold text-white">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-[11px] text-slate-500">
                                  {formatPrice(item.product.price)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/[0.06] shrink-0 space-y-4 bg-navy-900/50">
                {/* Shipping notice */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Free express shipping on orders over ₦50,000</span>
                  {cartTotal >= 99 && (
                    <span className="text-emerald-400 font-semibold">Applied</span>
                  )}
                </div>

                <hr className="divider" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Subtotal</p>
                    <p className="text-xs text-slate-500 mt-0.5">Tax calculated at checkout</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white tracking-tight">{formatPrice(cartTotal)}</p>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3">
                  <Link href="/checkout" onClick={closeCart} className="btn-primary w-full justify-center py-4 rounded-xl text-base">
                    Secure Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/cart" onClick={closeCart} className="btn-secondary w-full justify-center py-3.5 rounded-xl">
                    View Full Cart
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  {['Secure Payment', 'Free Returns', '2-Year Warranty'].map((badge) => (
                    <span key={badge} className="text-[10px] text-slate-500 font-medium tracking-wide">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
