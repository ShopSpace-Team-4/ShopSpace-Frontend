// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // [fontSize, { lineHeight, fontWeight }]
        'xs':   ['11px', { lineHeight: '1.4',  fontWeight: '500' }], // Caption
        'sm':   ['13px', { lineHeight: '1.55', fontWeight: '400' }], // Body S
        'base': ['14px', { lineHeight: '1.6',  fontWeight: '400' }], // Body M
        'lg':   ['16px', { lineHeight: '1.65', fontWeight: '400' }], // Body L
        '2xl':  ['20px', { lineHeight: '1.35', fontWeight: '600' }], // Heading 4
        '3xl':  ['24px', { lineHeight: '1.3',  fontWeight: '600' }], // Heading 3
        '4xl':  ['30px', { lineHeight: '1.2',  fontWeight: '700' }], // Heading 2
        '5xl':  ['36px', { lineHeight: '1.15', fontWeight: '700' }], // Heading 1
        '6xl':  ['44px', { lineHeight: '1.1',  fontWeight: '800' }], // Display L
        '7xl':  ['56px', { lineHeight: '1.08', fontWeight: '800' }], // Display XL
        // إعداد خاص بخط الـ Mono زي ما هو موجود في الصورة
        'code': ['13px', { lineHeight: '1.6',  fontWeight: '400' }], 
      },
    },
  },
  plugins: [],
};

export default config;