import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx';
const profile = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1752521759/sibi_img_homr_zylbol.png'
const banner = 'https://res.cloudinary.com/duz6kitlg/image/upload/v1751828863/banner_1_bb0urc.png'
const Home = () => {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)

  return (
    <div>
      {/* HERO SECTION */}
    <section id="hero-area" className="relative h-[90vh] bg-cover bg-center flex items-center">
  {/* Background image */}
  <div className="absolute inset-0 z-0">
    <img
      src={banner}
      alt="Hero Background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 text-white">
    <div className="max-w-2xl">
      <p className="text-sm uppercase tracking-wide mb-2"></p>
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 mt-5 md:mt-0">
        Our experts make your <br />health better
      </h1>
      <p className="mb-8 text-lg text-gray-200">
        Over a long period, we have provided hundreds of care services to serve the needs of our patients.
      </p>
      <div className="flex gap-4 flex-wrap items-center mb-10">
        <a
          href="#team"
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-lg transition duration-300 shadow-lg"
        >
          Make a Appointment
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-10 text-white text-left">
       
        <div>
          <h3 className="text-3xl font-bold">5+</h3>
          <p className="text-sm text-gray-300">Years experience</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">10,000+</h3>
          <p className="text-sm text-gray-300">Consults done</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="team" className="py-24 bg-gradient-to-br from-white via-blue-50 to-white">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      
     <div>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">👩‍⚕️ Our Doctors</h2>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Meet our experienced medical professionals, dedicated to providing compassionate and personalized care across various specialties.
        </p>
        <ul className="space-y-3 text-gray-700 text-base pl-5 list-disc">
          <li>Verified and top-rated experts</li>
          <li>Thousands of successful consultations</li>
          <li>Book appointments easily with just a click</li>
        </ul>
      </div>

      {/* RIGHT: Fixed-Width Doctor Cards */}
      <div className="flex flex-col items-center md:items-start gap-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="w-[250px] bg-white shadow-md rounded-xl p-4 border hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="relative">
              <img
                src={profile}
                alt={item.name}
                className="w-full h-52 object-cover rounded-md mb-3"
              />
              <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full shadow">
                ⭐ {item.rating || "4.5"}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.degree}</p>
            <div className="mt-1 text-green-600 text-sm font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item.consults || "10,000 +"} Consults done
            </div>
             {/* Book Slot Button */}
            <button
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="mt-5 inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 hover:-translate-y-1 hover:animate-bounce transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
              </svg>
              Book Your Time </button>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>


    </div>
  )
}

export default Home