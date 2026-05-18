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
        <h4 className="font-mono text-[10px] text-text-faint uppercase tracking-[0.08em] mb-3">
          ON THIS PAGE
        </h4>
        <ul className="space-y-1">
          {headings.map(heading => {
            const isActive = activeId === heading.id
            const isNested = heading.level > 2
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(heading.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      window.history.pushState(null, '', `#${heading.id}`)
                    }
                  }}
                  className={`block font-mono transition-colors ${
                    isNested ? 'text-[11px] pl-[22px]' : 'text-[12px] pl-[10px]'
                  } ${
                    isActive
                      ? 'text-primary border-l-2 border-primary'
                      : 'text-text-faint hover:text-text border-l-2 border-transparent'
                  }`}
                  style={{ paddingTop: '4px', paddingBottom: '4px' }}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

// Made with Bob
