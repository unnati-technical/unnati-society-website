import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaChevronDown,
  FaTrophy,
  FaCalendarAlt,
  FaLaptop,
  FaClock,
  FaCrown,
} from "react-icons/fa";
import { leaderboardApi } from "../../../api/leaderboard.api";
import AnimatedCounter from "../../../components/common/AnimatedCounter";

const fallbackData = {
  "2026-08": [
    {
      rank: 1,
      name: "Dheeraj Yadav",
      role: "Founder & Program Manager",
      workshops: 31,
      hours: 128,
      avatar: null,
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    },
    {
      rank: 2,
      name: "Shivam Kumar",
      role: "Core Volunteer",
      workshops: 28,
      hours: 112,
      avatar: null,
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    },
    {
      rank: 3,
      name: "Srishti Kumari",
      role: "Core Volunteer",
      workshops: 24,
      hours: 96,
      avatar: null,
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  ]
};

const formatMonthName = (key) => {
  if (key === "ALL_TIME") return "All Time Hall of Fame";
  const [year, month] = key.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const Leaderboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("2026-08");
  const [months, setMonths] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchMonthsAndActive = async () => {
      try {
        const [monthsRes, activeRes] = await Promise.all([
          leaderboardApi.getMonths(),
          leaderboardApi.getActiveMonth()
        ]);
        const activeMonths = (monthsRes || []).filter(m => m !== "ALL_TIME");
        activeMonths.sort((a, b) => b.localeCompare(a));
        if (activeMonths.length > 0) {
          setMonths(activeMonths);
          if (activeRes && activeMonths.includes(activeRes)) {
            setSelectedMonth(activeRes);
          } else {
            setSelectedMonth(activeMonths[0]);
          }
        } else {
          setMonths(["2026-08"]);
          setSelectedMonth("2026-08");
        }
      } catch (err) {
        console.error("Failed to load dynamic months list", err);
        setMonths(["2026-08"]);
        setSelectedMonth("2026-08");
      }
    };
    fetchMonthsAndActive();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const res = await leaderboardApi.getByMonth(selectedMonth);
        if (res && res.length > 0) {
          setEntries(res);
        } else {
          setEntries(fallbackData[selectedMonth] || []);
        }
      } catch (err) {
        console.error(err);
        setEntries(fallbackData[selectedMonth] || []);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [selectedMonth]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getEntryByRank = (rank) => {
    return entries.find((e) => e.rank === rank) || null;
  };

  const renderAvatar = (entry) => {
    if (entry.avatar) {
      return (
        <img
          src={entry.avatar}
          alt={entry.name}
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    const initials = entry.name
      ? entry.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
      : "V";

    const gradients = {
      1: "from-yellow-400 to-amber-500 text-amber-950",
      2: "from-slate-300 to-slate-400 text-slate-900",
      3: "from-amber-600 to-amber-700 text-amber-100",
    }[entry.rank] || "from-blue-400 to-indigo-500 text-white";

    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradients} flex items-center justify-center font-bold text-lg rounded-full`}>
        {initials}
      </div>
    );
  };

  // 2 -> 1 -> 3 animation order
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (rank) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: rank === 2 ? 0.1 : rank === 1 ? 0.35 : 0.6,
        ease: "easeOut",
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Sort visually: Rank 2 on Left, Rank 1 in Center, Rank 3 on Right
  const displayRanks = [2, 1, 3];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-[24px] border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col gap-4 relative w-full overflow-visible"
    >
      {/* Header Row */}
      <div className="flex justify-between items-center relative overflow-visible">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
            <FaTrophy className="text-xl" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#0F172A] text-lg leading-tight tracking-tight">
              VOLUNTEER LEADERBOARD
            </h3>
            <p className="text-gray-400 text-xs font-semibold mt-0.5">
              Recognizing our most impactful volunteers.
            </p>
          </div>
        </div>

        {/* Dropdown Select */}
        <div className="relative z-30" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-50/70 hover:bg-blue-50 text-[#3B82F6] font-extrabold text-[11px] md:text-xs rounded-xl px-4 py-2 border border-blue-100 flex items-center gap-2 transition duration-200 shadow-sm"
          >
            <FaCalendarAlt className="text-sm" /> {formatMonthName(selectedMonth)}
            <FaChevronDown size={10} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 5, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 flex flex-col text-left"
              >
                {months.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(m);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between transition ${selectedMonth === m ? "text-[#3B82F6] bg-blue-50/30" : "text-gray-600"
                      }`}
                  >
                    <span>{formatMonthName(m)}</span>
                    {selectedMonth === m && <span className="text-[#3B82F6]">✓</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid: Sequential Entrance Animations & Stack Order */}
      {loading ? (
        <div className="flex items-center justify-center h-[280px]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-4 mt-4 mb-1 overflow-visible">
          {displayRanks.map((rank) => {
            const entry = getEntryByRank(rank);
            if (!entry) return null;

            // Order styling: Rank 1 goes first on mobile (`order-1`), then Rank 2 (`order-2`), Rank 3 (`order-3`)
            const mobileOrder = {
              1: "order-1 lg:order-2 lg:-translate-y-2 lg:scale-[1.04]",
              2: "order-2 lg:order-1",
              3: "order-3 lg:order-3",
            }[rank];

            // Card style configuration depending on rank
            const rankStyles = {
              1: {
                border: "border-yellow-300 hover:border-yellow-400",
                badgeBg: "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-yellow-200",
                glow: "shadow-[0_8px_30px_rgba(234,179,8,0.06)] hover:shadow-[0_12px_40px_rgba(234,179,8,0.15)] hover:border-yellow-400/60",
                glowBorder: "hover:ring-1 hover:ring-yellow-400/40",
              },
              2: {
                border: "border-gray-200 hover:border-gray-300",
                badgeBg: "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-slate-200",
                glow: "shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(148,163,184,0.12)] hover:border-slate-300",
                glowBorder: "hover:ring-1 hover:ring-slate-300/30",
              },
              3: {
                border: "border-amber-600/20 hover:border-amber-600/30",
                badgeBg: "bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-amber-200",
                glow: "shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(180,83,9,0.1)] hover:border-amber-500/40",
                glowBorder: "hover:ring-1 hover:ring-amber-500/20",
              },
            }[rank];

            return (
              <motion.div
                key={entry.id || rank}
                custom={rank}
                variants={cardVariants}
                className={`bg-white border rounded-[20px] px-5 py-4 flex flex-col items-center text-center relative w-full max-w-[290px] lg:w-[32%] transition-all duration-300 hover:z-20 group cursor-default ${mobileOrder} ${rankStyles.border} ${rankStyles.glow} ${rankStyles.glowBorder}`}
              >
                {/* Crown above Rank 1 Profile Photo */}
                {rank === 1 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
                    <FaCrown className="text-yellow-500 text-3xl drop-shadow-md" />
                  </div>
                )}

                {/* Rank Badge */}
                <div className={`absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-sm ${rankStyles.badgeBg}`}>
                  {rank}
                </div>

                {/* Profile Photo */}
                <div className="w-20 h-20 rounded-full p-[3px] border border-gray-100 bg-white shadow-inner mb-3">
                  {renderAvatar(entry)}
                </div>

                {/* Info */}
                <h4 className="font-extrabold text-gray-900 text-sm tracking-tight truncate w-full px-1">
                  {entry.name}
                </h4>
                <p className="text-[#3B82F6] font-semibold text-xs tracking-normal font-medium mt-0.5 mb-4">
                  {entry.role}
                </p>

                {/* Laurel Leaves Ornament for Rank 1 (optional, styled beautifully)
                {rank === 1 && (
                  <>
                    <div className="absolute -left-3 top-[35%] text-yellow-500/40 pointer-events-none hidden xl:block scale-x-[-1] scale-75">
                      🍃🍂🍃
                    </div>
                    <div className="absolute -right-3 top-[35%] text-yellow-500/40 pointer-events-none hidden xl:block scale-75">
                      🍃🍂🍃
                    </div>
                  </>
                )} */}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full py-2.5 border-t border-b border-gray-50 mb-4 bg-gray-50/40 rounded-xl px-2">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-blue-500">
                      <FaLaptop className="text-blue-500 text-sm" />
                      <span className="text-[13px] font-black text-gray-900 oswald-font-3">
                        <AnimatedCounter value={entry.workshops} duration={1.5} />
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                      Workshops
                    </span>
                  </div>

                  <div className="flex flex-col items-center border-l border-gray-100">
                    <div className="flex items-center gap-1 text-green-500">
                      <FaClock className="text-green-500 text-sm" />
                      <span className="text-[13px] font-black text-gray-900 oswald-font-3">
                        <AnimatedCounter value={entry.hours} duration={1.5} />
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                      Hours
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  {entry.linkedin && (
                    <a
                      href={entry.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0077B5] transition-all duration-300 hover:scale-125"
                      title="LinkedIn Profile"
                    >
                      <FaLinkedin size={16} />
                    </a>
                  )}
                  {entry.instagram && (
                    <a
                      href={entry.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#E1306C] transition-all duration-300 hover:scale-125"
                      title="Instagram Profile"
                    >
                      <FaInstagram size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Internal Card Footer */}
      <div className="border-t border-gray-100 pt-3 mt-2 flex items-center justify-center gap-2">
        <p className="text-gray-500 text-[11px] font-semibold text-center select-none flex items-center gap-1">
          Recognizing volunteers who create lasting impact across our communities.
        </p>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
