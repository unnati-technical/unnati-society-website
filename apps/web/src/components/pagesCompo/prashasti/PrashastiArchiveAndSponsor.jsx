import React from "react";
import { HeartHandshake, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import pnbSvg from "../../../assets/punjab-national-bank-seeklogo.svg";
import pnbPng from "../../../assets/punjab-national-bank-seeklogo.png";

const PrashastiArchiveAndSponsor = () => {
  // Authentic inaugural ceremony photo of dignitaries high table on stage
  const archival2024Photo = "/assets/prashasti/IMG_9757.JPG";

  return (
    <section className="w-full py-14 sm:py-18 lg:py-20 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: 2024 Inaugural Edition Milestone with Viewport Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
                  The First Edition
                </span>
                <div className="w-6 h-[2px] bg-[#3B82F6]" />
              </div>

              <h3 className="text-2xl sm:text-3xl oswald-font font-bold text-slate-900 tracking-tight uppercase mb-3">
                PRASHASTI SAMAROH 2024
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                The inaugural edition of Prashasti Samaroh marked the beginning of an annual tradition dedicated to recognising student achievement, celebrating educational progress, and bringing together the educators, families, and mentors who support learners on their journeys.
              </p>
            </div>

            {/* Thumbnail Archive Photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/8] border border-slate-200 shadow-inner group bg-slate-100">
              <img
                src={archival2024Photo}
                alt="Prashasti Samaroh 2024 Inaugural Edition"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://ik.imagekit.io/zpkfsvgtn/Outreach/Copy%20of%20IMG_5005.JPG";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="font-semibold">Inaugural Ceremony · IIIT Bhagalpur</span>
                <span className="text-amber-300 font-medium">Archive 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Official Sponsor Acknowledgement (Punjab National Bank) with Viewport Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-slate-50 to-rose-50/30 border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Top Accent Ribbon in PNB Maroon & Gold */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9F1A45] via-[#FEB614] to-[#9F1A45]" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#9F1A45] font-bold text-xs uppercase tracking-[3px]">
                  Our Sponsor
                </span>
                <div className="w-6 h-[2px] bg-[#9F1A45]" />
              </div>

              <h3 className="text-2xl sm:text-3xl oswald-font font-bold text-slate-900 tracking-tight uppercase mb-3">
                Making Recognition Possible, Together.
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Meaningful educational change is built through collective effort. We extend our sincere gratitude to our <strong className="text-slate-900 font-semibold">Official Sponsor</strong> for supporting the vision of Prashasti Samaroh and believing in the power of education to shape brighter futures.
              </p>
            </div>

            {/* PNB Official Sponsor Showcase Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-4">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#9F1A45] border border-rose-200 text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#9F1A45]" />
                  Official Sponsor
                </div>
              </div>

              {/* Brand Showcase: Both SVG emblem in gold-rimmed pod & PNG full name typography */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                {/* SVG Emblem in Pod with Sparkle */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl p-2 bg-white border-2 border-amber-200 shadow-sm flex items-center justify-center shrink-0">
                  <img
                    src={pnbSvg}
                    alt="Punjab National Bank Official Emblem"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FEB614] flex items-center justify-center text-slate-900 shadow-xs">
                    <Sparkles className="w-3 h-3 text-slate-900" />
                  </div>
                </div>

                {/* Full Name Typography PNG */}
                <div className="flex-1 flex items-center justify-center sm:justify-start">
                  <img
                    src={pnbPng}
                    alt="Punjab National Bank - पंजाब नैशनल बैंक"
                    className="h-10 sm:h-12 w-auto max-w-full object-contain"
                  />
                </div>
              </div>

            </div>

            {/* Gratitude Footer Note */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                With sincere appreciation to all our partners & well-wishers
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PrashastiArchiveAndSponsor;

