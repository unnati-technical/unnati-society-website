import { useEffect, useRef } from "react";
import gsap from "gsap";
import AmbientParticleBackground from "./AmbientParticleBackground";

export default function FinalSection() {
  const sectionRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Button Magnetic Effect
    const wrapper = buttonWrapperRef.current;
    const button = buttonRef.current;
    
    const handleButtonMove = (e) => {
      e.stopPropagation(); // Prevent background from taking over
      if (!wrapper || !button) return;
      
      const rect = wrapper.getBoundingClientRect();
      const bx = (e.clientX - rect.left) - rect.width / 2;
      const by = (e.clientY - rect.top) - rect.height / 2;

      // Bring button towards mouse slightly (max ~12px)
      gsap.to(button, {
        x: bx * 0.3,
        y: by * 0.3,
        scale: 1.05,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const handleButtonLeave = () => {
      if (!button) return;
      gsap.to(button, {
        x: 0, y: 0, scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    if(wrapper) {
      wrapper.addEventListener("mousemove", handleButtonMove);
      wrapper.addEventListener("mouseleave", handleButtonLeave);
    }

    return () => {
      if(wrapper) {
        wrapper.removeEventListener("mousemove", handleButtonMove);
        wrapper.removeEventListener("mouseleave", handleButtonLeave);
      }
    };
  }, []);

  const handleCinematicClick = () => {
    // 300-600ms cinematic transition before navigation
    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = '/';
      }
    });

    tl.to(".final-transition-overlay", {
      scale: 50,
      opacity: 1,
      duration: 0.6,
      ease: "power2.in"
    }, 0)
    .to(".final-content", {
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95,
      duration: 0.4
    }, 0);
  };

  return (
    <section ref={sectionRef} className="final cinematic-environment" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: '#02060d' }}>
      
      {/* WebGL DNA Particles */}
      <AmbientParticleBackground />

      <div className="final-transition-overlay"></div>
      
      <div className="final-content" style={{ position: 'relative', zIndex: 5 }}>
        <span className="final-small">07 - YOUR JOURNEY</span>
        <h2 className="final-title">WELCOME <br /> TO <em>UNNATI.</em></h2>
        
        <div className="final-button-wrapper" ref={buttonWrapperRef} onClick={handleCinematicClick}>
          <button className="final-button" ref={buttonRef}>
            <span>EXPLORE UNNATI</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
