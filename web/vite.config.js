import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// La web se publica en https://fj-po.github.io/Proyecto-1--Bastionado-de-redes-G3/
// Por eso el `base` lleva el nombre del repositorio: si no, las rutas se romperían.
export default defineConfig({
  plugins: [react()],
  base: '/Proyecto-1--Bastionado-de-redes-G3/',
})
