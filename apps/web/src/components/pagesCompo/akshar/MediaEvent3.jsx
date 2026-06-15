import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage } from "./../../../utils/cloudinary";

const images = [
  "rangchakra-1_au72g1",
  "rangchakra-2_dro0fv",
  "rangchakra-3_pvu0gu",
  "rangchakra-4_is2rb7",
  "rangchakra-5_hoam3n",
  "rangchakra-6_ej2vyw",
  "rangchakra-7_ght3xf",
  "rangchakra-8_viv2gd",
  "rangchakra-9_fu6vyk",
  "rangchakra-10_n1ygta",
  "rangchakra-11_w65zhz"
];

const MediaEvent3 = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            RangChakra'25
          </h1>

          {/* Pinterest Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((id, i) => (
              <img
                key={i}
                src={cloudinaryImage(id)}
                alt="Rangchakra"
                className="mb-4 w-full rounded-xl break-inside-avoid shadow-md hover:scale-[1.02] transition"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaEvent3;
