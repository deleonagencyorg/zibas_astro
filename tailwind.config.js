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
        primary: '#0A3D7E',
        secondary: '#008DDD',
        tertiary: '#4895CE',
        cuaternary: '#0073C1',
        red: '#D23627',
        white: '#FFFFFF',
    
      },
      fontFamily: {
        sans: ['TroisMille', 'sans-serif'],
        title: ['TroisMille Bold', 'serif'],
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