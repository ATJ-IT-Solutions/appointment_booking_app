import React from 'react'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
     <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <p className="text-sm text-blue-600 font-semibold mb-2">Contact us</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get in touch with us
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Contact info
        </p>

        {/* World Map */}
        <div className="relative w-full flex justify-center mb-12">
          <img
            src="https://res.cloudinary.com/duz6kitlg/image/upload/v1752000892/world-map_mbkkse.webp" // update this path as needed
            alt="World Map"
            className="w-full max-w-5xl"
          />

          {/* Example Location Pin (Melbourne) */}
          <div className="absolute bottom-[10%] right-[15%] group">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 right-1 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded shadow-md w-52 text-left">
              <strong className="block">Dr. Sibi Clinic</strong>
              Karthikappally, Haripad<br />
              Alleppey, Kerala.
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
           {/* Chat to Support */}
          <div className="border rounded-xl p-6 shadow-sm text-left hover:shadow-md transition">
            <Mail className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Send Us Email</h3>
            <p className="text-gray-600 mb-2">We’re here to help.</p>
            <a href="mailto:drsibiofficial@gmail.com" className="text-blue-600 font-medium hover:underline">
              drsibiofficial@gmail.com
            </a>
          </div>

          {/* Visit Us */}
          <div className="border rounded-xl p-6 shadow-sm text-left hover:shadow-md transition">
            <MapPin className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Visit us</h3>
            <p className="text-gray-600 mb-2">Visit our clinic.</p>
            <a href="https://maps.app.goo.gl/n5t1WKuY5beTJRiX8" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
              View on Google Maps
            </a>
          </div>

          {/* Call Us */}
          <div className="border rounded-xl p-6 shadow-sm text-left hover:shadow-md transition">
            <Phone className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-1">Call us</h3>
            <p className="text-gray-600 mb-2">Mon–Fri<br/> 9:30am to 1pm, 3pm - 5pm, 7pm - 9pm</p>
            {/* <a href="tel:+15550000000" className="text-blue-600 font-medium hover:underline">
              +1 (555) 000-0000
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact