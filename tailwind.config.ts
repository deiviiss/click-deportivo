import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'gradient-custom': 'linear-gradient(to right, rgba(0, 71, 171, 0.4), rgba(50, 205, 50, 0.2))', // Azul eléctrico a Verde lima
        'gradient-custom': 'linear-gradient(to right, #B3D4F0 0%, #E6E8EB 100%)', // De Azul Claro a Plata Claro
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      backgroundColor: {
        primary: '#0047AB', // Azul eléctrico
        secondary: '#C0C0C0', // Plata o Gris Metálico
        tertiary: '#32CD32', // Verde lima
        white: '#F8F8F8', // Blanco roto
        black: '#202020'
      },
      textColor: {
        primary: '#0047AB', // Azul eléctrico
        secondary: '#C0C0C0', // Plata o Gris Metálico
        tertiary: '#32CD32', // Verde lima
        white: '#F8F8F8', // Blanco roto
        black: '#202020'
      },
      borderColor: {
        primary: '#0047AB', // Azul eléctrico
        secondary: '#C0C0C0', // Plata o Gris Metálico
        tertiary: '#32CD32', // Verde lima
        white: '#F8F8F8', // Blanco roto
        black: '#202020'
      },
      boxShadowColor: {
        primary: '#0047AB', // Azul eléctrico
        secondary: '#C0C0C0', // Plata o Gris Metálico
        tertiary: '#32CD32', // Verde lima
        white: '#F8F8F8', // Blanco roto
        black: '#202020'
      }
    }
  },
  plugins: []
}

export default config
