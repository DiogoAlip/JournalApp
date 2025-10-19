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
        "src/journal/components/*",
        "src/auth/routes/*",
        "src/firebase/*",
        "src/hooks/*",
        "src/router/*",
        "src/theme/*",
        "src/ui/*",
        "src/vite-env.d.ts",
        "src/vitest.ts",
        "vite.config.ts",
        "eslint.config.js",
        "**/index.ts*",
        "**/thunks.ts",
      ],
    },
  },
});
