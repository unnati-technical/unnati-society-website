import React from "react";
import Unnati from "./../../assets/Unnati.png";
import IIITBh from "./../../assets/IIITBh.png";
import locationTag from "./../../assets/location-on-map.svg";

const Navbar = () => {
  return (
    <nav className="flex w-full flex-wrap bg-blue-400 justify-center sm:justify-around items-center px-3 py-2">

      {/* Left Section */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-center sm:justify-start">
        
        <div className="flex items-center">
          <img
            src={Unnati}
            alt="Unnati logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <div className="h-8 sm:h-10 md:h-12 mx-2 border-r-2 border-white"></div>
          <img
            src={IIITBh}
            alt="IIITBh logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
        </div>

        <div className="text-[7px] tracking-wide sm:text-[8px] md:text-[10px] lg:text-[11px] xl:text-[12px] flex flex-col justify-center font-semibold text-center sm:text-left">
          <h1>भारतीय सूचना प्रौद्योगिकी संस्थान भागलपुर</h1>
          <h1 className="oswald-font-2">
            Indian Institute of Information Technology Bhagalpur
          </h1>
          <h1 className="oswald-font-2">
            An Institute of National Importance established by MoE, Govt. of India
          </h1>
        </div>

      </div>

      {/* Right Section */}
      <div className="hidden sm:flex font-semibold items-center text-[7px] sm:text-[8px] md:text-[10px] xl:text-[11px] mt-2 sm:mt-0">
        
        <div className="text-right mr-2 sm:mr-3">
          <h1 className="oswald-font-2">
            Indian Institute of Information Technology Bhagalpur
          </h1>
          <h1 className="oswald-font-2">
            Bhagalpur, Bihar-813210, India
          </h1>
        </div>

        <img
          src={locationTag}
          alt="location"
          className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
        />
      </div>

    </nav>
  );
};

export default Navbar;
