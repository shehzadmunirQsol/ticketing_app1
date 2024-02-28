/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
// const fontFamily = defaultTheme.fontFamily;
// fontFamily['sans'] = [
//   'Proxima Nova',
//   'system-ui',
//   // <-- you may provide more font fallbacks here
// ];

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Proxima-Nova', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        // admin

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        backgroundDark: 'hsl(var(--background-card))',
        lightColor: 'hsl(var(--light-text))',
        cardGray: 'hsl(var(--card-gray))',
        backgroundEntires: 'hsl(var(--background-entires))',
        primaryLight: 'hsl(var(--primary-light))',
        grayColor: 'hsl(var(--texts-gray))',
        inputColor: 'hsl(var(--input-card))',
        lightColorBorder: 'hsl(var(--light-color))',
        lightTextColor: 'hsl(var(--light-text-color))',
        'background-footer': 'hsl(var(--background-footer))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      backgroundImage: {
        testimonials:
          'linear-gradient(180deg, rgba(68, 78, 85, 0.40) 0%, rgba(56, 65, 71, 0.10) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    screens: {
      xs: '340px',
      smm: '400px',
      xsm: '480px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      mdxs: '800px',
      // => @media (min-width: 768px) { ... }
      mdx: '992px',
      slg: '1000px',
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
