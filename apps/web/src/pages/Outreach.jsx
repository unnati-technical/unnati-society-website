import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';
import { 
  FiMapPin, FiCalendar, FiBookOpen, FiUsers, 
  FiCheckCircle, FiArrowRight, FiMonitor, FiClock,
  FiBriefcase, FiAward, FiShield, FiHeart
} from 'react-icons/fi';
import { BiBuildingHouse, BiChalkboard, BiTargetLock } from 'react-icons/bi';
import { FaHandshake } from 'react-icons/fa';

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Outreach = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] font-sans text-[#0F172A]">
      <Navbar />
      <NavUnn />

      {/* SECTION 1: HERO (Matched exactly to Target Image 2) */}
      <section className="w-full bg-white relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 font-sans">
        
        {/* Very subtle background light blue blob for the whole section */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between w-full relative z-10">
          
          {/* Left Column - Text and CTA */}
          <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col items-start pr-0 lg:pr-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase mb-8">
              <span className="text-gray-500">HOME</span>
              <span className="text-gray-300">/</span>
              <span className="text-blue-600">OUTREACH</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-[56px] sm:text-[64px] lg:text-[72px] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Outreach &<br/>
              <span className="text-blue-600">Collaborations</span>
            </h1>
            
            {/* Decorative Yellow Line */}
            <div className="w-16 h-1.5 bg-yellow-400 rounded-full mb-8"></div>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-12 max-w-lg leading-relaxed font-medium">
              Unnati Society partners with schools, colleges, and institutions to deliver digital education, career guidance, leadership development, and social awareness programs for students across underserved communities.
            </p>

            {/* Feature Icons Row */}
            <div className="flex items-start gap-6 sm:gap-10 mb-12">
              <div className="flex flex-col items-center text-center w-[110px]">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600 shadow-sm border border-blue-100">
                  <FaHandshake size={28} />
                </div>
                <h4 className="font-bold text-slate-900 text-[15px] mb-1">Collaborate</h4>
                <p className="text-[12px] text-gray-500 leading-tight">Work together for greater impact</p>
              </div>
              
              <div className="w-px h-20 bg-gray-200 mt-4 hidden sm:block"></div>

              <div className="flex flex-col items-center text-center w-[110px]">
                <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4 text-yellow-500 shadow-sm border border-yellow-100">
                  <BiBuildingHouse size={28} />
                </div>
                <h4 className="font-bold text-slate-900 text-[15px] mb-1">Engage</h4>
                <p className="text-[12px] text-gray-500 leading-tight">Inspire students through interactive programs</p>
              </div>
              
              <div className="w-px h-20 bg-gray-200 mt-4 hidden sm:block"></div>

              <div className="flex flex-col items-center text-center w-[110px]">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600 shadow-sm border border-blue-100">
                  <FiUsers size={28} />
                </div>
                <h4 className="font-bold text-slate-900 text-[15px] mb-1">Empower</h4>
                <p className="text-[12px] text-gray-500 leading-tight">Build skills and open doors to better futures</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 text-sm">
                <FiCalendar size={18} /> Book a Campus Visit
              </button>
              <button className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-yellow-400/20 text-sm">
                <BiBuildingHouse size={18} /> Invite Us To Your School
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm shadow-sm">
                <FaHandshake size={18} className="text-gray-400" /> Partner With Us
              </button>
            </div>
            
            {/* Clock Note */}
            <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
              <FiClock size={16} />
              <span>We typically respond within <span className="text-blue-600 font-bold">24–48 hours.</span></span>
            </div>
            
          </div>

          {/* Right Column - Image Collage (Fixed Aspect, Scale Transform for Responsiveness) */}
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-end mt-16 lg:mt-0" style={{ minHeight: '600px' }}>
            <div className="shrink-0 lg:scale-90 xl:scale-100" style={{ position: 'relative', width: '540px', height: '580px', transformOrigin: 'center right' }}>
              
              {/* Blue Dot Grid - Top Right */}
              <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '128px', height: '128px', backgroundImage: 'radial-gradient(#3B82F6 2.5px, transparent 2.5px)', backgroundSize: '16px 16px', opacity: 0.3, zIndex: 0 }}></div>

              {/* Main Left Image (Teacher) */}
              <div style={{ position: 'absolute', left: 0, top: '40px', width: '340px', height: '480px', backgroundColor: '#E2E8F0', borderRadius: '120px 24px 24px 24px', overflow: 'hidden', border: '8px solid white', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000" alt="Teacher interacting with students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Top Right Image (Girls) */}
              <div style={{ position: 'absolute', right: '10px', top: '10px', width: '260px', height: '190px', backgroundColor: '#E2E8F0', borderRadius: '24px', overflow: 'hidden', border: '6px solid white', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', zIndex: 20 }}>
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000" alt="Students using laptops" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Bottom Right Image (Boys) */}
              <div style={{ position: 'absolute', right: '10px', top: '220px', width: '260px', height: '280px', backgroundColor: '#E2E8F0', borderRadius: '24px', overflow: 'hidden', border: '6px solid white', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', zIndex: 20 }}>
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000" alt="Group of students collaborating" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* STATS BAR */}
      <section className="w-full px-4 lg:px-16 relative z-40 pb-16 bg-white -mt-4 lg:-mt-8">
        <div className="max-w-[1400px] mx-auto bg-white border border-gray-100 rounded-[32px] lg:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-wrap lg:flex-nowrap items-center justify-between px-6 py-8 lg:py-6 gap-8 lg:gap-4">
          
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 justify-center lg:justify-start lg:pl-4">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 bg-blue-50/30 shrink-0">
              <BiBuildingHouse size={26} />
            </div>
            <div>
              <h3 className="text-[28px] font-extrabold text-blue-600 leading-tight">500+</h3>
              <p className="text-[13px] font-semibold text-slate-700">Schools Reached</p>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-200 hidden lg:block"></div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 justify-center lg:justify-start">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-500 bg-yellow-50/30 shrink-0">
              <FiUsers size={26} />
            </div>
            <div>
              <h3 className="text-[28px] font-extrabold text-blue-600 leading-tight">25,000+</h3>
              <p className="text-[13px] font-semibold text-slate-700">Students Impacted</p>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-200 hidden lg:block"></div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 justify-center lg:justify-start">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 bg-blue-50/30 shrink-0">
              <BiChalkboard size={26} />
            </div>
            <div>
              <h3 className="text-[28px] font-extrabold text-blue-600 leading-tight">250+</h3>
              <p className="text-[13px] font-semibold text-slate-700">Programs Conducted</p>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-200 hidden lg:block"></div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 justify-center lg:justify-start lg:pr-4">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-500 bg-yellow-50/30 shrink-0">
              <FiMapPin size={26} />
            </div>
            <div>
              <h3 className="text-[28px] font-extrabold text-blue-600 leading-tight">15+</h3>
              <p className="text-[13px] font-semibold text-slate-700">Districts Covered</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THREE OUTREACH OPTIONS */}
      <section className="w-full bg-white py-20 px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-[24px] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BiBuildingHouse size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Campus Visit</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Bring your students to IIIT Bhagalpur for an inspiring campus experience.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Campus tour</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Student interaction</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Career guidance</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Exposure visit</li>
            </ul>
            <button className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold py-3 rounded-xl transition-colors">
              Request Campus Visit
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-[24px] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <BiChalkboard size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Invite Us To Campus</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              We conduct workshops and educational sessions at your school.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Digital literacy</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Career guidance</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Awareness programs</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Interactive workshops</li>
            </ul>
            <button className="w-full bg-yellow-100 hover:bg-yellow-500 hover:text-white text-yellow-700 font-bold py-3 rounded-xl transition-colors">
              Invite Us
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-[24px] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FaHandshake size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Collaborate / Partner</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Partner with us to create sustainable educational impact.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Joint programs</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> CSR projects</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Volunteer network</li>
              <li className="flex items-center text-sm font-medium text-gray-700"><FiCheckCircle className="text-blue-500 mr-2" /> Long-term partnerships</li>
            </ul>
            <button className="w-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold py-3 rounded-xl transition-colors">
              Partner With Us
            </button>
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

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2">
              Request Campus Visit <FiArrowRight />
            </button>
          </div>
          
          <div className="w-full lg:w-1/2 flex gap-4 h-[500px]">
            <div className="w-2/3 h-full rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070" alt="Campus" className="w-full h-full object-cover" />
            </div>
            <div className="w-1/3 flex flex-col gap-4 h-full">
              <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" alt="Students" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070" alt="Tour" className="w-full h-full object-cover" />
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
                <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600"><FiClock size={24}/></div>
                <div>
                  <h5 className="font-bold text-sm">60–120 Minutes</h5>
                  <p className="text-xs text-gray-500 mt-1">Flexible session duration</p>
                </div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm text-yellow-500"><BiTargetLock size={24}/></div>
                <div>
                  <h5 className="font-bold text-sm">Interactive Activities</h5>
                  <p className="text-xs text-gray-500 mt-1">Hands-on learning</p>
                </div>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 flex items-start gap-4 sm:col-span-2">
                <div className="p-3 bg-white rounded-lg shadow-sm text-green-500"><FiUsers size={24}/></div>
                <div>
                  <h5 className="font-bold text-sm">Q&A + Feedback</h5>
                  <p className="text-xs text-gray-500 mt-1">Direct student interaction and doubt clearing</p>
                </div>
              </div>
            </div>

          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[500px] rounded-[32px] overflow-hidden shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070" alt="Classroom Workshop" className="w-full h-full object-cover" />
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

            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2">
              Partner With Us <FiArrowRight />
            </button>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center items-center h-[400px]">
             {/* Using a nice placeholder pattern instead of an image for the illustration */}
             <div className="w-full h-full max-w-[500px] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[40px] flex items-center justify-center relative overflow-hidden shadow-inner border border-white">
                <FaHandshake className="text-[200px] text-blue-200 opacity-50" />
                <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-blue-900/40 text-center">Collaboration<br/>Illustration</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW OUTREACH WORKS */}
      <section className="w-full bg-white py-24 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-16 text-[#0F172A]">How Outreach Works</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-1 bg-gray-100 -z-10">
              <div className="h-full bg-blue-500 w-full rounded-full opacity-30"></div>
            </div>

            {[
              { step: 1, title: 'Submit Request', icon: <FiMonitor size={32}/> },
              { step: 2, title: 'We Connect', icon: <FiUsers size={32}/> },
              { step: 3, title: 'Schedule & Confirm', icon: <FiCalendar size={32}/> },
              { step: 4, title: 'Visit / Delivery', icon: <FiCheckCircle size={32}/> },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center bg-white px-4 mb-8 md:mb-0">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 border-4 border-white shadow-lg relative">
                  {item.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FBBF24] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-bold text-[#0F172A] text-lg">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: GUIDELINES */}
      <section className="w-full bg-[#F8FAFC] py-20 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BiBuildingHouse className="text-blue-600" size={32}/> Campus Visit Guidelines
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Best for classes 9–12</li>
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Advance permission required from institute</li>
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> School manages transport and logistics</li>
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Prior scheduling mandatory</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BiChalkboard className="text-blue-600" size={32}/> Campus Visit Guidelines
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Classroom or hall space required</li>
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Projector and screen preferred</li>
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Government schools prioritized</li>
              <li className="flex items-start text-gray-600 font-medium"><div className="mt-1 mr-3 text-[#FBBF24]"><FiCheckCircle size={18}/></div> Timely coordination appreciated</li>
            </ul>
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
                img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070",
                title: "Career Guidance Session",
                loc: "JNV Katihar",
                date: "15 Aug 2025",
                place: "Katihar, Bihar"
              },
              {
                img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070",
                title: "Scholarship Awareness Program",
                loc: "KV Araria",
                date: "22 Sep 2025",
                place: "Araria, Bihar"
              },
              {
                img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
                title: "Digital Literacy Session",
                loc: "Government School Workshop",
                date: "10 Nov 2025",
                place: "Bhagalpur, Bihar"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer group">
                <div className="h-56 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
      <section className="w-full bg-[#F8FAFC] py-20 px-6 lg:px-16 overflow-hidden">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-500 uppercase tracking-widest">Institutions We Worked With</h2>
        
        {/* Simple Auto-Scrolling Carousel Simulation using Marquee CSS */}
        <div className="w-full max-w-[1200px] mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
           <div className="flex items-center gap-3 font-bold text-xl text-gray-800 hover:text-blue-600 hover:opacity-100 transition-all cursor-pointer"><BiBuildingHouse size={32}/> IIIT Bhagalpur</div>
           <div className="flex items-center gap-3 font-bold text-xl text-gray-800 hover:text-blue-600 hover:opacity-100 transition-all cursor-pointer"><FiShield size={32}/> JNV</div>
           <div className="flex items-center gap-3 font-bold text-xl text-gray-800 hover:text-blue-600 hover:opacity-100 transition-all cursor-pointer"><FiAward size={32}/> Kendriya Vidyalaya</div>
           <div className="flex items-center gap-3 font-bold text-xl text-gray-800 hover:text-blue-600 hover:opacity-100 transition-all cursor-pointer"><FiBookOpen size={32}/> Govt Schools</div>
           <div className="flex items-center gap-3 font-bold text-xl text-gray-800 hover:text-blue-600 hover:opacity-100 transition-all cursor-pointer"><FiHeart size={32}/> Partner NGOs</div>
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-blue-600/30">
              Book a Campus Visit
            </button>
            <button className="bg-[#FBBF24] hover:bg-yellow-500 text-[#0F172A] font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-yellow-400/30">
              Invite Us To Your Campus
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Outreach;
