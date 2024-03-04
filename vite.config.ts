import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitrineBuilder from './vitrine-builder/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitrineBuilder()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
