import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { FiUsers } from "react-icons/fi";

const BriefNet = () => {
  return (
    <section className="bg-white text-black py-20 px-6 lg:px-10 overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-16">
        
        {/* Left Side: Text */}
        <div className="flex flex-col w-full md:w-1/2 relative z-10">
          {/* Pill */}
          <div className="bg-[#eff6ff] text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase w-fit flex items-center gap-2 mb-6">
            <FiUsers size={16} /> OUR PROGRAM
          </div>
          
          {/* Heading */}
          <div className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            <h1 className="text-gray-900">WHAT IS</h1>
            <h1 className="text-blue-600 mt-1">NETRITVA?</h1>
          </div>
          
          <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-[500px] leading-relaxed">
            Netritva is Unnati’s career guidance and mentorship program designed to help underprivileged students discover their potential and make informed career choices. It provides exposure to diverse career paths, skill development sessions, and one-to-one mentoring to nurture leadership and self-belief.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0">
          <div className="relative w-full max-w-[500px] aspect-[4/3]">
            {/* Decorative BG */}
            <div className="absolute top-4 -right-4 w-full h-full bg-blue-100 rounded-3xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:16px_16px] -z-10"></div>
            
            {/* Main Image */}
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
              <img loading="lazy" src={cloudinaryImage("20250412_121240_qlh9ea")} alt="Vision" className="w-full h-full object-cover -scale-x-100 transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default BriefNet;