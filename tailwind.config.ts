import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#38bdf8',
          dark: '#0ea5e9',
          darker: '#0284c7',
        },
        dark: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        },
        slate: {
          350: '#94a3b8',
          450: '#64748b',
          550: '#475569',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
