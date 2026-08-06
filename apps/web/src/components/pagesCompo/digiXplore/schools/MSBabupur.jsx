import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG-20251004-WA0008_o7gs2i.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG-20251004-WA0012_yntdso.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG-20251004-WA0014_c5tr7t.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG-20251004-WA0016_pceyyv.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG-20251004-WA0027_rr25ry.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG20251004112443_rquf6j.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG20251004120726_ujbqgs.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG20251011115010_qbr4ap.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSBabupur/IMG20251011120737_r0dghv.jpg",
];

const MSBabupur = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            MS Babupur
          </h1>

          {/* Pinterest Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((id, i) => (
              <img
                loading="lazy"
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

export default MSBabupur;
