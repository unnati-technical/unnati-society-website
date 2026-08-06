import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/Copy_of_IMG20250726120155_zxabpu.heic",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG_20250823_152230_qnrs5d.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG_20260214_113715949_HDR_obdhsf.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG20250802123401_uwuubs.heic",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG20250802123623_hbkxpz.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG20250806115405_kfkhop.heic",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG20250806123030_his5pf.heic",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSMeerachak/IMG20250806125126_nvfjig.heic",
];

const MSMeerachak = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            MS Meerachak
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

export default MSMeerachak;
