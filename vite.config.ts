/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.ts",
    coverage: {
      exclude: [
        "src/auth/routes/*",
        "src/journal/routes/*",
        "src/router/*",
        "src/firebase/*",
        "src/journal/components/*",
        "src/hooks/*",
        "src/theme/*",
        "src/ui/*",
        "src/vite-env.d.ts",
        "src/vitest.ts",
        "vite.config.ts",
        "eslint.config.js",
        "**/index.ts*",
      ],
    },
  },
});
