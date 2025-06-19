module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'bg-primary', 'text-primary', 'border-primary',
    'bg-secondary', 'text-secondary', 'border-secondary',
    'bg-tertiary', 'text-tertiary', 'border-tertiary',
    'bg-red', 'text-red', 'border-red',
    'bg-white', 'text-white', 'border-white',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00306F',
        secondary: '#2E5DAB',
        tertiary: '#4895CE',
        red: '#D23627',
        white: '#FFFFFF',
    
      },
      fontFamily: {
        sans: ['TroisMille', 'sans-serif'],
        title: ['TroisMille', 'serif'],
        heading: ['TroisMille', 'sans-serif'],
        text: ['TroisMille', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}