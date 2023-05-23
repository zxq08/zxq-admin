import * as React from 'react'
import ReactDom from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import ListPage from './pages/list'
import ErrorPage from './pages/error'
import 'antd/dist/antd.css'
import './less/index.less'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'list',
    element: <ListPage />,
    errorElement: <ErrorPage />
  }
])

// ReactDom.createRoot(document.getElementById('root')!).render(<HomePage />)
ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
