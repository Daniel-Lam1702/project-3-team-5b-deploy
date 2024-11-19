import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AcccessibilityPanel from './components/AccessibilityPanel.jsx'
import { AccessibilityProvider } from '../hooks/useAccessibility.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityProvider>
      <App />
      <AcccessibilityPanel/>
    </AccessibilityProvider>
  </StrictMode>,
)
