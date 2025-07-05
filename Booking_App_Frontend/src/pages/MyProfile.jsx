import React,{useState,useContext} from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsFillCameraVideoFill, BsFillChatDotsFill, BsFillTelephoneFill } from "react-icons/bs";
import { AppContext } from '../context/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {

   const {userData,setUserData,backendUrl,token,loadUserProfileData} =  useContext(AppContext)

  const [edit, setEdit] = useState(false);

  const updateUserProfile = async()=>{

    try{
      // const formData = new FormData()
      // formData.append('name',userData.name)
      // formData.append('email',userData.email)
      // formData.append('phone',userData.phone)
      // formData.append('gender','Male')
      // formData.append('dob','2000-01-01')
      // console.log(userData._id)
      const { name, email, phone } = userData;

    const body = {
      name,
      email,
      phone,
      gender: 'Male',
      dob: '2000-01-01',
      userId: userData._id, // or wherever you're storing the ID
    };

      const {data} =  await axios.post(backendUrl + '/api/user/update-profile',body,{headers:{token}})
      console.log(data)
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setEdit(false)
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
      console.log(error)
       toast.error(error.message)
    }
  }

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        
        {/* Header with background */}
        <div className="bg-blue-500 h-28 relative rounded-b-3xl flex justify-center items-end pb-10">
          <div className="absolute top-12">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src="./src/assets/img/landing/avatar.png"
                alt={userData.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-16 pb-6 px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-800">
            {edit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <>
                {userData.name}
                <MdVerified className="text-blue-500" />
              </>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">User Profile</p>

          {/* Contact Info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            {edit ? (
              <>
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition mb-5"
                />
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              </>
            ) : (
              <>
                <p className="flex justify-center items-center gap-2 mb-5">
                  <FaEnvelope className="text-blue-500" />
                  {userData.email}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FaPhoneAlt className="text-blue-500" />
                  {userData.phone}
                </p>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-blue-200 transition">
              <BsFillTelephoneFill /> Call
            </button>
            <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-purple-200 transition">
              <BsFillChatDotsFill /> Chat
            </button>
          </div>


          {/* Action Buttons */}
          <div className="mt-6">
            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="text-blue-600 hover:underline"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={updateUserProfile}
                className="text-green-600 hover:underline"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile