import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PrashastiClosingBanner = () => {
  const navigate = useNavigate();
  const bgWatermark = "/assets/prashasti/IMG_9989.JPG";

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#0B0F19] text-white overflow-hidden border-t border-slate-800">
      {/* Background Ceremony Crowd Watermark */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgWatermark}
          alt="Prashasti Samaroh Crowd Background"
          className="w-full h-full object-cover object-center opacity-15 filter grayscale"
          onError={(e) => {
            e.currentTarget.src = "https://ik.imagekit.io/zpkfsvgtn/Outreach/Copy%20of%20IMG_5062.JPG";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-14"
        >
          {/* Left Title & Sign-off */}
          <div className="lg:max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
              Continuing Commitment
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold uppercase tracking-tight leading-[1.08] text-white mb-6">
              Celebrating How Far We Have Come. <br />
              <span className="text-[#3B82F6]">Inspiring How Far We Can Go.</span>
            </h3>

            {/* Institutional Sign-off from Markdown */}
            <div className="pt-4 border-t border-white/10">
              <span className="block text-sm sm:text-base font-bold text-white tracking-wide">
                Unnati Society, IIIT Bhagalpur
              </span>
              <span className="block text-xs sm:text-sm text-gray-400 italic">
                Celebrating progress. Nurturing potential. Inspiring change.
              </span>
            </div>
          </div>

          {/* Center Narrative from Markdown */}
          <div className="lg:max-w-xl flex flex-col gap-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            <p>
              Every achievement carries a story. Every story holds the possibility of inspiring another. And every opportunity to learn, grow, and contribute brings us closer to a future shaped by knowledge, compassion, and purpose.
            </p>
            <p>
              Unnati Prashasti Samaroh is a celebration of those possibilities, of students who continue to strive, educators who continue to guide, volunteers who continue to serve, and communities that come together to make progress possible.
            </p>
            <p className="text-gray-400">
              As we recognise today's achievements, we also renew our commitment to tomorrow's potential.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-1">
              <p className="text-xs sm:text-sm text-[#FBBF24] font-semibold tracking-wide">
                Because education is more than a degree. It is the difference we make with what we learn.
              </p>
            </div>
          </div>

          {/* Right Action Button matching mockup */}
          <div className="shrink-0 self-start lg:self-center">
            <button
              onClick={() => navigate("/donate")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-slate-900 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-amber-400/20 cursor-pointer hover:translate-y-[-1px]"
            >
              <span>Support Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrashastiClosingBanner;
