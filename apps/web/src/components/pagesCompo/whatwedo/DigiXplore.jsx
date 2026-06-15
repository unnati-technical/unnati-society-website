import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";

const DigiXplore = () => {
  return (
    <section className="bg-white text-black w-screen flex justify-center items-center py-30 px-10">
      <div className="w-3/4 flex flex-col md:flex-row justify-between items-center gap-4 ">
        <div className="flex flex-col gap-3">
          <div className="w-15 h-1 bg-gray-400 mb-4"></div>
          <div className="text-5xl">
            <h1 className="text-black oswald-font-3">IMPACT OF</h1>
            <h1 className="text-blue-400 oswald-font-3">DIGIXPLORE</h1>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col w-1/2 gap-3">
              <div className="text-blue-400 text-3xl sm:text-4xl md:text-5xl inter-font-3">280+</div>
              <div className="inter-font-3 text-wrap">
                CHILDREN RECEIVED QUALITY EDUCATION
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              <div className="text-blue-400 text-3xl sm:text-3xl md:text-5xl inter-font-3">8</div>
              <div className="inter-font-3 text-wrap">SCHOOLS REACHED</div>
            </div>
          </div>
        </div>
        <div className="w-3/4 grid grid-cols-2 gap-3 rotate-45 md:w-64 aspect-square">
          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.40_PM_whvo3l",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>

          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.42_PM_1_sgnwyj",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>

          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.38_PM_4_khsl6d",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>

          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.43.19_PM_1_do5fjx",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigiXplore;
