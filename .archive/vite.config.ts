import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@/utils': path.resolve(__dirname, './src/shared/utils'),
      '@/types': path.resolve(__dirname, './src/shared/types'),
      '@/lib': path.resolve(__dirname, './src/shared/lib'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/schemas': path.resolve(__dirname, './src/shared/schemas'),
      '@/config': path.resolve(__dirname, './src/config'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'date-fns'],
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
  },
})
