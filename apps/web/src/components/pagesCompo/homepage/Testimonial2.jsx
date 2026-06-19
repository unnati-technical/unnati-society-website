import React from 'react';


const Testimonial2 = () => {
  return (
    <section className="w-full bg-white pb-6 pt-2 md:pt-4 overflow-hidden flex justify-center">
      <div className="max-w-[1200px] w-full px-6 lg:px-[80px] mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-start relative w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120, damping: 18 }}
        >
          {/* Left Quote */}
          <div className="shrink-0 flex items-start gap-3 md:gap-4 mr-3 md:mr-4">
            <span className="text-[#3B82F6] font-serif leading-none mt-1 text-4xl md:text-5xl opacity-60">“</span>
            <div className="hidden md:block w-[3px] bg-[#3B82F6] mt-3" style={{ height: "100px" }}></div>
          </div>

          {/* Testimonial Content Area */}
          <div className="flex-1 relative pt-1 md:pt-2">
            {/* Blue line for mobile */}
            <div className="md:hidden absolute left-[-16px] top-4 w-[3px] bg-[#3B82F6] h-full"></div>
            
            <p className="text-gray-600 font-medium text-base md:text-lg" style={{ lineHeight: "1.6", maxWidth: "1000px" }}>
              I had some idea about becoming an IPS officer, but the path felt confusing. The NETRITVA session by Unnati gave me a clear roadmap, what steps to take, which exams to prepare for, and how to stay focused. Now, I feel much more confident in my journey. Thank you, Unnati, for showing me the way.
            </p>
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="text-[#3B82F6] font-bold text-base md:text-lg tracking-wide">Eram Fatima,</span>
              <span className="text-gray-500 text-sm md:text-base font-medium">Student Class 12th</span>
            </div>

            {/* Closing Quote */}
            <div className="absolute right-0 -bottom-6 hidden md:block">
              <span className="text-[#3B82F6] font-serif leading-none opacity-60 text-4xl md:text-5xl">”</span>
            </div>
            {/* Closing Quote for mobile */}
            <div className="md:hidden mt-2 text-right">
              <span className="text-[#3B82F6] font-serif leading-none opacity-60 text-4xl md:text-5xl">”</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial2;