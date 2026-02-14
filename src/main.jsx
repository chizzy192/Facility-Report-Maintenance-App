import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
      <Toaster position="top-right" richColors />
    </AuthContextProvider> 
  </StrictMode>
)
