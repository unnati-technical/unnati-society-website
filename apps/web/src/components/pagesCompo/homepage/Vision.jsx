import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
const mission = "https://res.cloudinary.com/drhkvdtw2/image/upload/v1782396858/unnati_assets/mission2.jpg";

const Vision = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, type: "spring", stiffness: 120, damping: 18 } 
    },
  };

  return (
    <section className="bg-white w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto py-6 md:py-8 px-6 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          
          {/* Left Column (45%) */}
          <motion.div 
            className="w-full lg:w-[45%] flex flex-col gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {/* Section Label */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <div className="w-[40px] h-1 bg-[#FBBF24] rounded-full"></div>
              <p className="text-[#3B82F6] font-medium text-xs md:text-sm uppercase tracking-[0.1em]">
                OUR VISION
              </p>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="flex flex-col leading-[0.95]">
              <h1 className="oswald-font-3 text-3xl md:text-4xl font-black uppercase text-black">
                EQUITABLE OPPORTUNITIES
              </h1>
              <h1 className="oswald-font-3 text-3xl md:text-4xl font-black uppercase text-[#3B82F6]">
                TO THRIVE
              </h1>
            </motion.div>

            {/* Vision Description */}
            <motion.div variants={itemVariants}>
              <p className="text-[#334155] text-sm md:text-base leading-[1.5] max-w-[600px]">
                We envision a society where every child, regardless of their background, 
                has access to the resources, guidance, and support they need to 
                grow, learn, and succeed.
              </p>
            </motion.div>

            {/* Vision Pillars */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2 mt-1">
              
              {/* Pillar 1 */}
              <div className="flex items-start gap-3 border-b border-[#E5E7EB] pb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-[#EFF6FF] rounded-xl flex justify-center items-center text-[#3B82F6]">
                  <FiUsers size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-0.5 pt-1">
                  <h3 className="text-[#111827] font-extrabold text-base md:text-lg">PLATFORM TO ALL</h3>
                  <p className="text-[#475569] text-xs md:text-sm leading-snug">
                    Fostering a fair chance for personal growth and success.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-3 border-b border-[#E5E7EB] pb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-[#EFF6FF] rounded-xl flex justify-center items-center text-[#3B82F6]">
                  <FiTrendingUp size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-0.5 pt-1">
                  <h3 className="text-[#111827] font-extrabold text-base md:text-lg">CONSTANT DEVELOPMENT</h3>
                  <p className="text-[#475569] text-xs md:text-sm leading-snug">
                    Preparing students to face constant revolution and development.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-3 pb-1">
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-[#EFF6FF] rounded-xl flex justify-center items-center text-[#3B82F6]">
                  <FaGraduationCap size={20} />
                </div>
                <div className="flex flex-col gap-0.5 pt-1">
                  <h3 className="text-[#111827] font-extrabold text-base md:text-lg">SCHOLARSHIPS</h3>
                  <p className="text-[#475569] text-xs md:text-sm leading-snug">
                    Providing financial aid to ensure no child is left behind.
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>

          {/* Right Column (55%) - Image Area */}
          <motion.div 
            className="w-full lg:w-[55%] relative flex justify-center items-center py-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={imageVariants}
          >
            {/* Top Left: Small blue dot grid */}
            <div className="absolute top-0 left-2 md:left-4 grid grid-cols-4 gap-1.5 md:gap-2 z-10">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3B82F6]"></div>
              ))}
            </div>

            {/* Bottom Left: Large overlapping translucent circles */}
            <svg className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-32 h-32 md:w-48 md:h-48 z-10 opacity-25" viewBox="0 0 200 200" fill="none" stroke="#3B82F6" strokeWidth="2">
              <circle cx="80" cy="80" r="60" />
              <circle cx="120" cy="120" r="60" />
            </svg>

            {/* Right Side: Gold diagonal strokes */}
            <svg className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 w-8 h-24 md:w-12 md:h-32 z-10" viewBox="0 0 40 120" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round">
              <line x1="5" y1="10" x2="35" y2="0" />
              <line x1="5" y1="30" x2="35" y2="20" />
              <line x1="5" y1="50" x2="35" y2="40" />
              <line x1="5" y1="70" x2="35" y2="60" />
              <line x1="5" y1="90" x2="35" y2="80" />
              <line x1="5" y1="110" x2="35" y2="100" />
            </svg>

            {/* Secondary Background Shape (Soft blue card) */}
            <div 
              className="absolute w-[92%] h-[92%] rounded-[24px] md:rounded-[40px] z-0"
              style={{
                background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)",
                transform: "rotate(5deg)",
                opacity: 0.4
              }}
            ></div>

            {/* Main Frame (Irregular geometric octagon) */}
            <div 
              className="relative w-full aspect-[4/3] bg-white p-2 sm:p-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-10"
              style={{
                clipPath: "polygon(12% 0%, 100% 0%, 100% 88%, 88% 100%, 0% 100%, 0% 12%)",
              }}
            >
              <div 
                className="w-full h-full relative"
                style={{
                  clipPath: "polygon(12% 0%, 100% 0%, 100% 88%, 88% 100%, 0% 100%, 0% 12%)",
                }}
              >
                <img loading="lazy" 
                  src={mission} 
                  alt="Students in classroom" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
