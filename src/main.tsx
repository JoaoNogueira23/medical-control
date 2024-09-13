import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import './styles/main.scss'
import { DataProvider } from './context/dataContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AppProvider>
  </StrictMode>,
)
