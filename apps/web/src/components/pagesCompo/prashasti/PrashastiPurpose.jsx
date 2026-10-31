import React from "react";
import { Award, Compass, HeartHandshake, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PrashastiPurpose = () => {
  const purposes = [
    {
      num: "01",
      icon: Award,
      title: "Recognising Achievement",
      desc: "To honour deserving students for their academic accomplishments, consistent efforts, and commitment to learning, giving their achievements the appreciation they deserve.",
      iconBg: "bg-blue-50 text-blue-600",
      accentBorder: "group-hover:border-blue-300",
    },
    {
      num: "02",
      icon: Compass,
      title: "Encouraging Aspirations",
      desc: "To inspire students through meaningful interactions, success stories, and experiences that encourage them to pursue their goals with confidence and determination.",
      iconBg: "bg-amber-50 text-amber-600",
      accentBorder: "group-hover:border-amber-300",
    },
    {
      num: "03",
      icon: HeartHandshake,
      title: "Celebrating Collective Effort",
      desc: "To acknowledge the contributions of teachers, parents, volunteers, and educational institutions in supporting students and creating opportunities for growth.",
      iconBg: "bg-emerald-50 text-emerald-600",
      accentBorder: "group-hover:border-emerald-300",
    },
    {
      num: "04",
      icon: Users,
      title: "Building Meaningful Connections",
      desc: "To strengthen collaboration between schools, communities, educational institutions, and individuals working towards a shared vision of accessible and meaningful education.",
      iconBg: "bg-indigo-50 text-indigo-600",
      accentBorder: "group-hover:border-indigo-300",
    },
    {
      num: "05",
      icon: Sparkles,
      title: "Creating a Lasting Impact",
      desc: "To make recognition a source of continued motivation, encouraging students to carry forward the values of perseverance, responsibility, and lifelong learning.",
      iconBg: "bg-rose-50 text-rose-600",
      accentBorder: "group-hover:border-rose-300",
    },
  ];

  return (
    <section id="our-purpose" className="w-full py-16 sm:py-20 lg:py-24 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-6 h-[2px] bg-[#3B82F6]" />
            <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
              Our Purpose
            </span>
            <div className="w-6 h-[2px] bg-[#3B82F6]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.15] mb-4">
            Recognise. Encourage. <span className="text-[#3B82F6]">Empower.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At the heart of Unnati Prashasti Samaroh is a clear commitment: transforming recognition into enduring momentum for every student, educator, and community partner.
          </p>
        </motion.div>

        {/* 5 Purpose Cards: 3 on Top Row, 2 on Bottom Row */}
        <div className="space-y-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {purposes.slice(0, 3).map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className={`group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl ${item.accentBorder} transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold tracking-wider text-slate-400 uppercase group-hover:text-blue-600 transition-colors">
                    <span>Purpose Pillar {item.num}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purposes.slice(3, 5).map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx + 3}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                  className={`group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-xl ${item.accentBorder} transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold tracking-wider text-slate-400 uppercase group-hover:text-blue-600 transition-colors">
                    <span>Purpose Pillar {item.num}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrashastiPurpose;
