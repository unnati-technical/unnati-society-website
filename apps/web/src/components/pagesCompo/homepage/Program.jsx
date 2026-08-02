import React from "react";
import { imagekitImage } from "../../../utils/imagekit";
import { useNavigate } from "react-router-dom";
import AnimatedCounter from "../../../components/common/AnimatedCounter";
import Leaderboard from "./Leaderboard";
import {
  FiMonitor,
  FiTarget,
  FiBookOpen,
  FiArrowRight,
  FiUsers,
  FiLayers,
  FiHeart
} from "react-icons/fi";
import { FaRegBuilding, FaUserGraduate, FaSchool, FaLayerGroup, FaChalkboardTeacher } from "react-icons/fa";

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

        {/* Top Layout Section: Two columns on desktop */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          
          {/* Left Column: Heading and Stats */}
          <div className="flex flex-col gap-6 w-full lg:max-w-[38%]">
            
            {/* Header Area */}
            <div className="flex flex-col gap-2">
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

            {/* Impact Statistics Card (Vertical Stack) */}
            <div className="flex flex-col gap-5 bg-white p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 w-full max-w-[280px]">

              {/* Stat 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 shrink-0">
                  <FaUserGraduate size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-[#0F172A] leading-none tracking-tight oswald-font-3">
                    <AnimatedCounter value={4000} suffix="+" />
                  </h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-1">Students</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100"></div>

              {/* Stat 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-[#FFB300] shadow-sm border border-yellow-100 shrink-0">
                  <FaChalkboardTeacher size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-[#0F172A] leading-none tracking-tight oswald-font-3">
                    <AnimatedCounter value={360} suffix="+" />
                  </h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-1">Sessions</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100"></div>

              {/* Stat 3 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shadow-sm border border-green-100 shrink-0">
                  <FaSchool size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black text-[#0F172A] leading-none tracking-tight oswald-font-3">
                    <AnimatedCounter value={20} suffix="+" />
                  </h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-1">Schools</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Leaderboard Card */}
          <div className="flex-1 w-full lg:max-w-[59%] overflow-visible">
            <Leaderboard />
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
                <img loading="lazy"
                  src={imagekitImage(prog.img)}
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



      </div>
    </section>
  );
};

export default Program;
