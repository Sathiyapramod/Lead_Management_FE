import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), visualizer({ open: true })],
    build: {
        outDir: "dist", // Output directory for build
        chunkSizeWarningLimit: 1000, // adjusting the chunk size upto 1000KB
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                    if (id.includes("src/components/")) {
                        return "components";
                    }
                    if (id.includes("react-router-dom") || id.includes("react-router")) {
                        return "@react-router";
                    }
                },
            },
        },
    },
});
