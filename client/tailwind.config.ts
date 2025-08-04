import type { Config } from 'tailwindcss';
const config: Config = {
  content: [ './app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}' ],
  theme: {
    extend: {
      colors: { 'background': '#F7F7F7', 'accent': '#1a8917', 'text-main': '#1f1f1f' },
      fontFamily: { serif: ['var(--font-playfair)', 'serif'], sans: ['var(--font-inter)', 'sans-serif'] },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;