import React from 'react';
import { MessagesSquare, Mail } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ContactCta = () => {
  return (
    <section className="w-full bg-[#F8FAFC] pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-2xl bg-gradient-to-r from-[#041C5C] to-[#0A2D88] overflow-hidden relative shadow-lg flex flex-col md:flex-row items-center justify-between p-6 md:p-8"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSIjZmZmZmZmIiAvPgo8L3N2Zz4=')]"></div>

          <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-center md:items-start text-center md:text-left relative z-10">
            <div className="w-14 h-14 mb-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <MessagesSquare className="text-blue-300" size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
              Let's Build a Better Tomorrow, <span className="text-[#FBBF24]">Together.</span>
            </h2>
            <p className="text-blue-100/90 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Your ideas, partnerships, and support can create a lasting impact in the lives of students and communities.
            </p>
          </div>

          <div className="w-full md:w-auto mt-0 relative z-10 flex shrink-0">
            <a 
              href="mailto:partnerships@unnatisociety.org" 
              className="flex items-center gap-2 px-6 py-3 bg-[#FBBF24] hover:bg-yellow-500 text-[#0F172A] font-bold rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20 group"
            >
              <Mail size={18} />
              Partner With Us
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactCta;
