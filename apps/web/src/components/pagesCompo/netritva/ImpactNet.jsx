import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
const ImpactNet = () => {
  return (
    <section className="bg-[#F9FAFF] text-black py-10 px-10 md:py-40 md:px-10">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 ">
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-1/2 mt-4 rounder-2xl">
          <img src={cloudinaryImage("IMG-20250412-WA0001_geachy")} alt="vision" className="object-cover h-96 border-none shadow-xl bg-black rounded-2xl"/>
        </div>
        <div className="w-full md:w-1/2 flex flex-col text-right items-end">
          <div className="w-fit ">
            <p className=" inter-font text-gray-900 border-3 px-2 mb-2 border-b-0 border-l-0 border-t-0  border-r-amber-300 text-sm">OUR PROGRAM</p>
          </div>
          <div>
            <h1 className="oswald-font text-4xl ">IMPACT OF</h1>
            <h1 className="oswald-font text-blue-400 text-4xl">NETRITVA</h1>
          </div>
          <div>
            <p className="inter-font my-3 text-justify md:text-right">
              Through workshops, counseling sessions, and interaction with mentors, students have gained clarity about career opportunities, competitive exams, and higher education pathways. Netritva has helped many students overcome confusion, build ambition, and develop a goal-oriented mindset.

            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactNet;