import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage } from "./../../../utils/cloudinary";

const images = [
  "children_sDay-9_bx5hmt",
  "children_sDay-10_uo3otk",
  "children_sDay-1_cansoz",
  "children_sDay-6_hgtulf",
  "childrens_sDay-8_sbz9bk",
  "childrens_Day-2_bfhjlf",
  "children_sDay-4_feuavu",
  "childrens_Day-3_stfkkt",
  "childrens_Day-7_exuhi6",
  "children_sDay-5_ozjcti",
];

const MediaEvent2 = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            Children's Day'25
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

export default MediaEvent2;
