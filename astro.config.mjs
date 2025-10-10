import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid', // Pages are pre-rendered, API routes are server-side
  adapter: vercel(),
  site: 'https://webndigital.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto'
  }
});
