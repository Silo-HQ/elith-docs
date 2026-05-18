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
    <nav className="flex items-center justify-between gap-4 pt-6 mt-12 border-t border-border">
      {prev ? (
        <Link
          href={`/docs/en/${prev.slug}`}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:border-primary transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-text-muted group-hover:text-primary" />
          <div className="text-left">
            <div className="font-mono text-[10px] text-text-faint mb-0.5 block">previous</div>
            <div className="font-mono text-[12px] text-text font-semibold group-hover:text-primary">
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
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:border-primary transition-colors group ml-auto"
        >
          <div className="text-right">
            <div className="font-mono text-[10px] text-text-faint mb-0.5 block">next</div>
            <div className="font-mono text-[12px] text-text font-semibold group-hover:text-primary">
              {next.frontmatter.title}
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}

// Made with Bob
