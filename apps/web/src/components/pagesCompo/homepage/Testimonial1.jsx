import React from 'react'
import { cloudinaryImage2 } from '../../../utils/cloudinary'

const Testimonial1 = () => {
  return (
    <section className="w-full flex justify-center items-center py-20 bg-linear-to-b from-white via-gray-50 to-white overflow-hidden">
  
        <div className="w-[90%] md:w-3/4 relative">
        <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full scale-75" />
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-5 bg-white/70 backdrop-blur-xl 
                        border border-gray-200  rounded-[40px]  shadow-[0_10px_40px_rgba(0,0,0,0.08)] Px-8 py-6 overflow-hidden"
        >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500" />
        <div className="relative group">
        <div className="absolute inset-0 bg-cyan-300/20 blur-2xl rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <img
          src={cloudinaryImage2("2_hsoihi")}
          alt="testimonial"
          className="relative w-screen h-20 object-cover rounded-[28px] shadow-xl transition-all duration-500 group-hover:-translate-y-2"
        />
      </div>
    </div>
  </div>
</section>
  )
}

export default Testimonial1