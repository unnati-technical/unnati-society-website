import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { cloudinaryImage2 } from "../../../../utils/cloudinary";

const images = [
  "IMG1_sbfknq",
  "IMG2_pwrcjp",
  "IMG3_znlvfm",
  "IMG4_hputqu",
  "IMG5_eje1c8",
  "IMG6_m05at5",
  "IMG7_ffcbvz",
  "IMG8_x5jbyv",
  "IMG9_iyie3w"
];

const MSAryaTola = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            MS Arya Tola
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

export default MSAryaTola;
