# Elith Documentation

Official documentation for [Elith](https://github.com/Silo-HQ/elith) — Universal skill layer that gives any LLM the same repo-aware capabilities IBM Bob has natively.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 📦 Build

```bash
npm run build
```

Outputs to `./out` directory as a static site.

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS Variables
- **Content:** MDX with gray-matter
- **Syntax Highlighting:** Shiki (server-side)
- **Search:** Fuse.js
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## 📁 Project Structure

```
elith-docs/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/              # Utilities (docs, navigation, search)
│   └── types/            # TypeScript definitions
├── content/
│   └── docs/
│       └── en/           # English documentation (MDX)
├── public/               # Static assets
└── .github/
    └── workflows/        # CI/CD pipelines
```

## 🎨 Design System

The site uses a dark-first design system inspired by terminal aesthetics:

- **Colors:** Near-black backgrounds (#0a0a09) with orange accents (#e8692a)
- **Typography:** JetBrains Mono for UI chrome, Inter for prose
- **Logo:** Orange square with "elith" wordmark
- **Style:** Monospace labels, annotation numbers, terminal-like components

## 📝 Writing Documentation

Add new pages to `content/docs/en/`:

```mdx
---
title: "Page Title"
description: "One sentence description."
sidebarLabel: "label"
annotation: "n.nn"
order: N
---

# Page Title

Your content here...
```

## 📚 Documentation Structure

- **Getting Started** (0.xx) — Overview, quickstart, installation, configuration
- **Concepts** (1.xx) — Architecture, core concepts
- **Guides** (2.xx) — Getting started, advanced usage, integrations
- **API Reference** (3.xx) — CLI commands, REST API, authentication
- **Support** (4.xx) — Troubleshooting

## 🔍 Search

Search index is generated at build time from all MDX files. The search modal activates with `⌘K` / `Ctrl+K`.

## 🚢 Deployment

Automatically deploys to GitHub Pages on push to `main`:

1. Push to `main` branch
2. GitHub Actions builds the site
3. Deploys to `gh-pages` branch
4. Available at https://elith-agent-forge.lovable.app

## 📄 License

MIT License - see [LICENSE](../LICENSE)

## 🔗 Links

- **Main Site:** https://elith-agent-forge.lovable.app
- **GitHub:** https://github.com/Silo-HQ/elith
- **Documentation:** https://elith-agent-forge.lovable.app

## 🎯 What is Elith?

Elith is a universal skill layer that enables any LLM (Claude, GPT, Gemini, local models) to:

- Read and write files in your repository
- Search code with regex patterns
- Execute git operations
- Run tests and analyze dependencies
- Generate architecture plans and refactor code

It provides 12 skills exposed via tool calling, a context engine that selects relevant files, and 4 operations (explain, architect, refactor, test-gen) that build specialized prompts for different coding tasks.

## 📊 Current Status (v0.1.0)

- ✅ 12 skills fully implemented
- ✅ 3 providers (Claude, LM Studio, OpenRouter)
- ✅ 4 operations (explain, architect, refactor, test-gen)
- ✅ Context engine with file selection
- ✅ Session logging to bob-reports/
- ✅ CLI with service management
- ⏳ Multi-agent coordination (planned)
- ⏳ Approval gates (planned)
- ⏳ Webhooks (planned)