import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-2 sm:px-8'>
      <div className='max-w-6xl mx-auto flex flex-col gap-14'>
        <div className='rounded-2xl shadow-lg bg-white p-6 sm:p-10'><Header /></div>
        <div className='rounded-2xl shadow-lg bg-white p-6 sm:p-10'><SpecialityMenu /></div>
        <div className='rounded-2xl shadow-lg bg-white p-6 sm:p-10'><TopDoctors /></div>
        <div className='rounded-2xl shadow-lg bg-white p-6 sm:p-10'><Banner /></div>
      </div>
    </div>
  )
}

export default Home