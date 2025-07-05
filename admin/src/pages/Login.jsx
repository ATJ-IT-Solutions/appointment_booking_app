import React, {useContext, useState} from 'react'
import {motion} from 'framer-motion' 
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state,setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setAToken, backendUrl} = useContext(AdminContext)

  const SubmitHandler = async (event) =>{
    event.preventDefault()
    
    try {
       if (state === 'Admin'){
          const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
          if (data.success){
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)
          }
          else {
            toast.error(data.message)
          }
       }
    }
    catch(error){
      console.log(error)
      
    }

  }

  return (
    <form onSubmit={SubmitHandler} className="min-h-screen bg-gradient-to-br from-indigo-500 to-lightblue-600 flex items-center justify-center px-4">
      <div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-white"
      >
            <div className='flex items-center justify-center'>
        <img  className='w-30' src="./src/assets/sibi_logo.png" />
      </div>
        <h2 className="text-2xl font-bold mb-6 text-center">{state} Login</h2>

        <div className="mb-4 w-full">
          <label className="block text-sm mb-1">Email</label>
          <input onChange={(e)=> setEmail(e.target.value)} value={email}
            type="email"
            required
            className="w-full px-4 py-2 rounded-lg bg-black/20 placeholder-black/80 text-black outline-none focus:ring-2 focus:ring-white/50"
            placeholder=""
          />
        </div>

        <div className="mb-6 w-full">
          <label className="block text-sm mb-1">Password</label>
          <input onChange={(e)=> setPassword(e.target.value)} value={password}
            type="password"
            required
            className="w-full px-4 py-2 rounded-lg bg-black/20 placeholder-black/80 text-black outline-none focus:ring-2 focus:ring-white/50"
            placeholder=""
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-indigo-100 transition-all duration-300 cursor-pointer"
        >
          Login
        </button>
        {
          state === 'Admin'
          ? <p className='text-black pt-3'>Doctor Login? <span onClick={()=>setState('Doctor')} className='cursor-pointer text-black underline'> Click here</span></p>
          : <p className='text-black pt-3'>Admin Login? <span onClick={()=>setState('Admin')} className='cursor-pointer text-black underline'> Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login