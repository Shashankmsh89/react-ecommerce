import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target:
          "https://training-ecom1-a9a2cmbsefdvgwha.centralindia-01.azurewebsites.net",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});