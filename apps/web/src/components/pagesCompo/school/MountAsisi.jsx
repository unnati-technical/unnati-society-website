import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { cloudinaryImage } from "./../../../utils/cloudinary";

const images = [
  "mountasisi-6_l0o5cc",
  "mountasisi-3_wx1rzz",
  "mountasisi-2_msuk6b",
  "mountasisi-1_toyudk",
  "mountasisi-7_xzmufq",
  "mountasisi-5_ssxaxg",
  "mountasisi-4_dnq7lx",
  "mountasisi-8_fckbjj",
];

const MountAsisi = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="relative flex justify-center items-center py-10 w-full bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${cloudinaryImage("schlvisit_uw7s37")})` }}
      >
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="max-w-6xl px-4 flex z-20 flex-col justify-center items-center">
          <h1 className=" w-fit text-4xl text-white oswald-font-2 z-20 mb-8 text-center border-b-2 border-blue-400">
            Mount Assisi, Sabour, Bhagalpur, Bihar
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

export default MountAsisi;
