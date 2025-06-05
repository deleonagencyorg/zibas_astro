module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'bg-primary', 'text-primary', 'border-primary',
    'bg-purple', 'text-purple', 'border-purple',
    'bg-yellow', 'text-yellow', 'border-yellow',
    'bg-green', 'text-green', 'border-green',
    'bg-red', 'text-red', 'border-red',
    'bg-blue', 'text-blue', 'border-blue',
    'bg-brown', 'text-brown', 'border-brown',
    'bg-pink', 'text-pink', 'border-pink',
    'bg-celeste', 'text-celeste', 'border-celeste',
    'bg-white', 'text-white', 'border-white',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#231D45',
        purple: '#231D45',
        yellow: '#FFE1B5',
        green: '#9CB895',
        red: '#E30000',
        blue: '#082A39',
        brown: '#513629',
        pink: '#F4ACBE',
        celeste: '#7AA2D6',
        white: '#FFFFFF',
        secondary: '#A6A3D1',
        tertiary: '#FFFBF2z',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        title: ['FontdinerSwanky', 'serif'],
        heading: ['Poppins', 'sans-serif'],
        text: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}