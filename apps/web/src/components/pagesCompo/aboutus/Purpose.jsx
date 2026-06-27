import React from "react";
const heroSection = "https://res.cloudinary.com/drhkvdtw2/image/upload/v1782396863/unnati_assets/mission2.png";

const Purpose = () => {
  return (
    <section className="bg-[#F9FAFB] text-black py-10 px-10 md:py-12 md:px-10">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 ">
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-1/2 mt-4 ">
          <img loading="lazy" src={heroSection} alt="vision" className="object-cover h-96 w-full rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col text-right items-end">
          <div className="flex flex-col items-end mb-6">
            <h1 className="oswald-font-3 text-4xl md:text-5xl text-right">OUR PURPOSE &</h1>
            <h1 className="oswald-font-3 text-blue-600 text-4xl md:text-5xl mt-2 text-right">OUR MISSION</h1>
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
