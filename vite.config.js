import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist', // or whatever you use
  },
  plugins: [react()],
})
