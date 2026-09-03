import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./WelcomePage.css";
import AmbientParticleBackground from "./AmbientParticleBackground";
import FinalSection from "./FinalSection";
import InteractiveHero from "./InteractiveHero";

gsap.registerPlugin(ScrollTrigger);

// Utility to split text into characters for GSAP without premium plugins
const SplitChars = ({ text, className }) => {
  return text.split("").map((char, i) => (
    <span key={i} className={`split-char ${className}`} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));
};

const ASSETS = {
  video: "/assets/intro.webm",
  campus1: "/assets/campus-01.jpg",
  campus2: "/assets/campus-02.jpg",
  hostel: "/assets/hostel.jpg",
  students: "/assets/students.jpg",
  community: "/assets/community.jpg",
};

export default function WelcomePage() {
  const root = useRef(null);
  const cursorRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const finalSectionRef = useRef(null);
  const [isFinalHovered, setIsFinalHovered] = useState(false);

  // Custom Cursor
  useEffect(() => {
    if (window.innerWidth > 1024) {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });

      const moveCursor = (e) => {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
        xTo(e.clientX);
        yTo(e.clientY);
      };
      
      const hideCursor = () => gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseleave", hideCursor);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseleave", hideCursor);
      };
    }
  }, []);

  // Magnetic Button
  useEffect(() => {
    const wrapper = buttonWrapperRef.current;
    const button = buttonRef.current;
    if (!wrapper || !button) return;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width / 2;
      const y = (e.clientY - rect.top) - rect.height / 2;

      // Move the button slightly towards the cursor
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ==================================================
         LENIS
      ================================================== */
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      /* HERO GSAP REMOVED */

      /* ==================================================
         CHAPTER 01
      ================================================== */
      const chapter1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".chapter-one",
          start: "top top",
          end: "+=2200",
          scrub: 1,
          pin: true,
        },
      });

      chapter1
        .fromTo(".chapter-one-image", { scale: 1.3, xPercent: 12 }, { scale: 1, xPercent: 0, duration: 0.6, ease: "none" })
        .fromTo(".chapter-one-content", { opacity: 0, x: -100, filter: "blur(10px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.3 }, 0.1)
        .to(".chapter-one-content", { xPercent: -30, opacity: 0, duration: 0.3 }, 0.7)
        .to(".chapter-one-image", { scale: 1.15, xPercent: -10, filter: "brightness(0.3)", duration: 0.3, ease: "none" }, 0.7);

      /* ==================================================
         CHAPTER 02
      ================================================== */
      const chapter2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".chapter-two",
          start: "top top",
          end: "+=2200",
          scrub: 1.5,
          pin: true,
        },
      });

      chapter2
        .fromTo(".chapter-two-image", { clipPath: "inset(100% 0 0 0)", scale: 1.3 }, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.6, ease: "power2.inOut" })
        .fromTo(".chapter-two-text", { opacity: 0, x: 200, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 0.4 }, 0.2)
        .to(".chapter-two-image-wrapper", { scale: 1.5, opacity: 0, duration: 0.4, ease: "power1.in" }, 0.7)
        .to(".chapter-two-text", { xPercent: -20, opacity: 0, filter: "blur(5px)", duration: 0.3 }, 0.7);

      /* ==================================================
         CHAPTER 03 � PEOPLE (Depth parallax)
      ================================================== */
      const peopleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".people",
          start: "top top",
          end: "+=2800",
          scrub: 1.5,
          pin: true,
        },
      });

      peopleTimeline
        .fromTo(".people-title", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.2 })
        // Extreme depth offsets
        .fromTo(".people-image-1", { opacity: 0, yPercent: 60, scale: 0.7 }, { opacity: 1, yPercent: 0, scale: 1, duration: 0.4 }, 0.1)
        .fromTo(".people-image-2", { opacity: 0, yPercent: -50, scale: 0.8 }, { opacity: 1, yPercent: 0, scale: 1, duration: 0.4 }, 0.15)
        .fromTo(".people-image-3", { opacity: 0, xPercent: 50, scale: 0.6 }, { opacity: 1, xPercent: 0, scale: 1, duration: 0.4 }, 0.2)
        
        // Move them at drastically different speeds
        .to(".people-image-1", { yPercent: -45, scale: 1.1, rotation: 5, duration: 0.6, ease: "none" }, 0.5)
        .to(".people-image-2", { yPercent: 30, scale: 1.05, rotation: -3, duration: 0.6, ease: "none" }, 0.5)
        .to(".people-image-3", { xPercent: -20, yPercent: 15, scale: 1.2, duration: 0.6, ease: "none" }, 0.5)
        .to(".people-title", { opacity: 0, scale: 1.1, duration: 0.3 }, 0.7);

      /* ==================================================
         CHAPTER 04 � HORIZONTAL CAMPUS
      ================================================== */
      const campusTrack = document.querySelector(".campus-track");
      if (campusTrack) {
        gsap.to(campusTrack, {
          x: () => -(campusTrack.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".campus-horizontal",
            start: "top top",
            end: () => `+=${campusTrack.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      /* ==================================================
         CHAPTER 05 � UNNATI (Cinematic Pause)
      ================================================== */
      const unnatiTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".unnati",
          start: "top top",
          end: "+=2500",
          scrub: 1.5,
          pin: true,
        },
      });

      unnatiTimeline
        .fromTo(".unnati-main", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4 })
        // The background words float rapidly while the main text slowly scales
        .to(".unnati-main h2", { scale: 1.5, duration: 0.6 }, 0.4)
        .to(".word-learn", { xPercent: -50, yPercent: 20, rotation: -10, scale: 1.2, opacity: 0.1, duration: 0.6 }, 0.4)
        .to(".word-connect", { xPercent: 40, yPercent: -30, rotation: 5, scale: 1.3, opacity: 0.1, duration: 0.6 }, 0.4)
        .to(".word-create", { xPercent: -40, yPercent: -20, rotation: 15, scale: 1.1, opacity: 0.1, duration: 0.6 }, 0.4)
        // Darkness closes in (wipe)
        .to(".unnati", { backgroundColor: "#000", duration: 0.2 }, 0.8)
        .to(".unnati-main h2", { filter: "blur(20px)", opacity: 0, scale: 2.5, duration: 0.2 }, 0.8);

      /* ==================================================
         CHAPTER 06 � PROGRAMS
      ================================================== */
      gsap.utils.toArray(".program-card").forEach((card, index) => {
        gsap.fromTo(card,
          { y: 150, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      });

      /* ==================================================
         FINAL
      ================================================== */
      const finalTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".final",
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
        },
      });

      finalTimeline
        .fromTo(".final-small", { opacity: 0, y: 40, letterSpacing: "1em" }, { opacity: 1, y: 0, letterSpacing: "0.25em", duration: 0.3 })
        .fromTo(".final-title", { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4 }, 0.2)
        .fromTo(".final-button-wrapper", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.6);

      /* ==================================================
         REFRESH
      ================================================== */
      ScrollTrigger.refresh();

      // Mobile: progressively clear the blurred background as user scrolls hero
      if (window.innerWidth <= 900) {
        const heroEl = document.querySelector(".hero");
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress; // 0 at top, 1 at bottom
            const blur = Math.max(0, 12 - progress * 12);         // 12px -> 0px
            const overlay = Math.max(0, 0.45 - progress * 0.45); // 0.45 -> 0
            if (heroEl) {
              heroEl.style.setProperty("--hero-blur", `${blur}px`);
              heroEl.style.setProperty("--hero-overlay", overlay);
            }
          },
        });
      }

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        onLeave: () => {
          const iframe = document.getElementById("hero-yt");
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
          }
        },
        onEnterBack: () => {
          const iframe = document.getElementById("hero-yt");
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
          }
        }
      });

      return () => {
        lenis.destroy();
        gsap.ticker.remove(raf);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="welcome-page">
      <div ref={cursorRef} className="cursor-glow"></div>

      {/* ================= HERO ================= */}
      <section className="hero texture-dark">
        <iframe id="hero-yt" className="hero-video" src="https://www.youtube.com/embed/Ji9sXfyaQrQ?enablejsapi=1&autoplay=1&mute=1&vq=hd1080&controls=0&loop=1&playlist=Ji9sXfyaQrQ&showinfo=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0" allow="autoplay; encrypted-media" title="Hero Background Video" frameBorder="0" />
        <button 
          onClick={(e) => {
            const btn = e.currentTarget;
            const isMuted = btn.getAttribute("data-muted") === "true";
            const iframe = document.getElementById("hero-yt");
            if (iframe && iframe.contentWindow) {
              if (isMuted) {
                iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', "*");
                iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', "*");
                btn.setAttribute("data-muted", "false");
              } else {
                iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', "*");
                btn.setAttribute("data-muted", "true");
              }
            }
          }}
          data-muted="true"
          className="hero-sound-btn"
          title="Toggle sound"
        >
          {/* Muted icon (shown when muted) */}
          <svg className="icon-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
          {/* Unmuted icon (shown when sound is on) */}
          <svg className="icon-unmuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </button>
        <div className="hero-overlay" />
        <div className="hero-light-sweep" />
        
        <div className="hero-nav">
          <strong>UNNATI</strong>
          <span>IIIT BHAGALPUR</span>
        </div>

        <div className="hero-content">
          <div className="hero-kicker">UNNATI SOCIETY</div>
          <h1>
            <span className="hero-title-line-1">
              <SplitChars text="A NEW" className="char-line-1" />
            </span>
            <span className="hero-title-line-2">
              <SplitChars text="BEGINNING." className="char-line-2" />
            </span>
          </h1>
          <div className="hero-location">IIIT BHAGALPUR</div>
        </div>

        <a
          href="https://www.youtube.com/watch?v=Ji9sXfyaQrQ"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-yt-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Watch on YouTube
        </a>

        <div className="hero-scroll">
          SCROLL TO BEGIN
          <span />
        </div>
      </section>

      {/* ================= CHAPTER 01 ================= */}
      <section className="chapter-one cinematic texture-dark">
        <img className="chapter-one-image" src={ASSETS.campus1} alt="" />
        <div className="dark-layer" />
        <div className="chapter-one-content">
          <span className="chapter-one-number">01</span>
          <h2 className="chapter-one-title">
            A PLACE <br /> TO <em>BEGIN.</em>
          </h2>
          <p>Every journey starts with a single step. Your story at IIIT Bhagalpur begins here.</p>
        </div>
      </section>

      {/* ================= CHAPTER 02 ================= */}
      <section className="chapter-two cinematic texture-dark">
        <div className="chapter-two-image-wrapper">
          <img className="chapter-two-image" src="/assets/team.jpeg" alt="" />
        </div>
        <div className="chapter-two-text">
          <span>02  CAMPUS LIFE</span>
          <h2>MORE <br /> THAN <br /> A <em>CLUB.</em></h2>
          <p>The classrooms are only the beginning. The people, experiences and memories become part of your journey.</p>
        </div>
      </section>

      {/* ================= PEOPLE ================= */}
      <section className="people texture-light">
        <div className="people-title">
          <span>03 � COMMUNITY</span>
          <h2>DISCOVER <br /> YOUR <br /> <em>JOY.</em></h2>
        </div>

        <img className="people-image people-image-1" src="/assets/j1.jpeg" alt="" />
        <img className="people-image people-image-2" src="/assets/j2.jpeg" alt="" />
        <img className="people-image people-image-3" src="/assets/j3.jpeg" alt="" />
      </section>

      {/* ================= HORIZONTAL ================= */}
      <section className="campus-horizontal texture-blueprint">
        <div className="campus-heading">
          <span>04</span>
          <h2>OUR <br /> EVENTS.</h2>
        </div>

        <div className="campus-track">
          <article>
            <img src="https://ik.imagekit.io/zpkfsvgtn/Programs/WhatsApp_Image_2026-02-03_at_1.39%20(8).jpg" alt="Computer Centre" />
            <div>
              <span>01</span>
              <h3>RANG CHAKRA</h3>
            </div>
          </article>
          <article>
            <img src="https://ik.imagekit.io/zpkfsvgtn/events/1787828202848-IMG_20251114_150923_pWzdkOZqS.jpg" alt="Academic Life" />
            <div>
              <span>02</span>
              <h3>CHILDREN'S DAY</h3>
            </div>
          </article>
          <article>
            <img src="https://ik.imagekit.io/zpkfsvgtn/events/1787829489687-WhatsApp_Image_2026-08-27_at_16.17.10__1__Sbke9OWre.jpeg" alt="Hostel Life" />
            <div>
              <span>03</span>
              <h3>REPUBLIC DAY</h3>
            </div>
          </article>
          <article>
            <img src="https://ik.imagekit.io/zpkfsvgtn/Programs/WhatsApp_Image_2026-02-03_at_1.39%20(6).jpg" alt="Community" />
            <div>
              <span>04</span>
              <h3>MONTHLY TESTS</h3>
            </div>
          </article>
        </div>
      </section>

      {/* ================= UNNATI ================= */}
      <section className="unnati texture-light">
        <div className="unnati-main">
          <span>05 � UNNATI</span>
          <h2>UNNATI <br /> IS MORE <br /> THAN A <br /> <em>SOCIETY.</em></h2>
        </div>

        <div className="giant-word word-learn">LEARN</div>
        <div className="giant-word word-connect">CONNECT</div>
        <div className="giant-word word-create">CREATE</div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="programs texture-light">
        <div className="programs-header">
          <span>06 � PROGRAMS</span>
          <h2>WHAT <br /> WE <br /> <em>DO.</em></h2>
        </div>

        <div className="program-grid">
          <article className="program-card">
            <div className="program-image">
              <img src="https://ik.imagekit.io/zpkfsvgtn/Programs/Digi/IMG-20250412-WA0001_geachy.jpg" alt="Digixplore" />
            </div>
            <span>01</span>
            <h3>DIGIXPLORE</h3>
            <p>Digital education and technology access.</p>
          </article>
          <article className="program-card">
            <div className="program-image">
              <img src="https://ik.imagekit.io/zpkfsvgtn/Programs/Akshar/IMG_20251012_164240.jpg" alt="Akshar" />
            </div>
            <span>02</span>
            <h3>AKSHAR</h3>
            <p>Communication, confidence and learning.</p>
          </article>
          <article className="program-card">
            <div className="program-image">
              <img src="https://ik.imagekit.io/zpkfsvgtn/Programs/Netritva/IMG_6230.HEIC.heif" alt="Netritva" />
            </div>
            <span>03</span>
            <h3>NETRITVA</h3>
            <p>Leadership and career development.</p>
          </article>
        </div>
      </section>

      {/* ================= FINAL ================= */}`n      <FinalSection />
    </main>
  );
}













