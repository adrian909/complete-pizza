import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './client/styles/index.css'
import App from './client/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


