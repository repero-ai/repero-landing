import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://repero.ai',
  cacheDir: '.cache/astro',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  vite: {
    cacheDir: '.cache/vite',
    plugins: [tailwindcss()]
  },
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr']
  }
});
