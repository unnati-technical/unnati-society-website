import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG1_sbfknq.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG2_pwrcjp.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG3_znlvfm.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG4_hputqu.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG5_eje1c8.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG6_m05at5.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG7_ffcbvz.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG8_x5jbyv.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSAryaTola/IMG9_iyie3w.jpg",
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

export default MSAryaTola;
