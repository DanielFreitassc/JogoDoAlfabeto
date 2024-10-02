import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  }, 
  {
    path:"/home",
    element:<Home/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
