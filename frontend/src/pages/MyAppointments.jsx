import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  const statusBadge = (item) => {
    if (item.cancelled) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-red-500 text-red-500 bg-red-50 text-xs font-semibold">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          Cancelled
        </span>
      )
    } else if (item.isCompleted) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-green-500 text-green-500 bg-green-50 text-xs font-semibold">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Completed
        </span>
      )
    } else {
      return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Appointments</h2>
        <div className="space-y-8">
          {appointments.length === 0 && (
            <div className="text-center text-gray-400 text-lg py-16">No appointments found.</div>
          )}
          {appointments.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:items-stretch gap-6 p-6 md:p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              {/* Doctor Image */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <img className="w-32 h-32 rounded-xl object-cover bg-indigo-50 border-2 border-blue-100 shadow" src={item.docData.image} alt="Doctor" />
              </div>
              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-xl font-bold text-blue-900 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.866-1.343-7-3-7s-3 3.134-3 7c0 3.866 1.343 7 3 7s3-3.134 3-7z" /></svg>
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-purple-700 font-medium mb-1">{item.docData.speciality}</p>
                    </div>
                    <div>{statusBadge(item)}</div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700 font-semibold">Address:</p>
                    <p className="text-gray-500 text-sm">{item.docData.address.line1}</p>
                    <p className="text-gray-500 text-sm">{item.docData.address.line2}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="font-medium">Date & Time:</span>
                    <span className="text-gray-600">{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                  </div>
                </div>
                {/* Cancel Button */}
                {!item.cancelled && !item.isCompleted && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-red-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointments