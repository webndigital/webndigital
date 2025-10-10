import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://webndigital.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto'
  }
});
