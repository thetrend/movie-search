import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faList,
  faMagnifyingGlass,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons'
import App from './App.tsx'

library.add(faBars, faList, faMagnifyingGlass, faTableCellsLarge)

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
