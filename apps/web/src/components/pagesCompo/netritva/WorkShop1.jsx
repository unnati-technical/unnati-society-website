import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { imagekitImage2 } from "./../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0024.jpg_onoxlf.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0025.jpg_l8hfqs.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0026.jpg_s5ytly.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0027.jpg_kv4alw.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0028.jpg_fnwo6b.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0029.jpg_oo9ajh.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0030.jpg_gkwxk1.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0031.jpg_ljspyy.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0032.jpg_izdbb6.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0042.jpg_ji24dg.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0044.jpg_f755go.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Netritva/IMG-20260414-WA0045.jpg_nxjqcl.jpg",
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
                loading="lazy"
                key={i}
                src={id}
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
