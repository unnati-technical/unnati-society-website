import React from "react";
import Akshar from "./../../../assets/aksharImg.png";
import bgImg from "./../../../assets/imageAkshar.png";
import { useNavigate } from "react-router-dom";
import { cloudinaryImage } from "../../../utils/cloudinary";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full text-white overflow-hidden"
      style={{
        backgroundImage: `url(${cloudinaryImage("schlvisit_uw7s37")})`,
      }}
    >
      <div className="absolute inset-0 z-10 bg-black/50"></div>
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="flex flex-col items-center text-center max-w-5xl">
          <h1 className="stick-no-bills-2 text-5xl md:text-7xl text-white tracking-wider">
            OUTREACH
          </h1>

          <p className="stick-no-bills tracking-wider text-base md:text-lg mt-6 leading-8 text-white/90 max-w-4xl">
            Educational Trip - This Educational Visit brought our campus to
            life with eager footsteps and wide-eyed curiosity. Students
            explored, interacted, and discovered new ideas in every corner
            they visited. Their enthusiasm reminded us why spaces of learning
            matter — they spark imagination, confidence, and possibility.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-5 justify-center items-center w-full">
          <div className="w-full flex flex-wrap justify-center gap-5 px-5">
            <div
              className="relative h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bgImg})` }}
              onClick={() => navigate("/media/outreach/")}
            >
              <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
              <h1 className="z-40 text-white text-center px-3">
                Kendriya Vidyalaya
              </h1>
            </div>

            <div
              className="relative h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${cloudinaryImage(
                  "mountasisi-5_ssxaxg"
                )})`,
              }}
              onClick={() =>
                navigate("/media/outreach/school-visit/mountAssisi")
              }
            >
              <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
              <h1 className="z-40 text-white text-center px-3">
                Mount Assisi
              </h1>
            </div>

            <div
              className="relative h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${cloudinaryImage(
                  "IMG_20251211_124331_qfj72p"
                )})`,
              }}
              onClick={() =>
                navigate("/media/outreach/school-visit/DPS")
              }
            >
              <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
              <h1 className="z-40 text-white text-center px-3">
                Delhi Public School
              </h1>
            </div>

            <div
              className="relative h-50 w-50 text-xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${cloudinaryImage(
                  "schlvisit_asj47s"
                )})`,
              }}
              onClick={() =>
                navigate("/media/outreach/school-visit/uchh-vidyalaya")
              }
            >
              <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
              <h1 className="z-40 text-white text-center px-3">
                Rajkiyakrit Adarsh Uchh Vidyalaya, Nayagaon & Uchh Vidyalaya,
                Kumaitha
              </h1>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-center gap-5 px-5">
            <div
              className="relative h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${cloudinaryImage(
                  "sfs-1_yr8bcn"
                )})`,
              }}
              onClick={() =>
                navigate("/media/outreach/school-visit/SFS")
              }
            >
              <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
              <h1 className="z-40 text-white text-center px-3">
                St. Francis School, Deoghar
              </h1>
            </div>

            <div
              className="relative h-50 w-50 text-2xl flex justify-center items-center rounded-2xl bg-[#c3c3c3] border-8 border-white/35 text-black purple-purse-regular cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bgImg})` }}
              onClick={() => navigate("/media/outreach/")}
            >
              <div className="absolute inset-0 z-10 bg-black/40 rounded-2xl"></div>
              <h1 className="z-40 text-white text-center px-3">
                Kendriya Vidyalaya
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;