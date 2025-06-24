import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-2 sm:px-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center text-3xl pt-10 text-primary font-bold tracking-wide mb-8'>
          <p>ABOUT <span className='text-indigo-700 font-extrabold'>US</span></p>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
          <img className='w-full md:max-w-[360px] rounded-2xl shadow-lg' src={assets.about_image} alt='' />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-lg text-gray-700 bg-white rounded-2xl shadow-lg p-8'>
            <p>Welcome to <span className='font-bold text-primary'>Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
            <b className='text-gray-800 text-xl'>Our Vision</b>
            <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
        <div className='text-2xl my-8 text-center font-bold text-primary'>
          <p>WHY <span className='text-indigo-700 font-extrabold'>CHOOSE US</span></p>
        </div>
        <div className='flex flex-col md:flex-row mb-20 gap-6'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-lg bg-white rounded-2xl shadow-lg hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer'>
            <b>Efficiency:</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-lg bg-white rounded-2xl shadow-lg hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer'>
            <b>Convenience:</b>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-lg bg-white rounded-2xl shadow-lg hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer'>
            <b>Personalization:</b>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About