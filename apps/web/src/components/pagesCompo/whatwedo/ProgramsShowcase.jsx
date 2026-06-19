import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, animate } from "framer-motion";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { useNavigate } from "react-router-dom";

const AnimatedCounter = ({ value, duration = 1 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (v) => setCount(Math.round(v)),
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span>{count}</span>;
};

const programsData = [
  {
    id: "digiXplore",
    name: "DigiXplore",
    title: "Digital Literacy Program",
    description: "Empowering students with essential digital literacy skills through engaging workshops.",
    stats: { value: 280, suffix: "+", label: "Students Reached" },
    tags: ["Digital Literacy", "Technology", "Computer Skills", "Future Ready"],
    image: cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.40_PM_whvo3l"),
    link: "/programs/digiXplore",
  },
  {
    id: "netritva",
    name: "Netritva",
    title: "Career Guidance Program",
    description: "Guiding the youth towards a brighter future with mentorship and leadership training.",
    stats: { value: 80, suffix: "+", label: "Careers Guided" },
    tags: ["Career Guidance", "Mentorship", "Leadership", "Confidence"],
    image: cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.38_PM_3_thxqic"),
    link: "/programs/netritva",
  },
  {
    id: "akshar",
    name: "Akshar",
    title: "English Literacy Program",
    description: "Fostering communication and literacy skills for a better tomorrow.",
    stats: { value: 30, suffix: "+", label: "Literacy Camps" },
    tags: ["English Learning", "Communication", "Literacy", "Education"],
    image: cloudinaryImage("WhatsApp_Image_2026-02-03_at_1.39.39_PM_5_ney7sn"),
    link: "/programs/akshar",
  }
];

const ProgramsShowcase = ({ activeProgramId = "digiXplore" }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeData = programsData.find((p) => p.id === activeProgramId) || programsData[0];
  const inactivePrograms = programsData.filter((p) => p.id !== activeData.id);

  return (
    <section className="relative w-full min-h-screen bg-[#020617] text-white overflow-hidden flex items-center justify-center py-20 px-6 md:px-12 lg:px-20 font-sans">
      {/* Subtle Background Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at center, rgba(59,130,246,0.08), transparent 70%)`,
        }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: Content Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:pr-10 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex flex-col gap-5"
            >
              <div>
                <motion.h3 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-blue-500 font-medium tracking-widest uppercase text-sm mb-2"
                >
                  Unnati Flagship Programs
                </motion.h3>
                <motion.h1 className="text-5xl sm:text-7xl font-bold text-white drop-shadow-lg uppercase tracking-tight" style={{ fontFamily: "Oswald, sans-serif" }}>
                  {activeData.name}
                </motion.h1>
              </div>

              <motion.h2 className="text-xl sm:text-2xl font-light text-gray-300">
                {activeData.title}
              </motion.h2>

              <motion.div className="w-20 h-1 bg-blue-500 rounded-full" />

              <motion.p className="text-gray-400 max-w-lg text-lg leading-relaxed">
                {activeData.description}
              </motion.p>

              {/* Stats Section */}
              <motion.div className="mt-4">
                <h3 className="text-6xl font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
                  <AnimatedCounter value={activeData.stats.value} />
                  <span className="text-blue-500">{activeData.stats.suffix}</span>
                </h3>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-semibold">
                  {activeData.stats.label}
                </p>
              </motion.div>

              {/* Floating Tags */}
              <motion.div className="flex flex-wrap gap-3 mt-6">
                {activeData.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 100 }}
                    className="px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-300 text-sm font-medium shadow-lg backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full w-fit font-medium transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Explore {activeData.name}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Orbital System */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[700px] relative flex items-center justify-center">
          
          {/* Active Center Item */}
          <motion.div
            key={activeData.id}
            layoutId={`circle-${activeData.id}`}
            className="absolute z-20 rounded-full overflow-hidden border-4 border-slate-800/80 shadow-[0_0_80px_rgba(59,130,246,0.3)] flex items-center justify-center bg-slate-900"
            style={{ 
              width: isMobile ? "280px" : "440px", 
              height: isMobile ? "280px" : "440px",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.img
              key={activeData.image}
              src={activeData.image}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 ring-inset ring-2 ring-white/10 rounded-full"></div>
          </motion.div>

          {/* Inactive Orbiting Items */}
          {inactivePrograms.map((prog, index) => {
            // Orbital positions
            const radius = isMobile ? 180 : 320;
            // On mobile, position top and bottom. On desktop, position left and right slightly angled
            const angle = isMobile
              ? index === 0 ? -Math.PI / 2 : Math.PI / 2
              : index === 0 ? Math.PI * 0.85 : Math.PI * 0.15; // 153deg and 27deg

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={prog.id}
                layoutId={`circle-${prog.id}`}
                className="absolute z-30 rounded-full overflow-hidden border-2 border-slate-700/50 cursor-pointer flex items-center justify-center group bg-slate-900 shadow-xl"
                style={{ 
                  width: isMobile ? "100px" : "150px", 
                  height: isMobile ? "100px" : "150px",
                  top: "50%",
                  left: "50%",
                  marginTop: isMobile ? "-50px" : "-75px",
                  marginLeft: isMobile ? "-50px" : "-75px"
                }}
                initial={{ x, y, opacity: 0 }}
                animate={{ x, y, scale: 1, opacity: 0.85 }}
                whileHover={{ 
                  scale: 1.1, 
                  opacity: 1, 
                  boxShadow: "0 0 30px rgba(59,130,246,0.5)",
                  borderColor: "rgba(59,130,246,0.6)"
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onClick={() => navigate(prog.link)}
              >
                <img
                  src={prog.image}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                />
                <span className="absolute text-white font-bold text-sm lg:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10 tracking-wide text-center px-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                  {prog.name}
                </span>
                {/* Subtle orbital path glow */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors duration-300 mix-blend-overlay"></div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProgramsShowcase;
