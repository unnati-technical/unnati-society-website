import React from "react";
import { useNavigate } from "react-router-dom";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { cloudinaryImage2 } from "../../../utils/cloudinary";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-black text-white flex w-screen justify-center items-center px-10 py-30 md:py-25">
      <div className="w-full md:w-3/4 flex flex-col xl:flex-row justify-between items-center">
        
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div>
            <h1 className="oswald-font-3 text-2xl sm:text-3xl md:text-5xl">
              AKSHAR
            </h1>
          </div>

          <div className="w-20 h-0.5 bg-blue-400"></div>

          <div>
            <p className="text-gray-100 inter-font-2">
              "Empowering young minds with the skills of tomorrow." Akshar
              is designed to empower students with essential literacy
              skills through engaging workshops.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full h-100">
          <div
            className="h-40 w-40 md:h-50 md:w-50 border-0 rounded-full p-15 text-black aspect-square flex justify-center items-center oswald-font-3 text-2xl cursor-pointer bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${cloudinaryImage2("akshar_circle_wh3pw7")})` }}
          ></div>

          <div
            className="absolute top-0 h-24 w-24 rounded-full bg-blue-400 text-white flex items-center justify-center oswald-font-3 cursor-pointer"
            onClick={() => navigate("/programs/digiXplore")}
          >
            DigiXplore
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

export default Hero;
