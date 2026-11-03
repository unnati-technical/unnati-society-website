import React from 'react';

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonial1 = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const quoteIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const nameVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full bg-white pt-4 pb-8 md:pt-8 md:pb-12 px-6 md:px-12 lg:px-20 overflow-hidden flex justify-center">
      <motion.div 
        className="max-w-300 w-full flex flex-col md:flex-row items-start relative mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Left Quote Icon */}
        <motion.div 
          variants={quoteIconVariants}
          className="text-[#4285F4] text-xl md:text-2xl opacity-40 shrink-0 md:mr-6 mb-3 md:mb-0 mt-1"
        >
          <FaQuoteLeft />
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 border-l-[3px] border-[#4285F4] pl-5 md:pl-8 relative pb-6 md:pb-0">
          <motion.p 
            variants={textVariants}
            className="text-gray-600 text-sm md:text-base lg:text-[18px] leading-[1.6] font-medium mb-4 pr-0 md:pr-12"
          >
            "I always wanted to learn computers but never got the opportunity. When Dheeraj Sir, Shivam Sir, and Srishti Ma'am from Unnati (DigiXplore) came to our school, they made learning so easy and fun! Now, I can use MS Word and PowerPoint, and I feel more confident about my future. Thank you, Unnati, for bringing digital education to us!"
          </motion.p>
          
          <motion.div variants={nameVariants} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[#3B82F6] text-sm md:text-base lg:text-lg font-bold tracking-wide">Madhuri Kumari,</span>
            <span className="text-gray-500 text-xs md:text-sm font-medium">Student Class 9th</span>
          </motion.div>

          {/* Right Quote Icon */}
          <motion.div 
            variants={quoteIconVariants}
            className="absolute -bottom-2 right-0 md:-right-2 lg:-right-4 text-[#4285F4] text-xl md:text-2xl opacity-40"
          >
            <FaQuoteRight />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonial1;