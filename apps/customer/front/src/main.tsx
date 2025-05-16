import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@workspace/ui/styles/globals.css'
import App from './App.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
