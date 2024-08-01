import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000', // 后端服务的地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // 在这里修改静态资源路径
        chunkFileNames: 'static/assets/js/[name]-[hash].js',
        entryFileNames: 'static/assets/js/[name]-[hash].js',
        assetFileNames: 'static/assets/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  base: './',
})