import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commentApi from './comment-api';

export default defineConfig({
  plugins: [react(), commentApi()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
