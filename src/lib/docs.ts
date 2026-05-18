import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DocPage, DocFrontmatter, Heading } from '@/types/docs'

const contentDirectory = path.join(process.cwd(), 'content')

export function getDocBySlug(lang: string, slug: string[]): DocPage | null {
  try {
    const fullPath = path.join(
      contentDirectory,
      'docs',
      lang,
      ...slug
    ) + '.mdx'
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const headings = extractHeadings(content)

    return {
      slug: slug.join('/'),
      frontmatter: data as DocFrontmatter,
      content,
      headings,
    }
  } catch (error) {
    console.error(`Error loading doc: ${slug.join('/')}`, error)
    return null
  }
}

export function getAllDocs(lang: string): DocPage[] {
  const docsDirectory = path.join(contentDirectory, 'docs', lang)
  const docs: DocPage[] = []

  function readDirectory(dir: string, basePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = basePath
        ? `${basePath}/${entry.name}`
        : entry.name

      if (entry.isDirectory()) {
        readDirectory(fullPath, relativePath)
      } else if (entry.name.endsWith('.mdx')) {
        const slug = relativePath.replace(/\.mdx$/, '').split('/')
        const doc = getDocBySlug(lang, slug)
        if (doc) {
          docs.push(doc)
        }
      }
    }
  }

  if (fs.existsSync(docsDirectory)) {
    readDirectory(docsDirectory)
  }

  return docs.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999
    const orderB = b.frontmatter.order ?? 999
    return orderA - orderB
  })
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    headings.push({ id, text, level })
  }

  return headings
}

export function getAdjacentDocs(
  lang: string,
  currentSlug: string
): { prev: DocPage | null; next: DocPage | null } {
  const allDocs = getAllDocs(lang)
  const currentIndex = allDocs.findIndex(doc => doc.slug === currentSlug)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null,
  }
}

// Made with Bob
