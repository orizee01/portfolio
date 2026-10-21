import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Backend is a separate project (../backend, npm run dev there, port 4000)
    proxy: {
      "/api": "http://localhost:4000",
      "/uploads": "http://localhost:4000", // locally stored images
    },
  },
});
