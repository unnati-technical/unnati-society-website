import React from "react";
import Navbar from "../../../common/Navbar";
import NavUnn from "../../../common/NavUnn";
import { imagekitImage2 } from "../../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG_20250802_144946_mtrtch.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG_20251004_141211_dtuvve.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG_20251011_145343_jhmfne.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG_20260124_133556_v8mhv6.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG20250802140529_znc5gp.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG20250802151944_c9p6pq.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG20250823151002_be4y1l.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG20251011145741_uyo7y5.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG20251011145911_dlsiyu.jpg",
  "https://ik.imagekit.io/zpkfsvgtn/Media/Digixplore/MSRaniTalav/IMG20251011150750_bhrhvw.jpg",
];

const MSRaniTalav = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section className="flex justify-center py-10 w-full">
        <div className="max-w-6xl px-4">
          <h1 className="text-4xl oswald-font-2 mb-8 text-center">
            MS RaniTalav
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

export default MSRaniTalav;
