import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CharactersProvider } from './context/useCharacters'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CharactersProvider>
      <App />
    </CharactersProvider>
  </React.StrictMode>
)
