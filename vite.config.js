import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Convert Vite-injected blocking CSS links to async preload pattern.
const asyncCSSPlugin = {
  name: 'async-css',
  apply: 'build',
  closeBundle() {
    const htmlPath = path.resolve(process.cwd(), 'dist/index.html');
    if (!fs.existsSync(htmlPath)) return;
    let html = fs.readFileSync(htmlPath, 'utf-8');
    html = html.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
      (_, href) =>
        `<link rel="preload" as="style" crossorigin href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
        `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
    );
    fs.writeFileSync(htmlPath, html);
  },
};

export default defineConfig({
  plugins: [react(), asyncCSSPlugin],
  build: {
    target: 'esnext',
    minify: 'esbuild',

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },

      output: {
        manualChunks: (id) => {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'vendor';
          }
          if (id.includes('framer-motion')) {
            return 'framer';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (
            id.includes('/components/Location') ||
            id.includes('/components/About') ||
            id.includes('/components/Footer') ||
            id.includes('/components/Testimonials')
          ) {
            return 'sections';
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/chunk-[name]-[hash].js',
      }
    },

    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
  },

  assetsInclude: ['**/*.mp4', '**/*.webm'],

  optimizeDeps: {
    exclude: ['framer-motion'],
    include: ['lucide-react', 'react', 'react-dom'],
  },
})
