import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/IMG20250813141021_jwh26o.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/IMG20250813141021_jwh26o.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/IMG_6901_qwxwxn.heic",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/IMG20251108113904_qyzyfj.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/20250823_133413_wkne2n.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/IMG20250918111700_yn67w3.heic",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/20250823_140030_n8njxy.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/Girls%20Inter%20College/20250813_132621_yr8h0z.jpg",
];

const GirlsInterCollege = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            Girls Inter College, Sabour
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

export default GirlsInterCollege;
