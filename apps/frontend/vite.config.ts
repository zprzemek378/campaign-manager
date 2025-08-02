import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../packages/shared-types"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@ui": path.resolve(__dirname, "src/ui"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "sass:color";
        @import "${path.resolve(__dirname, "src/assets/styles/_variables.scss")}";
        @import "${path.resolve(__dirname, "src/assets/styles/_mixins.scss")}";
        `,
      },
    },
  },
});
