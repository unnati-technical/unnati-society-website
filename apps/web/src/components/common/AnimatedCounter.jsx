import React, { useState, useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const AnimatedCounter = ({ value, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Triggers when 50% in view

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        onUpdate: (v) => setCount(Math.round(v)),
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
