import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elith Documentation',
  description: 'The AI coding agent that ships production code, not textbook answers.',
  keywords: ['elith', 'ai', 'coding agent', 'documentation', 'llm', 'development'],
  authors: [{ name: 'Silo HQ' }],
  openGraph: {
    title: 'Elith Documentation',
    description: 'The AI coding agent that ships production code, not textbook answers.',
    url: 'https://elith.silohq.tech/docs',
    siteName: 'Elith',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elith Documentation',
    description: 'The AI coding agent that ships production code, not textbook answers.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// Made with Bob
