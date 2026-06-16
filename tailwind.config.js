/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
        
      colors: {
        // Fondo principal - más profundo
        'gym-dark': '#0A0A0A',
        // Fondo secundario - ligeramente más claro
        'gym-dark-secondary': '#141414',
        // Tarjetas y elementos
        'gym-card': '#1A1A1A',
        'gym-card-hover': '#242424',
        // Grises para textos y bordes
        'gym-gray': '#6B7280',
        'gym-gray-light': '#9CA3AF',
        // Verde neón (lo mantenemos pero más vibrante)
        'gym-neon': '#CCFF00',
        'gym-neon-glow': 'rgba(204, 255, 0, 0.15)',
        // Blanco
        'gym-white': '#FFFFFF',
        // Colores de acento para estados
        'gym-success': '#10B981',
        'gym-danger': '#EF4444',
        'gym-warning': '#F59E0B',
        'gym-info': '#3B82F6',
      },
    },
  },
  plugins: [],
}