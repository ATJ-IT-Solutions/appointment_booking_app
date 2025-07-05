import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import {Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Dashboard } from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div >
      <ToastContainer/>
       <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/appointments' element={<AllAppointments/>} />
        </Routes>
      </div>
    </div>
  ) :
  (
    <>
       <Login/>
      <ToastContainer/>
    </>
  )
}

export default App