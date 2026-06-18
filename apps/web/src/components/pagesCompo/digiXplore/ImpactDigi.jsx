import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { FiTrendingUp } from "react-icons/fi";

const ImpactDigi = () => {
  return (
    <section className="bg-[#f8fbff] text-black py-20 px-6 lg:px-10 overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-12 lg:gap-16">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0">
          <div className="relative w-full max-w-[500px] aspect-[4/3]">
            {/* Decorative BG */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-200/50 rounded-3xl -z-10"></div>
            <div className="absolute top-1/2 -right-10 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl -z-10"></div>
            
            {/* Main Image */}
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
              <img src={cloudinaryImage("IMG-20250412-WA0001_geachy")} alt="Impact" className="w-full h-full object-cover transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="flex flex-col w-full md:w-1/2 relative z-10 md:items-end md:text-right">
          {/* Pill */}
          <div className="bg-white border border-blue-100 shadow-sm text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase w-fit flex items-center gap-2 mb-6">
            <FiTrendingUp size={16} /> OUR IMPACT
          </div>
          
          {/* Heading */}
          <div className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 flex flex-col md:items-end">
            <h1 className="text-gray-900">IMPACT OF</h1>
            <h1 className="text-blue-600 mt-1">DIGIXPLORE</h1>
          </div>
          
          <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-[500px] leading-relaxed">
            The program has empowered hundreds of students in government schools to gain basic computer skills, improved their confidence in using digital tools, and enhanced classroom engagement. Regular evaluations and activity-based learning have helped students develop problem-solving abilities and curiosity towards modern education.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default ImpactDigi;