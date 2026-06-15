import React from "react";
import play from './../../../assets/play.png'
import herosection from './../../../assets/herosection.jpeg'
import { cloudinaryImage2 } from "../../../utils/cloudinary";
import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";


const HeroSection = () => {
  const navigate = useNavigate();
  const openVideo = () => {
    window.open("https://player.cloudinary.com/embed/?cloud_name=dwxckh5t4&public_id=home_video_dq0ac8", "_blank");
  };
  return (
    // <section
    //       className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full text-white overflow-hidden"
    //       style={{backgroundImage: `url(${cloudinaryImage2("GICS_3_ji24dg")})`}}
    // >
   <section className="relative bg-cover bg-center text-white flex justify-start pt-10 pb-10 xl:pb-52 px-10 xl:px-62 sm:py-30 sm:pb-51 items-center min-h-[50vh]" style={{backgroundImage: `url(${cloudinaryImage2("akshar_circle_wh3pw7")})`}}> 
   <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>
      <div className="flex flex-col justify-start gap-4">
        <div className="oswald-font text-xl sm:text-2xl md:text-5xl tracking-wide">
          <h1 className="text-white drop-shadow-lg">EMPOWERING</h1>
          <h1 className="text-white drop-shadow-lg">DREAMS</h1>
        </div>
        <div>
          <p className="text-[18px] great-vibes-regular text-blue-400 sm:text-xl tracking-wide drop-shadow-md">Revolutionizing Present, Transforming Future</p>
        </div>
        <div className="max-w-xl">
          <p className="border-4 inter-font border-l-blue-400 border-r-0 border-t-0 border-b-0 pl-4 text-sm md:text-xl drop-shadow-md">
            We bridge the digital divide by providing underprivileged students
            with essential technology education and basic knowledge, equipping
            them for the digital age.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-[12px] flex justify-center items-center sm:text-xl bg-white text-black font-extrabold oswald-font-3 px-5 py-2 cursor-pointer drop-shadow-md" onClick={() => navigate('/about-us')}>READ MORE</div>
          <div className="text-[12px] flex justify-center items-center oswald-font-3 border font-bold border-white px-5 py-2 gap-2 cursor-pointer">
            <button
              onClick={openVideo}
              className="text-[12px] flex items-center gap-2 oswald-font-3 font-bold px-5 py-2 cursor-pointer hover:scale-105 transition drop-shadow-md"
            >
              <div className="bg-white rounded-full p-1">
                <img src={play} alt="play" className="w-4 h-4" />
              </div>

              WATCH VIDEO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
