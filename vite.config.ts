// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Only chunk our own code + safe deps
        manualChunks(id) {
          if (id.includes('node_modules/lz-string')) return 'lz-string';
          if (id.includes('node_modules/gonzales-pe')) return 'parser';
          if (id.includes('node_modules/css-specificity')) return 'specificity';
          // Let CodeMirror bundle naturally — it's already tree-shaken perfectly
          return null;
        }
      }
    }
  }
});