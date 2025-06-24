import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-2 sm:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center text-3xl pt-10 text-primary font-bold tracking-wide mb-8'>
          <p>CONTACT <span className='text-indigo-700 font-extrabold'>US</span></p>
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-lg'>
          <img className='w-full md:max-w-[360px] rounded-2xl shadow-lg' src={assets.contact_image} alt='' />
          <div className='flex flex-col justify-center items-start gap-6 bg-white rounded-2xl shadow-lg p-8 w-full'>
            <p className='font-semibold text-xl text-gray-700'>Our OFFICE</p>
            <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
            <p className='text-gray-500 flex items-center gap-2'><span className='material-icons text-primary'>phone</span> Tel: (415) 555 0132</p>
            <p className='text-gray-500 flex items-center gap-2'><span className='material-icons text-primary'>email</span> Email: sadikahmetaydin@gmail.com</p>
            <p className='font-semibold text-xl text-gray-700'>Careers at PRESCRIPTO</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='border border-primary px-8 py-4 text-lg rounded-full hover:bg-primary hover:text-white transition-all duration-500'>Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact