import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import NavUnn from "../components/common/NavUnn";
import Footer from "../components/common/Footer";

// All 9 sections in strict markdown sequence
import PrashastiHero from "../components/pagesCompo/prashasti/PrashastiHero";
import PrashastiAbout from "../components/pagesCompo/prashasti/PrashastiAbout";
import PrashastiWhyMatters from "../components/pagesCompo/prashasti/PrashastiWhyMatters";
import PrashastiPurpose from "../components/pagesCompo/prashasti/PrashastiPurpose";
import PrashastiBeyondCeremony from "../components/pagesCompo/prashasti/PrashastiBeyondCeremony";
import PrashastiSponsors from "../components/pagesCompo/prashasti/PrashastiSponsors";
import PrashastiPreviousEditions from "../components/pagesCompo/prashasti/PrashastiPreviousEditions";
import PrashastiTheme2026 from "../components/pagesCompo/prashasti/PrashastiTheme2026";
import PrashastiClosingBanner from "../components/pagesCompo/prashasti/PrashastiClosingBanner";

const PrashastiSamaroh = () => {
  useEffect(() => {
    document.title = "Unnati Prashasti Samaroh 2026 | Unnati Society, IIIT Bhagalpur";
    window.scrollTo(0, 0);

    // OpenGraph & Social Sharing Meta Tags
    const ogImage = typeof window !== "undefined" ? `${window.location.origin}/assets/prashasti/IMG_9935.JPG` : "https://ik.imagekit.io/unnati2/IMG_9836_nakfk6?tr=w-1200,h-630,fo-auto,q-85";
    const metaTags = [
      { property: "og:title", content: "Unnati Prashasti Samaroh 2026 | IIIT Bhagalpur" },
      { property: "og:description", content: "Celebrating Achievement. Recognising Effort. Inspiring Possibility — Flagship annual celebration of Unnati Society at IIIT Bhagalpur." },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: window.location.href },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Unnati Society · IIIT Bhagalpur" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Unnati Prashasti Samaroh 2026 | IIIT Bhagalpur" },
      { name: "twitter:description", content: "Celebrating Achievement. Recognising Effort. Inspiring Possibility — Flagship annual celebration of Unnati Society at IIIT Bhagalpur." },
      { name: "twitter:image", content: ogImage },
      { name: "description", content: "Unnati Prashasti Samaroh is the flagship annual celebration of Unnati Society at IIIT Bhagalpur, recognising and celebrating student achievement and community impact." }
    ];

    const injectedElements = [];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (property) element.setAttribute("property", property);
        if (name) element.setAttribute("name", name);
        document.head.appendChild(element);
        injectedElements.push(element);
      }
      element.setAttribute("content", content);
    });

    return () => {
      injectedElements.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Standard Header */}
      <Navbar />
      <NavUnn />

      {/* Page Sections in Strict Markdown Order */}
      <main>
        {/* 01 — Hero Section */}
        <PrashastiHero />

        {/* 02 — About Prashasti Samaroh */}
        <PrashastiAbout />

        {/* 03 — Why Prashasti Samaroh Matters */}
        <PrashastiWhyMatters />

        {/* 04 — Our Purpose (Recognise. Encourage. Empower.) */}
        <PrashastiPurpose />

        {/* 05 — Beyond the Ceremony (Recognition Is the Beginning, Not the Destination) */}
        <PrashastiBeyondCeremony />

        {/* 06 — Sponsors and Supporters (Making Recognition Possible, Together) */}
        <PrashastiSponsors />

        {/* 07 — Previous Editions (A Growing Tradition of Celebrating Achievement) */}
        <PrashastiPreviousEditions />

        {/* 08 — Prashasti Samaroh 2026 (This Year's Theme: More Than a Degree) */}
        <PrashastiTheme2026 />

        {/* 09 — Closing (Celebrating How Far We Have Come. Inspiring How Far We Can Go.) */}
        <PrashastiClosingBanner />
      </main>

      {/* 10 — Standard Website Footer */}
      <Footer />
    </div>
  );
};

export default PrashastiSamaroh;
