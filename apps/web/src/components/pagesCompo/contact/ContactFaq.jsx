import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MapPin, Handshake, Users, GraduationCap, Bell } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How can I become a volunteer with Unnati Society?",
    answer: "You can become a volunteer by filling out the application form on our 'Join Us' page. Our team reviews applications periodically and will reach out to you with upcoming opportunities.",
    icon: <Users size={18} />
  },
  {
    id: 2,
    question: "How can I stay updated about your events and initiatives?",
    answer: "Follow us on our social media handles or subscribe to our newsletter. We regularly post updates about upcoming workshops, events, and awareness programs.",
    icon: <Bell size={18} />
  },
  {
    id: 3,
    question: "Can my school or college invite Unnati Society for a session?",
    answer: "Absolutely! We regularly conduct sessions in schools and colleges. Reach out to us via the contact form above, selecting 'School' or 'College' as your role, and we will get back to you to schedule a visit.",
    icon: <GraduationCap size={18} />
  },
  {
    id: 4,
    question: "Where is Unnati Society based?",
    answer: "We are an institute outreach activity based out of the Indian Institute of Information Technology (IIIT), Bhagalpur, Bihar.",
    icon: <MapPin size={18} />
  },
  {
    id: 5,
    question: "Do you collaborate with other organizations or NGOs?",
    answer: "Yes, we strongly believe in the power of collaboration. We are always open to partnering with organizations that share our vision of empowering students.",
    icon: <Handshake size={18} />
  },
  {
    id: 6,
    question: "How can I partner with Unnati Society?",
    answer: "To discuss partnership opportunities, please email us directly at partnerships@unnatisociety.org or use the contact form selecting 'Partner' as your role.",
    icon: <Handshake size={18} />
  }
];

const ContactFaq = () => {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-8 lg:py-10">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[2px] w-6 bg-[#2563EB]"></div>
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider">FAQs</span>
            <div className="h-[2px] w-6 bg-[#2563EB]"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-3">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-3 lg:gap-4">
          {faqs.map((faq) => (
            <motion.div 
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: faq.id * 0.1 }}
              className="bg-white"
            >
              <button 
                onClick={() => toggleOpen(faq.id)}
                className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${openId === faq.id ? 'border-[#2563EB] shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'} flex items-start gap-4`}
              >
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${openId === faq.id ? 'bg-blue-100 text-[#2563EB]' : 'bg-gray-100 text-gray-500'}`}>
                  {faq.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold pr-4 text-sm md:text-base leading-snug ${openId === faq.id ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                    {faq.question}
                  </h4>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={`shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-[#2563EB]' : 'text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ContactFaq;
