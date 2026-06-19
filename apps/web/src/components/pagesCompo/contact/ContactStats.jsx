import React, { useState, useEffect, useRef } from 'react';
import { School, GraduationCap, Users, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ end, duration = 2000, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        
        setCount(Math.floor(end * easeOutQuart));
        
        if (progress < duration) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const ContactStats = () => {
  return (
    <section className="w-full bg-[#F8FAFC] py-4 pb-6">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] p-4 lg:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 divide-x-0 lg:divide-x divide-gray-100">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center px-2"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3">
                <School size={20} />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mb-0.5">
                <Counter end={100} />
              </h3>
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Schools Connected</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center px-2"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mb-0.5">
                <Counter end={25000} />
              </h3>
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Students Impacted</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-1">
                <Counter end={500} />
              </h3>
              <p className="text-sm font-medium text-gray-500">Active Volunteers</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-1">
                <Counter end={250} />
              </h3>
              <p className="text-sm font-medium text-gray-500">Programs Conducted</p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactStats;
