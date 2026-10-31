import React from "react";
import { HeartHandshake, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import pnbSvg from "../../../assets/punjab-national-bank-seeklogo.svg";
import pnbPng from "../../../assets/punjab-national-bank-seeklogo.png";

const PrashastiSponsors = () => {
  return (
    <section id="sponsors-and-supporters" className="w-full py-16 sm:py-20 lg:py-24 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Grid with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16"
        >
          <div className="lg:col-span-6">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#9F1A45] font-bold text-xs uppercase tracking-[3px]">
                Sponsors and Supporters
              </span>
              <div className="w-8 h-[2px] bg-[#9F1A45]" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.1] mb-5">
              Making Recognition <br />
              <span className="text-[#9F1A45]">Possible, Together.</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Meaningful educational change is built through collective effort. The support of our sponsors, partners, and well-wishers helps create opportunities to celebrate student achievement, bring communities together, and encourage young learners to keep moving forward.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              We extend our sincere gratitude to the organisations and individuals who support the vision of Prashasti Samaroh and believe in the power of education to shape brighter futures.
            </p>

            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-slate-800">
              <p className="text-sm sm:text-base font-semibold text-[#9F1A45] leading-snug">
                Our gratitude to every supporter who helps turn encouragement into opportunity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sponsor Showcase Card (User-approved clean layout with SVG + PNG) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden bg-white border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8"
        >
          {/* Top Accent Ribbon in PNB Maroon & Gold */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9F1A45] via-[#FEB614] to-[#9F1A45]" />

          {/* Badge & Subtitle */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-[#9F1A45] border border-rose-200 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#9F1A45]" />
              Official Sponsor
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Supporting Prashasti Samaroh
            </span>
          </div>

          {/* Brand Showcase: Both SVG emblem in gold-rimmed pod & PNG full name typography */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-6 rounded-2xl bg-slate-50/90 border border-slate-100">
            {/* SVG Emblem in Pod with Sparkle */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2.5 bg-white border-2 border-amber-200 shadow-sm flex items-center justify-center shrink-0">
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

          {/* Gratitude Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <HeartHandshake className="w-4 h-4 text-[#9F1A45]" />
              With sincere appreciation to all our partners & well-wishers
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PrashastiSponsors;
