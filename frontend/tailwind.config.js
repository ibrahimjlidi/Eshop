/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7dd3fc', // Sky 300
          DEFAULT: '#27B4F5', // Brand blue
          dark: '#0284c7',   // Sky 600
        },
        secondary: '#8b5cf6', // Violet 500
        accent: '#fbbf24',    // Amber
        surface: '#f8fafc',
        dark: '#0f172a',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(139, 92, 246, 0.2)', // Updated to Mauve
        'premium-hover': '0 20px 40px -15px rgba(139, 92, 246, 0.3)', // Updated to Mauve
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
