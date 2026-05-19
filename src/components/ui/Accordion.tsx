'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface Item {
  question: string
  answer: string
}

interface Props {
  items: Item[]
}

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors duration-200 group"
          >
            <span className="text-sm font-semibold text-white pr-6 leading-snug">{item.question}</span>
            <span className="shrink-0 w-6 h-6 rounded-full border border-white/[0.1] flex items-center justify-center text-slate-400 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-200">
              {open === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
