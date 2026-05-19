'use client'

import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>
        <p className="section-label mb-4">Something Went Wrong</p>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-4">
          An unexpected error occurred.
        </h1>
        <p className="text-slate-400 mb-3 leading-relaxed">
          We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-600 font-mono mb-8">Error ID: {error.digest}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="btn-primary px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary px-8 py-4 rounded-full">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
