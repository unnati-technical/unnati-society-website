import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";

const Akshar = () => {
  return (
    <section className="bg-white text-black w-screen flex justify-center items-center py-30 px-10">
      <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Text Section */}
        <div className="flex flex-col gap-3">
          <div className="w-15 h-1 bg-gray-400 mb-4"></div>

          <div className="text-3xl sm:text-4xl md:text-5xl">
            <h1 className="text-black oswald-font-3">IMPACT OF</h1>
            <h1 className="text-blue-400 oswald-font-3">AKSHAR</h1>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex flex-col w-1/2 gap-3">
              <div className="text-blue-400 text-3xl sm:text-3xl md:text-5xl inter-font-3">80+</div>
              <div className="inter-font-3">CHILDREN EDUCATED</div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-blue-400 text-3xl sm:text-3xl md:text-5xl inter-font-3">1</div>
              <div className="inter-font-3">BRANCH OPENED</div>
            </div>
          </div>
        </div>

        <div className="w-4/5 grid grid-cols-2 gap-3 rotate-45 md:w-72 aspect-square relative top-4">
          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.39_PM_5_ney7sn",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>

          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.39_PM_4_wemv2f",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>

          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.39_PM_1_kmyefy",
              )}
              alt=""
              className="w-full h-full object-cover -rotate-45 scale-150"
            />
          </div>

          <div className="overflow-hidden shadow-lg">
            <img
              src={cloudinaryImage(
                "WhatsApp_Image_2026-02-03_at_1.39.40_PM_3_hvzrrm",
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

export default Akshar;
