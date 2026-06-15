import React from "react";
import vision from "./../../../assets/visionAboutus.jpg";

const Aboutus = () => {
  return (
    <section className="bg-white text-black py-10 px-2 md:px-10 md:py-40">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 md:px-0">
        <div className="w-full md:w-1/2 flex flex-col ">
          <div className="w-fit border-4 border-t-black pt-15 border-l-0 border-r-0 border-b-0 ">
            <p className=" inter-font text-gray-900 border-3 px-2 mb-2 border-b-0 border-r-0 border-t-0  border-l-amber-300 text-sm">ABOUT US</p>
          </div>
          <div>
            <h1 className="oswald-font text-4xl">THE VISION OF</h1>
            <h1 className="oswald-font text-blue-400 text-4xl">UNNATI SOCIETY</h1>
          </div>
          <div>
            <p className="font-[Open_Sans] my-3 text-lg">
              Our vision is to establish IIIT Bhagalpur as a leading institution in community-oriented education and social innovation, where knowledge and technology serve as catalysts for social transformation. We aim to build a sustainable bridge between academia and society, ensuring that the benefits of learning, research, and innovation reach every section of the community.
            </p>
          </div>
          <div>
            <p className="font-[Open_Sans] text-lg">
              Through student-led initiatives like Unnati, we aspire to create a model of institutional outreach excellence that reflects the institute’s unwavering commitment to nation-building and equitable education. By empowering students to engage with real-world challenges, we envision an ecosystem where education inspires responsibility, innovation drives inclusion, and every effort contributes to a stronger, more compassionate society.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-1/2 mt-4 ">
          <img src={vision} alt="vision" className="object-cover h-96 border-none shadow-xl bg-black "/>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
