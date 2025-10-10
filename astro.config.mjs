import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://webndigital.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto'
  }
});
