import React, { useEffect, useRef } from "react";
import play from './../../../assets/play.png'
import { useNavigate } from "react-router-dom";
import homeHeroVideo from './../../../assets/home_hero.mp4';

const HeroSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensures the video plays automatically and loops even if browser policies interfere
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video auto-play failed:", error);
      });
    }
  }, []);

  const openVideo = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME2 || "dwxckh5t4";
    window.open(`https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=home_video_dq0ac8`, "_blank");
  };

  return (
    <section className="relative w-full h-[calc(100vh-100px)] min-h-[600px] overflow-hidden bg-black text-white flex items-center px-6 md:px-16 lg:px-24">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={homeHeroVideo} type="video/mp4" />
      </video>
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
      
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center max-w-4xl gap-6">
        
        {/* Main Heading */}
        <div className="oswald-font-3 text-5xl md:text-7xl lg:text-8xl tracking-wide font-bold leading-[1.1] drop-shadow-lg">
          <h1>EMPOWERING</h1>
          <h1>DREAMS</h1>
        </div>

        {/* Subtitle */}
        <div>
          <p className="text-2xl md:text-3xl lg:text-3xl great-vibes-regular text-[#60A5FA] tracking-wide drop-shadow-md">
            Revolutionizing Present, Transforming Future
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
            onClick={() => navigate('/about-us')}
            className="bg-white text-black font-extrabold oswald-font-2 px-8 py-3 text-sm md:text-base tracking-wider hover:bg-gray-100 transition shadow-lg"
          >
            READ MORE
          </button>
          
          <button
            onClick={openVideo}
            className="flex items-center gap-3 border-2 border-white px-6 py-2.5 hover:bg-white/10 transition shadow-lg"
          >
            <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
              <img src={play} alt="play" className="w-3 h-3 ml-[1px]" />
            </div>
            <span className="oswald-font-3 font-bold text-sm md:text-base tracking-wider">
              Impact Film
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
