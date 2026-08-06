import React from "react";
import { imagekitImage } from "../../../utils/imagekit";
import { FiTarget } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSchool } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import AnimatedCounter from "../../common/AnimatedCounter";

const Netritva = () => {
  return (
    <section className="bg-white text-black w-full flex flex-col items-center py-20 px-6 lg:px-10 overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
        {/* Left Side: Image Cluster and Our Focus Box */}
        <div className="w-full md:w-1/2 flex flex-col items-center relative">
          {/* Image Cluster Container */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto mt-4">
            {/* Background SVG curved dotted line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 500 500"
            >
              <path
                d="M 80 280 C 120 80, 350 40, 420 160"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="opacity-70"
              />
            </svg>

            {/* Solid light blue circle (left) */}
            <div className="absolute top-1/4 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#f0f5ff] rounded-full z-0"></div>

            {/* Small hollow circle (top right) */}
            <div className="absolute top-12 right-28 sm:right-32 w-8 h-8 border-2 border-blue-600 rounded-full z-0 bg-white"></div>

            {/* Dots pattern (bottom left) */}
            <div className="absolute bottom-16 left-16 sm:left-24 grid grid-cols-4 gap-2 opacity-40 z-0">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-600"
                ></div>
              ))}
            </div>

            {/* Top Right Image */}
            <div className="absolute top-8 sm:top-8 right-2 sm:right-2 z-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full border-[6px] sm:border-8 border-white shadow-xl overflow-hidden group bg-gray-200">
              <img
                loading="lazy"
                src={
                  "https://ik.imagekit.io/zpkfsvgtn/Programs/WhatsApp_Image_2026-02-03_at_1.39%20(4).jpg"
                }
                alt="Impact Top"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Center Main Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[6px] sm:border-8 border-white shadow-2xl overflow-hidden group bg-gray-200">
              <img
                loading="lazy"
                src={
                  "https://ik.imagekit.io/zpkfsvgtn/Programs/WhatsApp_Image_2026-02-03_at_1.39%20(3).jpg"
                }
                alt="Impact Center"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Bottom Left Image */}
            <div className="absolute bottom-2 sm:bottom-2 left-0 sm:left-0 z-20 w-44 h-44 sm:w-52 sm:h-52 rounded-full border-[6px] sm:border-8 border-white shadow-xl overflow-hidden group bg-gray-200">
              <img
                loading="lazy"
                src={
                  "https://ik.imagekit.io/zpkfsvgtn/Programs/WhatsApp_Image_2026-02-03_at_1.39%20(5).jpg"
                }
                alt="Impact Bottom"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Mission/Focus Card moved to left side below the images */}
          <div className="bg-[#f8fbff] rounded-2xl p-6 flex items-start gap-5 mt-10 w-full max-w-[500px]">
            <div className="text-blue-600 flex-shrink-0 mt-1">
              <TbTargetArrow size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-lg">Our Focus</span>
              <span className="text-gray-600 text-sm mt-1 leading-relaxed">
                Career guidance, personality development, and life skills for a
                confident tomorrow.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Text and Cards */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 mt-4 md:mt-12">
          {/* Pill */}
          <div className="bg-[#eff6ff] text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase w-fit">
            OUR PROGRAMS
          </div>

          {/* Blue Underline */}
          <div className="w-16 h-1 bg-blue-600 mt-1 mb-1"></div>

          {/* Heading */}
          <div className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            <h1 className="text-gray-900">IMPACT OF</h1>
            <h1 className="text-blue-600 mt-1">NETRITVA</h1>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-[15px] sm:text-base max-w-[480px] mt-2 leading-relaxed">
            Netritva is our mentorship and guidance program that helps students
            discover their potential, build confidence, and make informed
            decisions for a brighter future.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full max-w-[500px]">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-5">
              <div className="bg-blue-600 rounded-full p-4 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
                <HiOutlineUserGroup size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600 font-black text-4xl">
                  <AnimatedCounter value={600} suffix="+" />
                </span>
                <span className="text-gray-900 font-bold text-sm tracking-wider uppercase mt-1">
                  CHILDREN
                </span>
                <span className="text-gray-500 text-sm mt-1 leading-tight">
                  Received guidance
                  <br />
                  and mentorship
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-5">
              <div className="bg-blue-600 rounded-full p-4 text-white flex-shrink-0 shadow-lg shadow-blue-600/30">
                <LuSchool size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600 font-black text-4xl">
                  <AnimatedCounter value={3} />
                </span>
                <span className="text-gray-900 font-bold text-sm tracking-wider uppercase mt-1">
                  SCHOOLS
                </span>
                <span className="text-gray-500 text-sm mt-1 leading-tight">
                  Reached and
                  <br />
                  collaborated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Netritva;
