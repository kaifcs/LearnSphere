import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// The bundle analyzer only runs (and opens a browser) when ANALYZE=true,
// so normal/CI production builds are not blocked by it.
const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  plugins: [
    react(),
    analyze &&
      visualizer({
        filename: "bundle-report.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
});