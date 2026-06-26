import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { FiTarget } from "react-icons/fi";

const FutureScopeNet = () => {
  return (
    <section className="bg-white text-black py-20 px-6 lg:px-10 overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-16">
        
        {/* Left Side: Text */}
        <div className="flex flex-col w-full md:w-1/2 relative z-10">
          {/* Pill */}
          <div className="bg-[#eff6ff] text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase w-fit flex items-center gap-2 mb-6">
            <FiTarget size={16} /> THE FUTURE
          </div>
          
          {/* Heading */}
          <div className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            <h1 className="text-gray-900">FUTURE SCOPE OF</h1>
            <h1 className="text-blue-600 mt-1">NETRITVA</h1>
          </div>
          
          <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-[500px] leading-relaxed">
            The program plans to create a structured mentorship network, connect students with industry professionals and alumni, and offer scholarship and internship guidance. Netritva envisions becoming a comprehensive career support ecosystem for rural and first-generation learners.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0">
          <div className="relative w-full max-w-[500px] aspect-[4/3]">
            {/* Decorative BG */}
            <div className="absolute top-6 left-6 w-full h-full bg-[#f8fbff] border-2 border-blue-100 rounded-3xl -z-10"></div>
            
            {/* Main Image */}
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.15)] border-4 border-white bg-gray-100">
              <img loading="lazy" src={cloudinaryImage("IMG_20250411_114454_wokjdu")} alt="Future Scope" className="w-full h-full object-cover -scale-x-100 transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default FutureScopeNet;