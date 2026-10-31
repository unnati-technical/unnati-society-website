import React from "react";

const CHANGEMAKERS = [
  {
    name: "Dr. Prakash Ranjan",
    image: "/assets/wall-of-change/prakash-ranjan.jpg",
  },
  {
    name: "Dr. Chetan Barde",
    image: "/assets/wall-of-change/chetan-barde.jpg",
  },
  {
    name: "Dr. Mehul Kumar",
    image: "/assets/wall-of-change/mehul-kumar.jpg",
  },
  {
    name: "Dr. Bhanu Priya",
    image: "/assets/wall-of-change/bhanu-priya.jpg",
  },
  {
    name: "Dr. Poonam Yadav",
    image: "/assets/wall-of-change/poonam-yadav.jpg",
  },
  {
    name: "Dr. Suneel Kumar",
    image: "/assets/wall-of-change/suneel-kumar.jpg",
  },
  {
    name: "Mr. Hemant Kumar",
    image: "/assets/wall-of-change/hemant-kumar.jpg",
  },
  {
    name: "Mr. Akash Bajpai",
    image: "/assets/wall-of-change/akash-bajpai.jpg",
  },
  {
    name: "Mr. Mohit Kumar",
    image: "/assets/wall-of-change/mohit-kumar.jpg",
  },
];

// True 3D Museum-Grade Framed Portrait
const MuseumFrame = ({ person }) => (
  <div className="group relative w-full max-w-[235px] sm:max-w-[245px] flex-shrink-0 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03]">
    {/* Physical Wall Standoff / Hanging Hook */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#e2c178] via-[#a88235] to-[#594314] shadow-[0_2px_4px_rgba(0,0,0,0.4)] border border-[#f3d999] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#3d2c0b] shadow-inner"></div>
      </div>
    </div>

    {/* Realistic Deep Frame Drop Shadow onto the Wall */}
    <div className="relative w-full rounded-lg shadow-[0_22px_35px_-8px_rgba(40,30,20,0.38),0_10px_16px_-4px_rgba(40,30,20,0.22),0_2px_4px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_45px_-10px_rgba(40,30,20,0.48),0_14px_22px_-6px_rgba(40,30,20,0.3)] transition-all duration-300">
      
      {/* 3D Beveled Outer Wooden Frame (Dark Espresso Walnut with Chiseled Edge) */}
      <div className="relative bg-[#1f1a16] p-3 sm:p-3.5 rounded-lg border-t border-l border-[#4a3f35] border-b-2 border-r-2 border-[#0d0a08]">
        
        {/* Inner Gold / Brass Fillet Liner */}
        <div className="p-[2.5px] bg-gradient-to-br from-[#f5d796] via-[#c99e4b] to-[#7a591e] rounded-[3px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.5)]">
          
          {/* Archival Museum Mat Board (Recessed Off-White Passe-partout) */}
          <div className="bg-[#FAF8F5] p-2.5 sm:p-3 rounded-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
            
            {/* The Photograph (Recessed with 45° Mat Bevel) */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-slate-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]">
              <img
                src={person.image}
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Realistic Museum Glass Reflection / Glare */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
            </div>

            {/* Engraved Solid Brass Plaque with Screws - Perfectly Centered, Full Name Displayed */}
            <div className="relative mt-3 px-3 py-2 bg-gradient-to-r from-[#DFB86C] via-[#FDE8AA] to-[#DFB86C] rounded-[2px] border border-[#9C752B] shadow-[0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] flex items-center justify-center">
              {/* Left Mounting Screw (Absolute Positioned) */}
              <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#694c16] flex items-center justify-center flex-shrink-0 shadow-inner pointer-events-none">
                <div className="w-1 h-[0.5px] bg-[#FDE8AA]/90 -rotate-45"></div>
              </div>

              {/* Engraved Plaque Name - Full Name, Centered, No Dots */}
              <h3 className="font-serif text-[#1F1504] font-bold text-[11px] sm:text-xs leading-none tracking-normal sm:tracking-wide text-center uppercase whitespace-nowrap">
                {person.name}
              </h3>

              {/* Right Mounting Screw (Absolute Positioned) */}
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#694c16] flex items-center justify-center flex-shrink-0 shadow-inner pointer-events-none">
                <div className="w-1 h-[0.5px] bg-[#FDE8AA]/90 rotate-45"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);

const WallOfChange = () => {
  const row1 = CHANGEMAKERS.slice(0, 5);
  const row2 = CHANGEMAKERS.slice(5);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 bg-slate-50/60">
      <section className="relative w-full max-w-[1380px] mx-auto overflow-hidden bg-[#ECE8E1] py-10 sm:py-14 rounded-3xl border-2 border-[#C9C3B7] font-sans shadow-xl">
        {/* =========================================================================
            REAL ARCHITECTURAL STONE GALLERY WALL TEXTURE
           ========================================================================= */}
        {/* Ashlar Stone Masonry Block Grid (Travertine / Limestone gallery blocks) */}
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stone-blocks" width="320" height="150" patternUnits="userSpaceOnUse">
                {/* Horizontal block joints */}
                <line x1="0" y1="0" x2="320" y2="0" stroke="#B8B2A5" strokeWidth="1.2" />
                <line x1="0" y1="75" x2="320" y2="75" stroke="#B8B2A5" strokeWidth="1.2" />
                <line x1="0" y1="150" x2="320" y2="150" stroke="#B8B2A5" strokeWidth="1.2" />
                {/* Vertical block joints (Staggered) */}
                <line x1="160" y1="0" x2="160" y2="75" stroke="#B8B2A5" strokeWidth="1.2" />
                <line x1="80" y1="75" x2="80" y2="150" stroke="#B8B2A5" strokeWidth="1.2" />
                <line x1="240" y1="75" x2="240" y2="150" stroke="#B8B2A5" strokeWidth="1.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stone-blocks)" />
          </svg>
        </div>

        {/* Organic Fine Stucco / Plaster Grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#4a3f35_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* Top Architectural Crown Molding & Picture Rail */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#2E241B] via-[#4A3B2C] to-[#2E241B] border-b border-[#D4AF37]/40 shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-20 flex items-center justify-around px-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-b-sm bg-gradient-to-b from-[#E5C158] to-[#99731F] shadow-[0_2px_6px_rgba(229,193,88,0.7)]" />
          ))}
        </div>

        {/* Gallery Spotlight Washes (Illuminating the wall and frames from above) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[450px] bg-gradient-to-b from-amber-100/35 via-amber-100/15 to-transparent rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-1/4 translate-x-1/2 w-[600px] h-[450px] bg-gradient-to-b from-amber-100/35 via-amber-100/15 to-transparent rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-white/40 via-amber-50/20 to-transparent rounded-full blur-3xl"
        />

        {/* Section Content: Heading + Mounted Frames */}
        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center z-10 pt-2">
          
          {/* Section Heading - Clean, Bold, Just "Wall of Change" */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1710] tracking-tight drop-shadow-sm">
              Wall of Change
            </h2>
          </div>

          {/* =========================================================================
              FRAMED PORTRAITS MOUNTED ON THE STONE WALL
              - Row 1: 5 portraits
              - Row 2: 4 portraits (centered)
             ========================================================================= */}
          {/* Desktop 2-Row Exhibition Display */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-8 w-full">
            <div className="flex justify-center gap-5 xl:gap-6 w-full">
              {row1.map((person, idx) => (
                <MuseumFrame key={idx} person={person} />
              ))}
            </div>
            <div className="flex justify-center gap-5 xl:gap-6 w-full">
              {row2.map((person, idx) => (
                <MuseumFrame key={idx + 5} person={person} />
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Exhibition Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 lg:hidden w-full max-w-[740px] justify-items-center">
            {CHANGEMAKERS.map((person, index) => (
              <MuseumFrame key={index} person={person} />
            ))}
          </div>

        </div>

        {/* Bottom Architectural Baseboard / Shadow Line */}
        <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-[#2E241B] to-[#4A3B2C] border-t border-[#1C150E] shadow-inner" />
      </section>
    </div>
  );
};

export default WallOfChange;
