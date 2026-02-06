import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about-us.html'),
        products: resolve(__dirname, 'products.html'),
        projects: resolve(__dirname, 'projects.html'),
        contact: resolve(__dirname, 'contact-us.html'),
      },
    },
  },
});
