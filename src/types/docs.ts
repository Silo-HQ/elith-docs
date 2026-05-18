import { ReactNode } from 'react'

export interface DocFrontmatter {
  title: string
  description: string
  sidebarLabel?: string
  annotation?: string
  order?: number
}

export interface DocPage {
  slug: string
  frontmatter: DocFrontmatter
  content: string
  headings: Heading[]
}

export interface Heading {
  id: string
  text: string
  level: number
}

export interface NavigationItem {
  title: string
  href: string
  annotation?: string
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

export interface SearchResult {
  title: string
  description: string
  annotation?: string
  href: string
  excerpt: string
}

export type AgentRole = 'devops' | 'architect' | 'dev' | 'qa' | 'reviewer' | 'docs'

export interface AgentCardProps {
  role: AgentRole
  tasks: string[]
}

export interface CalloutType {
  type: 'info' | 'warning' | 'danger' | 'success'
  children: ReactNode
}

export interface TabProps {
  label: string
  children: ReactNode
}

export interface StepProps {
  children: ReactNode
}

// Made with Bob
