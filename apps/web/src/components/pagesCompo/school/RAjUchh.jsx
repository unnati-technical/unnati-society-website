import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage } from "./../../../utils/cloudinary";

const images = [
  "Copy_of_IMG_4978_ngnxxn",
  "Copy_of_IMG_4988_ajn5c1",
  "Copy_of_IMG_4999_m5dexd",
  "Copy_of_IMG_5007_hokmqd",
  "Copy_of_IMG_5008_uro40o",
  "Copy_of_IMG_5021_rkeezf",
  "Copy_of_IMG_5089_ak7bvn",
  "Copy_of_IMG_5026_k56jlh",
  "Copy_of_IMG_5090_d2t0xh",
  "Copy_of_IMG_5034_qnot8x",
  "Copy_of_IMG_5047_vsdil5",
  "Copy_of_IMG_5081_gps2hl"
];

const RajUchh = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="relative flex justify-center items-center py-10 w-full bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${cloudinaryImage("schlvisit_uw7s37")})` }}
      >
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="max-w-6xl px-4 flex z-20 flex-col justify-center items-center">
          <h1 className=" w-fit text-4xl text-white oswald-font-2 z-20 mb-8 text-center border-b-2 border-blue-400">
           Rajkiyakrit Adarsh Uchh Vidyalaya, Nayagaon & Uchh Vidyalaya, Kumaitha
          </h1>

          {/* Pinterest Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((id, i) => (
              <img
                key={i}
                src={cloudinaryImage(id)}
                alt="Mount Asisi"
                className="mb-4 w-full rounded-xl break-inside-avoid shadow-md hover:scale-[1.02] transition"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RajUchh;
