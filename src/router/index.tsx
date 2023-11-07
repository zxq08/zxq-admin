import * as React from 'react'
import ReactDom from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import ResumePage from '../pages/resume'
import HomePage from '../pages/home'
import ListPage from '../pages/list'
import ChartPage from '../pages/charts'
import ScrollPage from '../pages/scroll'
import FormPage from '../pages/form'
import SlidePage from '../pages/slide'
import AsyncPage from '../pages/async'
import SuspensePage from '../pages/susp'
import ErrorPage from '../pages/error'
import { microRoute, Micro } from './micro'

const errorRoute = [
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
]
const routeArrs = [
  {
    path: '/',
    element: <ResumePage></ResumePage>
  },
  {
    path: '/home',
    element: <HomePage></HomePage>
  },
  {
    path: '/list',
    element: <ListPage></ListPage>
  },
  {
    path: '/scroll',
    element: <ScrollPage></ScrollPage>
  },
  {
    path: '/form',
    element: <FormPage></FormPage>
  },
  {
    path: '/charts',
    element: <ChartPage></ChartPage>
  },
  {
    path: '/slide',
    element: <SlidePage></SlidePage>
  },
  {
    path: '/async',
    element: <AsyncPage></AsyncPage>
  },
  {
    path: '/susp',
    element: <SuspensePage></SuspensePage>
  }
  // {
  //   path: '/micro/app',
  //   element: <Micro></Micro>
  // }
]
  .concat(microRoute)
  .concat(errorRoute)
console.log('routeArrs', routeArrs)
const Route = createBrowserRouter(routeArrs)

export default Route
