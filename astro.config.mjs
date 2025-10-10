import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Server-side rendering for API routes
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  site: 'https://webndigital.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto'
  }
});
