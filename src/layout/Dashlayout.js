import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Topbar from '../components/topbar/Topbar'
import {Outlet} from 'react-router-dom'
const Dashlayout = ({children}) => {
  return (
    <>
      <Topbar/>
      <div className='container'>
        <Sidebar/>
           <Outlet/>
        </div>
    </>
  )
}

export default Dashlayout
