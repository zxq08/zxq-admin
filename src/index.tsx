import * as React from 'react'
import ReactDom from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './iconfont/iconfont.js'
import Route from './router'
import 'antd/dist/antd.css'
import './less/index.less'

// ReactDom.createRoot(document.getElementById('root')!).render(<HomePage />)
ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Route} />
  </React.StrictMode>
)
