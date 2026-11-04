import { motion, useReducedMotion } from "framer-motion";

/**
 * Under-maintenance page.
 * Stack: React + Tailwind CSS + Framer Motion (no other dependencies).
 *
 * Usage:
 *   <MaintenancePage />
 *   <MaintenancePage title="Adhayaay is getting an upgrade" message="..." />
 */

function CraneIllustration({ animate = true }) {
  return (
    <svg
      viewBox="0 0 440 300"
      role="img"
      aria-label="A crane truck lifting a panel onto a web page under construction"
      className="h-auto w-full max-w-[440px]"
    >
      {/* ground */}
      <rect x="30" y="278" width="392" height="5" rx="2.5" fill="#9b9b9b" />

      {/* scaffold */}
      <g stroke="#d9d9d9" strokeWidth="4" fill="none" strokeLinecap="round">
        <line x1="72" y1="203" x2="72" y2="278" />
        <line x1="138" y1="203" x2="138" y2="278" />
        <line x1="204" y1="203" x2="204" y2="278" />
        <line x1="72" y1="203" x2="138" y2="278" />
        <line x1="138" y1="203" x2="72" y2="278" />
        <line x1="138" y1="203" x2="204" y2="278" />
        <line x1="204" y1="203" x2="138" y2="278" />
        <line x1="72" y1="240" x2="204" y2="240" />
      </g>

      {/* platform */}
      <rect x="45" y="193" width="195" height="10" rx="2" fill="#9b9b9b" />

      {/* screen */}
      <rect x="58" y="86" width="174" height="107" rx="5" fill="#fff" stroke="#a9a9a9" strokeWidth="6" />
      {/* header block */}
      <rect x="70" y="100" width="14" height="14" fill="#2a4bb5" />
      <rect x="84" y="100" width="40" height="14" fill="#4a4ae6" />
      {/* text lines */}
      <g fill="#dcdcdc">
        <rect x="70" y="120" width="54" height="5" />
        <rect x="70" y="131" width="54" height="5" />
        <rect x="70" y="142" width="54" height="5" />
        <rect x="70" y="153" width="54" height="5" />
      </g>
      {/* tile grid */}
      <g fill="#e6e6e6">
        <rect x="136" y="100" width="20" height="18" />
        <rect x="162" y="100" width="20" height="18" />
        <rect x="188" y="100" width="20" height="18" />
        <rect x="136" y="124" width="20" height="18" />
        <rect x="162" y="124" width="20" height="18" />
        <rect x="188" y="124" width="20" height="18" />
        <rect x="136" y="148" width="20" height="18" />
        <rect x="162" y="148" width="20" height="18" />
      </g>
      <rect x="188" y="148" width="20" height="18" fill="#ff8a00" />

      {/* boom */}
      <line x1="172" y1="24" x2="352" y2="222" stroke="#a3a3a3" strokeWidth="9" strokeLinecap="round" />
      <line x1="262" y1="123" x2="352" y2="222" stroke="#cfcfcf" strokeWidth="9" strokeLinecap="round" />

      {/* cable + hanging bar (the one animated moment) */}
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-2.5 172 24; 2.5 172 24; -2.5 172 24"
            keyTimes="0; 0.5; 1"
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />
        )}
        <line x1="172" y1="24" x2="172" y2="58" stroke="#8a8a8a" strokeWidth="3" />
        <rect x="128" y="58" width="88" height="7" fill="#4a4ae6" />
        <rect x="128" y="58" width="22" height="7" fill="#2a4bb5" />
      </g>
      <circle cx="172" cy="24" r="6" fill="#7d7d7d" />

      {/* truck body */}
      <rect x="330" y="236" width="92" height="28" rx="2" fill="#6b6b6b" />
      <rect x="330" y="228" width="92" height="9" fill="#8a8a8a" />
      {/* cab */}
      <path d="M284 264 V232 q0-8 8-8 h34 q8 0 8 8 V264 Z" fill="#e4e4e4" />
      <rect x="296" y="232" width="26" height="16" rx="2" fill="#f2f2f2" stroke="#bdbdbd" strokeWidth="2" />
      <rect x="302" y="236" width="9" height="9" fill="#f0b429" />
      <rect x="314" y="238" width="5" height="9" fill="#4a4ae6" />
      {/* front bumper */}
      <rect x="276" y="254" width="20" height="12" rx="3" fill="#8f8f8f" />

      {/* wheels */}
      <g>
        <circle cx="306" cy="268" r="13" fill="#4f4f4f" />
        <circle cx="306" cy="268" r="6" fill="#a8a8a8" />
        <circle cx="392" cy="268" r="13" fill="#4f4f4f" />
        <circle cx="392" cy="268" r="6" fill="#a8a8a8" />
      </g>
    </svg>
  );
}

export default function UnderMaintaince({
  title = "Section under maintenance",
  message = "This section is currently undergoing scheduled maintenance. We should be back shortly.",
}) {
  const reduceMotion = useReducedMotion();

  // Go to the previous page; if there is none (e.g. opened in a new tab), go home.
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <motion.section
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex w-full max-w-xl flex-col items-center text-center"
        role="status"
        aria-live="polite"
      >
        <CraneIllustration animate={!reduceMotion} />

        <h1 className="mt-8 text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-700 sm:text-lg">
          {message}
        </p>

        <button
          type="button"
          onClick={handleBack}
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="M12 4 6 10l6 6" />
          </svg>
          Go back
        </button>
      </motion.section>
    </main>
  );
}