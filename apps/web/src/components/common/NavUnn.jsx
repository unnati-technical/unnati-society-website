import React, { useState, useEffect, useRef } from "react";
import Unnati from "./../../assets/Unnati.png";
import { gsap } from "gsap";
import './../../styles/navunn.css'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const NavUnn = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const header2Ref = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: () => `top+=${window.innerHeight * 0.1} top`,
      onUpdate: (self) => {
        if (self.progress > 0) {
          header2Ref.current?.classList.add("fixed-header");
        } else {
          header2Ref.current?.classList.remove("fixed-header");
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <header 
      ref={header2Ref} 
      className="bg-black/90 w-full flex justify-between sm:justify-around items-center px-2 sm:px-4 py-1 gap-2 sm:gap-10 transition-colors"
    >

      {/* Left Section */}
      <div className="flex items-center">
        
        <div className="img-cont relative w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14 mr-2 sm:mr-3">
          <img
            src={Unnati} 
            alt="Unnati logo"
            className="w-full h-full object-contain hidden"
          />
        </div>

        <div className="text-white flex flex-col justify-center">
          <h1 className="tracking-widest font-extrabold text-[10px] sm:text-[12px] md:text-[14px] xl:text-[18px] oswald-font">
            UNNATI SOCIETY
          </h1>
          <p className="text-[6px] sm:text-[8px] md:text-[9px] xl:text-[10.5px] text-gray-400 font-bold tracking-wide oswald-font-2">
            AN INSTITUTE OUTREACH ACTIVITY
          </p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden text-gray-100 sm:flex gap-2 sm:gap-3 md:gap-5 font-semibold">
        <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate("/")}>HOME</h3>
        <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate("/about-us")}>ABOUT</h3>
        <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate("/media")}>MEDIA</h3>
        <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate("/programs")}>PROGRAMS</h3>
        {/* <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate("/")}>OUTREACH</h3> */}
        <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate('/executive-body')}>PEOPLE</h3>
        <h3 className="px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px]" onClick={() => navigate('/resources')}>RESOURCES</h3>
        <h3 className="bg-blue-400 px-3 join-us py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px] oswald-font-3">JOIN US</h3>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex sm:hidden">
        <p
          className="text-white text-xl font-bold cursor-pointer"
          onClick={() => setShow(prev => !prev)}
        >
          ☰
        </p>
      </div>

      {/* Mobile Dropdown */}
      {show && (
        <div className="flex flex-col text-black gap-3 font-bold absolute right-2 top-14 w-40 bg-white p-3 shadow-lg rounded-lg sm:hidden z-50">
          <h3 className="cursor-pointer text-[11px]" onClick={() => navigate("/")}>HOME</h3>
          <h3 className="cursor-pointer text-[11px]" onClick={() => navigate("/about-us")}>ABOUT</h3>
          <h3 className="cursor-pointer text-[11px]" onClick={() => navigate("/media")}>MEDIA</h3>
          <h3 className="cursor-pointer text-[11px]" onClick={() => navigate("/programs")}>PROGRAMS</h3>
          <h3 className="cursor-pointer text-[11px]" onClick={() => navigate("/executive-body")}>PEOPLE</h3>
          <h3 className="cursor-pointer text-[11px]" onClick={() => navigate("/resources")}>Resources</h3>
          <h3 className="bg-blue-400 px-2 py-1 cursor-pointer text-[11px] text-white text-center rounded">JOIN US</h3>
        </div>
      )}

    </header>
  );
};

export default NavUnn;
