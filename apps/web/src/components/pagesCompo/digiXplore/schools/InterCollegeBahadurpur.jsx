import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20250808142336_moeaay.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20250813134744_a9rtoz.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20250813134817_jeqyzd.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20250820130655_01_pngazz.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20260411120730_hkhoto.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20260411120845_wmfqpq.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20250808134746_dtlzd9.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/InterCollegeBahadupur/IMG20250808141627_l8xulx.jpg",
];

const InterCollegeBahadurpur = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            InterCollege ,Bahadurpur
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

export default InterCollegeBahadurpur;
