import React, { useState } from 'react';
import { FiBookOpen, FiMail, FiArrowRight } from 'react-icons/fi';
import ResourceReader from './ResourceReader';

const Resource = () => {
    const [readerOpen, setReaderOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState({ url: '', title: '' });

    const resources = [
        {
            title: "Unnati Magazine",
            desc: "Explore our official Unnati magazine filled with insights, stories, and achievements.",
            link: "https://heyzine.com/flip-book/2f239fd2b7.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnJe35WrkyDf7qDLkcFr_t0fB98gZkeMip1WbOKXBLZ_bWf_jcuDwr2-bukLM_aem_PMREjp6a8NEgJru_ygoldA#page/1",
            icon: <FiBookOpen size={24} />,
            watermark: (
                <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full text-white/5">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            )
        },
        {
            title: "Unnati Newsletter",
            desc: "Stay updated with our latest activities and announcements through the newsletter.",
            link: "https://heyzine.com/flip-book/36de4bab25.html",
            icon: <FiMail size={24} />,
            watermark: (
                <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full text-white/5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            )
        }
    ];

    return (
        <div className="relative w-full bg-[#F8FAFC] min-h-screen overflow-hidden flex flex-col font-sans">
            
            {/* HERO / HEADER SECTION */}
            <div className="relative w-full bg-gradient-to-b from-[#061838] to-[#0A265E] pt-28 pb-48 px-6 text-center text-white shrink-0 overflow-hidden">
                
                {/* Dotted Grid Decoration (Left) */}
                <div className="absolute top-10 left-10 text-white/5 pointer-events-none select-none hidden lg:block">
                    <svg width="100" height="100" fill="none" viewBox="0 0 100 100">
                        <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#dotPattern)" />
                    </svg>
                </div>

                {/* Floating Book Icon Outline (Left) */}
                <div className="absolute top-1/3 left-16 text-white/5 rotate-[-15deg] pointer-events-none select-none hidden lg:block">
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                </div>

                {/* Floating Paper Airplane Outline (Right) */}
                <div className="absolute top-16 right-24 text-white/5 rotate-[20deg] pointer-events-none select-none hidden lg:block">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </div>

                {/* Category Header */}
                <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
                    <span className="w-8 h-[1px] bg-[#FBBF24]"></span>
                    <span className="text-[#FBBF24] font-bold text-xs uppercase tracking-widest oswald-font-2">RESOURCES</span>
                    <span className="w-8 h-[1px] bg-[#FBBF24]"></span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-[54px] font-bold tracking-tight text-white mb-6 relative z-10">
                    Explore. <span className="relative inline-block">Learn<span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#FBBF24] rounded-full"></span></span>. Inspire.
                </h1>

                {/* Description Subtitle */}
                <p className="text-[#D1D5DB] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium relative z-10">
                    Dive into stories of impact, insights, and achievements.<br />
                    Stay connected with Unnati's journey of change.
                </p>

                {/* Bottom Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
                    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="relative block w-full h-[80px] md:h-[140px]">
                        <path d="M0,160 C288,260 576,260 864,180 C1152,100 1344,160 1440,200 L1440,220 L0,220 Z" fill="#F8FAFC"></path>
                    </svg>
                </div>

            </div>

            {/* CARDS SECTION (OVERLAPPING THE WAVE DIVIDER) */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 -mt-28 grid md:grid-cols-2 gap-8 w-full pb-24">
                
                {resources.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-gradient-to-br from-[#0F3596] to-[#0A246B] rounded-[24px] p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:scale-[1.02] hover:shadow-blue-900/20 transition-all duration-300 border border-white/10 flex flex-col justify-between min-h-[320px]"
                    >
                        
                        {/* Semi-transparent Background Illustration Watermark */}
                        <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 pointer-events-none select-none opacity-40 group-hover:scale-105 transition-transform duration-500">
                            {item.watermark}
                        </div>

                        {/* Top Content Block */}
                        <div className="relative z-10 flex flex-col items-start">
                            
                            {/* Circular Icon Container */}
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0F3596] shadow-lg mb-8 shrink-0">
                                {item.icon}
                            </div>

                            {/* Card Title */}
                            <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                                {item.title}
                            </h2>

                            {/* Yellow Underline Under Title */}
                            <div className="w-12 h-[3px] bg-[#FBBF24] rounded-full mb-6"></div>

                            {/* Card Description */}
                            <p className="text-blue-100/90 text-sm leading-relaxed font-medium max-w-sm mb-8">
                                {item.desc}
                            </p>

                        </div>

                        {/* Card Button */}
                        <div className="relative z-10">
                            <button
                                onClick={() => {
                                    setSelectedDoc({ url: item.link, title: item.title });
                                    setReaderOpen(true);
                                }}
                                className="bg-[#FBBF24] hover:bg-yellow-500 text-black px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer w-fit"
                            >
                                OPEN <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </div>
                ))}

            </div>

            {/* DECORATIVE CORNER LEAF SVGS */}
            {/* Bottom Left Leaves */}
            <div className="absolute bottom-0 left-0 text-[#1E3A8A]/10 pointer-events-none z-0 select-none">
                <svg width="180" height="240" viewBox="0 0 100 150" fill="currentColor">
                    <path d="M10,150 C22,120 45,70 65,10 C50,30 35,60 30,85 C25,110 10,150 10,150" opacity="0.3" />
                    <path d="M22,120 C28,105 40,95 48,90 C40,98 32,110 30,122 Z" />
                    <path d="M12,130 C20,115 35,105 45,102 C35,110 24,120 20,132 Z" />
                    <path d="M35,90 C40,75 52,65 60,60 C52,68 44,80 42,92 Z" />
                    <path d="M25,100 C33,85 47,75 57,72 C47,80 36,90 32,102 Z" />
                    <path d="M48,60 C53,45 65,35 73,30 C65,38 57,50 55,62 Z" />
                    <path d="M38,70 C46,55 60,45 70,42 C60,50 49,60 45,72 Z" />
                </svg>
            </div>

            {/* Bottom Right Leaves */}
            <div className="absolute bottom-0 right-0 text-[#1E3A8A]/10 pointer-events-none z-0 select-none transform scale-x-[-1]">
                <svg width="180" height="240" viewBox="0 0 100 150" fill="currentColor">
                    <path d="M10,150 C22,120 45,70 65,10 C50,30 35,60 30,85 C25,110 10,150 10,150" opacity="0.3" />
                    <path d="M22,120 C28,105 40,95 48,90 C40,98 32,110 30,122 Z" />
                    <path d="M12,130 C20,115 35,105 45,102 C35,110 24,120 20,132 Z" />
                    <path d="M35,90 C40,75 52,65 60,60 C52,68 44,80 42,92 Z" />
                    <path d="M25,100 C33,85 47,75 57,72 C47,80 36,90 32,102 Z" />
                    <path d="M48,60 C53,45 65,35 73,30 C65,38 57,50 55,62 Z" />
                    <path d="M38,70 C46,55 60,45 70,42 C60,50 49,60 45,72 Z" />
                </svg>
            </div>

            <ResourceReader 
                isOpen={readerOpen} 
                onClose={() => setReaderOpen(false)} 
                docUrl={selectedDoc.url} 
                docTitle={selectedDoc.title} 
            />

        </div>
    );
};

export default Resource;
