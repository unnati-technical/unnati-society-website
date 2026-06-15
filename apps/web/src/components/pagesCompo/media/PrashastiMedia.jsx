import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage2 } from "./../../../utils/cloudinary";

const images = [
  "IMG_9836_nakfk6",
  "IMG_9865_hrfkrf",
  "IMG_9747_rqlxhl",
  "IMG_9800_nbteou",
  "IMG_9769_nc7mcr",
  "IMG_9900_iq00br",
  "IMG_9957_uqqtv7",
  "IMG_9931_ljitar",
  "IMG_9856_bnypgx",
  "IMG_9880_di3yoq",
  "IMG_9860_nh3qjl",
  "IMG_9942_bvpaj6",
  "IMG_9884_hf3obk",
  "8_ha6kzd"
];

const PrashastiMedia = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            Prashasti Samaroh '25
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

export default PrashastiMedia;
