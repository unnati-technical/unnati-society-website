import React from "react";
import mission from './../../../assets/mission.jpg'

const Conttibute = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat py-20" style={{backgroundImage: `url(${mission})`}}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-white">
        <div className="flex flex-col justify-center items-center p-4">
          <h1 className="oswald-font-3 text-xl sm:text-3xl md:text-4xl text-center mb-4">
            YOU CAN CONTRIBUTE TO PROVIDE A PLACE
          </h1>
          <h1 className="oswald-font-2 text-xl sm:text-3xl md:text-4xl">FOR CHILDREN TO LEARN!</h1>
        </div>
        <div className="flex gap-6">
          <div className="oswald-font-3 px-5 p-2 bg-amber-400 text-black cursor-pointer">JOIN AS VOLUNTEER</div>
          <div className="oswald-font-3 px-5 py-2 bg-white text-black cursor-pointer">DONATE</div>
        </div>
      </div>
    </section>
  );
};

export default Conttibute;
