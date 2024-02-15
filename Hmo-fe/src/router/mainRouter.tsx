import React from 'react'
import Layout from '../components/layout/Layout'

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: < Layout/>
    children: [
      index: true,
      element: <Homescreen/>
    ]
  }
])