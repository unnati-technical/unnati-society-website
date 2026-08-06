import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/20250814_111818_nizrjf.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/20260404_114446_nrnc0g.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/20260404_114513_dtk19z.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/20260404_115735_v3dvtm.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/IMG_20250806_121557_egz2vf.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/IMG_20251004_114651_mq57ko.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/IMG20250729112049_qdspjm.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSJhurkuria/IMG20250729112321_bbgze8.jpg",
];

const MSJhurkhuria = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            MS Jhurkhuria
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

export default MSJhurkhuria;
