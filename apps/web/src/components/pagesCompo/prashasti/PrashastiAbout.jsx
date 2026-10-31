import React from "react";
import { motion } from "framer-motion";
import FramedBrushPhoto from "../../common/FramedBrushPhoto";

const PrashastiAbout = () => {
  // Authentic grand ceremony stage photo with school children and dignitaries from IIIT Bhagalpur
  const ceremonyPhoto = "/assets/prashasti/IMG_9935.JPG";

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag / Kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
                About Prashasti Samaroh
              </span>
              <div className="w-8 h-[2px] bg-[#3B82F6]" />
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.1] mb-6">
              A Celebration of Achievement <br className="hidden sm:block" />
              <span className="text-[#3B82F6]">And The People Behind It.</span>
            </h2>

            {/* Narrative Body Copy from Markdown */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">Unnati Prashasti Samaroh</strong> is the flagship annual celebration of Unnati Society, dedicated to recognising and celebrating the achievements of deserving students whose educational journeys have been positively transformed through the society's initiatives.
              </p>
              <p>
                Bringing together students, families, educators, community leaders, and distinguished guests, the event celebrates academic excellence, perseverance, and the power of education. It provides a platform to acknowledge outstanding students, appreciate the commitment of volunteers, and strengthen the relationships between educational institutions and the communities they serve.
              </p>
              <p>
                With student felicitation, inspirational guest sessions, volunteer recognition, success stories, and community engagement activities, Prashasti Samaroh goes beyond a conventional award ceremony. It is a shared celebration of progress, opportunity, determination, and the belief that every learner deserves the encouragement to move forward with confidence and purpose.
              </p>
            </div>
          </div>

          {/* Right Column: Framed Photo with Signature Brush & Border Frame */}
          <div className="lg:col-span-6 relative flex justify-center">
            <FramedBrushPhoto
              id="prashasti-about-photo"
              src={ceremonyPhoto}
              alt="Students and guests at Unnati Prashasti Samaroh celebration"
              caption="IIIT Bhagalpur · Celebrating Student Aspirations & Leadership"
              aspectRatio="aspect-[16/10]"
              onError={(e) => {
                e.currentTarget.src = "https://ik.imagekit.io/zpkfsvgtn/Outreach/Copy%20of%20IMG_5005.JPG";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrashastiAbout;
