import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// produção: o HTML já vem pré-renderizado (scripts/prerender.mjs) e só é hidratado.
// desenvolvimento (vite dev): #root chega vazio e a árvore é criada no cliente.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
