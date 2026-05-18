'use client'

import { useEffect, useState } from 'react'
import { Heading } from '@/types/docs'

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <aside className="hidden xl:block w-52 fixed right-0 top-12 bottom-0 overflow-y-auto p-6">
      <nav>
        <h4 className="font-mono text-xs text-text-faint uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul className="space-y-2">
          {headings.map(heading => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block font-mono text-xs transition-colors ${
                  activeId === heading.id
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

// Made with Bob
