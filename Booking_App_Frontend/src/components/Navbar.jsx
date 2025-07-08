import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const logo = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1751829062/sibi_logo_lc6q6h.png'
const avatar = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1751828936/avatar_zkcd1w.png'
const dropdown = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1751829099/dropdown_xxndvz.webp'
const menuicon = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1751829045/menu_icon_qylkov.webp'
const closeicon = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1751829107/close_icon_vu6rrc.png'


const Navbar = () => {

const navigate = useNavigate()

const {token,setToken} = useContext(AppContext)
const [showMenu, setShowMenu] = useState(false)

const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
}


  return (
    <div className='flex items-center justify-around text-sm py-4 mb-5 section-color'>
    <img src={logo} className='w-30 cursor-pointer'/>
        <ul className='hide-on-mobile md:flex items-center gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 w-3/5 m-auto'/>
            </NavLink >
            <NavLink to='/contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 w-3/5 m-auto'/>
            </NavLink>
        </ul>
        <div className='flex items-center'>
        {
            token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                 <img className="w-10 rounded-full" src={avatar} alt="" />
                 <img className="w-2.5" src={dropdown} alt="" />
                 <div className='absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={()=> navigate('/my-profile')} className='hover:text-black-600 cursor-pointer'>My Profile</p>
                        <p onClick={()=> navigate('/my-appointments')} className='hover:text-black-600 cursor-pointer'>My Appointment</p>
                        <p onClick={()=> logout()} className='hover:text-black-600 cursor-pointer'>Logout</p>
        
                    </div>
                 </div>
            </div>
            : <button onClick={()=> { navigate('/login')}} className='bg-blue-600 text-white border border-gray-400 rounded-full px-8 py-3 hover:bg-blue-400'>Create An Account</button>

        }
        <img onClick={()=>setShowMenu(true)} className='w-12 md:hidden ml-5 cursor-pointer' alt='a' src={menuicon} />
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
                <img className='w-36' />
                <img className='w-7 cursor-pointer' onClick={()=>setShowMenu(false)} alt='b' src={closeicon}/>
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink className='px-4 py-2 rounded inline-block'>Home</NavLink>
                <NavLink className='px-4 py-2 rounded inline-block'>All Doctors</NavLink>
                <NavLink className='px-4 py-2 rounded inline-block'>About</NavLink>
            </ul>
        </div>
        </div>
    </div>
     
  )
}

export default Navbar