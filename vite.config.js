import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true  // <--- importante: redirige todas las rutas a index.html
    /*,allowedHosts: [
      'bee-ungroomed-jonathon.ngrok-free.dev'
    ], Lo use para probar el pago de mp, mandame msj y te digo si lo borras o no*/
  },

})
