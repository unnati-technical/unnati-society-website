import React from "react";
const vision = "https://ik.imagekit.io/unnati/v1782396893/unnati_assets/vision2.jpg";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white text-black pt-10 pb-12 px-10 md:pt-16 md:pb-20 md:px-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div>
            <p className="w-fit inter-font text-gray-800 font-semibold tracking-wider text-sm border-t-[3px] border-black pt-2 uppercase">ABOUT US</p>
          </div>
          <div className="flex flex-col">
            <h1 className="oswald-font-3 text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight tracking-tight text-black">WE PROVIDE QUALITY</h1>
            <h1 className="oswald-font-3 text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight tracking-tight text-[#4285F4]">EDUCATION FOR ALL</h1>
          </div>
          <div>
            <p className="inter-font w-full md:w-[85%] text-base text-gray-700 leading-relaxed font-medium">
              Our mission is to provide free, quality education for
              underprivileged students, emphasizing holistic development. Our
              curriculum spans academics, life skills, and practical knowledge.
            </p>
          </div>
          <div>
            <p className="inter-font w-full md:w-[85%] text-base text-gray-700 leading-relaxed font-medium">
              We are helping students to tackle the hindrances faced by them
              which obstructs them to get up to their potential.
            </p>
          </div>
          <div className="mt-4">
            <button 
              className="flex justify-center items-center gap-2 oswald-font-3 bg-[#FFC107] hover:bg-[#FFB300] text-black px-8 py-3.5 cursor-pointer font-bold tracking-wide text-lg transition-colors border-none" 
              onClick={() => navigate('/about-us')}
            >
              LEARN MORE <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Right Side: Image and Decorations */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center py-10">
          
          {/* Blue Dots Grid (Top Left) */}
          <div className="absolute top-0 left-0 lg:left-10 grid grid-cols-4 gap-2 opacity-80 z-10">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#7EA4F4]"></div>
            ))}
          </div>

          {/* Squiggly Line (Bottom Left) */}
          <svg className="absolute -bottom-2 left-4 lg:-left-2 w-48 h-28 text-[#8BA9F9] opacity-20 z-0" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 60,10 C 30,15 10,70 30,85 C 50,100 70,50 40,40 C 10,30 5,95 45,95 C 85,95 105,40 75,35 C 45,30 50,90 90,95 C 130,100 150,50 120,40 C 90,30 90,85 130,85 C 170,85 190,70 200,60" />
          </svg>

          {/* Image Frame Container */}
          <div className="relative w-[320px] sm:w-[450px] lg:w-[550px] h-[220px] sm:h-[300px] lg:h-[380px] mt-6 ml-4">
            
            {/* Light Blue Rounded Border (Background) */}
            <div className="absolute -top-3 -right-3 w-[102%] h-[106%] border-[4px] border-[#D1E0FF] rounded-[24px] z-0 bg-transparent pointer-events-none"></div>

            {/* Image with SVG Filter Mask */}
            <div className="relative w-full h-full z-10">
              {/* SVG Definition for Brush Stroke Mask */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <filter id="brush-roughness" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.15" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <mask id="brush-mask">
                    <rect x="2%" y="2%" width="96%" height="96%" fill="white" filter="url(#brush-roughness)" />
                  </mask>
                </defs>
              </svg>

              <img loading="lazy" 
                src={vision} 
                alt="vision" 
                className="w-full h-full object-cover block bg-white"
                style={{ 
                  mask: "url(#brush-mask)", 
                  WebkitMask: "url(#brush-mask)",
                  maskSize: "cover",
                  WebkitMaskSize: "cover"
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
