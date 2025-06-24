import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const scrollToProfile = () => {
    const profileSection = document.getElementById('doctor-profile-section');
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const role = localStorage.getItem('role');

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{role === 'doctor' ? 'Doctor' : 'Admin'}</p>
      </div>

      <div className='flex gap-2'>
        {role === 'doctor' && (
          <button onClick={scrollToProfile} className='bg-gray-200 text-primary text-sm px-6 py-2 rounded-full border border-primary'>My Profile</button>
        )}
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar