import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';
import {
  FiMapPin, FiCalendar, FiBookOpen, FiUsers,
  FiCheckCircle, FiArrowRight, FiMonitor, FiClock,
  FiBriefcase, FiAward, FiShield, FiHeart, FiLayers
} from 'react-icons/fi';
import { BiBuildingHouse, BiChalkboard, BiTargetLock } from 'react-icons/bi';
import { FaHandshake } from 'react-icons/fa';
import CampusVisitModal from '../components/common/CampusVisitModal';
import InviteUsModal from '../components/common/InviteUsModal';
import PartnerModal from '../components/pagesCompo/outreach/PartnerModal';

import AnimatedCounter from '../components/common/AnimatedCounter';

const Outreach = () => {
  const [isCampusVisitModalOpen, setIsCampusVisitModalOpen] = useState(false);
  const [isInviteUsModalOpen, setIsInviteUsModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const lineRef = useRef(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!lineRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLineVisible(true);
      }
    }, { threshold: 0.5 });

    observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] font-sans text-[#0F172A]">
      <Navbar />
      <NavUnn />

      {/* SECTION 1: HERO (Matched exactly to Target Image 2) */}
      <section className="w-full bg-white relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 font-sans">

        {/* Very subtle background light blue blob for the whole section */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between w-full relative z-10">

          {/* Left Column - Text and CTA */}
          <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col items-start pr-0 lg:pr-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-3 inter-font text-sm font-semibold tracking-wider uppercase mb-6">
              <span className="text-gray-800">HOME</span>
              <span className="text-gray-400">/</span>
              <span className="text-[#4285F4]">OUTREACH</span>
            </div>

            {/* Main Heading */}
            <h1 className="oswald-font-3 text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight tracking-tight text-black mb-4">
              Outreach &<br />
              <span className="text-[#4285F4]">Collaborations</span>
            </h1>

            {/* Decorative Yellow Line */}
            <div className="w-40 h-1.5 bg-yellow-400 rounded-full mb-6"></div>

            {/* Description */}
            <p className="inter-font text-base text-gray-700 leading-relaxed font-medium mb-8 max-w-lg">
              Unnati Society partners with schools, colleges, and institutions to deliver digital education, career guidance, leadership development, and social awareness programs for students across underserved communities.
            </p>



            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsCampusVisitModalOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl oswald-font-3 font-bold tracking-wide uppercase transition-all shadow-lg shadow-blue-600/20 text-sm">
                  <FiCalendar size={16} /> Book a Campus Visit
                </button>
                <button onClick={() => setIsInviteUsModalOpen(true)} className="flex items-center justify-center gap-2 bg-[#FFC107] hover:bg-[#FFB300] text-black px-6 py-3.5 rounded-xl oswald-font-3 font-bold tracking-wide uppercase transition-all shadow-lg shadow-yellow-400/20 text-sm">
                  <BiBuildingHouse size={16} /> Invite Us To Your School
                </button>
              </div>
              <button onClick={() => setIsPartnerModalOpen(true)} className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 px-6 py-3.5 rounded-xl oswald-font-3 font-bold tracking-wide uppercase transition-all text-sm shadow-sm">
                <FaHandshake size={16} className="text-gray-400" /> Partner with Us
              </button>
            </div>

            {/* Clock Note */}
            <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
              <FiClock size={16} />
              <span>We typically respond within <span className="text-blue-600 font-bold">24–48 hours.</span></span>
            </div>

          </div>

          {/* Right Column - Image Collage (Fixed Aspect, Scale Transform for Responsiveness) */}
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-end mt-16 lg:mt-0" style={{ minHeight: '500px' }}>
            <div className="shrink-0" style={{ position: 'relative', width: '540px', height: '580px', transformOrigin: 'center right', transform: 'scale(0.85)' }}>

              {/* Blue Dot Grid - Top Right */}
              <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '128px', height: '128px', backgroundImage: 'radial-gradient(#3B82F6 2.5px, transparent 2.5px)', backgroundSize: '16px 16px', opacity: 0.3, zIndex: 0 }}></div>

              {/* Main Left Image (Teacher) */}
              <div
                className="transition-all duration-300 hover:scale-[1.03] hover:!z-50 cursor-pointer"
                style={{ position: 'absolute', right: 200, top: '60px', width: '450px', height: '400px', backgroundColor: '#E2E8F0', borderRadius: '24px', overflow: 'hidden', border: '8px solid white', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', zIndex: 10 }}
              >
                <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782473411/outreach/outreach_2.jpg" alt="Teacher interacting with students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Top Right Image (Girls) */}
              <div
                className="transition-all duration-300 hover:scale-[1.03] hover:!z-50 cursor-pointer"
                style={{ position: 'absolute', right: '10px', top: '10px', width: '360px', height: '260px', backgroundColor: '#E2E8F0', borderRadius: '24px', overflow: 'hidden', border: '6px solid white', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', zIndex: 20 }}
              >
                <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782473407/outreach/outreach_1.jpg" alt="Students using laptops" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Bottom Right Image (Boys) */}
              <div
                className="transition-all duration-300 hover:scale-[1.03] hover:!z-50 cursor-pointer"
                style={{ position: 'absolute', right: '10px', top: '220px', width: '300px', height: '280px', backgroundColor: '#E2E8F0', borderRadius: '24px', overflow: 'hidden', border: '6px solid white', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', zIndex: 20 }}
              >
                <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782473413/outreach/outreach_3.jpg" alt="Group of students collaborating" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Blue Impact Box */}
              <div style={{ position: 'absolute', bottom: '-10px', right: '40px', width: '380px', backgroundColor: '#2563EB', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(37,99,235,0.3)', zIndex: 30 }}>
                <div style={{ width: '52px', height: '52px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                  <BiTargetLock size={26} color="#2563EB" />
                </div>
                <div style={{ color: 'white' }}>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: '15px', lineHeight: 1.3 }}>Creating opportunities.</p>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: '15px', lineHeight: 1.3 }}>Building a better tomorrow.</p>
                </div>
              </div>

              {/* Yellow Scribble - Bottom Right */}
              <svg style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '100px', height: '100px', color: '#FBBF24', zIndex: 40 }} viewBox="0 0 100 100" fill="none">
                <path d="M10 80 Q 30 50 50 70 T 90 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M15 90 Q 40 60 60 80 T 95 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>

            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full px-4 lg:px-16 relative z-40 pb-20 bg-transparent -mt-12 lg:-mt-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Stat Card 1 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-[68px] h-[68px] rounded-[20px] bg-[#FFF8E1] text-[#FFB300] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FFC107] group-hover:text-black group-hover:shadow-[0_10px_30px_rgba(255,193,7,0.3)] transition-all duration-300">
              <FiUsers size={32} />
            </div>
            <h3 className="oswald-font-3 text-5xl font-extrabold text-[#0F172A] mb-2 tracking-tight group-hover:text-[#FFB300] transition-colors"><AnimatedCounter value={4000} suffix="+" /><span className="text-blue-600"></span></h3>
            <p className="inter-font text-[13px] font-bold text-gray-500 uppercase tracking-widest">Students Impacted</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-[68px] h-[68px] rounded-[20px] bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all duration-300">
              <BiChalkboard size={32} />
            </div>
            <h3 className="oswald-font-3 text-5xl font-extrabold text-[#0F172A] mb-2 tracking-tight group-hover:text-blue-600 transition-colors"><AnimatedCounter value={360} suffix="+" /><span className="text-[#FFC107]"></span></h3>
            <p className="inter-font text-[13px] font-bold text-gray-500 uppercase tracking-widest">Sessions Conducted</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-[68px] h-[68px] rounded-[20px] bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all duration-300">
              <BiBuildingHouse size={32} />
            </div>
            <h3 className="oswald-font-3 text-5xl font-extrabold text-[#0F172A] mb-2 tracking-tight group-hover:text-blue-600 transition-colors"><AnimatedCounter value={20} suffix="+" /><span className="text-[#FFC107]"></span></h3>
            <p className="inter-font text-[13px] font-bold text-gray-500 uppercase tracking-widest">Schools Reached</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-[68px] h-[68px] rounded-[20px] bg-[#FFF8E1] text-[#FFB300] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FFC107] group-hover:text-black group-hover:shadow-[0_10px_30px_rgba(255,193,7,0.3)] transition-all duration-300">
              <FiLayers size={32} />
            </div>
            <h3 className="oswald-font-3 text-5xl font-extrabold text-[#0F172A] mb-2 tracking-tight group-hover:text-[#FFB300] transition-colors"><AnimatedCounter value={6} suffix="+" /><span className="text-blue-600"></span></h3>
            <p className="inter-font text-[13px] font-bold text-gray-500 uppercase tracking-widest">Programs Initiated</p>
          </div>

        </div>
      </section>


      {/* SECTION 3: CAMPUS VISIT DETAILS */}
      <section className="w-full bg-[#F8FAFC] py-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-600 text-white font-bold w-12 h-12 flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-blue-600/30">01</div>
            <h2 className="text-4xl font-extrabold mb-6">Campus Visit to IIIT Bhagalpur</h2>
            <p className="text-gray-600 text-lg mb-8">
              Provide students with an opportunity to explore higher education, interact with college students, and understand future career pathways.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mb-10">
              <div className="flex-1">
                <h4 className="font-bold text-[#0F172A] mb-4">Student Benefits</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Campus Tour</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Interaction with IIIT Students</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Career Roadmap Session</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Scholarship Awareness</li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0F172A] mb-4">Ideal Audience</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Class 9–12 Students</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Government Schools</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Private Schools</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Coaching Groups</li>
                </ul>
              </div>
            </div>

            <button onClick={() => setIsCampusVisitModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 w-fit">
              Request Campus Visit <FiArrowRight />
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex gap-4 h-[500px]">
            <div className="w-2/3 h-full rounded-3xl overflow-hidden shadow-xl hover:scale-101 hover: duration-500">
              <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782476058/outreach_5_pegoeh.jpg" alt="Campus" className="w-full h-full object-cover" />
            </div>
            <div className="w-1/3 flex flex-col gap-4 h-full">
              <div className="flex-1 rounded-3xl overflow-hidden shadow-xl hover:scale-101 hover: duration-500">
                <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782476427/outreach_campus_visit3_zii4fj.jpg" alt="Students" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden shadow-xl hover:scale-101 hover: duration-500">
                <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782476427/outreach_campus_visit1_i1beoh.jpg" alt="Tour" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INVITE UNNATI */}
      <section className="w-full bg-white py-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-[#FBBF24] text-[#0F172A] font-bold w-12 h-12 flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-yellow-400/30">02</div>
            <h2 className="text-4xl font-extrabold mb-6">Invite Unnati To Your Campus</h2>
            <p className="text-gray-600 text-lg mb-8">
              We bring engaging workshops and interactive learning experiences directly to students.
            </p>

            <h4 className="font-bold text-[#0F172A] mb-4">Workshop Topics</h4>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Digital Literacy', 'Career Guidance', 'Scholarships', 'Women Hygiene', 'Cleanliness', 'Motivation', 'Study Skills', 'Communication Skills', 'Leadership', 'Cyber Safety'].map((topic, i) => (
                <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold text-sm rounded-full border border-blue-100">
                  {topic}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600"><FiClock size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm">60–120 Minutes</h5>
                  <p className="text-xs text-gray-500 mt-1">Flexible session duration</p>
                </div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-yellow-500"><BiTargetLock size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm">Interactive Activities</h5>
                  <p className="text-xs text-gray-500 mt-1">Hands-on learning</p>
                </div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 flex items-start gap-4 sm:col-span-2">
                <div className="p-3 bg-white rounded-lg shadow-sm text-green-500"><FiUsers size={24} /></div>
                <div>
                  <h5 className="font-bold text-sm">Q&A + Feedback</h5>
                  <p className="text-xs text-gray-500 mt-1">Direct student interaction and doubt clearing</p>
                </div>
              </div>
            </div>

            <button onClick={() => setIsInviteUsModalOpen(true)} className="mt-8 bg-[#FBBF24] hover:bg-yellow-500 text-[#0F172A] font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-yellow-400/30 flex items-center gap-2 w-fit">
              Invite Us <FiArrowRight />
            </button>

          </div>

          <div className="w-full lg:w-1/2">
            <div className="w-full h-[500px] rounded-[32px] overflow-hidden shadow-2xl relative">
              <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782475437/outreach_4_ju0fxm.jpg" alt="Classroom Workshop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COLLABORATE */}
      <section className="w-full bg-[#F8FAFC] py-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-600 text-white font-bold w-12 h-12 flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-blue-600/30">03</div>
            <h2 className="text-4xl font-extrabold mb-6">Collaborate / Partner With Unnati</h2>
            <p className="text-gray-600 text-lg mb-8">
              Create long-term educational impact through shared resources and meaningful partnerships.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mb-10">
              <div className="flex-1">
                <h4 className="font-bold text-[#0F172A] mb-4">Collaboration Types</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Joint Outreach Drives</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Awareness Campaigns</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Volunteer Engagement</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Resource Support</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> Mentorship Programs</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-blue-500 mr-3" /> School Adoption Model</li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0F172A] mb-4">Who Can Partner</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Schools & Colleges</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Partner NGOs</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Alumni Networks</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> CSR Teams & Corporates</li>
                  <li className="flex items-center text-gray-600 font-medium"><FiCheckCircle className="text-[#FBBF24] mr-3" /> Government Departments</li>
                </ul>
              </div>
            </div>

            <button onClick={() => setIsPartnerModalOpen(true)} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2">
              Partner With Us <FiArrowRight />
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center h-[400px]">
            <div className="w-full h-full max-w-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-200 shadow-lg shadow-gray-50">
              <img
                src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782397307/unnati_assets/yx21ld5ujylzkawjvc8i.webp"
                alt="Outreach"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW OUTREACH WORKS */}
      <section className="w-full bg-white py-24 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-16 text-[#0F172A]">How Outreach Works</h2>

          <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-4">
            {/* Connecting Line */}
            <div ref={lineRef} className="hidden md:block absolute top-[40px] left-[8%] right-[8%] h-1 bg-gray-200 z-0 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-[2000ms] ease-in-out"
                style={{ width: lineVisible ? '100%' : '0%' }}
              ></div>
            </div>

            {[
              { step: 1, title: 'Submit Request', icon: <FiMonitor size={28} /> },
              { step: 2, title: 'Connect & Discuss', icon: <FiUsers size={28} /> },
              { step: 3, title: 'Approval', icon: <FiCheckCircle size={28} /> },
              { step: 4, title: 'Schedule', icon: <FiCalendar size={28} /> },
              { step: 5, title: 'Visit', icon: <BiBuildingHouse size={28} /> },
              { step: 6, title: 'Feedback', icon: <FiHeart size={28} /> },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center bg-white px-2 mb-8 md:mb-0 z-10 w-full md:w-auto">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg relative transition-all duration-500 ease-out ${lineVisible ? 'bg-blue-50 text-blue-600 scale-100' : 'bg-gray-100 text-gray-400 scale-95'}`}
                  style={{ transitionDelay: lineVisible ? `${index * 400}ms` : '0ms' }}
                >
                  {item.icon}
                </div>
                <h4
                  className={`font-bold text-sm md:text-base max-w-[120px] mx-auto leading-tight transition-all duration-500 ${lineVisible ? 'text-[#0F172A]' : 'text-gray-400'}`}
                  style={{ transitionDelay: lineVisible ? `${index * 400}ms` : '0ms' }}
                >
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* The Impact Footprint section has been moved to directly below the hero per the image layout */}

      {/* SECTION 9: RECENT HIGHLIGHTS */}
      <section className="w-full bg-white py-24 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-[#0F172A]">Recent Outreach Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://res.cloudinary.com/dyubgh5k4/image/upload/v1782480666/rangchakra_i1pus7.png",
                title: "Rangchakra: Art & Fun Event",
                loc: "Babupur, Bhagalpur",
                date: "26 Jan 2026",
                place: "Bhagalpur, Bihar"
              },
              {
                img: "https://res.cloudinary.com/dyubgh5k4/image/upload/v1782480509/St_Francis_visit_xxn8ca.jpg",
                title: "St. Francis Students Visit to IIIT Bhagalpur",
                loc: "IIIT Bhagalpur",
                date: "27 Jan 2026",
                place: "Bhagalpur, Bihar"
              },
              {
                img: "https://res.cloudinary.com/dyubgh5k4/image/upload/v1782480664/enyugma_1_qlgu4q.png",
                title: "Enyugma Fundraising Stall",
                loc: "IIIT Bhagalpur",
                date: "19 Feb 2026",
                place: "Bhagalpur, Bihar"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer group">
                <div className="h-56 overflow-hidden">
                  <img loading="lazy" src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="font-bold text-gray-500 text-sm mb-2 uppercase tracking-wide">{item.loc}</h4>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-4 flex-grow">{item.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 font-medium pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1"><FiCalendar /> {item.date}</span>
                    <span className="flex items-center gap-1"><FiMapPin /> {item.place}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: INSTITUTIONS */}
      <section className="w-full bg-[#F8FAFC] py-16 px-0 overflow-hidden">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-500 uppercase tracking-widest px-6">Institutions We Worked With</h2>

        {/* Infinite scroll marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #F8FAFC, transparent)' }}></div>
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #F8FAFC, transparent)' }}></div>

          <div className="flex w-max" style={{ animation: 'marquee-scroll 30s linear infinite' }}>
            {/* Two identical sets for seamless loop */}
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex items-center gap-12 px-8">
                {[
                  { icon: <FiShield size={30} />, name: 'JNV Katihar' },
                  { icon: <FiShield size={30} />, name: 'JNV Kishanganj' },
                  { icon: <FiAward size={30} />, name: 'KV Araria' },
                  { icon: <FiAward size={30} />, name: 'KV Purnia' },
                  { icon: <FiAward size={30} />, name: 'Kendriya Vidyalaya Godda' },
                  { icon: <BiBuildingHouse size={30} />, name: 'Mount Assisi School' },
                  { icon: <BiBuildingHouse size={30} />, name: 'DPS Bhagalpur' },
                  { icon: <FiBookOpen size={30} />, name: 'Rajkiya Adarsh Uchh Vidyalaya' },
                  { icon: <FiBookOpen size={30} />, name: 'Uchh Vidyalaya Kumaitha' },
                  { icon: <FiHeart size={30} />, name: 'St. Francis School, Deoghar' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-500 font-semibold text-xl whitespace-nowrap hover:text-blue-600 hover:opacity-100 opacity-70 transition-all cursor-default select-none">
                    <span className="text-blue-400">{item.icon}</span>
                    <span>{item.name}</span>
                    <span className="ml-10 text-gray-300 text-xl">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <style>{`
            @keyframes marquee-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="w-full py-24 px-6 lg:px-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
            <FaHandshake size={40} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#0F172A]">Let's Work Together</h2>
          <p className="text-xl text-gray-600 mb-10">
            Invite us, visit our campus, or collaborate to create meaningful educational impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsCampusVisitModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-blue-600/30">
              Book a Campus Visit
            </button>
            <button onClick={() => setIsInviteUsModalOpen(true)} className="bg-[#FBBF24] hover:bg-yellow-500 text-[#0F172A] font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-yellow-400/30">
              Invite Us To Your School
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Campus Visit Modal */}
      <CampusVisitModal
        isOpen={isCampusVisitModalOpen}
        onClose={() => setIsCampusVisitModalOpen(false)}
      />

      {/* Invite Us Modal */}
      <InviteUsModal
        isOpen={isInviteUsModalOpen}
        onClose={() => setIsInviteUsModalOpen(false)}
      />

      {/* Partner Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
};

export default Outreach;
