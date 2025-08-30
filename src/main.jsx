import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { AppContextProvider } from "./Context/AppContext";


createRoot(document.getElementById('root')).render(

  <>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    <ToastContainer />
  </>

)
