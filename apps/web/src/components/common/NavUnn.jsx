import React, { useState, useEffect, useRef } from "react";
const Unnati = "https://res.cloudinary.com/drhkvdtw2/image/upload/v1782396887/unnati_assets/Unnati.png";
import { gsap } from "gsap";
import './../../styles/navunn.css'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const NavUnn = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getDesktopClass = (path) => {
    const base = "px-1 sm:px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px] hover:text-blue-400 hover:underline underline-offset-4 decoration-2 transition-colors";
    return isActive(path) ? `${base} text-blue-400 underline` : base;
  };

  const getMobileClass = (path) => {
    const base = "cursor-pointer text-[11px] transition-colors";
    return isActive(path) ? `${base} text-blue-600 font-extrabold` : base;
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about-us" },
    { name: "OUTREACH", path: "/outreach" },
    { name: "PROGRAMS", path: "/programs" },
    { name: "PEOPLE", path: "/executive-body" },
    { name: "MEDIA", path: "/media" },
    { name: "RESOURCES", path: "/resources" },
  ];

  return (
    <header 
      ref={header2Ref} 
      className="bg-black/90 w-full flex justify-between sm:justify-around items-center px-2 sm:px-4 py-1 gap-2 sm:gap-10 transition-colors"
    >

      {/* Left Section */}
      <div className="flex items-center">
        
        <div className="img-cont relative w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14 mr-2 sm:mr-3">
          <img loading="lazy" 
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
        {navLinks.map((link) => {
          if (link.name === "OUTREACH") {
            return (
              <div key={link.name} className="relative group">
                <h3 
                  className={getDesktopClass(link.path)} 
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </h3>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/outreach#campus-visit')}>Campus Visit</p>
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/outreach#invite')}>Invite</p>
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/outreach#collaborate')}>Collaborate/Partner</p>
                </div>
              </div>
            );
          } else if (link.name === "PROGRAMS") {
            return (
              <div key={link.name} className="relative group">
                <h3 
                  className={getDesktopClass(link.path)} 
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </h3>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/programs')}>Impact</p>
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/programs/digiXplore')}>DigiXplore</p>
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/programs/netritva')}>Netritva</p>
                  <p className="px-4 py-2 text-[12px] text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 cursor-pointer" onClick={() => navigate('/programs/akshar')}>Akshar</p>
                </div>
              </div>
            );
          }
          return (
            <h3 
              key={link.name}
              className={getDesktopClass(link.path)} 
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </h3>
          );
        })}
        <h3 className="bg-[#2563EB] hover:bg-blue-600 text-white px-3 py-1 cursor-pointer text-[10px] sm:text-[11px] md:text-[12px] rounded-md transition-colors font-bold tracking-wide shadow-md hover:shadow-lg" onClick={() => navigate('/donate')}>DONATE</h3>
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
        <div className="flex flex-col text-black gap-3 font-bold absolute right-2 top-14 w-48 bg-white p-3 shadow-lg rounded-lg sm:hidden z-50">
          {navLinks.map((link) => {
            if (link.name === "OUTREACH") {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <h3 
                    className={getMobileClass(link.path)} 
                    onClick={() => { navigate(link.path); setShow(false); }}
                  >
                    {link.name}
                  </h3>
                  <div className="flex flex-col pl-3 gap-2 border-l-2 border-gray-100 ml-1">
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/outreach#campus-visit'); setShow(false); }}>Campus Visit</p>
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/outreach#invite'); setShow(false); }}>Invite</p>
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/outreach#collaborate'); setShow(false); }}>Collaborate/Partner</p>
                  </div>
                </div>
              );
            } else if (link.name === "PROGRAMS") {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <h3 
                    className={getMobileClass(link.path)} 
                    onClick={() => { navigate(link.path); setShow(false); }}
                  >
                    {link.name}
                  </h3>
                  <div className="flex flex-col pl-3 gap-2 border-l-2 border-gray-100 ml-1">
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/programs'); setShow(false); }}>Impact</p>
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/programs/digiXplore'); setShow(false); }}>DigiXplore</p>
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/programs/netritva'); setShow(false); }}>Netritva</p>
                    <p className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-blue-500" onClick={() => { navigate('/programs/akshar'); setShow(false); }}>Akshar</p>
                  </div>
                </div>
              );
            }
            return (
              <h3 
                key={link.name}
                className={getMobileClass(link.path)} 
                onClick={() => { navigate(link.path); setShow(false); }}
              >
                {link.name}
              </h3>
            );
          })}
          <h3 className="bg-[#2563EB] px-2 py-1.5 cursor-pointer text-[11px] text-white text-center rounded font-bold tracking-wide" onClick={() => { navigate("/donate"); setShow(false); }}>DONATE</h3>
        </div>
      )}

    </header>
  );
};

export default NavUnn;
