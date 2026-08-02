import React, { useState } from "react";
const Unnati = "https://ik.imagekit.io/unnati/v1782396887/unnati_assets/Unnati.png";
const IIITBh = "https://ik.imagekit.io/unnati/v1782396815/unnati_assets/IIITBh.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import AuthModal from "./AuthModal";
import { apiClient } from "../../api/client";
import { toast } from "sonner";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPeoplePage = location.pathname === '/executive-body';
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubscribing(true);
    try {
      await apiClient.post("/api/subscribers", { email });
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-black text-white px-8 md:px-16 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img loading="lazy"
              src={IIITBh}
              alt="IIIT Bhagalpur logo"
              className="h-12 object-contain"
            />

            <div className="w-0.5 h-10 bg-white/60"></div>

            <img loading="lazy"
              src={Unnati}
              alt="Unnati logo"
              className="h-12 object-contain"
            />
          </div>
          <div className="flex gap-4 text-white/70">
            <a href="https://www.instagram.com/unnati_society_iiitbh_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-all duration-200"
              aria-label="Instagram">
              <FaInstagram size={16} />
            </a>
            <a href="https://x.com/Unnati_Welfare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:border-white hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="X (formerly Twitter)">
              <FaXTwitter size={15} />
            </a>
            <a href="https://www.linkedin.com/company/unnati-society-iiit-bhagalpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-200"
              aria-label="LinkedIn">
              <FaLinkedin size={16} />
            </a>
          </div>
          <div className="text-sm leading-relaxed">
            IIIT Bhagalpur, Sabour, Bhagalpur, Bihar, 813210
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-sm font-semibold tracking-widest text-white/70">
            MENU
          </h1>
          <ul className="flex flex-col gap-2 text-sm text-white/60">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/about-us")}
            >
              About
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/programs")}
            >
              Impact
            </li>
            <li className="hover:text-white cursor-pointer"
              onClick={() => navigate("/join-us")}
            >
              Join Us
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/executive-body")}
            >
              People
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-sm font-semibold tracking-widest text-white/70 mb-3">
              PROGRAMS
            </h1>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/programs/digiXplore")}
              >
                DigiXplore
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/programs/netritva")}
              >
                Netritva
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/programs/akshar")}
              >
                Akshar
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/outreach")}
              >
                Outreach
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-sm font-semibold tracking-widest text-white/70 mb-3">
              SUPPORT & LEGAL
            </h1>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/terms-and-conditions")}
              >
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-widest text-white/70 mb-2">
            SUBSCRIBE
          </h1>

          <p className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer">
            Email: <span className="text-blue-400">unnati.ir@iiitbh.ac.in</span>
          </p>

          <p className="text-sm text-white/60 mb-3">Get the latest updates</p>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Email"
              className="px-3 py-2 text-sm bg-white text-black outline-none disabled:opacity-75"
              disabled={isSubscribing}
            />
            <button 
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="px-4 py-2 text-sm bg-white text-black font-semibold disabled:opacity-75"
            >
              {isSubscribing ? "..." : "OK"}
            </button>
          </div>

          {isPeoplePage && (
            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsAuthOpen(true)}
                className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase font-semibold"
              >
                Admin Login
              </button>
            </div>
          )}
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </footer>
  );
};

export default Footer;
