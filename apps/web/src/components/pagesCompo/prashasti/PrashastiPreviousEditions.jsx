import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight, CheckCircle2, Award, Sparkles, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "../../common/AnimatedCounter";
import FramedBrushPhoto from "../../common/FramedBrushPhoto";

const PrashastiPreviousEditions = () => {
  // Authentic ceremony photos from IIIT Bhagalpur for 2025 Edition
  const carouselPhotos = [
    {
      url: "/assets/prashasti/IMG_9748.JPG",
      title: "Dignitaries & Guests of Honour",
      desc: "Prof. Madhusudan Singh, Director IIIT Bhagalpur, Mrs. Babita Kumari, DPO Bhagalpur, and leadership presiding at the high table.",
    },
    {
      url: "/assets/prashasti/IMG_9865.JPG",
      title: "10 Volunteers Recognised",
      desc: "Outstanding Unnati student volunteers honoured with memento plaques for sustained grassroots commitment.",
    },
    {
      url: "/assets/prashasti/IMG_9877.JPG",
      title: "Memento Presentation",
      desc: "Director Prof. Madhusudan Singh and DPO Mrs. Babita Kumari presenting the Prashasti Samaroh crystal memento.",
    },
    {
      url: "/assets/prashasti/IMG_9976.JPG",
      title: "KGBV Partner Institution Honour",
      desc: "Kasturba Gandhi Balika Vidyalaya students and wardens receiving institutional recognition on stage.",
    },
    {
      url: "/assets/prashasti/IMG_9896.JPG",
      title: "Director's Keynote Address",
      desc: "Prof. Madhusudan Singh addressing students, faculty, and guests on education and leadership.",
    },
    {
      url: "/assets/campus-exposure-tour.jpg",
      title: "IIIT Bhagalpur Campus Exposure Tour",
      desc: "Students experiencing university labs, classrooms, and technological infrastructure.",
    },
    {
      url: "/assets/prashasti/IMG_9957.JPG",
      title: "Educators & School Wardens",
      desc: "Acknowledging dedicated teachers and wardens who guide and inspire students every day.",
    },
    {
      url: "/assets/prashasti/IMG_9989.JPG",
      title: "Celebrating Collective Achievement",
      desc: "Full Unnati student organizing cohort and volunteers gathered on stage at the ceremony finale.",
    },
  ];

  // Authentic inaugural ceremony photo of dignitaries high table on stage
  const archival2024Photo = "/assets/prashasti/IMG_9757.JPG";
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

  const highlights = [
    "Over 500 attendees",
    "Students from eight partner government schools felicitated",
    "10 Unnati volunteers recognised",
    "Inspirational guest interactions and community participation",
    "Campus visit and exposure to the academic environment of IIIT Bhagalpur",
    "Student and faculty testimonials celebrating the impact of Unnati's initiatives",
  ];

  return (
    <section id="previous-editions" className="w-full py-16 sm:py-20 lg:py-24 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-[3px]">
              Previous Editions
            </span>
            <div className="w-8 h-[2px] bg-[#3B82F6]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl oswald-font font-bold text-slate-900 tracking-tight uppercase leading-[1.1] mb-4">
            A Growing Tradition of <br />
            <span className="text-[#3B82F6]">Celebrating Achievement.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Each edition of Unnati Prashasti Samaroh brings together stories of achievement, encouragement, and community participation. Across the years, the ceremony has continued to strengthen a shared commitment to educational opportunity and collective progress.
          </p>
        </motion.div>

        {/* ---------------- 2025 SECOND EDITION ---------------- */}
        <div id="edition-2025" className="scroll-mt-24 p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm mb-16">
          
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10"
          >
            {/* Left Column: Edition Title & Description */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                Second Edition
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl oswald-font font-bold text-slate-900 tracking-tight uppercase mb-4">
                Prashasti Samaroh 2025
              </h3>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  16 October 2025
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  IIIT Bhagalpur
                </span>
              </div>

              {/* Description */}
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
                <p>
                  The second edition of Unnati Prashasti Samaroh was held on <strong>16 October 2025</strong> at <strong>IIIT Bhagalpur</strong>, welcoming <strong>over 500 attendees</strong>, including students, teachers, families, volunteers, and community members.
                </p>
                <p>
                  The ceremony was graced by <strong>Prof. Madhusudhan Singh, Director, IIIT Bhagalpur</strong>, and <strong>Mrs. Babita Kumari, District Program Officer, Bhagalpur</strong>, as Guests of Honour. Headmasters and Principals from eight partner government schools were also present.
                </p>
                <p>
                  Students from <strong>Girls High School Sabour, High School Bahadurpur, Inter School Sabour</strong>, and the middle schools of <strong>Jhurkhuriya, Arya Tola, Babupur, Meerachak, and Rani Talab</strong> were felicitated with mementos in recognition of their achievements and continued engagement.
                </p>
                <p>
                  The event also honoured <strong>10 outstanding Unnati volunteers</strong> for their exceptional dedication to the society's core programmes, DigiXplore, Netritva, and Akshar. As a gesture of encouragement, distinguished guests presented geometry boxes to the volunteers, who also had the opportunity to tour the IIIT Bhagalpur campus and experience its academic environment firsthand.
                </p>
              </div>

              {/* Action Link */}
              <button
                onClick={() => setShowFullDetails(!showFullDetails)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>{showFullDetails ? "Hide Highlights & Guests" : "View Highlights & Guest Records"}</span>
                {showFullDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Right Column: 3 Animated Stat Counters */}
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

          {/* Collapsible Verified Event Particulars */}
          {showFullDetails && (
            <div className="mb-10 p-6 sm:p-8 bg-white rounded-2xl border border-blue-200 shadow-md animate-fadeIn">
              <h4 className="text-lg sm:text-xl font-bold oswald-font uppercase text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Highlights & Verified Event Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 mb-3">
                    Ceremony Highlights
                  </h5>
                  <ul className="space-y-2.5 text-slate-600">
                    {highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 mt-6 mb-3">
                    Guests of Honour
                  </h5>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={directorPhoto}
                      alt="Prof. Madhusudhan Singh"
                      className="w-10 h-10 rounded-full object-cover border border-blue-300 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">Prof. Madhusudhan Singh</span>
                      <span className="text-xs text-slate-500">Director, IIIT Bhagalpur</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 pl-1">
                    Joined by <strong>Mrs. Babita Kumari</strong> (District Program Officer, Bhagalpur) along with Headmasters & Principals from 8 partner schools.
                  </p>
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

                  <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                    <strong>Grassroots Impact:</strong> The celebration concluded with heartfelt testimonials and reflections from students and faculty, highlighting the grassroots impact of Unnati's initiatives.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Automatic Smooth Sliding Gallery Track */}
          <div className="relative mt-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                2025 Ceremony Photo Gallery
              </h4>
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
                          <h5 className="text-sm font-bold text-white leading-tight mb-1">
                            {photo.title}
                          </h5>
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
            <div className="flex items-center justify-center gap-2 mt-5">
              {carouselPhotos.map((_, idx) => {
                const isActive = (currentIndex % carouselPhotos.length) === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setWithTransition(true);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* ---------------- 2024 FIRST EDITION ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm mb-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
                Inaugural Edition
              </div>

              <h3 className="text-2xl sm:text-3xl oswald-font font-bold text-slate-900 tracking-tight uppercase mb-3">
                Prashasti Samaroh 2024, First Edition
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                The inaugural edition of Prashasti Samaroh marked the beginning of an annual tradition dedicated to recognising student achievement, celebrating educational progress, and bringing together the people who support learners on their journeys.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                <span>Annual tradition established at IIIT Bhagalpur</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <FramedBrushPhoto
                id="archive-2024-photo"
                src={archival2024Photo}
                alt="Prashasti Samaroh 2024 Inaugural Edition"
                caption="Inaugural Ceremony · IIIT Bhagalpur | Archive 2024"
                aspectRatio="aspect-[16/9]"
                onError={(e) => {
                  e.currentTarget.src = "/assets/prashasti/IMG_9877.JPG";
                }}
              />
            </div>

          </div>
        </motion.div>

        {/* ---------------- A TRADITION THAT CONTINUES ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="max-w-2xl">
            <h4 className="text-lg sm:text-xl font-bold oswald-font uppercase tracking-wide text-white mb-2">
              A Tradition That Continues
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Every edition adds new stories to the journey, stories of dedication, encouragement, collaboration, and possibility. Together, they reflect a continuing commitment to recognising progress and inspiring learners to pursue their aspirations.
            </p>
          </div>
          <div className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#FBBF24] border border-[#FBBF24]/30 px-5 py-2.5 rounded-xl bg-[#FBBF24]/10">
            Continuing The Legacy
          </div>
        </motion.div>

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
              <h5 className="text-lg font-bold">{selectedPhoto.title}</h5>
              <p className="text-sm text-gray-300 mt-1">{selectedPhoto.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PrashastiPreviousEditions;
