/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'loading-progress': 'loading-progress 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'bounce-delayed': 'bounce 1s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'orbit': 'orbit 3s linear infinite',
      },
      keyframes: {
        'loading-progress': {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.3' },
          '50%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(0.8)', opacity: '0.3' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(12px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(12px) rotate(-360deg)' },
        }
      },
    },
  },
  plugins: [],
}

