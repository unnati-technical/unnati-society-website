import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import cardData from "../../../scripts/CardsData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const CollegeCardFaculty = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {

    setCurrentIndex((prev) => (prev + 1) % cardData.length);

  };

  const handlePrev = () => {

    setCurrentIndex((prev) =>

      prev === 0 ? cardData.length - 1 : prev - 1

    );

  };

  const card = cardData[currentIndex];

  return (

    <section className="w-full flex justify-center items-center py-20 text-white">

      <div className="w-4/5 flex items-center justify-center bg-[#212331] border-gray-300 rounded-xl py-4 md:py-8 px-4 md:px-12">

        <div className="mr-10 hidden md:block">

          <FontAwesomeIcon

            icon={faAngleLeft}

            className="text-xl text-blue-400 cursor-pointer"

            onClick={handlePrev}

          />

        </div>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col-reverse md:flex-row items-center w-full"
            >
              <div className="flex-1 pr-0 md:pr-8">
                <h2 className="text-3xl oswald-font-3 text-center md:text-left">
                  {card.title}
                </h2>
                <h3 className="text-lg inter-font mt-1 text-white/85 text-center md:text-left">
                  {card.name}
                </h3>
                <p className="inter-font text-white/85 text-center md:text-left">
                  {card.position}
                </p>
                <p className="mt-3 font-[Open_Sans] text-white/85 text-justify md:text-left leading-relaxed">
                  {card.content}
                </p>
              </div>

              <div className="flex-1 flex justify-center lg:justify-end">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-auto max-w-[300px] md:w-96 md:h-96 object-cover rounded-xl mb-8 md:mb-0 shadow-lg border border-gray-700"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="ml-4 hidden md:block">

          <FontAwesomeIcon

            icon={faAngleRight}

            className="text-xl text-blue-400 cursor-pointer"

            onClick={handleNext}

          />

        </div>

      </div>

    </section>

  );

};

export default CollegeCardFaculty;