import Fuse from 'fuse.js'
import { getAllDocs } from './docs'
import { SearchResult } from '@/types/docs'

let searchIndex: Fuse<SearchResult> | null = null

export function buildSearchIndex(lang: string = 'en'): Fuse<SearchResult> {
  if (searchIndex) {
    return searchIndex
  }

  const docs = getAllDocs(lang)
  const searchData: SearchResult[] = docs.map(doc => ({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    annotation: doc.frontmatter.annotation,
    href: `/docs/${lang}/${doc.slug}`,
    excerpt: doc.content.slice(0, 200).replace(/[#*`]/g, ''),
  }))

  searchIndex = new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'excerpt', weight: 0.2 },
      { name: 'annotation', weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  })

  return searchIndex
}

export function search(query: string, lang: string = 'en'): SearchResult[] {
  if (!query || query.length < 2) {
    return []
  }

  const index = buildSearchIndex(lang)
  const results = index.search(query)

  return results.slice(0, 10).map(result => result.item)
}

export function generateSearchIndexJSON(lang: string = 'en'): string {
  const docs = getAllDocs(lang)
  const searchData: SearchResult[] = docs.map(doc => ({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    annotation: doc.frontmatter.annotation,
    href: `/docs/${lang}/${doc.slug}`,
    excerpt: doc.content.slice(0, 200).replace(/[#*`]/g, ''),
  }))

  return JSON.stringify(searchData, null, 2)
}

// Made with Bob
