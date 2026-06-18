import React from "react";
import { cloudinaryImage } from "../../../utils/cloudinary";
import { useNavigate } from "react-router-dom";
import { 
  FiMonitor, 
  FiTarget, 
  FiBookOpen, 
  FiArrowRight, 
  FiUsers, 
  FiLayers,
  FiHeart
} from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";

const Program = () => {
  const navigate = useNavigate();

  const programs = [
    {
      id: "digiXplore",
      name: "DIGIXPLORE",
      category: "Digital Literacy Program",
      desc: "Teaching students essential digital skills, internet literacy, and technology to prepare them for the future.",
      icon: <FiMonitor size={18} strokeWidth={1.5} />,
      img: "WhatsApp_Image_2026-02-03_at_1.43.14_PM_rnt51c"
    },
    {
      id: "netritva",
      name: "NETRITVA",
      category: "Career Guidance Initiative",
      desc: "Helping students explore career options, build life skills, and connect with opportunities for a brighter tomorrow.",
      icon: <FiTarget size={18} strokeWidth={1.5} />,
      img: "WhatsApp_Image_2026-02-03_at_1.39.40_PM_4_ex22tr"
    },
    {
      id: "akshar",
      name: "AKSHAR",
      category: "Foundational Learning Program",
      desc: "Building strong foundations in literacy, communication, and confidence to help every child learn and grow.",
      icon: <FiBookOpen size={18} strokeWidth={1.5} />,
      img: "WhatsApp_Image_2026-02-03_at_1.39.39_PM_1_kmyefy"
    }
  ];

  return (
    <section className="bg-[#FAFAFA] py-8 lg:py-12 px-6 lg:px-20 w-full font-sans overflow-hidden flex justify-center">
      <div className="max-w-[1200px] w-full flex flex-col gap-6 lg:gap-8">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-12">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-[2px] bg-[#3B82F6]"></div>
              <span className="text-[#3B82F6] font-bold text-xs tracking-wide uppercase">
                OUR PROGRAMS
              </span>
            </div>
            <h2 className="oswald-font-3 text-3xl md:text-5xl font-bold leading-[1.1] text-[#0F172A] tracking-tight">
              Creating Pathways<br />for Every Child
            </h2>
          </div>
          
          <div className="lg:border-l border-gray-300 lg:pl-8 max-w-md">
            <p className="text-[#334155] text-sm leading-[1.6] font-medium">
              Through digital education,<br className="hidden md:block" />
              career guidance, and literacy programs,<br className="hidden md:block" />
              we empower students to learn, grow,<br className="hidden md:block" />
              and achieve their dreams.
            </p>
          </div>
        </div>

        {/* Impact Statistics Row */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          
          {/* Stat 1 */}
          <div className="flex items-start gap-3">
            <div className="text-[#3B82F6] pt-1">
              <FiUsers size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-extrabold text-[#0F172A] leading-none">280+</h3>
              <p className="text-gray-600 text-xs font-medium mt-1">Students Reached</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

          {/* Stat 2 */}
          <div className="flex items-start gap-3">
            <div className="text-[#3B82F6] pt-1">
              <FaRegBuilding size={24} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-extrabold text-[#0F172A] leading-none">8</h3>
              <p className="text-gray-600 text-xs font-medium mt-1">Schools Engaged</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

          {/* Stat 3 */}
          <div className="flex items-start gap-3">
            <div className="text-[#3B82F6] pt-1">
              <FiLayers size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-extrabold text-[#0F172A] leading-none">3</h3>
              <p className="text-gray-600 text-xs font-medium mt-1">Active Programs</p>
            </div>
          </div>

        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((prog) => (
            <div 
              key={prog.id}
              onClick={() => navigate(`/programs/${prog.id}`)}
              className="group flex flex-col bg-white rounded-[12px] border border-gray-200 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] shadow-[0_4px_10px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              {/* Card Image */}
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img 
                  src={cloudinaryImage(prog.img)} 
                  alt={prog.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-4 md:p-5 flex flex-col flex-1">
                
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 shrink-0 bg-[#EFF6FF] rounded-lg flex justify-center items-center text-[#3B82F6]">
                    {prog.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-extrabold text-[#0F172A] tracking-tight">
                      {prog.name}
                    </h3>
                    <span className="font-semibold text-[11px] text-[#3B82F6]">
                      {prog.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#475569] text-[13px] leading-[1.6] flex-1">
                  {prog.desc}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-1.5 text-[#3B82F6] font-semibold text-[13px] mt-4">
                  Learn More 
                  <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px bg-[#93C5FD] w-8 md:w-16"></div>
          <div className="flex items-center gap-1.5 text-[#475569] font-semibold text-xs">
            <FiHeart size={12} className="text-[#3B82F6]" />
            One Mission. Three Programs. Countless Futures.
          </div>
          <div className="h-px bg-[#93C5FD] w-8 md:w-16"></div>
        </div>

      </div>
    </section>
  );
};

export default Program;
