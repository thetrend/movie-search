import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faBan,
  faBars,
  faImage,
  faList,
  faMagnifyingGlass,
  faMoon,
  faSpinner,
  faSun,
  faTableCellsLarge,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import App from './App.tsx'

library.add(
  faBan,
  faBars,
  faGithub,
  faImage,
  faList,
  faMagnifyingGlass,
  faMoon,
  faSpinner,
  faSun,
  faTableCellsLarge,
  faTimes,
)

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
