import React from 'react'
import { cloudinaryImage2 } from '../../../utils/cloudinary'

const Education = () => {
  return (
    <section className='w-screen flex justify-center items-center py-10'>
       <div className='w-3/4 flex flex-col md:flex-row justify-around md:items-center'>
          <div className='flex md:flex-col gap-3 md:justify-center items-center'>
            <img src={cloudinaryImage2("education_gruojl")} alt="" className='w-25 h-25'/>
            <h2 className='oswald-font-3'>EDUCATION</h2>
          </div>
          <div className='flex md:flex-col gap-3 md:justify-center items-center'>
            <img src={cloudinaryImage2("digital_literacy_rx2hga")} alt="" className='w-25 h-25'/>
            <h2 className='oswald-font-3'>DIGITAL LITERACY</h2>
          </div>
          <div className='flex md:flex-col gap-3 md:justify-center items-center'>
            <img src={cloudinaryImage2("holistic_growth_w5gi6i")} alt="" className='w-25 h-25'/>
            <h2 className='oswald-font-3'>HOLISTIC GROWTH</h2>
          </div>
          <div className='flex md:flex-col gap-3 md:justify-center items-center'>
            <img src={cloudinaryImage2("mentorship_mcqfap")} alt="" className='w-25 h-25'/>
            <h2 className='oswald-font-3'>MENTORSHIP</h2>
          </div>
          <div className='flex md:flex-col gap-3 md:justify-center items-center'>
            <img src={cloudinaryImage2("compassion_frf05v")} alt="" className='w-25 h-25'/>
            <h2 className='oswald-font-3'>COMPASSION</h2>
          </div>
       </div>
    </section>
  )
}

export default Education