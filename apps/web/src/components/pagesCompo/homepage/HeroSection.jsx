import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeMediaApi } from "../../../api/home-media.api";

const playIcon =
  "https://ik.imagekit.io/zpkfsvgtn/Home/play.png?updatedAt=1785865818727";

const VideoSlide = ({ url, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((error) => {
          if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
            console.error("Video auto-play failed:", error);
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={url} type="video/mp4" />
    </video>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [mediaItems, setMediaItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      setLoading(false);
      return;
    }

    const fetchMedia = async () => {
      try {
        const data = await homeMediaApi.getAll();
        if (data && data.length > 0) {
          setMediaItems(data);
        } else {
          setMediaItems([]);
        }
      } catch (error) {
        console.error("Failed to load hero media", error);
        setMediaItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const getMediaList = () => {
    if (mediaItems.length > 0) return mediaItems;
    return [
      {
        id: "default",
        type: "VIDEO",
        url: "https://ik.imagekit.io/zpkfsvgtn/Home/WhatsApp%20Video%202026-08-11%20at%2022.03.23.mp4",
        title: "EMPOWERING DREAMS",
        subtitle: "Revolutionizing Present, Transforming Future",
      },
    ];
  };

  const list = getMediaList();
  const currentItem = list[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (list.length <= 1 || currentItem.type !== "PHOTO") return;

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 6000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, currentItem.type, list.length]);

  const openVideo = () => {
    // Open the raw mp4 file in a new tab instead of using Cloudinary's player
    window.open(
      "https://ik.imagekit.io/zpkfsvgtn/Home/home_video_dq0ac8.mp4",
      "_blank",
    );
  };

  return (
    <section className="relative w-full h-[calc(100vh-100px)] min-h-150 overflow-hidden bg-black text-white flex items-center px-6 md:px-16 lg:px-24 group">
      {/* Background Slides */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {list.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.id || index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {item.type === "VIDEO" ? (
                <VideoSlide
                  url={item.url}
                  isActive={isActive}
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title || "Hero Slide"}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-6000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center max-w-4xl gap-6">
        {/* Main Heading */}
        <div className="oswald-font-3 text-5xl md:text-7xl lg:text-8xl tracking-wide font-bold leading-[1.1] drop-shadow-lg">
          {currentItem.title ? (
            <h1>{currentItem.title}</h1>
          ) : (
            <>
              <h1>EMPOWERING</h1>
              <h1>DREAMS</h1>
            </>
          )}
        </div>

        {/* Subtitle */}
        <div>
          <p className="text-2xl md:text-3xl lg:text-3xl great-vibes-regular text-[#60A5FA] tracking-wide drop-shadow-md">
            {currentItem.subtitle ||
              "Revolutionizing Present, Transforming Future"}
          </p>
        </div>

        {/* Paragraph */}
        <div className="max-w-2xl border-l-4 border-[#60A5FA] pl-5 mt-2">
          <p className="inter-font text-base md:text-lg lg:text-xl drop-shadow-md leading-[1.6]">
            We bridge the digital divide by providing underprivileged students
            with essential technology education and basic knowledge, equipping
            them for the digital age.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-5 mt-6">
          <button
            onClick={() => navigate("/join-us")}
            className="bg-white text-black font-extrabold oswald-font-2 px-8 py-3 text-sm md:text-base tracking-wider hover:bg-gray-100 transition shadow-lg"
          >
            JOIN US
          </button>

          <button
            onClick={openVideo}
            className="flex items-center gap-3 border-2 border-white px-6 py-2.5 hover:bg-white/10 transition shadow-lg"
          >
            <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
              <img
                loading="lazy"
                src={playIcon}
                alt="play"
                className="w-3 h-3 ml-px"
              />
            </div>
            <span className="oswald-font-3 font-bold text-sm md:text-base tracking-wider">
              Impact Film
            </span>
          </button>
        </div>
      </div>

      {/* Pagination indicators */}
      {list.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {list.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-[#60A5FA] w-6"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {list.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 transition backdrop-blur-[2px] opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 transition backdrop-blur-[2px] opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}
    </section>
  );
};

export default HeroSection;
