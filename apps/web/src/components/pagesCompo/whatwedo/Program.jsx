import React from "react";
import { useNavigate } from "react-router-dom";
import { cloudinaryImage2 } from "../../../utils/cloudinary";

const Program = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-cover bg-center text-white flex w-screen justify-center items-center px-10 py-30 md:py-25" style={{backgroundImage: `url(${cloudinaryImage2("IMG_9931_ljitar")})`}}>
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>
      <div className="w-full md:w-3/4 flex flex-col xl:flex-row justify-between items-center">
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div>
            <h1 className="oswald-font-3 text-2xl sm:text-3xl md:text-5xl drop-shadow-lg">OUR</h1>
            <h1 className="oswald-font-3 text-2xl sm:text-3xl md:text-5xl drop-shadow-lg">PROGRAMS</h1>
          </div>
          <div className="w-20 h-0.5 bg-blue-400"></div>
          <div>
            <p className="text-gray-100 inter-font-2 drop-shadow-md">
              "Empowering young minds with the skills of tomorrow." DigiXplore
              is designed to empower students with essential digital literacy
              skills through engaging workshops.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full h-100">
          <div
            className="absolute z-10 h-36 w-36 rounded-full bg-white text-black flex items-center justify-center text-2xl oswald-font-3 cursor-pointer shadow-xl"
            onClick={() => navigate("/programs/digiXplore")}
          >
            DigiXplore
          </div>

          <div
            className="absolute top-0 h-24 w-24 rounded-full bg-blue-400 text-white flex items-center justify-center oswald-font-3 cursor-pointer"
            onClick={() => navigate("/programs/akshar")}
          >
            Akshar
          </div>

          <div
            className="absolute left-[22%] bottom-16 h-24 w-24 rounded-full bg-blue-400 text-white flex items-center justify-center oswald-font-3 cursor-pointer"
            onClick={() => navigate("/programs/netritva")}
          >
            Netritva
          </div>

          <div
            className="absolute right-[22%] bottom-16 h-24 w-24 rounded-full bg-blue-400 text-white flex items-center justify-center oswald-font-3 cursor-pointer"
            onClick={() => navigate("/media/outreach/school-visit")}
          >
            School 
            Visits
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Program;
