import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      // each time the address (URL) starts with /api add "http://localhost:5000" to the begin of it 
      '/api' : {
        target : "http://localhost:5000"
      }
    }
  },
  plugins: [react()],
})
