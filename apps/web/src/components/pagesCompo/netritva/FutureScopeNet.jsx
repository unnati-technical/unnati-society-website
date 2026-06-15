import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";

const FutureScopeNet = () => {
  return (
    <section className="bg-white text-black py-10 px-2 md:px-10 md:py-30">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 md:px-0">
        <div className="w-full md:w-1/2 flex flex-col ">
          <div className="w-fit border-4 border-t-black pt-15 border-l-0 border-r-0 border-b-0 ">
            <p className=" inter-font text-gray-900 border-3 px-2 mb-2 border-b-0 border-r-0 border-t-0  border-l-amber-300 text-sm">OUR PROGRAM</p>
          </div>
          <div>
            <h1 className="oswald-font text-4xl">FUTURE SCOPE OF</h1>
            <h1 className="oswald-font text-blue-400 text-4xl">NETRITVA</h1>
          </div>
          <div>
            <p className="inter-font my-3 text-justify ms:text-left">
              The program plans to create a structured mentorship network, connect students with industry professionals and alumni, and offer scholarship and internship guidance. Netritva envisions becoming a comprehensive career support ecosystem for rural and first-generation learners.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-1/2 mt-4 ">
          <img src={cloudinaryImage("IMG_20250411_114454_wokjdu")} alt="vision" className="object-cover h-96 border-none shadow-xl bg-black -scale-x-100 rounded-2xl"/>
        </div>
      </div>
    </section>
  );
};

export default FutureScopeNet;