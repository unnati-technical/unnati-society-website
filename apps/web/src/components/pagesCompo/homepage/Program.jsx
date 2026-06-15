import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { useNavigate } from "react-router-dom";

const Program = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center items-center w-screen py-30 px-5">
      <div className="flex flex-col gap-4 w-3/4">
        <div className="w-20 h-1 bg-blue-400"></div>
        <div>
          <h1 className="oswald-font-3 text-2xl sm:text-3xl md:text-4xl">
            WE ARE CREATING A PLACE WHERE STUDENTS CAN THRIVE
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-5 flex-wrap">
          <div className="h-72 w-60 relative overflow-hidden">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.43.14_PM_rnt51c",
              )}
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 w-full backdrop-opacity-35 text-white flex justify-center items-center flex-col cursor-pointer" onClick={() => navigate('/programs/digiXplore')}>
              <h1 className="oswald-font-3 w-full text-center opacity-100 bg-blue-500 text-white px-4 py-1" >
                DigiXplore
              </h1>
            </div>
          </div>
          <div className="h-72 w-60 relative overflow-hidden">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.40_PM_4_ex22tr",
              )}
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 w-full flex justify-center items-center flex-col text-white cursor-pointer" onClick={() => navigate('/programs/netritva')}>
              <h1 className="oswald-font-3 w-full text-center bg-blue-500 text-white px-4 py-1">Netritva</h1>
            </div>
          </div>
          <div className="h-72 w-60 relative overflow-hidden">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.39_PM_1_kmyefy",
              )}
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 w-full flex justify-center items-center flex-col text-white" onClick={() => navigate('/programs/akshar')}>
              <h1 className="oswald-font-3 w-full text-center bg-blue-500 text-white px-4 py-1 cursor-pointer">
                Akshar
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
