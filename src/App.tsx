import React from 'react'
import './App.css'
// import { Button } from 'antd'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'

function App() {
  return <RouterProvider router={routerConfig} />
}

export default App
