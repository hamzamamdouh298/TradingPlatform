/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#050505',
                surface: '#0A0A0A',
                surfaceLight: '#121212',
                primary: '#00E5FF', // Neon Blue
                secondary: '#7000FF', // Purple
                success: '#00FF94',
                warning: '#FFC000',
                danger: '#FF2E2E',
                glass: 'rgba(255, 255, 255, 0.03)',
                glassHover: 'rgba(255, 255, 255, 0.08)',
                glassBorder: 'rgba(255, 255, 255, 0.1)',
                // Light mode colors
                lightBg: '#f5f5f5',
                lightSurface: '#ffffff',
                lightSurfaceAlt: '#f9fafb',
                lightText: '#1f2937',
                lightTextSecondary: '#6b7280',
                lightBorder: 'rgba(0, 0, 0, 0.1)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF' },
                    '100%': { boxShadow: '0 0 20px #00E5FF, 0 0 30px #00E5FF' },
                }
            }
        },
    },
    plugins: [],
}
