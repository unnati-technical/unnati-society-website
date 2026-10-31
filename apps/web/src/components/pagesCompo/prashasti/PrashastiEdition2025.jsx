import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight, CheckCircle2, Award, Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "../../common/AnimatedCounter";

const PrashastiEdition2025 = () => {
  // Guaranteed high-resolution event photos from IIIT Bhagalpur
  const carouselPhotos = [
    {
      url: "https://ik.imagekit.io/zpkfsvgtn/Media/IMG-20250823-WA0004.jpg",
      title: "Student Felicitation by Dignitaries",
      desc: "Prof. Madhusudhan Singh, Director IIIT Bhagalpur, and distinguished faculty honouring student achievements.",
    },
    {
      url: "https://ik.imagekit.io/zpkfsvgtn/Outreach/Copy%20of%20IMG_5062.JPG",
      title: "Students from 8 Partner Schools",
      desc: "Honouring dedication, academic consistency, and perseverance.",
    },
    {
      url: "https://ik.imagekit.io/zpkfsvgtn/Outreach/Copy%20of%20IMG_5005.JPG",
      title: "Community & Faculty Presence",
      desc: "Over 500 attendees gathered to celebrate educational opportunities.",
    },
    {
      url: "https://ik.imagekit.io/zpkfsvgtn/Outreach/IMG_2521.JPG.jpeg",
      title: "Volunteer Appreciation",
      desc: "Distinguished guests presenting geometry boxes to Unnati volunteers.",
    },
    {
      url: "https://ik.imagekit.io/zpkfsvgtn/Outreach/IMG_20260221_181820.jpg",
      title: "IIIT Bhagalpur Campus Exposure Tour",
      desc: "Students experiencing university labs and technological infrastructure.",
    },
    {
      url: "https://ik.imagekit.io/zpkfsvgtn/Outreach/WhatsApp%20Image%202026-06-29%20at%204.17.21%20PM.jpeg",
      title: "Heartfelt Testimonials",
      desc: "Teachers, headmasters, and parents sharing reflections on transformation.",
    },
  ];

  const directorPhoto = "https://ik.imagekit.io/zpkfsvgtn/leadership_profiles/directorsir.png?updatedAt=1785677499424";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Triple array to enable seamless infinite forward-looping
  const extendedPhotos = [...carouselPhotos, ...carouselPhotos, ...carouselPhotos];

  // Dynamic responsive itemsPerPage calculation
  useEffect(() => {
    const updateItems = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) setItemsPerPage(3);
        else if (window.innerWidth >= 640) setItemsPerPage(2);
        else setItemsPerPage(1);
      }
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // Automatic scrolling every 3.8 seconds (pauses on hover or modal open)
  useEffect(() => {
    if (isPaused || selectedPhoto) return;

    const timer = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, selectedPhoto]);

  // Seamless infinite loop reset when passing the first set of 6 items
  useEffect(() => {
    if (currentIndex >= carouselPhotos.length) {
      const resetTimer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(resetTimer);
    } else if (!withTransition) {
      const enableTimer = setTimeout(() => {
        setWithTransition(true);
      }, 40);
      return () => clearTimeout(enableTimer);
    }
  }, [currentIndex, withTransition, carouselPhotos.length]);

  const prevSlide = () => {
    if (currentIndex === 0) {
      setWithTransition(false);
      setCurrentIndex(carouselPhotos.length);
      setTimeout(() => {
        setWithTransition(true);
        setCurrentIndex(carouselPhotos.length - 1);
      }, 40);
    } else {
      setWithTransition(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const partnerSchools = [
    "Girls High School Sabour",
    "High School Bahadurpur",
    "Inter School Sabour",
    "Middle School Jhurkhuriya",
    "Middle School Arya Tola",
    "Middle School Babupur",
    "Middle School Meerachak",
    "Middle School Rani Talab",
  ];

  return (
    <section id="edition-2025" className="w-full py-16 sm:py-20 lg:py-24 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header & Stat Counters Grid with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12"
        >
          {/* Left Column: Edition Title & Description */}
          <div className="lg:col-span-7">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
                The Second Edition
              </span>
              <div className="w-8 h-[2px] bg-[#3B82F6]" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.1] mb-4">
              PRASHASTI SAMAROH 2025
            </h2>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                16 October 2025
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/80 border border-slate-300 text-slate-700 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                IIIT Bhagalpur
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              The second edition brought together more than 500 attendees, including students, teachers, families, volunteers, and community members, to celebrate educational progress. Students from eight partner government schools were felicitated, and ten outstanding Unnati volunteers were recognised for their contributions to DigiXplore, Netritva, and Akshar.
            </p>

            {/* Action Link */}
            <button
              onClick={() => setShowFullDetails(!showFullDetails)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <span>{showFullDetails ? "Close Event Details" : "Explore 2025 Highlights →"}</span>
            </button>
          </div>

          {/* Right Column: 3 Animated Stat Counters matching the mockup */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3 sm:gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B82F6] oswald-font leading-none mb-1">
                <AnimatedCounter value={500} suffix="+" duration={2} />
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Attendees
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-100 px-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B82F6] oswald-font leading-none mb-1">
                <AnimatedCounter value={8} duration={1.6} />
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Partner Schools
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B82F6] oswald-font leading-none mb-1">
                <AnimatedCounter value={10} duration={1.6} />
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Volunteers Recognised
              </span>
            </div>
          </div>
        </motion.div>

        {/* Carousel / Gallery Section with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative mt-8"
        >
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              Event Gallery & Ceremony Highlights
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-sm transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-sm transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Automatic Smooth Sliding Gallery Track */}
          <div
            className="overflow-hidden -mx-2.5 sm:-mx-3 py-2 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                transition: withTransition
                  ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              }}
            >
              {extendedPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  style={{ width: `${100 / itemsPerPage}%` }}
                  className="shrink-0 px-2.5 sm:px-3"
                >
                  <div
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h4 className="text-sm font-bold text-white leading-tight mb-1">
                          {photo.title}
                        </h4>
                        <p className="text-[11px] text-gray-300 line-clamp-2">
                          {photo.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {carouselPhotos.map((_, idx) => {
              const isActive = (currentIndex % carouselPhotos.length) === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setWithTransition(true);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${isActive ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Collapsible Verified Event Particulars */}
        {showFullDetails && (
          <div className="mt-10 p-6 sm:p-8 bg-white rounded-2xl border border-blue-200 shadow-lg animate-fadeIn">
            <h4 className="text-xl font-bold oswald-font uppercase text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Verified Event Record · Prashasti Samaroh 2025
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 mb-3">
                  Distinguished Guests of Honour
                </h5>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={directorPhoto}
                      alt="Prof. Madhusudhan Singh"
                      className="w-10 h-10 rounded-full object-cover border border-blue-300 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">Prof. Madhusudhan Singh</span>
                      <span className="text-xs text-slate-500">Director, IIIT Bhagalpur</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Mrs. Babita Kumari</strong> — District Program Officer, Bhagalpur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Headmasters & Principals from eight partner government schools</span>
                  </li>
                </ul>

                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 mt-6 mb-3">
                  Key Ceremonial Activities
                </h5>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Student felicitation with mementos for academic dedication and consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Presentation of geometry boxes to 10 outstanding Unnati volunteers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>Guided academic and technological infrastructure tour of IIIT Bhagalpur campus</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 mb-3">
                  8 Felicitated Partner Schools
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {partnerSchools.map((school, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span>{school}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong>Grassroots Impact:</strong> The celebration concluded with heartfelt testimonials and reflections from students, teachers, and faculty, affirming the continuous social and educational footprint of Unnati Society.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
            <div className="p-5 bg-slate-900 text-white">
              <h4 className="text-lg font-bold">{selectedPhoto.title}</h4>
              <p className="text-sm text-gray-300 mt-1">{selectedPhoto.desc}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PrashastiEdition2025;
