/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
    './constants.tsx'
  ],
  theme: {
    fontFamily: {
      sans: [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'BlinkMacSystemFont', 
        '"Segoe UI"', 
        'Roboto', 
        '"Helvetica Neue"', 
        'Arial', 
        '"Noto Sans"', 
        'sans-serif', 
        '"Apple Color Emoji"', 
        '"Segoe UI Emoji"', 
        '"Segoe UI Symbol"', 
        '"Noto Color Emoji"'
      ],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                color: theme('colors.amber.600'),
              },
            },
            h1: { color: theme('colors.indigo.800')},
            h2: { color: theme('colors.indigo.800')},
            h3: { color: theme('colors.indigo.700')},
            strong: { color: theme('colors.indigo.700')},
            blockquote: {
              borderColor: theme('colors.amber.500'),
              color: theme('colors.slate.600'),
            }
          },
        },
        indigo: { 
          css: {
            '--tw-prose-body': theme('colors.slate[700]'),
            '--tw-prose-headings': theme('colors.indigo[800]'),
            '--tw-prose-lead': theme('colors.slate[600]'),
            '--tw-prose-links': theme('colors.indigo[700]'),
            '--tw-prose-bold': theme('colors.indigo[700]'),
            '--tw-prose-counters': theme('colors.indigo[500]'),
            '--tw-prose-bullets': theme('colors.indigo[500]'),
            '--tw-prose-hr': theme('colors.slate[200]'),
            '--tw-prose-quotes': theme('colors.slate[800]'),
            '--tw-prose-quote-borders': theme('colors.amber[500]'),
            '--tw-prose-captions': theme('colors.slate[500]'),
            '--tw-prose-code': theme('colors.indigo[900]'),
            '--tw-prose-pre-code': theme('colors.indigo[200]'),
            '--tw-prose-pre-bg': theme('colors.indigo[800]'), // Consistent with AI guidelines
            '--tw-prose-th-borders': theme('colors.slate[300]'),
            '--tw-prose-td-borders': theme('colors.slate[200]'),
          }
        }
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};