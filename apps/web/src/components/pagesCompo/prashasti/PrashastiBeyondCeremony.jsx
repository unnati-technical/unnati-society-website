import React from "react";
import { Compass, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";
import FramedBrushPhoto from "../../common/FramedBrushPhoto";

const PrashastiBeyondCeremony = () => {
  // Authentic IIIT Bhagalpur campus exposure tour photo of students and buses in front of landmark building
  const visualPhoto = "/assets/campus-exposure-tour.jpg";

  return (
    <section id="beyond-the-ceremony" className="w-full py-16 sm:py-20 lg:py-24 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Narrative with Viewport Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
                Beyond The Ceremony
              </span>
              <div className="w-8 h-[2px] bg-[#3B82F6]" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.12] mb-6">
              Recognition Is The Beginning, <br />
              <span className="text-[#3B82F6]">Not The Destination.</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed mb-4">
              The true significance of Prashasti Samaroh lies not only in the moments of felicitation, but also in what those moments inspire.
            </p>

            {/* Paragraph 2 */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              A student recognised today may become the inspiration for another student tomorrow. A conversation with an educator may open up a new possibility. An opportunity to visit a university campus may help a learner imagine a future that once seemed distant. An acknowledgement of a volunteer's contribution may encourage continued service to the community.
            </p>

            {/* Ripple Effects Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  The Multiplier Effect of Recognition
                </strong>
                Each felicitated learner becomes a role model in their village and school, transforming personal milestones into community momentum.
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission Card & Featured Visual with Viewport Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Visual Photo with Signature Brush Frame */}
            <FramedBrushPhoto
              id="beyond-ceremony-photo"
              src={visualPhoto}
              alt="Students touring IIIT Bhagalpur campus"
              caption="Campus Exposure · Expanding Students' Sense of What Is Possible"
              aspectRatio="aspect-[16/10]"
              onError={(e) => {
                e.currentTarget.src = "https://ik.imagekit.io/zpkfsvgtn/Outreach/Copy%20of%20IMG_7454.JPG";
              }}
            />

            {/* Paragraphs 3 & 4 Container */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
              <Quote className="w-16 h-16 text-blue-500/10 absolute -top-2 -right-2 pointer-events-none" />

              {/* Paragraph 3 */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                These moments reflect the larger purpose of Unnati Society: creating meaningful educational opportunities, nurturing aspirations, and supporting learners as they discover what they are capable of achieving.
              </p>

              {/* Paragraph 4 */}
              <p className="text-xs sm:text-sm text-amber-300 font-medium leading-relaxed pt-3 border-t border-slate-700/80">
                Prashasti Samaroh brings these values together in one celebration, honouring progress, encouraging ambition, and reminding every participant that education becomes more powerful when achievement is recognised and opportunity is shared.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default PrashastiBeyondCeremony;
