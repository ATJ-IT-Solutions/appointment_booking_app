import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './assets/css/App.css';
import './assets/css/lineicons.css';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
   <div>
   <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/my-appointments' element={<MyAppointments/>}/>
      <Route path='/appointment/:docId' element={<Appointment/>}/>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App