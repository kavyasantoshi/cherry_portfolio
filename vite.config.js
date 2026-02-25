import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // PNG settings
      png: {
        quality: 75,
        compressionLevel: 9
      },
      // JPEG settings
      jpeg: {
        quality: 75
      },
      // WebP settings (converts to WebP automatically)
      webp: {
        lossless: false,
        quality: 75
      },
      // AVIF settings (even smaller than WebP)
      avif: {
        quality: 70
      },
      // Exclude logos from heavy compression (keep them sharp)
      exclude: ['**/logos/**'],
      // Include all images in public/images
      include: ['**/images/**'],
      // Cache for faster rebuilds
      cache: true,
      // Show compression stats in terminal
      logStats: true
    }),
  ],
})