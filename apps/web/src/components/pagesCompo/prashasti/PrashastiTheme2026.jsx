import React, { useState } from "react";
import { Lightbulb, ShieldCheck, Heart, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import FramedBrushPhoto from "../../common/FramedBrushPhoto";

const PrashastiTheme2026 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const themeVisualPhoto = "/assets/prashasti/IMG_9984.JPG";

  return (
    <section id="theme-2026" className="w-full py-16 sm:py-20 lg:py-24 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Pale Blue Container Card with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#F0F5FF] border border-blue-100 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

          {/* Faint Typographic Watermark */}
          <div className="absolute right-0 bottom-0 select-none pointer-events-none overflow-hidden leading-none z-0 translate-y-3 sm:translate-y-6">
            <span className="text-[100px] sm:text-[160px] lg:text-[220px] font-black oswald-font tracking-tighter text-[#1E3A8A]/[0.05] uppercase block">
              CHARACTER
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            
            {/* Left Column: Theme Headline & Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              {/* Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
                  Prashasti Samaroh 2026
                </span>
                <div className="w-8 h-[2px] bg-[#3B82F6]" />
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold uppercase tracking-tight text-slate-900 leading-[1.08] mb-3">
                THIS YEAR'S THEME: <br />
                <span className="text-[#3B82F6]">MORE THAN A DEGREE</span>
              </h2>

              {/* Signature Hook */}
              <p className="text-base sm:text-lg font-bold text-[#1E40AF] leading-snug mb-4">
                Education is not only about what we learn, but who we become.
              </p>

              {/* Primary Narrative */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                The 2026 edition of Unnati Prashasti Samaroh explores the idea that education extends far beyond academic qualifications. A degree can represent years of learning, discipline, perseverance, and achievement, but its true value is reflected in how knowledge shapes our character, informs our choices, and enables us to contribute to the world around us.
              </p>

              {/* Paragraph 1 of "More Than a Degree" */}
              <p className="text-slate-700 text-sm leading-relaxed mb-4 p-4 rounded-xl bg-white/80 border border-blue-100">
                A degree is a milestone, a reflection of years of learning, discipline, perseverance, and academic achievement. It tells us what we have studied and what we are capable of doing. But education was never meant to end with a certificate. The real measure of education lies in how that knowledge shapes the person behind the degree.
              </p>

              {/* Expandable Extended Theme Copy */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? "max-h-[1200px] opacity-100 mb-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3.5 text-slate-600 text-sm leading-relaxed pt-3 border-t border-blue-200/60">
                  <p>
                    Learning matters most when it moves us. It should push students to question, experiment, build, collaborate, and take responsibility for the outcomes they create. A good initiative is only the beginning; the real challenge lies in turning it into action. Classrooms can provide knowledge, but it is initiative, persistence, and the courage to try that turn knowledge into solutions, and solutions into impact.
                  </p>
                  <p>
                    A degree can open doors, but it cannot teach kindness. It can demonstrate excellence, but it cannot guarantee integrity. It can mark an achievement, but it cannot measure empathy, humility, courage, or the willingness to help someone else rise. These are the qualities that quietly shape our choices when no examination is watching and no certificate is being awarded.
                  </p>
                  <p className="font-semibold text-slate-800 bg-blue-100/40 p-3 rounded-lg border border-blue-200/50">
                    Unnati Prashasti Samaroh celebrates achievement, but more importantly, it celebrates the journey of becoming. Because the finest qualification is not the one framed on a wall, but the character carried into the world.
                  </p>
                  <p className="text-slate-600">
                    The theme <em>More Than a Degree</em> invites us to look beyond academic results and reflect on the values that make learning meaningful. It celebrates not only what students accomplish, but also how they use their knowledge, how they treat others, and how they contribute to the world around them.
                  </p>
                  <p className="font-medium text-blue-900">
                    Education finds its fullest expression when learning becomes action, success is accompanied by responsibility, and personal achievement creates opportunities for others.
                  </p>
                </div>
              </div>

              {/* Toggle Button */}
              <div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FBBF24] hover:bg-amber-400 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:translate-y-[-1px]"
                >
                  <span>{isExpanded ? "Show Less" : "Read Full Theme Reflection"}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: 3 Pillar Boxes & Photo Quote Card */}
            <div className="lg:col-span-6 flex flex-col gap-6 justify-between h-full">
              
              {/* Section Subhead: Beyond Qualifications, Towards Character */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Beyond Qualifications, Towards Character
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                  Knowledge with purpose. Excellence with integrity. Achievement with empathy.
                </h3>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Pillar 1: Knowledge */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-100/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3B82F6] mb-3">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Knowledge</h4>
                  <span className="text-xs font-semibold text-[#3B82F6] block mb-1">With purpose</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Learning that leads to constructive action.
                  </p>
                </div>

                {/* Pillar 2: Excellence */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-100/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3B82F6] mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Excellence</h4>
                  <span className="text-xs font-semibold text-[#3B82F6] block mb-1">With integrity</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Striving to do better, with unwavering honesty.
                  </p>
                </div>

                {/* Pillar 3: Achievement */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-100/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3B82F6] mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Achievement</h4>
                  <span className="text-xs font-semibold text-[#3B82F6] block mb-1">With empathy</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Building a kinder, more inclusive society.
                  </p>
                </div>

              </div>

              {/* Featured Quote Card with Visual Photo */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-blue-200/70 shadow-md relative mt-2 overflow-hidden flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-2/5 shrink-0">
                  <FramedBrushPhoto
                    id="theme-visual-photo"
                    src={themeVisualPhoto}
                    alt="Students in classroom learning initiative"
                    aspectRatio="aspect-[4/3]"
                    caption="Action & Impact"
                    showDots={true}
                    showSquiggle={false}
                    className="p-1 sm:p-2"
                    onError={(e) => {
                      e.currentTarget.src = "https://ik.imagekit.io/zpkfsvgtn/Outreach/IMG20260801110041.jpg.jpeg";
                    }}
                  />
                </div>

                <div className="flex-1 relative">
                  <Quote className="w-8 h-8 text-[#3B82F6]/30 absolute -top-1 -left-1" />
                  <p className="text-slate-800 text-sm sm:text-base font-medium italic relative z-10 pl-5 leading-relaxed">
                    “The finest qualification we can earn through education is the character we carry into the world.”
                  </p>
                  <div className="mt-3 pl-5 flex items-center justify-between text-xs text-slate-500 font-semibold tracking-wide uppercase">
                    <span>Prashasti Samaroh 2026</span>
                    <span className="text-blue-600">Unnati Society</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default PrashastiTheme2026;
