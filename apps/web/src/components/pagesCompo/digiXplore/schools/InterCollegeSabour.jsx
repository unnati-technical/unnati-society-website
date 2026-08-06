import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG-20250802-WA0013_eacans.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG-20250802-WA0018_jzft3u.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG-20260110-WA0018_sidclm.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG-20260110-WA0019_aty8cv.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG_20251011_122654_ir5vdh.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG_20251011_122758_cxeama.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG_20251011_123206_jmwppn.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeSabour/IMG_20251011_125548_jlv7lr.jpg",
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

export default InterCollegeSabour;
