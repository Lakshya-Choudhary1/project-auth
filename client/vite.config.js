import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "./", 
  build: {
    outDir: path.resolve(__dirname, "../server/public"), //  output to server/public
    emptyOutDir: true, // cleans old files before building
  }
})
