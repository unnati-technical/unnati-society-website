import React from "react";
import vision from "./../../../assets/vision2.jpg";
import { useNavigate } from "react-router-dom";
import TornPage from "../effects/TornPage";

const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white text-black py-10 px-10 md:py-40 md:px-10">
      <div className="flex flex-col md:flex-row justify-center items-center ">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <p className="w-fit inter-font text-gray-900 border-4 border-t-black pt-15 border-b-0 border-l-0 border-r-0">ABOUT US</p>
          </div>
          <div>
            <h1 className="oswald-font text-2xl sm:text-3xl md:text-4xl">WE PROVIDE QUALITY</h1>
            <h1 className="oswald-font text-blue-400 text-2xl sm:text-3xl md:text-4xl">EDUCATION FOR ALL</h1>
          </div>
          <div>
            <p className="inter-font w-full md:w-3/4 text-sm text-justify">
              Our mission is to provide free, quality education for
              underprivileged students, emphasizing holistic development. Our
              curriculum spans academics, life skills, and practical knowledge.
            </p>
          </div>
          <div>
            <p className="inter-font w-full md:w-3/4 text-sm text-justify">
              We are helping students to tackle the hindrances faced by them
              which obstructs them to get up to their potential.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center w-1/2 sm:w-1/3 xl:w-1/5 oswald-font-3 bg-yellow-400 px-4 py-2 cursor-pointer" onClick={() => navigate('/about-us')}>LEARN MORE</div>
          </div>
        </div>
        <div className="flex justify-center items-center py-10 bg-white">
          <div className="relative w-87.5">
            <div className="absolute inset-0 bg-black/20 blur-2xl translate-y-4 scale-95 rounded-[40px]" />
            <div className="relative bg-[#f6f1e7] p-7 -rotate-2 shadow-2xl">
              <img src={vision} alt="vision" className="w-full h-112.5 object-cover block"/>
              <TornPage/>
            </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Aboutus;
