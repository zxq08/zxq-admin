import * as React from 'react'
import ReactDom from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home'
import ListPage from '../pages/list'
import ChartPage from '../pages/charts'
import ErrorPage from '../pages/error'

const Route = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>
  },
  {
    path: '/list',
    element: <ListPage></ListPage>
  },
  {
    path: '/charts',
    element: <ChartPage></ChartPage>
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
])

export default Route
