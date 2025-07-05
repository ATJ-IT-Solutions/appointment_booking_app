import React,{use, useContext,useState} from 'react'
import { AdminContext } from '../context/AdminContext'
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
 
    const {aToken,setAToken} = useContext(AdminContext)
      const [isOpen, setIsOpen] = useState(false);
      const navigate = useNavigate()

      const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
      }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md shadow-lg w-full"
    >
      <div className="flex justify-between items-center px-4 sm:px-10 py-3">
        {/* Logo & Title */}
        <div className="flex items-center">
          <img className="w-16 sm:w-20 mr-5" src="./src/assets/sibi_logo.png" alt="Logo" />
         <p className="px-3 py-1 rounded-full border border-indigo-500 text-indigo-600 bg-indigo-50 text-sm font-medium shadow-sm">
  {aToken ? "Admin" : "Doctor"}
</p>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button onClick={() => { logout();}} className="px-4 py-1.5 rounded-md bg-red-500 cursor-pointer hover:bg-red-600 text-white transition">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => {setIsOpen(!isOpen);}}>
            {isOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4">
          <button onClick={() => { logout();}} className="w-full py-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-md transition">
            Logout
          </button>
        </div>
      )}
    </motion.nav>
  )
}

export default Navbar