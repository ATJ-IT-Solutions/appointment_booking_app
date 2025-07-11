import { createContext, useState,useEffect } from "react";
import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props)=>{
const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):'')
const backendUrl = import.meta.env.VITE_BACKEND_URL
const [userData,setUserData] = useState(false)

const loadUserProfileData = async(req,res)=>{
    try{
    const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
    if (data.success){
        setUserData(data.userData)
    }else{
        toast.error(data.message)
    }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }
}


    const value = {
        doctors, 
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    }

    useEffect(()=>{
      if(token){
        loadUserProfileData()
      }else{
        setUserData(false)
      }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;