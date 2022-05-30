import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/.netlify/functions": {
                target: "http://localhost:8080/.netlify/functions",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/.netlify\/functions/, ""),
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
