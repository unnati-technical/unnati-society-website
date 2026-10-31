import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PrashastiHero = () => {
  // Authentic widescreen ceremony photos from IIIT Bhagalpur for motion carousel
  const heroSlides = [
    {
      url: "/assets/prashasti/IMG_9935.JPG",
      alt: "Felicitation ceremony on stage with student awardees and dignitaries",
      objectPosition: "object-[center_35%]",
    },
    {
      url: "/assets/prashasti/IMG_9865.JPG",
      alt: "10 outstanding Unnati volunteers recognised on stage with Director and guests of honour",
      objectPosition: "object-[center_35%]",
    },
    {
      url: "/assets/prashasti/IMG_9757.JPG",
      alt: "Dignitaries and guests of honour presiding at the Unnati Prashasti Samaroh high table",
      objectPosition: "object-center",
    },
    {
      url: "/assets/prashasti/IMG_9976.JPG",
      alt: "KGBV partner school students holding their institutional trophy on stage",
      objectPosition: "object-[center_35%]",
    },
    {
      url: "/assets/prashasti/IMG_9989.JPG",
      alt: "Full Unnati student organizing cohort and volunteers gathered on stage",
      objectPosition: "object-center",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Auto transition every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center bg-[#0B0F19] overflow-hidden">
      {/* Background Slideshow with Slow Zoom-Out (Ken Burns Effect) and Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={activeSlide}
            src={heroSlides[activeSlide].url}
            alt={heroSlides[activeSlide].alt}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{
              scale: 1.0,
              opacity: 0.95,
              transition: {
                opacity: { duration: 0.7, ease: "easeOut" },
                scale: { duration: 6.8, ease: "easeOut" },
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.7, ease: "easeInOut" },
            }}
            className={`absolute inset-0 w-full h-full object-cover ${heroSlides[activeSlide].objectPosition || "object-center"}`}
          />
        </AnimatePresence>

        {/* Left-focused gradient: deep contrast behind text on the left, clear and vivid on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/85 sm:via-[#0B0F19]/70 to-transparent w-full md:w-[60%] pointer-events-none" />

        {/* Smooth top and bottom vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Institutional Kicker (Share button removed per request) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[11px] sm:text-xs font-medium tracking-[2px] uppercase mb-4 sm:mb-6">
            <span>UNNATI SOCIETY</span>
            <span className="text-blue-400">•</span>
            <span>IIIT BHAGALPUR</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl oswald-font tracking-tight text-white uppercase leading-[1.05]">
            UNNATI PRASHASTI <br />
            <span className="text-[#3B82F6]">SAMAROH</span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-white/95 mt-3 sm:mt-5 tracking-tight">
            Celebrating Achievement. Recognising{" "}
            <span className="text-[#3B82F6] font-semibold">Effort.</span> Inspiring Possibility.
          </h2>

          {/* Markdown Line 7 Tagline */}
          <p className="text-sm sm:text-base text-[#FBBF24] font-semibold mt-2 tracking-tight">
            Celebrating the journey. Inspiring the future.
          </p>

          {/* Lead Intro */}
          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mt-2 sm:mt-3 leading-relaxed font-normal text-shadow-sm">
            A celebration of students, educational progress and the people who make opportunity possible.
          </p>

          {/* Event Status Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-[#FBBF24]">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-300 block font-normal leading-tight">2026 Edition</span>
                <span className="text-xs sm:text-sm font-semibold text-white">03 Nov, 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-300 block font-normal leading-tight">IIIT Bhagalpur</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Lecture Hall</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
            <button
              onClick={() => scrollToSection("edition-2025")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FBBF24] hover:bg-amber-400 text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-amber-400/20 cursor-pointer hover:translate-y-[-1px]"
            >
              <span>Explore 2025 Edition</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("theme-2026")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/20 backdrop-blur-md font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 text-[#3B82F6]" />
              <span>Discover 2026 Theme</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Motion Slide Indicators at bottom right */}
      <div className="absolute bottom-5 right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${activeSlide === idx ? "w-6 bg-[#FBBF24]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            aria-label={`Jump to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PrashastiHero;
