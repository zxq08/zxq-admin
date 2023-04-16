import * as React from 'react'
import ReactDom from 'react-dom/client'
import HomePage from './pages/home/home'
import 'antd/dist/antd.css'
import './less/index.less'

ReactDom.createRoot(document.getElementById('root')!).render(<HomePage />)
