'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { SearchResult } from '@/types/docs'
import Link from 'next/link'

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    try {
      const response = await fetch('/search-index.json')
      const data: SearchResult[] = await response.json()
      const filtered = data.filter(
        item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setResults(filtered.slice(0, 10))
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query)
    }, 200)
    return () => clearTimeout(timer)
  }, [query, handleSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].href
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border hover:border-primary transition-colors font-mono text-sm text-text-muted"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
        <kbd className="px-1.5 py-0.5 text-xs bg-surface-offset rounded">⌘K</kbd>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-bg border border-primary rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-divider">
          <Search className="w-5 h-5 text-primary" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-text placeholder:text-text-muted"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-surface-offset rounded transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <Link
                key={result.href}
                href={result.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 border-b border-divider last:border-b-0 transition-colors ${
                  index === selectedIndex
                    ? 'bg-surface-offset'
                    : 'hover:bg-surface-offset'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {result.annotation && (
                    <span className="font-mono text-xs text-primary">
                      {result.annotation}
                    </span>
                  )}
                  <span className="font-mono text-sm text-text">
                    {result.title}
                  </span>
                </div>
                <p className="text-sm text-text-muted line-clamp-2">
                  {result.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-center text-text-muted font-mono text-sm">
            No results found for &ldquo;{query}&rdquo;
          </div>
        )}

        {query.length < 2 && (
          <div className="px-4 py-8 text-center text-text-muted font-mono text-sm">
            Type at least 2 characters to search
          </div>
        )}
      </div>
    </div>
  )
}

// Made with Bob
