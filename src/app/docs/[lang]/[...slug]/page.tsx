import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDocBySlug, getAdjacentDocs, getAllDocs } from '@/lib/docs'
import DocLayout from '@/components/DocLayout'
import { MDXComponents } from '@/components/MDXComponents'

interface PageProps {
  params: {
    lang: string
    slug: string[]
  }
}

export async function generateStaticParams() {
  const docs = getAllDocs('en')
  return docs.map(doc => ({
    lang: 'en',
    slug: doc.slug.split('/'),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const doc = getDocBySlug(params.lang, params.slug)
  
  if (!doc) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${doc.frontmatter.title} | Elith Documentation`,
    description: doc.frontmatter.description,
  }
}

export default function DocPage({ params }: PageProps) {
  const doc = getDocBySlug(params.lang, params.slug)

  if (!doc) {
    notFound()
  }

  const { prev, next } = getAdjacentDocs(params.lang, doc.slug)

  const breadcrumbs = [
    { label: 'Docs', href: '/docs/en/overview' },
    ...params.slug.slice(0, -1).map((segment, index) => ({
      label: segment,
      href: `/docs/${params.lang}/${params.slug.slice(0, index + 1).join('/')}`,
    })),
    { label: doc.frontmatter.title },
  ]

  return (
    <DocLayout
      headings={doc.headings}
      breadcrumbs={breadcrumbs}
      prev={prev}
      next={next}
      frontmatter={doc.frontmatter}
    >
      <MDXRemote source={doc.content} components={MDXComponents} />
    </DocLayout>
  )
}

// Made with Bob
