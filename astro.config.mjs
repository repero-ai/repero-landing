import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://repero.ai',
  cacheDir: '.cache/astro',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  vite: {
    cacheDir: '.cache/vite'
  },
  integrations: [tailwind()],
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr']
  }
});
