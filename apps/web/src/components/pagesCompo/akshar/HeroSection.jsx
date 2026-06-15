import React from "react";
import Akshar from "./../../../assets/aksharImg.png";
import bgImg from "./../../../assets/imageAkshar.png";
import rangchakraimg from "./../../../assets/rangchakra.jpg";
import { useNavigate } from "react-router-dom";
import { cloudinaryImage2 } from "./../../../utils/cloudinary";

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat flex justify-between items-center min-h-[80vh] h-screen text-white"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 z-10 bg-black/40"></div>
      <div className="z-20 flex justify-between flex-col items-center w-full">
        <div className="flex justify-center items-center">
          <div className="w-60 h-50 flex justify-center items-center opacity:4000 saturate-400">
            <img src={Akshar} alt="" />
          </div>
          <div className="z-40">
            <h1 className="stick-no-bills-2 text-5xl text-white tracking-wider">
              AKSHAR
            </h1>
            <p className="stick-no-bills tracking-wider">
              Nurturing Young Minds With Basic Education. Values. And Civic
              Sense To Build Strong Foundations.
            </p>
          </div>
        </div>
        <div className='mr-10 flex flex-col gap-5 justify-center'>
        <div className="mr-10 flex flex-row gap-5">
          <div className="relative h-50 w-60 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"  
          style={{ backgroundImage: `url(${cloudinaryImage2("rangchakra-25_s2ibwr")})` }}
           onClick={() => navigate('/media/akshar/event-3')}
          >
            <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl "></div>
            <h1 className="z-40 text-white">
              EVENT-1 <br /> RangChakra'25
            </h1>
          </div>
          <div
            className="relative h-50 w-60 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${rangchakraimg})` }}
            onClick={() => navigate('/media/akshar/event-1')}
          >
          <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
            <h1 className="z-40 text-white">
              EVENT-2 <br /> RangChakra'26
            </h1>
          </div>
          <div className="relative h-50 w-60 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat " 
          style={{ backgroundImage: `url(${cloudinaryImage2("childrensDay_kjscjp")})` }}
          onClick={() => navigate('/media/akshar/event-2')}
          >
            <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
            <h1 className="z-40 text-white">
              EVENT-3 <br /> Children's Day
            </h1>
          </div>
          
          <div className="relative h-50 w-60 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"  
          style={{ backgroundImage: `url(${cloudinaryImage2("IMG10_zuszig")})` }}
           onClick={() => navigate('/media/akshar/BabupurClass')}
          >
            <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl "></div>
            <h1 className="z-40 text-white">
              Babupur <br />
            </h1>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
