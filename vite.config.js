import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Qr Code Scanner",
        short_name: "QR Scanner",
        description: "An App To Scan QR Code For General Purpose",
        icons: [
          {
            src: "favicon.ico",
            sizes: "192x192",
            type: "image/x-icon",
          },
        ],
        theme_color: "#6365f1",
        background_color: "#E8EBF2",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
});
