import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Map as MapIcon, PhoneCall } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
const ContactLocation = () => {

  return (
    <section className="w-full bg-white py-8 lg:py-10">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[2px] w-6 bg-[#2563EB]"></div>
            <span className="text-[#2563EB] font-bold text-[10px] uppercase tracking-wider">Our Location</span>
            <div className="h-[2px] w-6 bg-[#2563EB]"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-3">Visit Our Campus</h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            We welcome schools, organizations, volunteers, and collaborators to connect with us.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch h-auto lg:h-[300px]">
          
          {/* Left Side - Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[35%] flex flex-col justify-between"
          >
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 h-full flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Navigation size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-0.5">Indian Institute of Information Technology, Bhagalpur</h4>
                  <p className="text-[12px] text-gray-600 leading-tight">
                    Sabour, Bhagalpur<br/>
                    Bihar 813210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-0.5">Phone</h4>
                  <a href="tel:+919334117404" className="text-[12px] text-gray-600 hover:text-[#2563EB] transition-colors">+91 7348145325</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-0.5">Email</h4>
                  <a href="mailto:contact@unnatisociety.org" className="text-[12px] text-gray-600 hover:text-[#2563EB] transition-colors">unnati.ir@iiitbh.ac.in</a>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-sm mb-0.5">Office Hours</h3>
                  <p className="text-[12px] text-gray-600 leading-tight">Monday - Saturday<br/>9:00 AM – 6:00 PM</p>
                </div>
              </div>



            </div>
          </motion.div>

          {/* Right Side - Google Map */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[65%] flex flex-col gap-3"
          >
            <div className="w-full h-[300px] lg:h-full rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative bg-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.324391264627!2d87.04230191501063!3d25.25964898386689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f049d560c04297%3A0xcab21fc69ba87de!2sIndian%20Institute%20of%20Information%20Technology%2C%20Bhagalpur!5e0!3m2!1sen!2sin!4v1689255018693!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="IIIT Bhagalpur Campus Map"
              ></iframe>
            </div>
            {/* Under Map Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <a href="https://maps.google.com/?q=IIIT+Bhagalpur" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <MapIcon className="text-[#2563EB]" size={18} />
                Open in Google Maps
              </a>
              <a href="https://www.google.com/maps/dir//Indian+Institute+of+Information+Technology+Bhagalpur" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <Navigation className="text-[#2563EB]" size={18} />
                Get Directions
              </a>
              <a href="tel:+919334117404" className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <PhoneCall className="text-[#2563EB]" size={18} />
                Call Now
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactLocation;
