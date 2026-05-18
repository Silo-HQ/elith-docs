import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DocPage } from '@/types/docs'

interface PaginationProps {
  prev: DocPage | null
  next: DocPage | null
}

export default function Pagination({ prev, next }: PaginationProps) {
  if (!prev && !next) {
    return null
  }

  return (
    <nav className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-divider">
      {prev ? (
        <Link
          href={`/docs/en/${prev.slug}`}
          className="flex items-center gap-2 px-4 py-3 border border-border hover:border-primary transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-primary" />
          <div className="text-left">
            <div className="font-mono text-[11px] text-text-muted mb-1">Previous</div>
            <div className="font-mono text-[13px] text-text group-hover:text-primary">
              {prev.frontmatter.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/en/${next.slug}`}
          className="flex items-center gap-2 px-4 py-3 border border-border hover:border-primary transition-colors group ml-auto"
        >
          <div className="text-right">
            <div className="font-mono text-[11px] text-text-muted mb-1">Next</div>
            <div className="font-mono text-[13px] text-text group-hover:text-primary">
              {next.frontmatter.title}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}

// Made with Bob
