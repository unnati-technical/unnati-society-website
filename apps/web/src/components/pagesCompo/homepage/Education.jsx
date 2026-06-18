import React from "react";
import { 
  FiBookOpen, 
  FiMonitor, 
  FiUsers, 
  FiHeart, 
  FiTrendingUp
} from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";

const Education = () => {
  const cards = [
    {
      id: "education",
      icon: <FiBookOpen size={28} strokeWidth={1.5} />,
      title: "EDUCATION",
      desc: "Providing quality education and learning opportunities to help children reach their full potential."
    },
    {
      id: "digital",
      icon: <FiMonitor size={28} strokeWidth={1.5} />,
      title: "DIGITAL LITERACY",
      desc: "Equipping students with essential digital skills to navigate, learn and succeed in a technology-driven world."
    },
    {
      id: "mentorship",
      icon: <FiUsers size={28} strokeWidth={1.5} />,
      title: "MENTORSHIP",
      desc: "Connecting students with mentors who guide, support and inspire them to believe in their dreams."
    },
    {
      id: "growth",
      icon: <FiTrendingUp size={28} strokeWidth={1.5} />,
      title: "HOLISTIC GROWTH",
      desc: "Nurturing academic, social and emotional skills for all-round development and lifelong growth."
    },
    {
      id: "compassion",
      icon: <FiHeart size={28} strokeWidth={1.5} />,
      title: "COMPASSION",
      desc: "Building a community rooted in empathy, kindness and social responsibility."
    }
  ];

  return (
    <section className="bg-[#F7F7F7] py-8 lg:py-10 px-6 lg:px-16 w-full font-sans flex justify-center my-8 lg:my-12">
      <div className="max-w-[1400px] w-full flex flex-col items-center gap-6">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#3B82F6] font-semibold text-xs md:text-sm uppercase tracking-[4px]">
              OUR APPROACH
            </span>
            <div className="w-12 h-[2px] bg-[#3B82F6]"></div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.1] text-[#0F172A] mt-1">
            Building Foundations<span className="text-[#3B82F6]">.</span><br />
            Creating <span className="text-[#3B82F6]">Futures</span><span className="text-[#3B82F6]">.</span>
          </h2>

          <div className="flex items-center gap-4 text-[#CBD5E1] my-1">
            <div className="h-px w-12 bg-gray-300"></div>
            <FiUsers size={20} className="text-[#94A3B8]" strokeWidth={1.5}/>
            <div className="h-px w-12 bg-gray-300"></div>
          </div>

          <p className="text-[#475569] text-sm md:text-lg max-w-[700px] leading-relaxed">
            We work with children and communities to create opportunities for learning, growth, and a better tomorrow.
          </p>
        </div>

        {/* Feature Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="bg-white border border-[#E5E7EB] rounded-[20px] p-4 lg:p-5 flex flex-col items-center text-center h-full transition-all duration-400 ease-in-out hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex justify-center items-center mb-3 shrink-0">
                {card.icon}
              </div>
              <h3 className="text-[#0F172A] font-bold text-base mb-3 tracking-wide uppercase">
                {card.title}
              </h3>
              <div className="w-8 h-[1px] bg-[#93C5FD] mb-3"></div>
              <p className="text-[#475569] text-xs md:text-sm leading-[1.6]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Impact Strip */}
        <div className="w-full bg-[#EEF4FF] rounded-[20px] px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-50">
          <div className="flex items-start gap-4">
            <RiDoubleQuotesL className="text-[#3B82F6] shrink-0 text-3xl md:text-4xl" />
            <div className="flex flex-col">
              <p className="text-[#0F172A] font-medium text-base md:text-xl leading-[1.4] tracking-tight mt-1">
                Empowering today's children.<br className="hidden sm:block"/>
                Strengthening tomorrow's communities.
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-[#3B82F6] gap-2 shrink-0">
            {/* Minimalist illustration approximation using icons and borders */}
            <div className="flex items-center gap-1 opacity-70">
              <FiUsers size={32} strokeWidth={1} />
              <div className="w-16 md:w-32 h-[1px] bg-[#3B82F6]"></div>
              <FiHeart size={20} strokeWidth={1.5} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;