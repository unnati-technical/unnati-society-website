import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage2 } from "./../../../utils/cloudinary";

const images = [
  "IMG1_uo6ieb",
  "IMG2_etc0q6",
  "IMG3_svvvoc",
  "IMG4_iqjgvl",
  "IMG5_bs3akm",
  "IMG6_gpumz5",
  "IMG7_v8nj4j",
  "IMG8_lri0wj",
  "IMG9_ymg2v5",
  "IMG10_zuszig",
  "IMG11_udiaif",
];

const BabupurClass = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            Classes At Babupur
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

export default BabupurClass;
