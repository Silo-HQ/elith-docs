import Link from 'next/link'

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center font-mono text-[12px]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-text-faint mx-[6px]">·</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-text-faint hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Made with Bob
