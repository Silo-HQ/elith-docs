import React from 'react'

interface LogoProps {
  variant?: 'mark' | 'full'
  className?: string
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'mark') {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Elith"
      >
        <rect width="14" height="14" fill="currentColor" />
      </svg>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="14" height="14" fill="currentColor" />
      </svg>
      <span className="font-mono font-semibold text-base">elith</span>
    </div>
  )
}

// Made with Bob
