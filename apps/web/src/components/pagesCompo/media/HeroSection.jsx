import React from "react";
const bgimg =
  "https://ik.imagekit.io/zpkfsvgtn/Home/image.png?updatedAt=1785759745604";
const digiXplore = "https://ik.imagekit.io/zpkfsvgtn/Home/digiImage.png";
const netritva = "https://ik.imagekit.io/zpkfsvgtn/Home/netritvaImgCopy.png";
const akshar = "https://ik.imagekit.io/zpkfsvgtn/Home/aksharImg.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="w-full relative bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-[50vh] h-screen text-white"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div>
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-16 md:gap-10 lg:gap-16 max-w-6xl mx-auto py-10">
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex justify-center items-center rotate-45 z-20 rounded-2xl border border-black hover:scale-105 transition-transform duration-300">
              <span
                className="-rotate-45 flex flex-col items-center justify-center w-full h-full"
                onClick={() => navigate("/media/digiXplore")}
              >
                <img
                  loading="lazy"
                  src={digiXplore}
                  alt="DigiXplore"
                  className="w-[70%] h-[70%] object-contain"
                />
              </span>
            </div>
            <div className="rounded-2xl bg-white/30 w-40 h-40 aspect-square border border-black rotate-45 absolute right-0 z-0"></div>
          </div>
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex justify-center items-center rotate-45 z-20 rounded-2xl border border-black hover:scale-105 transition-transform duration-300">
              <span
                className="-rotate-45 flex flex-col items-center justify-center w-full h-full"
                onClick={() => navigate("/media/netritva")}
              >
                <img
                  loading="lazy"
                  src={netritva}
                  alt="Netritva"
                  className="w-[70%] h-[70%] object-contain"
                />
              </span>
            </div>
            <div className="rounded-2xl bg-white/30 w-40 h-40 aspect-square border border-black rotate-45 absolute right-0 z-0"></div>
          </div>
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex flex-col justify-center items-center rotate-45 z-20 rounded-2xl border border-black hover:scale-105 transition-transform duration-300">
              <span
                className="-rotate-45 flex flex-col items-center justify-center text-center font-extrabold text-black leading-tight tracking-wide w-full h-full"
                onClick={() => navigate("/media/akshar")}
              >
                <img
                  loading="lazy"
                  src={akshar}
                  alt="Akshar"
                  className="w-[70%] h-[70%] object-contain"
                />
              </span>
            </div>
            <div className="rounded-2xl bg-white/30 w-40 h-40 aspect-square border border-black rotate-45 absolute right-0 z-0"></div>
          </div>
          <div className="relative w-45 h-40">
            <div className="cursor-pointer w-40 h-40 aspect-square absolute left-0 top-0 bg-[#F5E6DC] flex flex-col justify-center items-center rotate-45 z-20 rounded-2xl border border-black hover:scale-105 transition-transform duration-300">
              <span
                className="-rotate-45 flex flex-col items-center justify-center text-center font-extrabold text-black leading-tight tracking-wide w-full h-full"
                style={{ fontFamily: "'Oswald', sans-serif" }}
                onClick={() => navigate("/media/outreach/school-visit")}
              >
                <div className="text-lg">OUTREACH -</div>
                <div className="text-xl">SCHOOL VISIT</div>
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
