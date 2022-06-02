/// <reference types="vitest" />
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
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setup.ts",
        coverage: {
            reporter: ["json-summary", "lcov"],
        },
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/tests/**",
            "**/.{idea,git,cache,output,temp}/**",
        ],
    },
});
