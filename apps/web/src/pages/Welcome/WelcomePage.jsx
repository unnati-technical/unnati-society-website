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
  video: "/assets/welcome.mp4",
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
         CHAPTER 03 — PEOPLE (Depth parallax)
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
         CHAPTER 04 — HORIZONTAL CAMPUS
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
         CHAPTER 05 — UNNATI (Cinematic Pause)
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
         CHAPTER 06 — PROGRAMS
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
        <video className="hero-video" src={ASSETS.video} autoPlay muted loop playsInline preload="auto" />
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
          <img className="chapter-two-image" src={ASSETS.hostel} alt="" />
        </div>
        <div className="chapter-two-text">
          <span>02 — CAMPUS LIFE</span>
          <h2>MORE <br /> THAN <br /> A <em>CAMPUS.</em></h2>
          <p>The classrooms are only the beginning. The people, experiences and memories become part of your journey.</p>
        </div>
      </section>

      {/* ================= PEOPLE ================= */}
      <section className="people texture-light">
        <div className="people-title">
          <span>03 — COMMUNITY</span>
          <h2>FIND <br /> YOUR <br /> <em>PEOPLE.</em></h2>
        </div>

        <img className="people-image people-image-1" src={ASSETS.students} alt="" />
        <img className="people-image people-image-2" src={ASSETS.community} alt="" />
        <img className="people-image people-image-3" src={ASSETS.campus2} alt="" />
      </section>

      {/* ================= HORIZONTAL ================= */}
      <section className="campus-horizontal texture-blueprint">
        <div className="campus-heading">
          <span>04</span>
          <h2>YOUR <br /> CAMPUS.</h2>
        </div>

        <div className="campus-track">
          <article>
            <img src={ASSETS.campus1} alt="" />
            <div>
              <span>01</span>
              <h3>COMPUTER CENTRE</h3>
            </div>
          </article>
          <article>
            <img src={ASSETS.campus2} alt="" />
            <div>
              <span>02</span>
              <h3>ACADEMIC LIFE</h3>
            </div>
          </article>
          <article>
            <img src={ASSETS.hostel} alt="" />
            <div>
              <span>03</span>
              <h3>HOSTEL LIFE</h3>
            </div>
          </article>
          <article>
            <img src={ASSETS.community} alt="" />
            <div>
              <span>04</span>
              <h3>COMMUNITY</h3>
            </div>
          </article>
        </div>
      </section>

      {/* ================= UNNATI ================= */}
      <section className="unnati texture-light">
        <div className="unnati-main">
          <span>05 — UNNATI</span>
          <h2>UNNATI <br /> IS MORE <br /> THAN A <br /> <em>SOCIETY.</em></h2>
        </div>

        <div className="giant-word word-learn">LEARN</div>
        <div className="giant-word word-connect">CONNECT</div>
        <div className="giant-word word-create">CREATE</div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="programs texture-light">
        <div className="programs-header">
          <span>06 — PROGRAMS</span>
          <h2>WHAT <br /> WE <br /> <em>DO.</em></h2>
        </div>

        <div className="program-grid">
          <article className="program-card">
            <div className="program-image">
              <img src={ASSETS.campus1} alt="" />
            </div>
            <span>01</span>
            <h3>DIGIXPLORE</h3>
            <p>Digital education and technology access.</p>
          </article>
          <article className="program-card">
            <div className="program-image">
              <img src={ASSETS.students} alt="" />
            </div>
            <span>02</span>
            <h3>AKSHAR</h3>
            <p>Communication, confidence and learning.</p>
          </article>
          <article className="program-card">
            <div className="program-image">
              <img src={ASSETS.community} alt="" />
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






