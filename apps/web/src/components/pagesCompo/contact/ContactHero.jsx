import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ShieldCheck } from 'lucide-react';
import { imagekitImage2 } from '../../../utils/imagekit';

const ContactHero = () => {
  return (
    <section className="relative w-full bg-[#041C5C] pt-16 pb-8 lg:pt-20 lg:pb-10 overflow-hidden">
      {/* Background Particles/Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FBBF24]/10 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-[2px] w-8 bg-[#FBBF24]"></div>
              <span className="text-[#FBBF24] uppercase tracking-[0.15em] font-bold text-xs">GET IN TOUCH</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3"
            >
              We'd Love to Hear <br/>From <span className="text-[#FBBF24]">You!</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base text-blue-100/90 leading-relaxed mb-6 max-w-xl"
            >
              Whether you're a student, educator, organization, or change-maker, we're here to connect and collaborate for a better tomorrow.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
            >
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg shadow-lg">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Quick Response</h4>
                  <p className="text-[9px] text-blue-200 uppercase tracking-wider">Within 24-48 Hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg shadow-lg">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Support</h4>
                  <p className="text-[9px] text-blue-200 uppercase tracking-wider">Mon - Sat, 9AM - 6PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg shadow-lg">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">For Everyone</h4>
                  <p className="text-[9px] text-blue-200 uppercase tracking-wider">We're here to help</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[200px] lg:h-[280px]"
          >
            <div className="absolute inset-0 rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/50 group">
              <div className="absolute inset-0 bg-[#041C5C]/30 z-10 transition-opacity duration-500 group-hover:bg-[#041C5C]/10"></div>
              <img loading="eager" fetchpriority="high"
                src={imagekitImage2("contact_vzejk5") || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"} 
                alt="IIIT Bhagalpur Campus" 
                className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-dots-white/20 z-0"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-dots-white/20 z-0"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
