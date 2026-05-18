import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        'surface-offset': 'var(--color-surface-offset)',
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-dim': 'var(--color-primary-dim)',
        'primary-subtle': 'var(--color-primary-subtle)',
        success: 'var(--color-success)',
        'success-dim': 'var(--color-success-dim)',
        warning: 'var(--color-warning)',
        'warning-dim': 'var(--color-warning-dim)',
        error: 'var(--color-error)',
        'error-dim': 'var(--color-error-dim)',
        'code-bg': 'var(--color-code-bg)',
        'code-border': 'var(--color-code-border)',
        'code-text': 'var(--color-code-text)',
        'terminal-prompt': 'var(--color-terminal-prompt)',
        'terminal-output': 'var(--color-terminal-output)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
}

export default config

// Made with Bob
