import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4000,
        proxy: {
            "/api": {
                target: "http://localhost:8080/.netlify/functions",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve("src"),
        },
    },
    plugins: [react()],
});
