import React, { useContext, useEffect, useState } from 'react';
import {AppContext} from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaStar, FaClock, FaChevronRight } from "react-icons/fa";

const MyAppointments = () => {
  
  const {backendUrl, token} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const getAppointments = async () =>{
    try{

      const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments)
      }

    }
    catch(error){
       console.log(error)
       toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId)=>{
  
    try{
  
        const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
        if (data.success){
        toast.success(data.message)
        getAppointments()
      }
      else{
        toast.error(data.message)
      }
    }
     catch(error){
        toast.error(error.message)
  
    }
  }

  useEffect(()=>{
     if(token){
      getAppointments()
     }

  },[token])

  return (
   
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🗓️ My Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">
            You have no upcoming appointments.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 px-4 py-4 flex items-center justify-between"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />

                  <div>
                    {/* Name + Verified */}
                    <div className="flex items-center gap-1 font-semibold text-gray-800 text-sm">
                      {item.docData.name}
                      <FaCheckCircle className="text-green-500 text-xs" />
                    </div>

                    {/* Rating + Specialty */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1 text-yellow-500">
                        <FaStar className="text-xs" />
                        {item.docData.rating || "4.1"}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center gap-1">
                        🩺 {item.docData.specialty}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FaClock className="mr-1 text-gray-400" />
                      {item.slotTime} • {item.slotDate} Scheduled
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="ml-4">
                  {!item.isCancelled ? (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition"
                    >
                      Cancel Appointment
                    </button>
                  ) : (
                    <span className="text-sm text-red-400 font-medium">Cancelled</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments