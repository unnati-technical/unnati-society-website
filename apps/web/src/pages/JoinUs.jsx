import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';

import { 
  FiUsers, FiBookOpen, FiBriefcase, FiHeart, 
  FiCheckCircle, FiArrowRight, FiTarget, FiStar, FiAward, FiMessageSquare
} from 'react-icons/fi';
import VolunteerModal from '../components/common/VolunteerModal';
import ExploreOpportunitiesModal from '../components/common/ExploreOpportunitiesModal';

const JoinUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="w-full bg-[#F8FAFC] font-sans overflow-x-hidden">
      <Navbar />
      <div className="sticky top-0 z-50">
        <NavUnn />
      </div>

      {/* SECTION 1 - HERO */}
      <section className="relative w-full bg-white pt-16 pb-24 px-6 lg:px-16 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-12 left-[40%] w-32 h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="flex flex-col items-start z-10"
          >
            <motion.div variants={fadeUpVariant} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-blue-600"></div>
              <span className="text-sm font-bold tracking-widest text-gray-800 uppercase">Join Us</span>
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-5xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.1] mb-6">
              Be the Change.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Build a Better Tomorrow.
              </span>
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Unnati Society is a community of passionate individuals working together to empower students, promote education, and create meaningful social impact.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] hover:-translate-y-1">
                <FiUsers size={18} /> I Want to Volunteer
              </button>
              <button onClick={() => setIsExploreModalOpen(true)} className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 hover:border-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md">
                <FiBookOpen size={18} /> Explore Opportunities
              </button>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <FiCheckCircle className="text-green-500" />
              Join 500+ changemakers making a difference.
            </motion.div>
          </motion.div>

          {/* Right Column (Redesigned Image Frame) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] lg:h-[600px] z-10 flex items-center justify-center"
          >
            {/* Background Blob/Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] bg-blue-100 rounded-full blur-3xl opacity-60"></div>
            
            {/* Decorative organic shape */}
            <div className="absolute -top-4 right-10 w-24 h-24 pointer-events-none opacity-40">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#FBBF24" strokeWidth="4" d="M47.7,-57.2C59.5,-45.3,65.3,-26.2,66.6,-7.4C68,11.3,64.8,29.6,54.7,43.2C44.6,56.8,27.5,65.6,9.1,68.4C-9.3,71.2,-29.1,68,-43.3,56.5C-57.5,45,-66.2,25.2,-67.2,5.2C-68.2,-14.8,-61.6,-34.9,-48.9,-46.8C-36.2,-58.7,-18.1,-62.4,-0.1,-62.3C17.9,-62.2,35.8,-69.1,47.7,-57.2Z" transform="translate(100 100)" />
              </svg>
            </div>

            {/* Image 1 (Large Main) */}
            <div className="absolute top-4 right-0 lg:right-8 w-3/4 h-[80%] rounded-[2rem] rounded-tl-[6rem] rounded-br-[6rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-white z-10">
              <img 
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Unnati Volunteers" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Image 2 (Small Overlapping) */}
            <div className="absolute bottom-16 left-0 lg:left-4 w-[55%] h-[45%] rounded-[2rem] rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-4 border-white z-20">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students learning" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 right-4 lg:-right-4 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center gap-4 w-[260px] z-30 border border-white/50"
            >
              <div className="flex -space-x-3 shrink-0">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="volunteer" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="volunteer" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-inner">
                  500+
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-[#0F172A] text-sm leading-tight">Active Volunteers</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[11px] text-gray-500 font-medium">Making an impact</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - WAYS TO GET INVOLVED */}
      <section className="py-24 px-6 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">Ways to Get Involved</h2>
            <p className="text-gray-600 text-lg">Whether you have time, skills, or resources to share, there's a place for you in our journey.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Card 1 */}
            <motion.div variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiHeart size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Volunteer</h3>
              <p className="text-gray-600 mb-8 flex-grow">Give your time and skills to educational and social initiatives.</p>
              <a href="#" className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Apply Now <FiArrowRight />
              </a>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiBookOpen size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Mentor</h3>
              <p className="text-gray-600 mb-8 flex-grow">Guide and inspire students to help them achieve their dreams.</p>
              <a href="#" className="text-orange-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Join as Mentor <FiArrowRight />
              </a>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiBriefcase size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Partner</h3>
              <p className="text-gray-600 mb-8 flex-grow">Collaborate with us as an organization or institution to create larger impact.</p>
              <a href="#" className="text-purple-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Partner With Us <FiArrowRight />
              </a>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiStar size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Donate</h3>
              <p className="text-gray-600 mb-8 flex-grow">Your contribution helps us reach more students and communities.</p>
              <a href="#" className="text-green-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Donate Now <FiArrowRight />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - WHY JOIN UNNATI */}
      <section className="py-24 px-6 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -left-6 -bottom-6 w-24 h-24 opacity-30" style={{ backgroundImage: 'radial-gradient(#2563EB 2px, transparent 2px)', backgroundSize: '12px 12px' }}></div>
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Volunteers smiling" 
              className="rounded-3xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why Join Unnati Society?
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-gray-600 text-lg mb-10 leading-relaxed">
              Be a part of a purpose-driven community and grow while creating lasting impact.
            </motion.p>

            <div className="space-y-8">
              {[
                { title: "Make a Real Impact", desc: "Contribute to meaningful educational and social initiatives.", icon: <FiTarget size={20} /> },
                { title: "Learn & Grow", desc: "Enhance leadership, communication, and teamwork skills.", icon: <FiBookOpen size={20} /> },
                { title: "Network & Collaborate", desc: "Work with students, professionals, and institutions.", icon: <FiUsers size={20} /> },
                { title: "Certificates & Recognition", desc: "Receive certificates, recommendation letters, and recognition.", icon: <FiAward size={20} /> }
              ].map((item, index) => (
                <motion.div key={index} variants={fadeUpVariant} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 4 - TESTIMONIALS */}
      <section className="py-24 px-6 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">Voices of Our Changemakers</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { text: "Volunteering with Unnati has been a life-changing experience. It feels amazing to contribute to students' growth.", name: "Riya Singh", role: "Volunteer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { text: "Mentoring students through Unnati has not only helped them but also shaped me as a better leader.", name: "Ayush Kumar", role: "Mentor", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { text: "Partnering with Unnati Society has been an incredible journey of collaboration and positive impact.", name: "Neha Verma", role: "Partner Organization", img: "https://randomuser.me/api/portraits/women/68.jpg" }
            ].map((testimonial, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative border border-gray-100">
                <div className="text-blue-500 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.41 14H11V3H21V14.081L18.064 21H14.017ZM3 21L5.393 14H0V3H10V14.081L7.049 21H3Z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-8 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-100" />
                  <div>
                    <h5 className="font-bold text-[#0F172A]">{testimonial.name}</h5>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Slider Indicators Placeholder */}
          <div className="flex justify-center gap-2 mt-10">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - HOW TO GET STARTED */}
      <section className="py-24 px-6 lg:px-16 bg-gradient-to-br from-[#0F172A] to-blue-900 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How to Get Started</h2>
            <p className="text-blue-100 text-lg">Joining us is simple. Take the first step today!</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-start md:items-center relative"
          >
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-blue-800 z-0"></div>

            {[
              { num: "01", title: "Choose Your Path", desc: "Volunteer, mentor, partner or donate.", icon: <FiTarget size={24} /> },
              { num: "02", title: "Fill the Form", desc: "Submit your details online.", icon: <FiBookOpen size={24} /> },
              { num: "03", title: "Our Team Connects", desc: "We'll reach out to you within 24-48 hours.", icon: <FiMessageSquare size={24} /> },
              { num: "04", title: "Start Your Journey", desc: "Begin making a meaningful impact.", icon: <FiStar size={24} /> }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-12 md:mb-0 group">
                <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="text-blue-400 font-bold mb-2">{step.num}</div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-blue-100 text-sm max-w-[200px]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 - FINAL CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto bg-white rounded-[32px] p-10 md:p-16 shadow-xl border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6 lg:w-3/5">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                <FiHeart size={36} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-3">Ready to Make a Difference?</h2>
                <p className="text-gray-600 text-lg">Join Unnati Society and be part of something bigger than yourself.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                I Want to Volunteer
              </button>
              <button onClick={() => setIsExploreModalOpen(true)} className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 hover:border-blue-600 px-8 py-4 rounded-xl font-bold transition-all shadow-sm whitespace-nowrap">
                Explore Opportunities
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Volunteer Application Modal */}
      <VolunteerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Explore Opportunities Modal */}
      <ExploreOpportunitiesModal 
        isOpen={isExploreModalOpen} 
        onClose={() => setIsExploreModalOpen(false)} 
        onApplyClick={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default JoinUs;
