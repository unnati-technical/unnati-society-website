import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { imagekitImage2 } from "./../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/20260201_152645_etc0q6.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG_20250831_165546580_HDR_udiaif.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG_20251012_164034_gpumz5.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG_20260301_143247_svvvoc.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG_20260301_153553_uo6ieb.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG_20260405_154042092_HDR_zuszig.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/img5_v8nj4j.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG-20250824-WA0070_lri0wj.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/IMG20251109161856_ymg2v5.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/Scanned_20250804-0002-13_iqjgvl.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Akshar/Babupur/Scanned_20250804-0002-17_bs3akm.jpg",
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
              <img loading="lazy" 
                key={i}
                src={(id)}
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
