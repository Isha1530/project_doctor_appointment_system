import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='bg-gray-50 min-h-screen py-8 px-2 sm:px-8'>
      <div className='max-w-6xl mx-auto'>
        <p className='text-gray-700 text-2xl font-semibold mb-6'>Browse through the doctors specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-8 mt-5'>
          <button className={`py-2 px-4 border rounded-lg text-base font-medium transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
          <div className={`flex-col gap-4 text-base text-gray-700 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : 'bg-white hover:bg-indigo-50'}`}>General physician</p>
            <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : 'bg-white hover:bg-indigo-50'}`}>Gynecologist</p>
            <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : 'bg-white hover:bg-indigo-50'}`}>Dermatologist</p>
            <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : 'bg-white hover:bg-indigo-50'}`}>Pediatricians</p>
            <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : 'bg-white hover:bg-indigo-50'}`}>Neurologist</p>
            <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : 'bg-white hover:bg-indigo-50'}`}>Gastroenterologist</p>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 gap-y-10'>
            {
              filterDoc.map((item, index) => (
                <div onClick={() => navigate(`/appointment/${item._id}`)} className='bg-white border border-blue-100 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center' key={index}>
                  <div className='flex justify-center w-full pt-6'>
                    <img className='w-36 h-36 rounded-full object-cover border-4 border-primary bg-blue-50' src={item.image} alt="Doctor" />
                  </div>
                  <div className='p-6 w-full flex flex-col items-center'>
                    <div className={`flex items-center gap-2 text-base font-semibold mb-2 ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                      <span className={`inline-block w-3 h-3 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className=''>{item.available ? 'Available' : 'Not Available'}</span>
                    </div>
                    <p className='text-gray-900 text-lg font-bold'>{item.name}</p>
                    <p className='text-gray-600 text-base'>{item.speciality}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors