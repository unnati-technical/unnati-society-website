import React from "react";
import mission from "./../../../assets/mission2.jpg";

const Vision = () => {
  return (
    <section className="bg-[#F9FAFB] text-black py-10 md:py-30 px-10">
      <div className="flex flex-col md:flex-row justify-center items-center ">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <p className="w-fit inter-font text-gray-900 border-4 border-t-black pt-15 border-b-0 border-l-0 border-r-0 ">
              OUR VISION
            </p>
          </div>
          <div>
            <h1 className="oswald-font text-2xl sm:text-3xl md:text-4xl">EQUITABLE OPPORTUNITIES</h1>
            <h1 className="oswald-font text-2xl sm:text-3xl md:text-4xl">TO THRIVE</h1>
          </div>
          <div>
            <div>
              <div></div>
              <div>
                <h2 className="oswald-font-3">PLATFORM TO ALL</h2>
                <p className="inter-font">
                  Fostering a fair chance for personal growth and success.
                </p>
              </div>
            </div>
            <div >
              <div></div>
              <div>
                <h2 className="oswald-font-3">CONSTANT DEVELOPMENT</h2>
                <p className="inter-font">
                  Preparing students to face constant revolution and
                  development.
                </p>
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <h2 className="oswald-font-3">SCHOLARSHIPS</h2>
                <p className="inter-font">
                  Providing financial aid to ensure no child is left behind.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10 bg-gray-100">
          <div
            className="group relative transition-all duration-500 hover:rotate-3 hover:-translate-y-4">
            <div className="absolute inset-0 bg-black/20 blur-2xl rounded-[30px]" />
            <img src={mission} alt="vision"
                 className="relative w-[320px] h-105 object-cover rounded-[30px] border-10 border-white shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
