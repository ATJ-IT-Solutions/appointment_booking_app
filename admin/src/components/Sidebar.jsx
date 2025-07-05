import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink} from 'react-router-dom'
const Sidebar = () => {
const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'border-r-4':''}`} to='/admin-dashboard'>
                    <img src='' alt=''/> 
                    <p>Dasboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'border-r-4':''}`} to='/appointments'>
                    <img src='' alt=''/> 
                    <p>All Appointments</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar