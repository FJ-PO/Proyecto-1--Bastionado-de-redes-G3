import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Agentation: barra de feedback visual. Solo se carga en desarrollo (npm run dev),
// nunca en la web publicada (npm run build).
let Agentation = () => null
if (import.meta.env.DEV) {
  const mod = await import('agentation')
  Agentation = mod.Agentation
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {import.meta.env.DEV && <Agentation />}
  </React.StrictMode>,
)
