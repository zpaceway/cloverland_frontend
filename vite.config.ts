import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.ts", "./src/**/*.tsx"],
      exclude: [],
    }),
  ],
});
