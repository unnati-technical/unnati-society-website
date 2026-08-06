import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/IMG-20250823-WA0002_ldl9nb.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/IMG-20250823-WA0004_x5b6ij.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/IMG20250820125607_g7sudz.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/IMG20250820131742_wpz88g.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/IMG20250820133337_g9hiyg.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/WhatsApp_Image_2025-08-30_at_14.42.29_fc8b201b_h0ivu4.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/WhatsApp_Image_2025-08-30_at_14.42.30_4ceada14_zba1vx.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBahadurpur/WhatsApp_Image_2025-08-30_at_19.27.13_b10ab398_f3iaud.jpg",
];

const MSBahadurpur = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            MS Bahadurpur
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

export default MSBahadurpur;
