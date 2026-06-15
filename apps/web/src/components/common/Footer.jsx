import React from "react";
import Unnati from "./../../assets/Unnati.png";
import IIITBh from "./../../assets/IIITBh.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-white px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img
              src={IIITBh}
              alt="IIIT Bhagalpur logo"
              className="h-12 object-contain"
            />

            <div className="w-0.5 h-10 bg-white/60"></div>

            <img
              src={Unnati}
              alt="Unnati logo"
              className="h-12 object-contain"
            />
          </div>
          <div className="flex gap-4 text-white/70">
            <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer"
              onClick={()=>navigate("https://www.instagram.com/unnati_society_iiitbh_/")}>        
              i
            </span>
            <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer"
              onClick={()=>navigate("https://x.com/Unnati_Welfare")}>
              x
            </span>
            <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer"
              onClick={()=>navigate("https://www.linkedin.com/company/unnati-society-iiit-bhagalpur/")}>
              in
            </span>
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
                onClick={()=>navigate("/contact")}
                >
                Contact
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/executive-body")}
            >
              Executive Body
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
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-widest text-white/70 mb-2">
            SUBSCRIBE
          </h1>

          <p className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer">
            email: <span className="text-blue-400">unnati.ir@iiitbh.ac.in</span>
          </p>

          <p className="text-sm text-white/60 mb-3">Get the latest updates</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 text-sm bg-white text-black outline-none"
            />
            <button className="px-4 py-2 text-sm bg-white text-black font-semibold">
              OK
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
