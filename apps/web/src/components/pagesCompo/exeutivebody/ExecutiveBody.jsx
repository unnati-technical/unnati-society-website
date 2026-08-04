import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { leadershipApi } from "../../../api/leadership.api";
import { queryKeys } from "../../../constants/queryKeys";
import { imagekitImage } from "../../../utils/imagekit";
import { useLocation } from "react-router-dom";
const directorImg =
  "https://ik.imagekit.io/zpkfsvgtn/leadership_profiles/directorsir.png?updatedAt=1785677499424";
const prImg =
  "https://ik.imagekit.io/zpkfsvgtn/leadership_profiles/prsir.png?updatedAt=1785677498951";
const chetanImg =
  "https://ik.imagekit.io/zpkfsvgtn/leadership_profiles/chetansir.jpg?updatedAt=1785677498860";

const SectionHeader = ({ title }) => (
  <div className="flex flex-col items-center text-center mb-12">
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 oswald-font-3 tracking-tight">
      {title}
    </h2>
  </div>
);

import { ProgressiveImage } from "../../common/ProgressiveImage";

const ProfileCard = ({ member, isImageKit = true, showSocials = true }) => {
  const isImageKitFinal =
    member.img &&
    typeof member.img === "string" &&
    member.img.startsWith("http")
      ? false
      : isImageKit;
  let imgSrc =
    isImageKitFinal && member.img ? imagekitImage(member.img) : member.img;
  if (!imgSrc) {
    imgSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || "User")}&background=random&color=fff&size=256`;
  }
  const hasLinkedin = member.linkedin && member.linkedin !== "#";

  return (
    <div className="flex flex-col items-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative group h-full">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-[6px] border-gray-50 shadow-inner group-hover:border-blue-50 transition-colors duration-300 shrink-0">
        <ProgressiveImage
          src={imgSrc}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center w-full flex flex-col items-center h-full grow">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-1">
          {member.name}
        </h2>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-6 px-4 whitespace-pre-line grow">
          {member.post}
        </p>

        {showSocials && (
          <div className="w-full flex flex-col items-center mt-auto">
            {/* Divider */}
            <div className="w-12 h-0.5 bg-gray-200 mb-6 group-hover:bg-blue-300 transition-colors duration-300"></div>

            {/* Social Links */}
            <div className="flex justify-center gap-5 items-center">
              <a
                href={`mailto:${member.email}`}
                className="text-gray-400 group-hover:text-red-300 hover:text-red-600 transition-colors duration-300 flex items-center"
                title="Send Email"
              >
                <MdEmail size={28} />
              </a>

              <a
                href={hasLinkedin ? member.linkedin : "#"}
                target={hasLinkedin ? "_blank" : "_self"}
                rel="noreferrer"
                className={`transition-colors duration-300 flex items-center ${hasLinkedin ? "text-gray-400 group-hover:text-blue-300 hover:text-[#0A66C2]" : "text-gray-200 cursor-not-allowed"}`}
                title={
                  hasLinkedin ? "LinkedIn Profile" : "LinkedIn coming soon"
                }
                onClick={(e) => {
                  if (!hasLinkedin) e.preventDefault();
                }}
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ExecutiveBody = () => {
  const facultyExecutive = [
    {
      name: "Prof. Madhusudan Singh",
      post: "Director\nIIIT Bhagalpur",
      img: directorImg,
      email: "director@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/dheeraj-yadav-681325218",
    },
    {
      name: "Dr. Prakash Ranjan",
      post: "Faculty In-Charge\nUnnati Society",
      img: prImg,
      email: "pranjan.ece@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/dr-prakash-ranjan/",
    },
    {
      name: "Dr. Chetan Barde",
      post: "Faculty Mentor\nUnnati Society",
      img: chetanImg,
      email: "cbarde.ece@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/dr-chetan-barde-07146449/",
    },
  ];

  const [selectedYear, setSelectedYear] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: queryKeys.leadership,
    queryFn: leadershipApi.getLeadershipData,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.hash && !isLoading) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location.hash, isLoading]);

  useEffect(() => {
    if (data.length > 0 && !selectedYear) {
      const activeYear = data.find((d) => d.isActive);
      if (activeYear) {
        setSelectedYear(activeYear.year);
      } else {
        setSelectedYear(data[0].year);
      }
    }
  }, [data, selectedYear]);
  const currentYearData = data.find((d) => d.year === selectedYear) || {
    sections: [],
  };

  const isExecSection = (s) =>
    s.slug === "executive-body" ||
    s.slug === "executive-leads" ||
    s.name.toLowerCase().includes("executive");

  const execBodySection = currentYearData.sections.find(isExecSection);
  const otherSections = currentYearData.sections.filter(
    (s) => !isExecSection(s) && s.isVisible,
  );

  // Map backend member format to frontend ProfileCard format
  const mapMember = (m) => ({
    name: m.fullName,
    post: m.designation,
    img: m.profileImage,
    email: m.email,
    linkedin: m.linkedin,
  });

  return (
    <div className="w-full bg-[#FAFAFA] font-sans pb-24">
      {/* Hero Section */}
      <div className="w-full bg-[#0F172A] py-8 md:py-10 px-6 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-50%] right-[-10%] w-125 h-125 rounded-full bg-blue-600/20 blur-[100px]"></div>
        <div className="absolute bottom-[-50%] left-[-10%] w-100 h-100 rounded-full bg-blue-500/20 blur-[100px]"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-xs md:text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">
            Our People
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-2 oswald-font-3 tracking-tight">
            The Minds Behind Unnati
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated team of faculty, leaders, and students who drive
            our mission of equitable education forward.
          </p>
        </div>
      </div>

      <div className="max-w-350 w-full mx-auto px-4 md:px-6 pt-8">
        {/* GOVERNING BODY */}
        <section id="governing-body" className="mb-24 scroll-mt-24">
          <SectionHeader title="Governing Body" />
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {facultyExecutive.map((member, index) => (
              <div key={index} className="w-full sm:w-[320px]">
                <ProfileCard
                  member={member}
                  isImageKit={false}
                  showSocials={false}
                />
              </div>
            ))}
          </div>
        </section>

        {/* YEAR FILTER */}
        {data.length > 0 && (
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
              <label
                htmlFor="yearFilter"
                className="text-sm font-semibold text-gray-600 pl-2"
              >
                Select Term:
              </label>
              <select
                id="yearFilter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {data.map((year) => (
                  <option key={year.year} value={year.year}>
                    {year.year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* EXECUTIVE BODY */}
            <section id="executive-body" className="mb-24 scroll-mt-24">
              <SectionHeader title={`Executive Body ${selectedYear}`} />
              {execBodySection?.members?.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4 w-full">
                  {execBodySection.members
                    .filter((m) => m.isPublished)
                    .map((member, index) => (
                      <div
                        key={index}
                        className="w-full sm:w-52.5 lg:w-55 xl:w-60"
                      >
                        <ProfileCard member={mapMember(member)} />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 font-medium">
                  Data for this term will be updated soon.
                </p>
              )}
            </section>

            {/* TEAM LEADS */}
            <section>
              <SectionHeader title={`Team Leads ${selectedYear}`} />
              <div className="flex flex-col gap-16">
                {otherSections.map((section) => (
                  <div
                    id={
                      section.slug ||
                      section.name.toLowerCase().replace(/\s+/g, "-")
                    }
                    key={section.id}
                    className="flex flex-col gap-8 scroll-mt-24"
                  >
                    <div
                      className={`${section.badgeColor === "yellow" ? "bg-[#FFC107] text-black" : "bg-blue-600 text-white"} rounded-2xl py-4 px-6 text-center shadow-lg max-w-sm mx-auto w-full`}
                    >
                      <h3 className="oswald-font-3 text-2xl tracking-wide uppercase">
                        {section.name}
                      </h3>
                    </div>
                    {section.members.filter((m) => m.isPublished).length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-4">
                        {section.members
                          .filter((m) => m.isPublished)
                          .map((member, index) => (
                            <div
                              key={index}
                              className="w-full sm:w-52.5 lg:w-55 xl:w-60"
                            >
                              <ProfileCard
                                member={mapMember(member)}
                                showSocials={true}
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 font-medium">
                        Data for this term will be updated soon.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ExecutiveBody;
