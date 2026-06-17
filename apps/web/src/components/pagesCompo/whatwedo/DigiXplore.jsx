import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { FiMonitor, FiGlobe, FiShield, FiTarget } from "react-icons/fi";
import { FaUsers, FaSchool, FaLightbulb } from "react-icons/fa";

const DigiXplore = () => {
  return (
    <section className="bg-white text-black w-full flex flex-col items-center py-20 px-6 lg:px-10 overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
        
        {/* Left Side: Text and Cards */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          {/* Pill */}
          <div className="bg-[#eff6ff] text-blue-600 font-bold px-4 py-1.5 rounded-md text-xs tracking-wider uppercase w-fit">
            OUR PROGRAMS
          </div>
          
          {/* Heading */}
          <div className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            <h1 className="text-gray-900">IMPACT OF</h1>
            <h1 className="text-blue-600 mt-1">DIGIXPLORE</h1>
          </div>
          <div className="w-16 h-1 bg-blue-600 mt-2"></div>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-lg mt-4 leading-relaxed">
            DigiXplore is our flagship digital literacy program
            empowering government school students with
            essential computer skills and digital confidence
            to thrive in the modern world.
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-5">
              <div className="bg-blue-600 rounded-full p-4 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
                <FaUsers size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-black text-3xl">280+</span>
                <span className="text-gray-900 font-bold text-sm tracking-wider uppercase mt-1">CHILDREN</span>
                <span className="text-gray-500 text-sm mt-1 leading-tight">Received quality<br/>education</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-5">
              <div className="bg-blue-600 rounded-full p-4 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
                <FaSchool size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-black text-3xl">8</span>
                <span className="text-gray-900 font-bold text-sm tracking-wider uppercase mt-1">SCHOOLS</span>
                <span className="text-gray-500 text-sm mt-1 leading-tight">Reached across<br/>communities</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-[#f4f7fc] rounded-2xl p-6 flex items-start gap-5 mt-4">
            <div className="text-blue-600 flex-shrink-0 mt-1">
               <FiTarget size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-lg">Our Mission</span>
              <span className="text-gray-600 text-sm mt-1 leading-relaxed">
                To bridge the digital divide and create equal opportunities for every child through technology.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Image Grid */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-16 md:mt-0">
          <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px]">
            {/* The 2x2 rotated grid */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4 rotate-45 transform origin-center">
               <div className="overflow-hidden rounded-3xl shadow-xl bg-gray-200 relative group">
                  <img src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.40_PM_whvo3l")} alt="Impact" className="w-full h-full object-cover -rotate-45 scale-[1.5] origin-center transition-transform duration-700 group-hover:scale-[1.6]" />
               </div>
               <div className="overflow-hidden rounded-3xl shadow-xl bg-gray-200 relative group">
                  <img src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.42_PM_1_sgnwyj")} alt="Impact" className="w-full h-full object-cover -rotate-45 scale-[1.5] origin-center transition-transform duration-700 group-hover:scale-[1.6]" />
               </div>
               <div className="overflow-hidden rounded-3xl shadow-xl bg-gray-200 relative group">
                  <img src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.38_PM_4_khsl6d")} alt="Impact" className="w-full h-full object-cover -rotate-45 scale-[1.5] origin-center transition-transform duration-700 group-hover:scale-[1.6]" />
               </div>
               <div className="overflow-hidden rounded-3xl shadow-xl bg-gray-200 relative group">
                  <img src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.43.19_PM_1_do5fjx")} alt="Impact" className="w-full h-full object-cover -rotate-45 scale-[1.5] origin-center transition-transform duration-700 group-hover:scale-[1.6]" />
               </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 -left-8 w-10 h-10 bg-blue-100 rounded-xl rotate-45"></div>
            <div className="absolute bottom-16 -left-12 w-20 h-20 bg-[#6395ec] rounded-2xl rotate-45 shadow-lg"></div>
            <div className="absolute top-0 right-12 w-14 h-14 bg-blue-50 rounded-2xl rotate-45"></div>
            <div className="absolute -bottom-4 right-16 w-8 h-8 bg-[#e8f0fe] rounded-lg rotate-45"></div>
            
            {/* Dot pattern */}
            <div className="absolute top-1/2 -right-8 sm:-right-16 transform -translate-y-1/2 grid grid-cols-4 gap-2.5 opacity-40">
               {[...Array(16)].map((_, i) => (
                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6395ec]"></div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Pill */}
      <div className="mt-20 w-full max-w-6xl mx-auto bg-[#f8fbff] rounded-2xl sm:rounded-full py-4 sm:py-6 px-6 sm:px-10 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-6 sm:gap-4 lg:flex-nowrap">
         <div className="flex items-center gap-4">
           <div className="bg-blue-600 rounded-full p-2.5 text-white shadow-md shadow-blue-600/30">
             <FiMonitor size={22}/>
           </div>
           <span className="text-gray-800 font-semibold text-sm leading-tight">Computer<br/>Fundamentals</span>
         </div>
         <div className="flex items-center gap-4">
           <div className="bg-blue-600 rounded-full p-2.5 text-white shadow-md shadow-blue-600/30">
             <FiGlobe size={22}/>
           </div>
           <span className="text-gray-800 font-semibold text-sm leading-tight">Internet<br/>Literacy</span>
         </div>
         <div className="flex items-center gap-4">
           <div className="bg-blue-600 rounded-full p-2.5 text-white shadow-md shadow-blue-600/30">
             <FiShield size={22}/>
           </div>
           <span className="text-gray-800 font-semibold text-sm leading-tight">Digital Safety<br/>& Awareness</span>
         </div>
         <div className="flex items-center gap-4">
           <div className="bg-blue-600 rounded-full p-2.5 text-white shadow-md shadow-blue-600/30">
             <FaLightbulb size={22}/>
           </div>
           <span className="text-gray-800 font-semibold text-sm leading-tight">Creative<br/>Digital Skills</span>
         </div>
      </div>
    </section>
  );
};

export default DigiXplore;
