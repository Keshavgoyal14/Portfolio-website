import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend',
  server: {
    host: '0.0.0.0',
    port: 5180,
    strictPort: false,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5180,
    strictPort: false,
  },
});
