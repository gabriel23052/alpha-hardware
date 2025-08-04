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
      "@data": path.resolve(__dirname, "./src/data"),
      "@fakeAPI": path.resolve(__dirname, "./src/fakeAPI"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  plugins: [react(), svgr()],
});
