import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage2 } from "./../../../utils/cloudinary";

const images = [
  "GICS_1_f755go",
  "GICS_2_izdbb6",
  "GICS_3_ji24dg",
  "GICS_4_ljspyy",
  "GICS_5_gkwxk1",
  "GICS_6_nxjqcl",
  "GICS_7_onoxlf",
  "GICS_8_l8hfqs",
  "GICS_9_s5ytly",
  "GICS_10_fnwo6b",
  "GICS_11_oo9ajh",
  "GICS_12_kv4alw"
];

const MediaEvent1 = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            WorkShop At Girls Inter College, Sabour
          </h1>

          {/* Pinterest Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((id, i) => (
              <img
                key={i}
                src={cloudinaryImage2(id)}
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

export default MediaEvent1;
