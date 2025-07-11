import React, { useContext,useEffect,useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Login = () => {
const {backendUrl, token, setToken} = useContext(AppContext)
 const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('');

  const SubmitHandler = async (event) =>{
    event.preventDefault()
try{
if(state === 'Sign Up'){
      const {data} = await axios.post(backendUrl + '/api/user/register', {name,phone})
      if (data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }
    }else{

         const {data} = await axios.post(backendUrl + '/api/user/login', {phone})
      if (data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }
    }
}
catch(error){
  toast.error(error.message)
}
    
  }

  useEffect(()=>{
   if (token){
     navigate('/')
   }
  },[token])

  return (
  <form
  className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-fade-in"
  onSubmit={SubmitHandler}
>
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200 animate-slide-in">
    {/* Title */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        {state === "Sign Up" ? "Create Account" : "Login"}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Please {state === "Sign Up" ? "create an account" : "log in"} to book an appointment.
      </p>
    </div>

    {/* Full Name */}
    {state === "Sign Up" && (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=""
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>
    )}

    {/* Phone Number */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
    {/* Flag & Code (visual only, but not shown in input value) */}
    <div className="flex items-center pr-2 border-r border-gray-300">
      <img
        src="https://flagcdn.com/w40/in.png"
        alt="IN"
        className="w-5 h-5 mr-1 rounded-sm"
      />
      <span className="text-gray-700 text-sm">+91</span>
    </div>

    {/* Actual Input Field */}
    <input
      type="tel"
      value={phone}
      onChange={(e) => {
        const val = e.target.value.replace(/\D/g, ''); // remove non-numeric
        if (val.length <= 10) setPhone(val);
      }}
      className="flex-1 pl-3 outline-none text-sm text-gray-800"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={10}
    />
  </div>
</div>

    {/* Password */}
    {/* <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=""
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />
    </div> */}

    {/* Submit Button */}
    <button
      type='submit'
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300 mb-5"
    >
      {state === "Sign Up" ? "Create Account" : "Login"}
    </button>
    {
      state === "Sign Up" 
      ? <p>Already have an account? <span onClick={()=>setState('Login')} className='underline cursor-pointer'>Login here</span></p> 
      : <p>Create an new account? <span onClick={()=>setState('Sign Up')} className='underline cursor-pointer'>Click here</span></p> 
    }
  </div>
</form>

  )
}

export default Login