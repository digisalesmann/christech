'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { products, categories } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  X,
  ChevronDown,
  Menu,
  ArrowRight,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  Tablet,
  Gamepad2,
  Home,
  Package,
  LogOut,
  Star,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navCategories = [
  { icon: Smartphone, label: 'Smartphones', href: '/products?category=smartphones', count: '13 products' },
  { icon: Laptop, label: 'Laptops', href: '/products?category=laptops', count: '15 products' },
  { icon: Headphones, label: 'Audio', href: '/products?category=audio', count: '13 products' },
  { icon: Watch, label: 'Smartwatches', href: '/products?category=smartwatches', count: '5 products' },
  { icon: Camera, label: 'Cameras', href: '/products?category=cameras', count: '15 products' },
  { icon: Tablet, label: 'Tablets', href: '/products?category=tablets', count: '8 products' },
  { icon: Gamepad2, label: 'Gaming', href: '/products?category=gaming', count: '5 products' },
  { icon: Home, label: 'Smart Home', href: '/products?category=smart-home', count: '1 product' },
]

const featuredBrands = ['Apple', 'Samsung', 'Sony', 'Dell', 'ASUS', 'Bose', 'LG', 'Microsoft']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120)
  }
  const { itemCount, openCart } = useCartStore()
  const count = itemCount()
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
    router.push('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100)
    }
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMegaOpen(false)
        setMobileOpen(false)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const matchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q)
    ).slice(0, 6)
  }, [searchQuery])

  const matchedCategories = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return categories.filter((c) => c.label.toLowerCase().includes(q) || c.slug.includes(q))
  }, [searchQuery])

  const featuredProducts = useMemo(() => products.filter((p) => p.featured).slice(0, 4), [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  return (
    <>
      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-navy-950/95 backdrop-blur-2xl overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSearchOpen(false)
            }}
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12">
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, categories…"
                    className="w-full bg-white/[0.06] border border-white/10 rounded-2xl pl-14 pr-14 py-4 sm:py-5 text-white text-base sm:text-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>

                {/* ── Empty state: browse shortcuts ── */}
                {!searchQuery.trim() && (
                  <>
                    <div className="mt-8">
                      <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Browse Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-600/10 transition-all"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Featured Products</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {featuredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-all group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden relative">
                              <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply p-1" sizes="48px" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500">{product.brand}</p>
                              <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">{product.name}</p>
                              <p className="text-xs text-emerald-400 font-bold">{formatPrice(product.price)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ── Live results ── */}
                {searchQuery.trim() && (
                  <div className="mt-6">
                    {/* Category matches */}
                    {matchedCategories.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {matchedCategories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/products?category=${cat.slug}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-sm text-emerald-300 hover:bg-emerald-600/20 transition-all"
                            >
                              {cat.label}
                              <span className="text-xs text-emerald-500/70">{cat.productCount}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product matches */}
                    {matchedProducts.length > 0 ? (
                      <>
                        <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Products</p>
                        <div className="space-y-1">
                          {matchedProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-all group"
                            >
                              <div className="w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden relative">
                                <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply p-1" sizes="48px" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500">{product.brand} · {product.categoryLabel}</p>
                                <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">{product.name}</p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-sm font-bold text-white">{formatPrice(product.price)}</p>
                                {product.originalPrice && (
                                  <p className="text-xs text-slate-500 line-through">{formatPrice(product.originalPrice)}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={`/products?q=${encodeURIComponent(searchQuery.trim())}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                          className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-600/20 transition-all group"
                        >
                          <span className="text-sm font-semibold">
                            View all results for &ldquo;{searchQuery}&rdquo;
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </>
                    ) : matchedCategories.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-slate-400 mb-3">No results for &ldquo;{searchQuery}&rdquo;</p>
                        <Link
                          href="/products"
                          onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          Browse all products
                        </Link>
                      </div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[150] w-full max-w-sm bg-navy-900 border-l border-white/[0.06] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
              <Image src="/images/logo.png" alt="ChrisTech" width={606} height={442} className="h-8 w-auto object-contain" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auth banner */}
            {!user ? (
              <div className="mx-4 mt-4 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] shrink-0">
                <p className="text-sm text-slate-400 mb-3">Sign in to track orders and get personalised deals.</p>
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold text-center transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-white/[0.1] text-slate-300 hover:text-white text-sm font-semibold text-center transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mx-4 mt-4 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-white">
                    {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.displayName ?? 'Account'}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <Link href="/account" onClick={() => setMobileOpen(false)} className="text-xs text-emerald-400 font-semibold shrink-0">
                  View
                </Link>
              </div>
            )}

            {/* Scrollable nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              {/* Quick links */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { label: 'All Products', href: '/products', icon: Package },
                  { label: 'Deals', href: '/products?filter=deals', icon: ShoppingBag },
                  { label: 'New Arrivals', href: '/products?filter=new', icon: ArrowRight },
                  { label: 'Best Sellers', href: '/products?filter=bestseller', icon: Star },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-300 hover:text-white hover:border-emerald-500/20 hover:bg-emerald-600/5 transition-all text-sm font-medium"
                  >
                    <item.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Categories */}
              <p className="px-1 text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2">Categories</p>
              <div className="space-y-0.5 mb-5">
                {navCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </div>
                    <span className="text-xs text-slate-600">{cat.count.replace(' products', '').replace(' product', '')}</span>
                  </Link>
                ))}
              </div>

              {/* Bottom links */}
              <div className="border-t border-white/[0.06] pt-4 space-y-0.5">
                <Link href="/support" onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all">Support</Link>
                {user && (
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="w-full text-left px-3 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-white/[0.05] rounded-xl transition-all"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-navy-900/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px] gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <Image src="/images/logo.png" alt="ChrisTech" width={606} height={442} className="h-9 w-auto object-contain" />
            </Link>

            {/* Center nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all">
                Home
              </Link>

              {/* Products, triggers full-width mega menu */}
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button className="nav-link flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all">
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Link href="/products?filter=deals" className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all">
                Deals
              </Link>
              <Link href="/products?filter=new" className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all">
                New Arrivals
              </Link>
              <Link href="/support" className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all">
                Support
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 group"
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account"
                className="hidden md:flex p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Auth, logged out */}
              {!user && (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}

              {/* Auth, logged in */}
              {user && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200"
                  >
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.displayName ?? 'User'} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                        {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-2xl overflow-hidden py-1"
                        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)' }}
                      >
                        <div className="px-4 py-3 border-b border-white/[0.06]">
                          <p className="text-sm font-semibold text-white truncate">{user.displayName ?? 'User'}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                        <Link href="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all">
                          <User className="w-4 h-4" /> My Account
                        </Link>
                        <Link href="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all">
                          <Package className="w-4 h-4" /> Orders
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.05] transition-all border-t border-white/[0.06] mt-1">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 ml-1"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-width mega menu ── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="fixed top-[72px] left-0 right-0 z-[99] border-b border-white/[0.07]"
            style={{ background: 'rgba(8,15,26,0.98)', backdropFilter: 'blur(28px)' }}
          >
            <div className="section-container py-8">
              <div className="grid grid-cols-[1fr_1px_1fr_1px_260px] gap-8">

                {/* Col 1, first 4 categories */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-4">Shop by Category</p>
                  <div className="space-y-0.5">
                    {navCategories.slice(0, 4).map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <cat.icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{cat.label}</span>
                        </div>
                        <span className="text-xs text-slate-600 tabular-nums">{cat.count.replace(' products', '').replace(' product', '')}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white/[0.06]" />

                {/* Col 2, last 4 categories */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-4">&nbsp;</p>
                  <div className="space-y-0.5">
                    {navCategories.slice(4).map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <cat.icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{cat.label}</span>
                        </div>
                        <span className="text-xs text-slate-600 tabular-nums">{cat.count.replace(' products', '').replace(' product', '')}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white/[0.06]" />

                {/* Col 3, featured + brands */}
                <div className="space-y-7">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-3">Featured</p>
                    <div className="space-y-1">
                      {[
                        { tag: 'New', label: 'Latest Arrivals', sub: 'Fresh from the lab', href: '/products?filter=new' },
                        { tag: 'Sale', label: "Today's Offers", sub: 'Save up to 40%', href: '/products?filter=deals' },
                        { tag: 'Top', label: 'Best Sellers', sub: 'Customer favourites', href: '/products?filter=bestseller' },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMegaOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all group"
                        >
                          <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0 w-8 text-center">{item.tag}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.label}</p>
                            <p className="text-xs text-slate-600">{item.sub}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-3">Top Brands</p>
                    <div className="grid grid-cols-3 gap-1">
                      {featuredBrands.slice(0, 6).map((brand) => (
                        <Link
                          key={brand}
                          href={`/products?brand=${brand.toLowerCase()}`}
                          onClick={() => setMegaOpen(false)}
                          className="text-sm text-slate-400 hover:text-emerald-400 transition-colors py-1 font-medium"
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom bar */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <Link
                  href="/products"
                  onClick={() => setMegaOpen(false)}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View all products <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-xs text-slate-600">75 products across 8 categories</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
