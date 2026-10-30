import React from "react";
import { Award, Users, HeartHandshake, School, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PrashastiWhyMatters = () => {
  const pillars = [
    {
      icon: Award,
      title: "Recognising More Than Results",
      subtitle: "Consistency, resilience, curiosity & dedication",
      desc: "Achievement is not defined by a single examination or a final score. It is also reflected in consistency, resilience, curiosity, and the willingness to learn from challenges. Prashasti Samaroh celebrates educational accomplishments while recognising the dedication and support that contribute to them.",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      pillarNum: "01",
    },
    {
      icon: Users,
      title: "Inspiring the Next Generation",
      subtitle: "Empowering young learners to aim higher",
      desc: "Every student who is recognised becomes a source of inspiration for others. By bringing learners together and sharing their journeys, the ceremony encourages young people to aim higher, explore opportunities, and approach their futures with renewed confidence.",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
      pillarNum: "02",
    },
    {
      icon: HeartHandshake,
      title: "Appreciating the People Behind Progress",
      subtitle: "Honouring teachers, parents, volunteers & institutions",
      desc: "Students do not achieve in isolation. Teachers, parents, volunteers, institutions, and community members all play an important role in shaping educational journeys. Prashasti Samaroh acknowledges this collective effort and celebrates the people who work together to create opportunities for learners.",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      pillarNum: "03",
    },
    {
      icon: School,
      title: "Strengthening the Community Around Education",
      subtitle: "Uniting schools, educators, and civic partners",
      desc: "By bringing together schools, educators, government representatives, volunteers, and members of the wider community, the ceremony creates space for collaboration and shared responsibility. It reinforces the idea that improving educational opportunities is a collective endeavour.",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
      pillarNum: "04",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white font-sans border-b border-slate-100">
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
              <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
                Why Prashasti Samaroh Matters
              </span>
              <div className="w-8 h-[2px] bg-[#3B82F6]" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.1] mb-5">
              Because Every Achievement <br />
              <span className="text-[#3B82F6]">Deserves To Be Seen.</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Education is often measured through marks, examinations, and certificates. Yet behind every achievement lies a much larger story: the determination to keep learning, the courage to overcome challenges, the guidance of a teacher, the support of a family, and the willingness to keep moving forward when the journey becomes difficult.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700">
              For students from underserved communities, recognition can carry a significance beyond the award itself. It can affirm their efforts, strengthen their confidence, and remind them that their aspirations matter. It can also inspire other learners to believe in their own abilities and continue pursuing their goals.
            </p>

            <p>
              Prashasti Samaroh exists to make these stories visible. By celebrating achievement and acknowledging the people who make it possible, the initiative seeks to build a culture where educational progress is valued, dedication is appreciated, and potential is encouraged.
            </p>
          </div>
        </motion.div>

        {/* 4 Core Pillar Cards Grid with Staggered Viewport Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-[#3B82F6] transition-colors">
                      {pillar.pillarNum}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#3B82F6] mb-3">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#3B82F6] transition-colors">
                  <span>Core Pillar {pillar.pillarNum}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PrashastiWhyMatters;
