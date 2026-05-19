'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Shield, Lock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { formatPrice } from '@/lib/utils'

const steps = ['Contact', 'Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const { items, total, clearCart } = useCartStore()
  const { user, loading } = useAuthStore()
  const cartTotal = total()

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login'
    }
  }, [user, loading])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nigeria',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveInfo: false,
  })

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }))

  const handleNext = () => {
    if (step < steps.length - 1) setStep((s) => s + 1)
    else {
      setComplete(true)
      clearCart()
    }
  }

  if (complete) {
    return (
      <div className="min-h-screen bg-navy-900 pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg px-6"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Order Confirmed</h1>
          <p className="text-slate-400 mb-3 text-lg">Thank you for your purchase.</p>
          <p className="text-slate-500 text-sm mb-10">
            Order #CT-{Math.random().toString(36).substring(2, 10).toUpperCase()} has been placed.
            A confirmation email will be sent to <span className="text-white">{form.email || 'your email'}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account" className="btn-primary px-8 py-4 rounded-full">
              Track Your Order
            </Link>
            <Link href="/products" className="btn-secondary px-8 py-4 rounded-full">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 pt-24">
      <div className="section-container py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">V5</div>
            <span className="font-bold text-white tracking-tight">ChrisTech</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Lock className="w-4 h-4" />
            <span className="font-semibold">SSL Secured Checkout</span>
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex items-center mb-12 max-w-2xl">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? 'bg-emerald-600 text-white' :
                    i === step ? 'bg-emerald-600 text-white ring-4 ring-emerald-600/20' :
                    'bg-white/[0.06] text-slate-500 border border-white/[0.1]'
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${i === step ? 'text-white' : 'text-slate-500'}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 mt-[-12px] transition-colors ${i < step ? 'bg-emerald-600' : 'bg-white/[0.08]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-black tracking-tight text-white mb-8">Contact Information</h2>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Email Address</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">First Name</label>
                    <input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First" className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Last Name</label>
                    <input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+234 (0) 803 000 0000" className="input-field" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-black tracking-tight text-white mb-8">Shipping Address</h2>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Street Address</label>
                  <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="123 Main Street" className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">City</label>
                    <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Lagos" className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">State / Province</label>
                    <input type="text" value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="NY" className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">ZIP / Postal Code</label>
                    <input type="text" value={form.zip} onChange={(e) => update('zip', e.target.value)} placeholder="10001" className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Country</label>
                    <input type="text" value={form.country} onChange={(e) => update('country', e.target.value)} className="input-field" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-black tracking-tight text-white mb-8">Payment Details</h2>
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-600/5 flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-slate-300">Your payment information is encrypted and secure.</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Name on Card</label>
                  <input type="text" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} placeholder="John Smith" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Card Number</label>
                  <input type="text" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">Expiry Date</label>
                    <input type="text" value={form.expiry} onChange={(e) => update('expiry', e.target.value)} placeholder="MM / YY" className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block mb-2">CVV</label>
                    <input type="text" value={form.cvv} onChange={(e) => update('cvv', e.target.value)} placeholder="123" maxLength={4} className="input-field" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white mb-8">Review Your Order</h2>
                <div className="space-y-6">
                  {[
                    { label: 'Contact', value: form.email || 'Not provided' },
                    { label: 'Ship to', value: [form.address, form.city, form.state, form.zip, form.country].filter(Boolean).join(', ') || 'Not provided' },
                    { label: 'Payment', value: form.cardNumber ? `•••• •••• •••• ${form.cardNumber.slice(-4)}` : 'Not provided' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-4 border-b border-white/[0.06]">
                      <span className="text-sm text-slate-500 font-medium w-24">{row.label}</span>
                      <span className="text-sm text-white flex-1 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.06]">
              {step > 0 ? (
                <button onClick={() => setStep((s) => s - 1)} className="btn-secondary px-6 py-3 rounded-xl">
                  Back
                </button>
              ) : (
                <Link href="/cart" className="btn-ghost">
                  Return to Cart
                </Link>
              )}
              <button
                onClick={handleNext}
                className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-emerald-600/25"
              >
                {step === steps.length - 1 ? 'Place Order' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Order summary sidebar */}
          <div>
            <div className="sticky top-24 border border-white/[0.08] rounded-2xl p-6 bg-white/[0.02]">
              <h3 className="text-sm font-bold text-white mb-5 tracking-tight">Order Summary</h3>
              <div className="space-y-4 mb-5 max-h-64 overflow-y-auto hide-scrollbar">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-navy-700 border border-white/[0.06] shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white leading-tight line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.product.brand}</p>
                    </div>
                    <p className="text-sm font-bold text-white shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <hr className="divider mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className={cartTotal >= 99 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                    {cartTotal >= 99 ? 'Free' : formatPrice(9.99)}
                  </span>
                </div>
              </div>
              <hr className="divider my-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Total</span>
                <span className="text-2xl font-black text-white tracking-tight">
                  {formatPrice(cartTotal >= 99 ? cartTotal : cartTotal + 9.99)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
