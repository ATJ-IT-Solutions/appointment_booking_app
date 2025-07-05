import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
   <footer className="relative bg-cover bg-center text-white px-6 py-10 overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0 bg-[url('../assets/img/landing/banner_dental.png')] bg-cover bg-center z-0"></div>

  {/* Light overlay for contrast (not too dark) */}
  <div className="absolute inset-0 bg-black/30 z-0"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-left">
    {/* Logo and Description */}
    <div>
      <img src="../assets/img/landing/sibi_logo.png" className='w-30 cursor-pointer p-2 rounded footer-img mb-2'/>
    </div>

    {/* Links */}
    <div>
      <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
      <ul className="space-y-1 text-gray-200">
        <li><a href="#" className="hover:text-white transition duration-300">Home</a></li>
        <li><a href="#" className="hover:text-white transition duration-300">About</a></li>
        <li><a href="#" className="hover:text-white transition duration-300">Services</a></li>
        <li><a href="#" className="hover:text-white transition duration-300">Contact</a></li>
      </ul>
    </div>

    {/* Social Icons */}
    <div>
      <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
      <div className="flex justify-start md:justify-start space-x-4 mt-4">
        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
          <a
            key={index}
            href="#"
            className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-full transition-transform duration-300 transform hover:-translate-y-1"
          >
            <Icon className="text-white" />
          </a>
        ))}
      </div>
    </div>
  </div>

  {/* Bottom Line */}
  <div className="relative z-10 border-t border-gray-600 mt-10 pt-4 text-center text-gray-300 text-sm">
    © {new Date().getFullYear()} ATJ IT Solutions. All rights reserved.
  </div>
</footer>


  )
}

export default Footer