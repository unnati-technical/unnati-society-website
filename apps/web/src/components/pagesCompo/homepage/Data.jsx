import React, { useEffect, useRef, useState } from "react";
import mission from './../../../assets/mission.jpg';
import { 
  FiShield, 
  FiPieChart, 
  FiUsers, 
  FiHeart, 
  FiArrowRight 
} from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";

const Data = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center bg-[#F8FAFC] font-sans" ref={sectionRef}>
      
      {/* Top Transparency Section */}
      <div className="w-full max-w-[1400px] px-6 lg:px-16 py-8 lg:py-12 flex flex-col lg:flex-row gap-8 justify-between items-center">
        
        {/* Left Column */}
        <div className="flex flex-col w-full lg:w-[45%]">
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-[3px]">
              TRANSPARENCY
            </span>
            <div className="w-10 h-[2px] bg-[#3B82F6]"></div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[46px] font-bold leading-[1.1] text-[#0F172A] mb-4">
            Transparency in<br />
            Our Actions
          </h2>

          <p className="text-[#475569] text-sm md:text-base max-w-[500px] leading-relaxed mb-8">
            We ensure every penny donated goes directly to empowering the children. Here is a breakdown of our annual expenditure.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-row justify-between items-start w-full gap-2 mt-4">
            <div className={`flex flex-col items-center text-center flex-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex justify-center items-center mb-3">
                <FiShield size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-[#0F172A] font-bold text-[13px] mb-2 uppercase tracking-wide">Accountable</h3>
              <p className="text-[#64748B] text-xs leading-[1.6] max-w-[130px]">
                Every contribution is tracked and reported.
              </p>
            </div>

            <div className="w-[1px] bg-gray-200 self-stretch my-2"></div>

            <div className={`flex flex-col items-center text-center flex-1 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex justify-center items-center mb-3">
                <FiPieChart size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-[#0F172A] font-bold text-[13px] mb-2 uppercase tracking-wide">Transparent</h3>
              <p className="text-[#64748B] text-xs leading-[1.6] max-w-[130px]">
                Clear breakdown of where every rupee goes.
              </p>
            </div>

            <div className="w-[1px] bg-gray-200 self-stretch my-2"></div>

            <div className={`flex flex-col items-center text-center flex-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex justify-center items-center mb-3">
                <FiUsers size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-[#0F172A] font-bold text-[13px] mb-2 uppercase tracking-wide">Impactful</h3>
              <p className="text-[#64748B] text-xs leading-[1.6] max-w-[130px]">
                Focused on creating real change.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Chart Card */}
        <div className={`w-full lg:w-[55%] flex justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#F1F5F9] p-6 lg:p-8 w-full lg:max-w-[700px] flex flex-col md:flex-row items-center gap-6">
            
            {/* Donut Chart */}
            <div className="relative w-[180px] h-[180px] shrink-0">
              <div 
                className="w-full h-full rounded-full transition-all duration-1500 ease-out"
                style={{ 
                  background: isVisible ? "conic-gradient(#3B82F6 0% 70%, #8B5CF6 70% 90%, #F59E0B 90% 100%)" : "conic-gradient(#E2E8F0 0% 100%)",
                  transform: isVisible ? "scale(1) rotate(0deg)" : "scale(0.9) rotate(-90deg)"
                }}
              ></div>
              {/* Inner White Circle */}
              <div className="absolute inset-0 m-auto w-[130px] h-[130px] bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <BiDonateHeart size={28} className="text-[#3B82F6] mb-1" />
                <span className="text-[#0F172A] font-bold text-2xl">100%</span>
                <span className="text-[#64748B] text-[10px] font-medium">For Children</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="flex flex-col gap-4 w-full flex-1">
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6] shrink-0 mr-3"></div>
                  <span className="text-[#3B82F6] font-bold text-lg w-[48px]">70%</span>
                  <span className="text-[#0F172A] font-bold text-sm">Student Programs</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed pl-[60px]">
                  Investing in quality education, skills and holistic development.
                </p>
                <div className="h-[1px] w-full bg-gray-100 mt-2"></div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shrink-0 mr-3"></div>
                  <span className="text-[#8B5CF6] font-bold text-lg w-[48px]">20%</span>
                  <span className="text-[#0F172A] font-bold text-sm">Infrastructure</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed pl-[60px]">
                  Building safe, inclusive and enabling learning spaces.
                </p>
                <div className="h-[1px] w-full bg-gray-100 mt-2"></div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B] shrink-0 mr-3"></div>
                  <span className="text-[#F59E0B] font-bold text-lg w-[48px]">10%</span>
                  <span className="text-[#0F172A] font-bold text-sm">Admin & Operations</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed pl-[60px]">
                  Ensuring efficient operations and good governance.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Bottom CTA Banner */}
      <div className="relative w-full h-auto flex items-center bg-black overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${mission})` }}
        ></div>
        
        {/* Overlay Gradient for better text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent"></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-10 lg:py-12 flex flex-col lg:flex-row items-center gap-8">
          
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white/30 text-white shrink-0 hidden md:flex">
            <BiDonateHeart size={32} />
          </div>

          <div className="flex flex-col">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.2] mb-3">
              You Can Contribute to<br className="hidden md:block" />
              Provide a Place for Children to Learn!
            </h2>
            <p className="text-gray-300 text-xs md:text-sm max-w-[600px] leading-relaxed mb-6">
              Your support can create opportunities, build confidence, and shape a brighter future for countless children.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 transition-colors shadow-lg shadow-blue-500/30">
                JOIN AS VOLUNTEER <FiArrowRight />
              </button>
              <button className="flex items-center gap-2 border border-white/50 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3 transition-colors">
                DONATE NOW <FiArrowRight />
              </button>
            </div>
          </div>
          
        </div>
      </div>

    </section>
  );
};

export default Data;
