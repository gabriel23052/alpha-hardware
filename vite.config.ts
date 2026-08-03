/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@svg": path.resolve(__dirname, "./src/assets/svg"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@fakeAPI": path.resolve(__dirname, "./src/fakeAPI"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
  plugins: [react(), svgr()],
  test: {
    setupFiles: ["./src/fakeAPI/tests/vitest.setup.ts"],
  },
});
