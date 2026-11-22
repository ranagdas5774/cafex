import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/three/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          dark: '#1A120B',
          espresso: '#24170F',
          walnut: '#3B281B',
          roast: '#513522',
          gold: '#C18B4B',
          amber: '#D4A366',
          cream: '#FBF8F3',
          paper: '#F4EDE4',
          sand: '#EDE4D8',
          sage: '#5E7158',
          line: '#E5DACF',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
