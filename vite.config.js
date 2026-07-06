import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Inject a strict Content-Security-Policy into the production HTML only.
// Kept out of dev so it doesn't block Vite's inline HMR / React Refresh scripts.
const cspPlugin = {
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml(html) {
    const csp =
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
      "font-src 'self'; img-src 'self' data:; connect-src 'self'; frame-src 'none'; " +
      "object-src 'none'; base-uri 'self'; form-action 'self'; worker-src 'self' blob:;";
    return html.replace(
      '<meta http-equiv="X-Content-Type-Options" content="nosniff">',
      `<meta http-equiv="Content-Security-Policy" content="${csp}">\n    <meta http-equiv="X-Content-Type-Options" content="nosniff">`
    );
  },
};

export default defineConfig({
  plugins: [react(), cspPlugin],
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
