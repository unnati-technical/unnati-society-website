import React, { lazy } from "react";
import Navbar from "../components/common/Navbar";
import NavUnn from "../components/common/NavUnn";
import HeroSection from "../components/pagesCompo/homepage/HeroSection";
import { LazySection } from "../components/common/LazySection";

const Footer = lazy(() => import("../components/common/Footer"));
const FresherPage = lazy(
  () => import("../components/pagesCompo/fresher/Fresher"),
);

const Fresher = () => {
  return (
    <div className="overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <NavUnn />
      <LazySection>
        <FresherPage />
      </LazySection>
      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
};

export default Fresher;
