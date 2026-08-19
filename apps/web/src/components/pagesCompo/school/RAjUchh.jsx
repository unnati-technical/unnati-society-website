import React from "react";
import Navbar from "./../../common/Navbar";
import NavUnn from "./../../common/NavUnn";
import { imagekitImage } from "./../../../utils/imagekit";

const images = [
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5029.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5034.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5036.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5068.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5081.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5088.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5095.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5121.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5138.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5007.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5004.JPG",
  "https://ik.imagekit.io/zpkfsvgtn/Outreach/Rajkritya%20Uchh%20Vidyalaya/Copy%20of%20IMG_5005%20(1).JPG",
];

const RajUchh = () => {
  return (
    <div>
      <Navbar />
      <NavUnn />

      <section
        className="relative flex justify-center items-center py-10 w-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${imagekitImage("schlvisit_uw7s37")})` }}
      >
        <div className="absolute inset-0 z-10 bg-black/40"></div>
        <div className="max-w-6xl px-4 flex z-20 flex-col justify-center items-center">
          <h1 className=" w-fit text-4xl text-white oswald-font-2 z-20 mb-8 text-center border-b-2 border-blue-400">
            Rajkiyakrit Adarsh Uchh Vidyalaya, Nayagaon & Uchh Vidyalaya,
            Kumaitha
          </h1>

          {/* Pinterest Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((id, i) => (
              <img
                loading="lazy"
                key={i}
                src={id}
                alt="Mount Asisi"
                className="mb-4 w-full rounded-xl break-inside-avoid shadow-md hover:scale-[1.02] transition"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RajUchh;
