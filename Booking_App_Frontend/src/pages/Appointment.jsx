import React, {use, useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const profile = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1752347005/sibi_img_new_1_c4kttu.jpg'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors, backendUrl, token} = useContext(AppContext);
  const daysOfweek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] =useState('');

const fetchDocInfo = async ()=>{
  const docInfo = doctors.find(doc => doc._id === docId)
  setDocInfo(docInfo);
}

const getAvailableSlots = async () => {
  setDocSlots([]);
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let dateSlots = [];

    // Time intervals for one day
    const intervals = [
      { start: "09:30", end: "13:00" },
      { start: "15:00", end: "17:00" },
      { start: "19:00", end: "21:00" },
    ];

    for (const interval of intervals) {
      // Create start and end times for this interval
      const [startHour, startMinute] = interval.start.split(":").map(Number);
      const [endHour, endMinute] = interval.end.split(":").map(Number);

      let slotStart = new Date(currentDate);
      slotStart.setHours(startHour, startMinute, 0, 0);

      let slotEnd = new Date(currentDate);
      slotEnd.setHours(endHour, endMinute, 0, 0);

      // Skip past slots for today
      if (i === 0 && slotStart < new Date()) {
        slotStart = new Date();
        slotStart.setMinutes(Math.ceil(slotStart.getMinutes() / 30) * 30); // round up to next half hour
      }

      // Generate 30-minute slots
      while (slotStart < slotEnd) {
        const formattedTime = slotStart.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        dateSlots.push({
          datetime: new Date(slotStart),
          time: formattedTime,
        });

        slotStart.setMinutes(slotStart.getMinutes() + 30);
      }
    }

    setDocSlots((prev) => [...prev, dateSlots]);
  }
};


const bookAppointment = async ()=> {
  if(!token){
    toast.warn("Login to book the appointment")
    navigate('/login')
  }
  try{

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate().toString().padStart(2, '0');    
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let year = date.getFullYear()
    const slotDate = day + "-" + month +"-" + year
    const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})

    console.log(data)
    if (data.success){
      toast.success(data.message)
      navigate('/my-appointments')
    }
    else{
      toast.error(data.message)

    }
    
  }catch(error){
      toast.error(error.message)

  }
}



useEffect(()=>{
  fetchDocInfo()
},[doctors,docId]);

useEffect(()=>{
  getAvailableSlots()
},[docInfo])

useEffect(()=>{
  console.log(docSlots);
},[docSlots])

  return docInfo && (
<div className="px-4 max-w-6xl mx-auto mt-6 animate-fade-in mb-30 mt-15">
  {/* Doctor Info Section */}
  <div className="flex flex-col sm:flex-row gap-6">
    {/* Image */}
    <div className="sm:w-52">
      <img
        className="w-full h-auto rounded-xl shadow-lg border border-blue-200 object-cover transform transition duration-500 hover:scale-105"
        src={profile}
        alt={docInfo.name}
      />
    </div>

    {/* Info Card */}
    <div className="flex-1 bg-gradient-to-tr from-white via-blue-50 to-white border border-blue-100 rounded-xl p-6 shadow-md -mt-20 sm:mt-0 transition-all duration-700 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        {docInfo.name}
      </h2>

      <div className="flex items-center gap-3 text-sm text-blue-800 mt-2">
        <p className="bg-blue-100 px-2 py-1 rounded-md">{docInfo.degree}</p>
        <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full shadow-sm">
          {docInfo.experience}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">About</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {docInfo.about}
        </p>
      </div>
    </div>
  </div>

  {/* Booking Section */}
  <div className="mt-12 animate-fade-in">
    <h4 className="text-xl font-semibold text-gray-800 mb-3">🗓️ Booking Date & Time</h4>

    {/* Date Pills */}
    <div className="flex overflow-x-auto gap-4 pb-3 scrollbar-hide">
      {docSlots.length > 0 &&
        docSlots.map((item, index) => (
          <div
            key={index}
            onClick={() => setSlotIndex(index)}
            className={`cursor-pointer min-w-20 px-4 py-4 rounded-xl text-center border-2 transform transition-all duration-300 flex-shrink-0
              ${
                slotIndex === index
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                  : "bg-white text-gray-800 border-gray-300 hover:scale-105 hover:border-blue-400"
              }`}
          >
            <p className="font-semibold">
              {item[0] && daysOfweek[item[0].datetime.getDay()]}
            </p>
            <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
          </div>
        ))}
    </div>

    {/* Time Slots */}
    <div className="flex overflow-x-auto gap-3 mt-6 scrollbar-hide">
      {docSlots.length > 0 &&
        docSlots[slotIndex]?.map((item, index) => (
          <button
            key={index}
            onClick={() => setSlotTime(item.time)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all transform duration-200 flex-shrink-0 mb-4
              ${
                slotTime === item.time
                  ? "bg-blue-100 text-blue-700 border border-blue-300 scale-105"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200 hover:scale-105"
              }`}
          >
            {item.time.toLowerCase()}
          </button>
        ))}
    </div>

    {/* CTA Button */}
    <div className="mt-8 text-center">
      <button onClick={bookAppointment} className="bg-blue-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300">
        Book an Appointment
      </button>
    </div>
  </div>
</div>

  )
}

export default Appointment