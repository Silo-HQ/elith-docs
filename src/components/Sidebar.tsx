'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '@/lib/navigation'
import clsx from 'clsx'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 fixed left-0 top-11 bottom-0 bg-surface overflow-y-auto">
      <nav className="p-6">
        {navigation.map((group, groupIndex) => (
          <div key={groupIndex} className={groupIndex > 0 ? 'mt-4' : ''}>
            <h3 className="font-mono text-[11px] text-text-faint uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <ul>
              {group.items.map((item, itemIndex) => {
                const isActive = pathname === item.href
                return (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'flex items-center justify-between py-1.5 font-mono text-[13px] transition-colors border-l-2',
                        isActive
                          ? 'text-text font-medium bg-surface-offset border-primary pl-[14px]'
                          : 'text-text-muted hover:text-text border-transparent pl-[14px]'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.title}</span>
                      {item.annotation && (
                        <span className="text-[11px] text-text-faint mr-4">
                          {item.annotation}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

// Made with Bob
