import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@ui': resolve(__dirname, 'src/components/ui'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@': resolve(__dirname, 'src'),
      '@images': resolve(__dirname, 'src/assets/images'),
      '@icons': resolve(__dirname, 'src/assets/icons'),
      '@types': resolve(__dirname, 'src/types'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    },
  },
});
