import React from "react";

const Data = () => {
  return (
    <section className="flex justify-center items-center gap-4 py-20 bg-black text-white">
      <div className="flex flex-col-reverse sm:flex-row px-7 gap-5">
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="oswald-font-3 text-2xl sm:text-3xl md:text-4xl">TRANSPARENCY IN</h1>
            <h1 className="oswald-font-3 text-2xl sm:text-3xl md:text-4xl">OUR ACTIONS</h1>
          </div>
          <p className="inter-font text-gray-400 mb-4 w-full md:w-3/4">
            We ensure every penny donated goes directly to empowering the
            children. Here is a breakdown of our annual expenditure.
          </p>
          <div>
            <h1 className="inter-font-2 flex items-center gap-2">
              <span className="w-2 h-2 border-0 rounded-full bg-blue-400 inline-block"></span>{" "}
              70% STUDENT PROGRAMS
            </h1>
            <h1 className="inter-font-2 flex items-center gap-2">
              <span className="w-2 h-2 border-0 rounded-full bg-purple-400 inline-block"></span>{" "}
              20% INFRASTRUCTURE
            </h1>
            <h1 className="inter-font-2 flex items-center gap-2">
              <span className="w-2 h-2 border-0 rounded-full bg-yellow-400 inline-block"></span>{" "}
              10% ADMIN & OPS
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="relative w-40 h-40 rounded-full"
            style={{ 
                background: "conic-gradient(#0ea5e9 0deg 250deg, #a855f7 250deg 305deg, #eab308 305deg 360deg)"
            }}>
            <div className="absolute inset-8 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data;
