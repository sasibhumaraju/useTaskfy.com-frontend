import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'main',
  build: {
    outDir: '../dist', // ✅ Output build to project-root/dist
    emptyOutDir: true, // Clean output before building
    rollupOptions: {
      input: resolve(__dirname, 'main/index.html'),
    },
  },
})
