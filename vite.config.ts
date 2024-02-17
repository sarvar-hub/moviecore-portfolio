import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    // injectRegister: 'auto',
    // registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    // workbox: {
    //   globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    // },
    // srcDir: "public",
    filename: "service-worker.js",
    strategies: "injectManifest",
    injectRegister: false,
    manifest: false,
  })
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: '0.0.0.0', // Allow external access
  },
});
