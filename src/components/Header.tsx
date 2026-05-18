'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg">
      <div className="container mx-auto px-4">
        <div className="flex h-11 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Logo variant="full" />
            </Link>
            <span className="font-mono text-xs text-text-faint">(v0.1.0)</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
            <Link
              href="https://elith.lovable.app/#problem"
              className="text-text-muted hover:text-text transition-colors"
            >
              platform
            </Link>
            <Link
              href="https://elith.lovable.app/#how"
              className="text-text-muted hover:text-text transition-colors"
            >
              how
            </Link>
            <Link
              href="https://elith.lovable.app/#agents"
              className="text-text-muted hover:text-text transition-colors"
            >
              agents
            </Link>
            <Link
              href="https://elith.lovable.app/#install"
              className="text-text-muted hover:text-text transition-colors"
            >
              install
            </Link>
            <Link
              href="/docs/en/overview"
              className="text-primary font-medium"
            >
              docs
            </Link>
            <Link
              href="https://github.com/Silo-HQ/elith"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text transition-colors"
            >
              GitHub↗
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/docs/en/installation"
              className="hidden md:block px-3 py-1 bg-text text-bg hover:opacity-90 transition-opacity font-mono text-xs"
              style={{ borderRadius: '2px' }}
            >
              [ install ]
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3 font-mono text-xs">
            <Link
              href="https://elith.lovable.app/#problem"
              className="text-text-muted hover:text-text transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              platform
            </Link>
            <Link
              href="https://elith.lovable.app/#how"
              className="text-text-muted hover:text-text transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              how
            </Link>
            <Link
              href="https://elith.lovable.app/#agents"
              className="text-text-muted hover:text-text transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              agents
            </Link>
            <Link
              href="https://elith.lovable.app/#install"
              className="text-text-muted hover:text-text transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              install
            </Link>
            <Link
              href="/docs/en/overview"
              className="text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              docs
            </Link>
            <Link
              href="https://github.com/Silo-HQ/elith"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text transition-colors py-2 flex items-center gap-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github className="w-4 h-4" />
              <span>GitHub↗</span>
            </Link>
            <Link
              href="/docs/en/installation"
              className="mt-2 px-3 py-2 bg-text text-bg hover:opacity-90 transition-opacity text-center"
              style={{ borderRadius: '2px' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              [ install ]
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

// Made with Bob
