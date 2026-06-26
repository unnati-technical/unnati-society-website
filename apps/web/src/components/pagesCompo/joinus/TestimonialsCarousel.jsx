import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Testimonials Data ─────────────────────────────────────────────────── */
const TESTIMONIALS = [
  { text: "I've felt the necessary pressure in a good way to manage myself and challenge myself. Been able to talk to a lot of different mindsets and got to work with them, became more social than ever and yeah definitely happier to be able to teach the children.", name: "Abhishek Gupta", role: "Volunteer" },
  { text: "I got to know about the real problem, why those kids are lagging behind. It's not only about what different we should be teaching but how consistent we need to be and how disciplined they need to be.", name: "Sanjana Adhikari", role: "Lead" },
  { text: "The biggest positive change in me would be the confidence level that has significantly increased. And also became a lot more empathetic and grateful as a person due to shift in perspective.", name: "Pranjal Parashar", role: "Volunteer" },
  { text: "I have become more socially aware. I continuously keep researching about things. There is a huge change in my perspective about the things happening around me. I have also got a bit control over my rage.", name: "Dheeraj Yadav", role: "President" },
  { text: "Increased confidence and a stronger sense of responsibility, also made me more socially aware, responsible, and mindful of the challenges faced by others.", name: "Ayush Yadav", role: "Lead" },
  { text: "The biggest positive change in me after joining Unnati has been the development of my leadership and communication skills. I learned how to manage a team, coordinate activities, and work with people. Unnati also helped me become more confident, responsible, and socially aware.", name: "Meghram Meena", role: "Mentor" },
];

/* ─── Testimonials Carousel ─────────────────────────────────────────────── */
const TestimonialsCarousel = () => {
  const VISIBLE = 3;
  const INTERVAL = 4000; // Swipe every 4 seconds
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const total = TESTIMONIALS.length;

  // Append the first VISIBLE items to the end to allow a seamless transition
  // from the last item back to the first.
  const extended = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, VISIBLE)];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => prev + 1);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    // When we've transitioned to the duplicate first set (which is at index `total`),
    // instantly jump back to the real first set (index 0) without a transition.
    if (current >= total) {
      setIsTransitioning(false);
      setCurrent(0);
    }
  };

  const cardWidthPct = 100 / VISIBLE;

  return (
    <section className="py-24 px-6 lg:px-16 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">Voices of Our Changemakers</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Carousel viewport */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${current * (100 / extended.length)}%)`,
              transition: isTransitioning ? 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
              width: `${extended.length * cardWidthPct}%`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((testimonial, i) => (
              <div
                key={i}
                className="px-4 box-border"
                style={{ width: `${100 / extended.length}%` }}
              >
                {/* Card — fixed height, flex-col so name stays at bottom */}
                <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-[320px]">
                  {/* Quote icon */}
                  <div className="text-blue-500 mb-4 shrink-0">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 21L16.41 14H11V3H21V14.081L18.064 21H14.017ZM3 21L5.393 14H0V3H10V14.081L7.049 21H3Z" />
                    </svg>
                  </div>

                  {/* Quote text — grows to fill space */}
                  <p className="text-gray-600 text-base italic leading-relaxed flex-grow overflow-hidden line-clamp-5">
                    "{testimonial.text}"
                  </p>

                  {/* Name & role — pinned to bottom-left */}
                  <div className="mt-4 pt-4 border-t border-gray-100 shrink-0">
                    <h5 className="font-bold text-[#0F172A] text-sm">{testimonial.name}</h5>
                    <p className="text-xs text-blue-600 font-semibold tracking-wide uppercase mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
