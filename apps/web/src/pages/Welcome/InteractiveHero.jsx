import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./InteractiveHero.css";

export default function InteractiveHero() {
  const containerRef = useRef(null);
  
  // Refs for layers
  const bgRef = useRef(null);
  const roomRef = useRef(null);
  const studentRef = useRef(null);
  const pcRef = useRef(null);
  const deskRef = useRef(null);
  const foregroundRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient animations (breathing, glow)
      gsap.to(studentRef.current, {
        y: "+=3",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to(pcRef.current, {
        filter: "brightness(1.15) drop-shadow(0 0 25px rgba(37, 99, 235, 0.4))",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // QuickTo setups for cursor parallax
      const xToBg = gsap.quickTo(bgRef.current, "x", { duration: 0.8, ease: "power3" });
      const xToRoom = gsap.quickTo(roomRef.current, "x", { duration: 0.7, ease: "power3" });
      const xToStudent = gsap.quickTo(studentRef.current, "x", { duration: 0.5, ease: "power3" });
      const xToPc = gsap.quickTo(pcRef.current, "x", { duration: 0.4, ease: "power3" });
      const xToDesk = gsap.quickTo(deskRef.current, "x", { duration: 0.3, ease: "power3" });
      const xToFg = gsap.quickTo(foregroundRef.current, "x", { duration: 0.2, ease: "power3" });

      const yToBg = gsap.quickTo(bgRef.current, "y", { duration: 0.8, ease: "power3" });
      const yToRoom = gsap.quickTo(roomRef.current, "y", { duration: 0.7, ease: "power3" });
      const yToStudent = gsap.quickTo(studentRef.current, "y", { duration: 0.5, ease: "power3" });
      const yToPc = gsap.quickTo(pcRef.current, "y", { duration: 0.4, ease: "power3" });
      const yToDesk = gsap.quickTo(deskRef.current, "y", { duration: 0.3, ease: "power3" });
      const yToFg = gsap.quickTo(foregroundRef.current, "y", { duration: 0.2, ease: "power3" });

      // Camera rotation effect on the container
      const rotXTo = gsap.quickTo(containerRef.current, "rotationX", { duration: 0.6, ease: "power3" });
      const rotYTo = gsap.quickTo(containerRef.current, "rotationY", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        // Normalize mouse coordinates from -1 to 1
        const nx = (e.clientX / innerWidth) * 2 - 1;
        const ny = (e.clientY / innerHeight) * 2 - 1;

        // Apply distinct multipliers for depth
        xToBg(nx * -15);
        yToBg(ny * -15);

        xToRoom(nx * -30);
        yToRoom(ny * -30);

        xToStudent(nx * -50);
        yToStudent(ny * -50);

        xToPc(nx * -75);
        yToPc(ny * -75);

        xToDesk(nx * -95);
        yToDesk(ny * -95);

        xToFg(nx * -130);
        yToFg(ny * -130);

        // Subtle container rotation for camera effect
        rotYTo(nx * 3);
        rotXTo(ny * -3);
        
        // PC Screen Glow Proximity
        if (pcRef.current) {
          const pcRect = pcRef.current.getBoundingClientRect();
          const pcCenterX = pcRect.left + pcRect.width / 2;
          const pcCenterY = pcRect.top + pcRect.height / 2;
          const dist = Math.sqrt(Math.pow(e.clientX - pcCenterX, 2) + Math.pow(e.clientY - pcCenterY, 2));
          
          if (dist < 400) {
            gsap.to(pcRef.current, { filter: "brightness(1.5) drop-shadow(0 0 40px rgba(37, 99, 235, 0.8))", duration: 0.3, overwrite: "auto" });
          } else {
            gsap.to(pcRef.current, { filter: "brightness(1.15) drop-shadow(0 0 25px rgba(37, 99, 235, 0.4))", duration: 0.5, overwrite: "auto" });
          }
        }
      };

      if (window.innerWidth >= 768) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="interactive-hero-section">
      <div className="interactive-hero-scene" ref={containerRef}>
        
        {/* Layer 1: Deep Background */}
        <div className="scene-layer layer-bg" ref={bgRef}>
          <div className="placeholder-art">BACKGROUND (Stars / Night Sky)</div>
        </div>

        {/* Layer 2: Room/Environment */}
        <div className="scene-layer layer-room" ref={roomRef}>
          <div className="placeholder-art">ROOM (Window & Bookshelves)</div>
        </div>

        {/* Layer 3: Student */}
        <div className="scene-layer layer-student" ref={studentRef}>
          <div className="placeholder-art silhouette">STUDENT</div>
        </div>

        {/* Layer 4: PC Monitor */}
        <div className="scene-layer layer-pc" ref={pcRef}>
          <div className="placeholder-art monitor">
            <div className="screen-content">
              <span>UNNATI</span>
              <div className="code-line"></div>
              <div className="code-line short"></div>
            </div>
          </div>
        </div>

        {/* Layer 5: Desk */}
        <div className="scene-layer layer-desk" ref={deskRef}>
          <div className="placeholder-art desk-surface">DESK</div>
        </div>

        {/* Layer 6: Foreground (Lamp/Books) */}
        <div className="scene-layer layer-fg" ref={foregroundRef}>
          <div className="placeholder-art lamp">LAMP</div>
          <div className="placeholder-art foreground-books">BOOKS</div>
        </div>
      </div>
      
      <div className="interactive-hero-overlay">
        <h1>WELCOME TO UNNATI.</h1>
        <p>A cinematic learning experience.</p>
      </div>
    </section>
  );
}
