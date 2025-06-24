import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-2xl font-bold text-gray-800'>All Appointments</p>

      <div className='bg-white border rounded-lg text-sm overflow-x-auto shadow-sm'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>#</th>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>Patient</th>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>Age</th>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>Date & Time</th>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>Doctor</th>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>Fees</th>
              <th className='px-4 py-3 text-left font-semibold text-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {appointments.map((item, index) => (
              <tr key={index} className='hover:bg-gray-50 transition'>
                <td className='px-4 py-3'>{index + 1}</td>
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    {item.userData.image ? (
                      <img className='w-8 h-8 rounded-full object-cover border' src={item.userData.image} alt='' />
                    ) : (
                      <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-bold'>
                        {item.userData.name ? item.userData.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <span className='font-semibold text-gray-700'>{item.userData.name}</span>
                  </div>
                </td>
                <td className='px-4 py-3'>{isNaN(calculateAge(item.userData.dob)) ? '-' : calculateAge(item.userData.dob)}</td>
                <td className='px-4 py-3 whitespace-nowrap'>{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    {item.docData.image ? (
                      <img className='w-8 h-8 rounded-full object-cover border' src={item.docData.image} alt='' />
                    ) : (
                      <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-bold'>
                        {item.docData.name ? item.docData.name.charAt(0).toUpperCase() : 'D'}
                      </div>
                    )}
                    <span className='font-semibold text-gray-700'>{item.docData.name}</span>
                  </div>
                </td>
                <td className='px-4 py-3'>{currency}{item.amount}</td>
                <td className='px-4 py-3'>
                  {item.cancelled
                    ? <span className='text-red-500 text-xs font-semibold'>Cancelled</span>
                    : <button onClick={() => cancelAppointment(item._id)} className='w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 border border-red-200 transition'><img className='w-5' src={assets.cancel_icon} alt='' /></button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllAppointments