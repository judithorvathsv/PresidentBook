import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import PresidentList from './components/PresidentList.tsx'
import PresidentEditForm from './components/PresidentEditForm.tsx'

const router = createBrowserRouter([
  {
    path:"/api/v1/PresidentBook/",
    element: <App/>,
    children:[
      {
        path:"presidents",
        element: <PresidentList/>
      },
      {
        path:"",
        element: <PresidentList/>
      },
      {
        path:"presidents/edit/:id",
        element: <PresidentEditForm />
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
