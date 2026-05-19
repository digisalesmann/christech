'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/data/products'
import type { SortOption } from '@/types'

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₦200k', min: 0, max: 200000 },
  { label: '₦200k – ₦500k', min: 200000, max: 500000 },
  { label: '₦500k – ₦1.5M', min: 500000, max: 1500000 },
  { label: '₦1.5M – ₦4M', min: 1500000, max: 4000000 },
  { label: 'Over ₦4M', min: 4000000, max: Infinity },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

const allBrands = Array.from(
  products.reduce((map, p) => {
    map.set(p.brand, (map.get(p.brand) ?? 0) + 1)
    return map
  }, new Map<string, number>())
).sort((a, b) => b[1] - a[1])

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') ?? ''
  const filterParam = searchParams.get('filter') ?? ''
  const qParam = searchParams.get('q') ?? ''
  const brandParam = searchParams.get('brand') ?? ''

  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [activeBrand, setActiveBrand] = useState(
    brandParam ? allBrands.find(([b]) => b.toLowerCase() === brandParam.toLowerCase())?.[0] ?? '' : ''
  )
  const [priceRange, setPriceRange] = useState(0)
  const [sort, setSort] = useState<SortOption>('featured')
  const [search, setSearch] = useState(qParam)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => { setSearch(qParam) }, [qParam])
  useEffect(() => { setActiveCategory(categoryParam) }, [categoryParam])
  useEffect(() => {
    setActiveBrand(
      brandParam ? allBrands.find(([b]) => b.toLowerCase() === brandParam.toLowerCase())?.[0] ?? '' : ''
    )
  }, [brandParam])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }

    if (activeCategory) result = result.filter((p) => p.category === activeCategory)
    if (activeBrand) result = result.filter((p) => p.brand.toLowerCase() === activeBrand.toLowerCase())

    if (filterParam === 'new') result = result.filter((p) => p.newArrival)
    if (filterParam === 'bestseller') result = result.filter((p) => p.bestSeller)
    if (filterParam === 'deals') result = result.filter((p) => !!p.originalPrice)

    const range = priceRanges[priceRange]
    result = result.filter((p) => p.price >= range.min && p.price <= range.max)

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (sort === 'newest') result = result.filter((p) => p.newArrival).concat(result.filter((p) => !p.newArrival))

    return result
  }, [activeCategory, activeBrand, priceRange, sort, search, filterParam])

  const clearAll = () => {
    setActiveCategory('')
    setActiveBrand('')
    setPriceRange(0)
    setSearch('')
  }

  const activeFilterCount = [activeCategory, activeBrand, priceRange > 0, search].filter(Boolean).length

  const pageLabel = activeBrand
    ? activeBrand
    : activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.label ?? 'Products'
    : filterParam === 'new' ? 'New Arrivals'
    : filterParam === 'deals' ? 'Deals'
    : filterParam === 'bestseller' ? 'Best Sellers'
    : 'All Products'

  return (
    <div className="min-h-screen bg-navy-900 pt-24">
      {/* Page header */}
      <div className="section-container pt-12 pb-8 border-b border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="section-label mb-2">{pageLabel}</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
              {filtered.length.toLocaleString()} Products
            </h1>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 rounded-xl"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {activeBrand && (
              <button
                onClick={() => setActiveBrand('')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-600/25 transition-colors"
              >
                {activeBrand} <X className="w-3 h-3" />
              </button>
            )}
            {activeCategory && (
              <button
                onClick={() => setActiveCategory('')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-600/25 transition-colors"
              >
                {categories.find((c) => c.slug === activeCategory)?.label} <X className="w-3 h-3" />
              </button>
            )}
            {priceRange > 0 && (
              <button
                onClick={() => setPriceRange(0)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-600/25 transition-colors"
              >
                {priceRanges[priceRange].label} <X className="w-3 h-3" />
              </button>
            )}
            <button onClick={clearAll} className="text-xs text-slate-500 hover:text-white transition-colors ml-1">
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="section-container py-10">
        <div className="flex gap-10">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-7 pr-1">

              {/* Category */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Category</p>
                <div className="space-y-0.5">
                  <button
                    onClick={() => setActiveCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${
                      !activeCategory ? 'text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(activeCategory === cat.slug ? '' : cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${
                        activeCategory === cat.slug ? 'text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                      <span className="text-[11px] text-slate-600">{cat.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.06]" />

              {/* Brand */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Brand</p>
                <div className="space-y-0.5">
                  <button
                    onClick={() => setActiveBrand('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      !activeBrand ? 'text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Brands
                  </button>
                  {allBrands.map(([brand, count]) => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(activeBrand === brand ? '' : brand)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex justify-between items-center ${
                        activeBrand === brand ? 'text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {brand}
                      <span className="text-[11px] text-slate-600">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.06]" />

              {/* Price Range */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Price Range</p>
                <div className="space-y-0.5">
                  {priceRanges.map((range, i) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(i)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        priceRange === i ? 'text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between gap-3 mb-8">
              <p className="text-sm text-slate-400 whitespace-nowrap shrink-0">
                <span className="text-white font-semibold">{filtered.length}</span> results
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden xs:inline">Filters</span>
                  {activeFilterCount > 0 && <span className="text-emerald-400">({activeFilterCount})</span>}
                </button>

                {/* Custom sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm text-white hover:border-white/20 transition-colors"
                  >
                    <span>{sortOptions.find((o) => o.value === sort)?.label}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {sortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                      <div className="absolute right-0 top-full mt-1.5 w-44 z-20 rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40"
                        style={{ background: 'rgba(10,18,32,0.98)', backdropFilter: 'blur(20px)' }}
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSort(opt.value); setSortOpen(false) }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              sort === opt.value
                                ? 'text-emerald-400 bg-emerald-600/10'
                                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile filter drawer */}
            {filtersOpen && (
              <div className="lg:hidden mb-6 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white">Filters</p>
                  <button onClick={() => setFiltersOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(activeCategory === cat.slug ? '' : cat.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeCategory === cat.slug ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Brand</p>
                  <div className="flex flex-wrap gap-2">
                    {allBrands.map(([brand]) => (
                      <button
                        key={brand}
                        onClick={() => setActiveBrand(activeBrand === brand ? '' : brand)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeBrand === brand ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Price Range</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          priceRange === i ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-slate-400 text-lg mb-2">No products match your filters.</p>
                <button onClick={clearAll} className="btn-ghost mt-4">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-900 pt-24" />}>
      <ProductsContent />
    </Suspense>
  )
}
