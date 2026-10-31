import { useEffect, useRef, useState } from "react";

// Add more sponsors here. `tier` shows as the small label on each card.
const SPONSORS = [
  {
    name: "Punjab National Bank",
    tier: "Title Sponsor",
    logo: "/assets/pnb-sponsor.png",
  },
];

const Corner = ({ className }) => (
  <span
    aria-hidden="true"
    className={`absolute h-3 w-3 border-[#3B82F6] transition-all duration-300 group-hover:h-5 group-hover:w-5 ${className}`}
  />
);

const Sponsers = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const reveal = (delay = "") =>
    `transition duration-700 ease-out ${delay} ${
      visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden border-t border-gray-100 bg-white px-6 pt-8 pb-16 md:px-12 md:pt-10 md:pb-20"
    >
      {/* faint dot grid, fades out toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div
          className={`flex flex-col items-start text-left ${reveal()}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#3B82F6]" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#3B82F6]">
              Our Sponsors
            </p>
          </div>

          <h2 className="oswald-font-3 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-gray-900 md:text-5xl">
            Proudly supported by
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
            Their backing helps us bring students, ideas and opportunities
            together.
          </p>
        </div>

        {/* sponsor cards */}
        <div className="mt-14 flex flex-wrap items-stretch justify-center gap-6 md:mt-16 ">
          {SPONSORS.map((s, i) => (
            <article
              key={s.name}
              className={`group relative flex w-full max-w-sm flex-col items-center rounded-2xl bg-white px-8 pb-8 pt-10 ring-1 ring-gray-200 transition-all duration-300 hover:shadow-[0_24px_60px_-20px_rgba(59,130,246,0.35)] hover:ring-[#3B82F6]/40 ${reveal(
                i === 0 ? "delay-150" : "delay-300"
              )}`}
            >
              <Corner className="left-0 top-0 rounded-tl-2xl border-l-2 border-t-2" />
              <Corner className="right-0 top-0 rounded-tr-2xl border-r-2 border-t-2" />
              <Corner className="bottom-0 left-0 rounded-bl-2xl border-b-2 border-l-2" />
              <Corner className="bottom-0 right-0 rounded-br-2xl border-b-2 border-r-2" />

              <span className="absolute -top-3 bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                {s.tier}
              </span>

              <div className="flex h-40 w-full items-center justify-center">
                <img
                  src={s.logo}
                  alt={s.name}
                  loading="lazy"
                  className="max-h-full w-auto max-w-[260px] object-contain transition duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <p className="mt-4 text-sm font-semibold tracking-wide text-gray-800">
                {s.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsers;