'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ArrowRight,
  Shield,
  ShoppingBag,
  Plus,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const navItems = [
  { icon: Package, label: 'Orders', id: 'orders' },
  { icon: Heart, label: 'Wishlist', id: 'wishlist' },
  { icon: MapPin, label: 'Addresses', id: 'addresses' },
  { icon: CreditCard, label: 'Payment', id: 'payment' },
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

function EmptyState({ icon: Icon, title, description, action }: {
  icon: React.ElementType
  title: string
  description: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-slate-600" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6">{description}</p>
      {action && (
        <Link href={action.href} className="btn-primary px-6 py-2.5 rounded-xl text-sm">
          {action.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

export default function AccountPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuthStore()
  const [activeSection, setActiveSection] = useState('orders')
  const [nameValue, setNameValue] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.displayName) setNameValue(user.displayName)
  }, [user])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) return
    setSavingProfile(true)
    try {
      await updateProfile(auth.currentUser, { displayName: nameValue })
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 2000)
    } finally {
      setSavingProfile(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const initials = (user.displayName ?? user.email ?? 'U')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const joinYear = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).getFullYear()
    : new Date().getFullYear()

  return (
    <div className="min-h-screen bg-navy-900">

      {/* ─── Header ─── */}
      <div className="relative pt-24 pb-0 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-full"
            style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(22,163,74,0.07) 0%, transparent 70%)' }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="section-container relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 pb-10">
            {/* Avatar */}
            <div className="relative w-fit shrink-0">
              {user.photoURL ? (
                <Image src={user.photoURL} alt={user.displayName ?? 'User'} width={80} height={80}
                  className="w-20 h-20 rounded-2xl object-cover shadow-2xl" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-2xl shadow-emerald-600/30">
                  <span className="text-2xl font-black text-white tracking-tighter">{initials}</span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-navy-900" />
            </div>

            {/* Identity */}
            <div className="flex-1">
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-1">
                ChrisTech Member since {joinYear}
              </p>
              <h1 className="text-3xl font-black tracking-tighter text-white mb-1">
                {user.displayName ?? 'Welcome'}
              </h1>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>

          </div>

          {/* Tab nav */}
          <div className="flex items-end gap-0 overflow-x-auto hide-scrollbar -mb-px">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-5 pt-3 pb-2.5 sm:py-4 text-[10px] sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 flex-1 sm:flex-none ${
                  activeSection === item.id
                    ? 'border-emerald-500 text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section content ─── */}
      <div className="section-container py-14">
        <AnimatePresence mode="wait">

          {/* ORDERS */}
          {activeSection === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="section-label mb-2">Purchase History</p>
                  <h2 className="text-3xl font-black tracking-tighter text-white">Your Orders</h2>
                </div>
                <Link href="/products" className="btn-ghost group hidden sm:flex">
                  Shop now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <EmptyState
                icon={ShoppingBag}
                title="No orders yet"
                description="When you place your first order, it will appear here with tracking and delivery details."
                action={{ label: 'Start Shopping', href: '/products' }}
              />
            </motion.div>
          )}

          {/* WISHLIST */}
          {activeSection === 'wishlist' && (
            <motion.div key="wishlist" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="mb-10">
                <p className="section-label mb-2">Saved Items</p>
                <h2 className="text-3xl font-black tracking-tighter text-white">Wishlist</h2>
              </div>
              <EmptyState
                icon={Heart}
                title="Your wishlist is empty"
                description="Save products you love by tapping the heart icon on any product card."
                action={{ label: 'Browse Products', href: '/products' }}
              />
            </motion.div>
          )}

          {/* ADDRESSES */}
          {activeSection === 'addresses' && (
            <motion.div key="addresses" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="mb-10">
                <p className="section-label mb-2">Saved Locations</p>
                <h2 className="text-3xl font-black tracking-tighter text-white">Addresses</h2>
              </div>
              <EmptyState
                icon={MapPin}
                title="No saved addresses"
                description="Add a delivery address to speed up checkout."
              />
              <div className="mt-4 flex">
                <button className="btn-secondary px-6 py-3 rounded-xl text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>
            </motion.div>
          )}

          {/* PAYMENT */}
          {activeSection === 'payment' && (
            <motion.div key="payment" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="mb-10">
                <p className="section-label mb-2">Saved Methods</p>
                <h2 className="text-3xl font-black tracking-tighter text-white">Payment</h2>
              </div>
              <EmptyState
                icon={CreditCard}
                title="No payment methods saved"
                description="Save a card or bank account for faster, one-click checkout."
              />
              <div className="mt-4 flex">
                <button className="btn-secondary px-6 py-3 rounded-xl text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Payment Method
                </button>
              </div>
            </motion.div>
          )}

          {/* PROFILE */}
          {activeSection === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="mb-10 max-w-xl">
                <p className="section-label mb-2">Account Details</p>
                <h2 className="text-3xl font-black tracking-tighter text-white">Your Profile</h2>
              </div>
              <form onSubmit={handleSaveProfile} className="max-w-xl space-y-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 tracking-wide block mb-2 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="input-field rounded-xl"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 tracking-wide block mb-2 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={user.email ?? ''}
                    disabled
                    className="input-field rounded-xl opacity-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-600 mt-1.5">Email cannot be changed here.</p>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="btn-primary px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 disabled:opacity-50"
                  >
                    {profileSaved ? 'Saved!' : savingProfile ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeSection === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="mb-10 max-w-xl">
                <p className="section-label mb-2">Preferences</p>
                <h2 className="text-3xl font-black tracking-tighter text-white">Settings</h2>
              </div>
              <div className="max-w-xl">
                <div className="divide-y divide-white/[0.06]">
                  {[
                    { label: 'Order Confirmation Emails', description: 'Receive email when an order is placed' },
                    { label: 'Shipping Update Notifications', description: 'Real-time shipping and delivery alerts' },
                    { label: 'Product Restock Alerts', description: 'Notify when wishlist items are back in stock' },
                    { label: 'Marketing Communications', description: 'Deals, new arrivals, and recommendations' },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between gap-6 py-5">
                      <div>
                        <p className="text-sm font-semibold text-white">{setting.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{setting.description}</p>
                      </div>
                      <button className="relative w-11 h-6 rounded-full bg-white/[0.1] shrink-0 transition-colors duration-200">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white/40 rounded-full" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-white/[0.06] mt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-400">Coming soon. Additional security features are on the way.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-red-500/10">
                  <p className="text-sm font-semibold text-white mb-1">Sign Out</p>
                  <p className="text-xs text-slate-400 mb-4">Sign out from all devices.</p>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>

                <div className="pt-8 mt-8 border-t border-red-500/10">
                  <p className="text-sm font-semibold text-white mb-1">Delete Account</p>
                  <p className="text-xs text-slate-400">To request account deletion, email us at <a href="mailto:support@christech.com.ng" className="text-emerald-400 hover:text-emerald-300 transition-colors">support@christech.com.ng</a>.</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
