import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        headline: ['Cinzel', 'serif'],
        anton: ['Anton', 'sans-serif'],
        paytone: ['Paytone One', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(0 0% 8%)',
        foreground: 'hsl(0 0% 70%)',
        card: {
          DEFAULT: 'hsl(0 0% 10%)',
          foreground: 'hsl(45 90% 55%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 8%)',
          foreground: 'hsl(0 0% 70%)',
        },
        primary: {
          DEFAULT: 'hsl(45 90% 55%)',
          foreground: 'hsl(45 90% 10%)',
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 15%)',
          foreground: 'hsl(0 0% 85%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 20%)',
          foreground: 'hsl(0 0% 55%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 80%)',
          foreground: 'hsl(0 0% 10%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 63% 31%)',
          foreground: 'hsl(0 0% 98%)',
        },
        border: 'hsl(0 0% 25%)',
        input: 'hsl(0 0% 20%)',
        ring: 'hsl(0 0% 60%)',
        chart: {
          '1': 'hsl(45 90% 55%)',
          '2': 'hsl(45 90% 50%)',
          '3': 'hsl(45 90% 45%)',
          '4': 'hsl(45 90% 40%)',
          '5': 'hsl(45 90% 35%)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
