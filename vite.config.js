// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cmc': {
        target: 'https://pro-api.coinmarketcap.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/cmc/, ''),
      },
    },
  },
});