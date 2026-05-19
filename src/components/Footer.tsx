import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter, Instagram, Youtube, Github } from 'lucide-react'

const links = {
  Products: [
    { label: 'Smartphones', href: '/products?category=smartphones' },
    { label: 'Laptops', href: '/products?category=laptops' },
    { label: 'Audio', href: '/products?category=audio' },
    { label: 'Smartwatches', href: '/products?category=smartwatches' },
    { label: 'Cameras', href: '/products?category=cameras' },
    { label: 'Gaming', href: '/products?category=gaming' },
  ],
  Company: [
    { label: 'About ChrisTech', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
    { label: 'Sustainability', href: '/sustainability' },
  ],
  Support: [
    { label: 'Help Center', href: '/support' },
    { label: 'Track Order', href: '/account' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Warranty Claims', href: '/warranty' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
}

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />

      <div className="section-container">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image src="/images/logo.png" alt="ChrisTech" width={606} height={442} className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-4">
              Nigeria&apos;s premier destination for premium electronics and gadgets. Delivering the latest technology across Owerri, Lagos, Abuja and beyond.
            </p>
            <div className="text-xs text-slate-500 mb-8 leading-relaxed">
              <p>87 Tetlow Rd, Owerri 460241</p>
              <p>Imo State, Nigeria</p>
              <p className="mt-1">support@christech.com.ng</p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-bold tracking-widest uppercase text-white mb-5">{group}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} ChrisTech Nigeria Ltd. All rights reserved.</p>
            <span className="hidden md:block w-px h-4 bg-white/[0.1]" />
            <p>RC: 7241093 · Owerri, Imo State, Nigeria</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
