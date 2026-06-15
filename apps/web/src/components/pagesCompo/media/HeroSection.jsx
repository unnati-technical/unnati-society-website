import React from "react";
import bgimg from "./../../../assets/image.png";
import digiXplore from "./../../../assets/digiImage.png";
import netritva from "./../../../assets/netritvaImg.png";
import akshar from "./../../../assets/aksharImg.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="w-screen relative bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-[50vh] h-screen text-white"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div>
        <div
          className="flex flex-col md:flex-row gap-20"
          
        >
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex justify-center items-center rotate-45 z-20 rounded-2xl border border-black">
              <span className="-rotate-45" onClick={() => navigate("/media/digiXplore")}>
                <img src={digiXplore} alt="" />
              </span>
            </div>
            <div className="rounded-2xl bg-white/30 w-40 h-40 aspect-square border border-black rotate-45 absolute right-0 z-0"></div>
          </div>
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex justify-center items-center rotate-45 z-20 rounded-2xl border border-black">
              <span
                className="-rotate-45"
                onClick={() => navigate("/media/netritva")}
              >
                <img src={netritva} alt="" />
              </span>
            </div>
            <div className="rounded-2xl bg-white/30 w-40 h-40 aspect-square border border-black rotate-45 absolute right-0 z-0"></div>
          </div>
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex justify-center items-center rotate-45 z-20 rounded-2xl border border-black">
              <span
                className="-rotate-45"
                onClick={() => navigate("/media/akshar")}
              >
                <img src={akshar} alt="" />
              </span>
            </div>
            <div className="rounded-2xl bg-white/30 w-40 h-40 aspect-square border border-black rotate-45 absolute right-0 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
