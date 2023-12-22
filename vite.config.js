const { fileURLToPath, URL } = require('url');
const vue = require('@vitejs/plugin-vue');
const { defineConfig } = require('vite');

// https://vitejs.dev/config/
module.exports = defineConfig({
  base: '/bug-wars-healer-frontend',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
});