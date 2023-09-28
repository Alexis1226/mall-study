import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import withReactRouter from "vite-plugin-next-react-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), withReactRouter()],
});
