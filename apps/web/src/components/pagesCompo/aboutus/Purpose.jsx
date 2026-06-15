import React from "react";
import heroSection from "./../../../assets/mission2.png";

const Purpose = () => {
  return (
    <section className="bg-[#F9FAFB] text-black py-10 px-10 md:py-40 md:px-10">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 ">
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-1/2 mt-4 ">
          <img src={heroSection} alt="vision" className="object-cover h-96 border-none shadow-xl bg-black "/>
        </div>
        <div className="w-full md:w-1/2 flex flex-col text-right items-end">
          <div className="w-fit ">
            <p className=" inter-font text-gray-900 border-3 px-2 mb-2 border-b-0 border-l-0 border-t-0  border-r-amber-300 text-sm">ABOUT US</p>
          </div>
          <div>
            <h1 className="oswald-font text-4xl ">OUR PURPOSE</h1>
            <h1 className="oswald-font text-blue-400 text-4xl">OUR MISSION</h1>
          </div>
          <div>
            <p className="font-[Open_Sans] text-lg text-justify">
              Our mission is to represent the spirit of social responsibility and outreach commitment of IIIT Bhagalpur by engaging students in meaningful community service that creates lasting social impact. We strive to strengthen the institute’s connection with local communities through impactful educational and developmental initiatives, nurturing leadership, empathy, and civic responsibility among students.
            </p>
          </div>
          <div>
            <p className="font-[Open_Sans] text-lg text-justify">
              Through sustainable programs such as digital literacy workshops, career guidance sessions, and foundational learning drives, Unnati aims to contribute to the educational and social growth of underprivileged communities. By building a collaborative platform that brings together the institute, students, and society, we envision inclusive growth and mutual development that truly reflects the values of education, service, and compassion.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Purpose;
