import React from 'react'
import List from './components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

function DashBoard() {
  return (
    <div>
        <List/>
        <Outlet/>
    </div>
  )
}

export default DashBoard