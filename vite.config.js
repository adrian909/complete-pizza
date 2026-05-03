import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    
    // Aggressive tree-shaking to eliminate unused code
    rollupOptions: {
      // Ensure tree-shaking of unused exports
      treeshake: {
        moduleSideEffects: false, // Assume no side effects
        propertyReadSideEffects: false, // Don't keep property reads for side effects
        tryCatchDeoptimization: false, // Optimize try-catch blocks
      },
      
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          framer: ['framer-motion'],
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

  // Optimize asset handling
  assetsInclude: ['**/*.mp4', '**/*.webm'],

  // Development server proxy for CORS bypass
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        secure: false,
        ws: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    }
  },
})
