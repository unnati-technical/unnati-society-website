import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { FiBookOpen, FiTarget } from "react-icons/fi";
import { FaQuoteLeft, FaSitemap, FaSeedling } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSchool } from "react-icons/lu";
import AnimatedCounter from "../../common/AnimatedCounter";

const Akshar = () => {
  return (
    <section className="bg-white text-black w-full flex flex-col items-center py-20 px-6 lg:px-10 overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">

        {/* Left Side: Text and Cards */}
        <div className="flex flex-col w-full md:w-1/2">
          {/* Pill */}
          <div className="bg-[#eff6ff] text-blue-600 font-bold px-4 py-2 rounded-full text-xs tracking-wider uppercase w-fit flex items-center gap-2">
            <FiBookOpen size={16} /> OUR PROGRAMS
          </div>

          {/* Blue Underline */}
          <div className="w-16 h-1 bg-blue-600 mt-6 mb-4"></div>

          {/* Heading */}
          <div className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            <h1 className="text-gray-900">IMPACT OF</h1>
            <h1 className="text-blue-600 mt-1">AKSHAR</h1>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-[15px] sm:text-base max-w-[480px] mt-4 leading-relaxed">
            Akshar is our foundational education program
            dedicated to providing quality learning support to
            underprivileged children and building a strong
            academic foundation for a better tomorrow.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full max-w-[500px]">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-5">
              <div className="bg-blue-600 rounded-full p-4 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
                <HiOutlineUserGroup size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600 font-black text-4xl"><AnimatedCounter value={200} suffix="+" /></span>
                <span className="text-gray-900 font-bold text-sm tracking-wider uppercase mt-1">CHILDREN</span>
                <span className="text-gray-500 text-sm mt-1 leading-tight">Received quality<br />education</span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-5">
              <div className="bg-blue-600 rounded-full p-4 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
                <LuSchool size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600 font-black text-4xl"><AnimatedCounter value={1} /></span>
                <span className="text-gray-900 font-bold text-sm tracking-wider uppercase mt-1">BRANCH</span>
                <span className="text-gray-500 text-sm mt-1 leading-tight">Opened for<br />students</span>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-[#f8fbff] border-l-[6px] border-blue-600 rounded-r-2xl p-6 mt-4 flex items-start gap-5 max-w-[480px]">
            <div className="text-blue-600 flex-shrink-0 mt-1">
              <FaQuoteLeft size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-600 italic text-[15px] leading-relaxed">
                "Education is the most powerful tool which you can use to change the world."
              </p>
              <span className="text-blue-600 font-bold text-sm mt-3">- Nelson Mandela</span>
            </div>
          </div>
        </div>

        {/* Right Side: Image Cluster */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-16 md:mt-0">
          <div className="relative w-full aspect-[4/3] max-w-[600px] flex items-center justify-start ml-0 lg:ml-10">

            {/* Decorative Dots Pattern (Top Left) */}
            <div className="absolute -top-4 -left-4 sm:top-0 sm:left-4 grid grid-cols-4 gap-2 opacity-50 z-0">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              ))}
            </div>

            {/* Striped Circle (Bottom Left) */}
            <div className="absolute -bottom-10 left-0 w-32 h-32 rounded-full overflow-hidden z-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0, #3b82f6 2px, transparent 2px, transparent 8px)' }}></div>

            {/* Main Image */}
            <div className="absolute left-8 top-10 bottom-10 w-[60%] rounded-3xl rounded-bl-[80px] overflow-hidden shadow-2xl z-10 bg-gray-200">
              <img loading="lazy" src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.39_PM_5_ney7sn")} alt="Main class" className="w-full h-full object-cover" />
            </div>

            {/* 3 Circular images */}
            {/* Top Right */}
            <div className="absolute -top-4 right-8 sm:right-12 z-20 w-32 h-32 sm:w-44 sm:h-44 rounded-full border-[6px] sm:border-8 border-white shadow-xl overflow-hidden group bg-gray-200">
              <img loading="lazy" src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.39_PM_4_wemv2f")} alt="Kids smiling" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            {/* Center Right */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 z-30 w-40 h-40 sm:w-52 sm:h-52 rounded-full border-[6px] sm:border-8 border-white shadow-2xl overflow-hidden group bg-gray-200">
              <img loading="lazy" src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.39_PM_1_kmyefy")} alt="Board writing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            {/* Bottom Right */}
            <div className="absolute -bottom-8 right-12 sm:right-16 z-20 w-36 h-36 sm:w-48 sm:h-48 rounded-full border-[6px] sm:border-8 border-white shadow-xl overflow-hidden group bg-gray-200">
              <img loading="lazy" src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.40_PM_3_hvzrrm")} alt="Boy sitting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Features Pill */}
      <div className="mt-24 w-full max-w-7xl mx-auto bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl py-8 px-6 sm:px-10 flex flex-col lg:flex-row flex-wrap justify-between items-start lg:items-center gap-8 lg:gap-4 relative z-10">

        <div className="flex items-center lg:items-start gap-4 flex-1">
          <div className="bg-blue-600 rounded-full p-3.5 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
            <FiBookOpen size={24} />
          </div>
          <div className="flex flex-col mt-0.5">
            <span className="text-gray-900 font-bold text-sm tracking-wider uppercase">FOUNDATIONAL LEARNING</span>
            <span className="text-gray-500 text-[13px] mt-1 leading-snug">Building strong basics<br />in literacy and numeracy</span>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200 h-16"></div>

        <div className="flex items-center lg:items-start gap-4 flex-1">
          <div className="bg-blue-600 rounded-full p-3.5 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
            <FaSitemap size={24} />
          </div>
          <div className="flex flex-col mt-0.5">
            <span className="text-gray-900 font-bold text-sm tracking-wider uppercase">PERSONAL ATTENTION</span>
            <span className="text-gray-500 text-[13px] mt-1 leading-snug">Small group sessions for<br />better understanding</span>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200 h-16"></div>

        <div className="flex items-center lg:items-start gap-4 flex-1">
          <div className="bg-blue-600 rounded-full p-3.5 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
            <FaSeedling size={24} />
          </div>
          <div className="flex flex-col mt-0.5">
            <span className="text-gray-900 font-bold text-sm tracking-wider uppercase">HOLISTIC GROWTH</span>
            <span className="text-gray-500 text-[13px] mt-1 leading-snug">Encouraging confidence,<br />curiosity and creativity</span>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-gray-200 h-16"></div>

        <div className="flex items-center lg:items-start gap-4 flex-1">
          <div className="bg-blue-600 rounded-full p-3.5 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
            <FiTarget size={24} />
          </div>
          <div className="flex flex-col mt-0.5">
            <span className="text-gray-900 font-bold text-sm tracking-wider uppercase">BETTER TOMORROW</span>
            <span className="text-gray-500 text-[13px] mt-1 leading-snug">Preparing children for a<br />brighter future</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Akshar;
