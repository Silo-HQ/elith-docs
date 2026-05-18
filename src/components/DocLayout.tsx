import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import TableOfContents from './TableOfContents'
import Breadcrumb from './Breadcrumb'
import Pagination from './Pagination'
import { Heading, DocPage, DocFrontmatter } from '@/types/docs'

interface DocLayoutProps {
  children: ReactNode
  headings: Heading[]
  breadcrumbs: Array<{ label: string; href?: string }>
  prev: DocPage | null
  next: DocPage | null
  frontmatter?: DocFrontmatter
}

export default function DocLayout({
  children,
  headings,
  breadcrumbs,
  prev,
  next,
  frontmatter,
}: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <a href="#main-content" className="skip-to-content focus-ring">
        Skip to content
      </a>
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 ml-64 mr-0 xl:mr-52 px-8 py-8 max-w-[80%]"
        >
          <Breadcrumb items={breadcrumbs} />
          {frontmatter && (
            <div className="doc-header">
              <div className="doc-header-annotation">
                {`// ${frontmatter.sidebarLabel || frontmatter.title.toLowerCase()}`}
                {frontmatter.annotation && ` [ ${frontmatter.annotation} ]`}
              </div>
              <h1 className="doc-header-title">{frontmatter.title}</h1>
              <p className="doc-header-description">{frontmatter.description}</p>
              <hr className="doc-header-divider" />
            </div>
          )}
          <article className="prose max-w-none">
            {children}
          </article>
          <Pagination prev={prev} next={next} />
        </main>
        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}

// Made with Bob
