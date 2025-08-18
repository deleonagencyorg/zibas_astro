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
        primary: '#FD6600',
        secondary: '#0167F7',
        tertiary: '#FDE820',
        cuaternary: '#FF4DFF',
        quinary: '#0167F7z',
        red: '#FC4238',
        white: '#FFFFFF',
        brown: '#FAF1E9',
    
      },
      fontFamily: {
        sans: ['Rockeby regular', 'sans-serif'],
        title: ['Rockeby black', 'serif'],
        heading: ['Rockeby regular', 'sans-serif'],
        text: ['Rockeby regular', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}