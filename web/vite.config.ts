import { defineConfig } from "vite";
import { resolve } from "path";

import { assetpackPlugin } from "./scripts/assetpack-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [assetpackPlugin()],
  server: {
    port: 8080,
    open: true,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        shooter: resolve(__dirname, "basic_shooter.html"),
      },
    },
  },
});
