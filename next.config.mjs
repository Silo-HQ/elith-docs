import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  },
})

const nextConfig = {
  output: 'export',
  basePath: '/elith-docs',
  assetPrefix: '/elith-docs',
  trailingSlash: true,
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
  images: { unoptimized: true },
}

export default withMDX(nextConfig)

// Made with Bob
