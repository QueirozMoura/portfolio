import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/** Usado apenas no build (scripts/prerender.mjs): gera o HTML estático que o cliente depois hidrata. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
