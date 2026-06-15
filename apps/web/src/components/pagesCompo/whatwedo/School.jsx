import React, { useState } from "react";
import schoolData from "./../../../scripts/SchoolData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SchoolCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % schoolData.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + schoolData.length) % schoolData.length);
  };

  return (
    <section className="w-full flex justify-center items-center py-30 bg-[#F9FAFB]">
      <div className="w-[90%] lg:w-[70%] flex items-center gap-4">
        <button onClick={prev} className="px-3 py-2 rounded">
          <FontAwesomeIcon icon={faAngleLeft} className="text-xl text-blue-400 cursor-pointer"/>
        </button>

        <div className="flex w-full overflow-hidden">
          <div className="w-1/2 p-6 flex flex-col justify-center">
            <h1 className="oswald-font-3 text-2xl">IMPACT AT</h1>
            <h1 className="text-2xl oswald-font-3 text-blue-400">
              {schoolData[current].schoolName}
            </h1>
            <p className="my-4 text-sm inter-font-2 text-gray-900 border-3 pl-4 border-l-blue-400 border-t-0 border-b-0 border-r-0">
              {schoolData[current].content1}
            </p>
            <p className="text-sm text-gray-900 inter-font-2">
              {schoolData[current].content2}
            </p>
          </div>

          <div className="w-1/2">
            <img
              src="/dummy.jpg"
              className="w-full h-full object-cover"
              alt="school"
            />
          </div>
        </div>
        <button onClick={next} className="px-3 py-2 rounded">
          <FontAwesomeIcon icon={faAngleRight} className="text-xl text-blue-400 cursor-pointer" />
        </button>
      </div>
    </section>
  );
};

export default SchoolCarousel;
