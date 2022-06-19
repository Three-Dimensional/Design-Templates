import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "assets": path.resolve(__dirname, 'src/assets'),
      "components": path.resolve(__dirname, "src/components"),
      "styles": path.resolve(__dirname, "src/styles"),
      "plugins": path.resolve(__dirname, "src/plugins"),
      "views": path.resolve(__dirname, "src/views"),
      "utils": path.resolve(__dirname, "src/utils"),
      "apis": path.resolve(__dirname, "src/apis"),
    }
  },
})