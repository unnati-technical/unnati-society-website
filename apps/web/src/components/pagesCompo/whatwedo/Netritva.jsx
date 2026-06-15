import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";

const Netritva = () => {
  return (
    <section className="bg-white text-black w-screen flex justify-center items-center py-30 px-10">
      <div className="w-full md:w-3/4 flex flex-col-reverse gap-5 md:flex-row justify-between items-center">

        {/* Image Cluster */}
        <div className="w-3/4 flex gap-6 items-center justify-center">

          {/* Left */}
          <div className="flex flex-col items-center">
            <div className="h-20"></div>

            <div className=" rounded-full w-32 h-32 overflow-hidden flex justify-center items-center">
              <img
                src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.39_PM_2_fqc1pi")}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Center (Main Image) */}
          <div className=" rounded-full w-48 h-48 bg-white overflow-hidden flex justify-center items-center">
            <img
              src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.42_PM_xs2pm0")}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col items-center">
            <div className=" rounded-full w-32 h-32 overflow-hidden flex justify-center items-center">
              <img
                src={cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.38_PM_3_thxqic")}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="h-20"></div>
          </div>

        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-3">
          <div className="w-15 h-1 bg-gray-400 mb-4"></div>

          <div className="text-5xl">
            <h1 className="text-black oswald-font-3">IMPACT OF</h1>
            <h1 className="text-blue-400 oswald-font-3">NETRITVA</h1>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex flex-col w-1/2 gap-3">
              <div className="text-blue-400 text-3xl sm:text-3xl md:text-5xl inter-font-3">30+</div>
              <div className="inter-font-3">
                CHILDREN RECEIVED GUIDANCE
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-blue-400 text-3xl sm:text-3xl md:text-5xl inter-font-3">1</div>
              <div className="inter-font-3">
                SCHOOLS REACHED
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Netritva;
