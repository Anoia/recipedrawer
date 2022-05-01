/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['DialogDescription', 'DialogTitle', 'DialogOverlay', 'Dialog'].includes(tag)
      }
    }
  })],
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
})
