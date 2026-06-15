import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { cloudinaryImage2 } from "../../../../utils/cloudinary";

const images = [
  "IMG1_ir5vdh",
  "IMG2_eacans",
  "IMG3_cxeama",
  "IMG4_jmwppn",
  "IMG5_aty8cv",
  "IMG6_jzft3u",
  "IMG7_sidclm",
  "IMG8_jlv7lr"
];

const InterCollegeSabour = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            Inter College, Sabour
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

export default InterCollegeSabour;
