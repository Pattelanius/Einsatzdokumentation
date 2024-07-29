import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: 'autoUpdate',
  includeAssests: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Einsatz Dokumentation",
    short_name: "Einsatz Dokumentation",
    description: "Einfache App zum dokumentieren von Einsätzen",
    icons: [],
    theme_color: '#171717',
    background_color: '#f0e7db',
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  base: "Einsatzdokumentation",
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
