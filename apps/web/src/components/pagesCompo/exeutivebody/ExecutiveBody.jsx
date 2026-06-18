import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { cloudinaryImage } from "../../../utils/cloudinary";
import directorImg from "../../../assets/directorsir.png";
import prImg from "../../../assets/prsir.png";
import chetanImg from "../../../assets/chetansir.jpg";


const ExecutiveBody = () => {
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);

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
  ]

  const membersExecutive = [
    {
      name: "Dheeraj Yadav",
      post: "PRESIDENT",
      img: "dheeraj_cuclko",
      email: "dheeraj.230101050@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/dheeraj-yadav-681325218",
    },
    {
      name: "Divyanshu Pal",
      post: "VICE-PRESIDENT",
      img: "divyanshusir_zb2xxd",
      email: "divyanshu.230101051@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/divyaanshu/",
    },
    {
      name: "Ayush Thakur",
      post: "SECRETARY",
      img: "ayushThakur_p0kzyf",
      email: "ayush.240102123@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/ayush-kumar-thakur-544886325/",
    },
    {
      name: "Ayush Yadav",
      post: "Joint Secretary\nPrograms",
      img: "ayushyadv_z0khzd",
      email: "ayush.240102215@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=ayush%20yadav",
    },
    {
      name: "Twinkle Kumari",
      post: "Joint Secretary\nTechnical",
      img: "twinkle_akhjbq",
      email: "twinkle.240101143@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/twinkle-kumari-b09306325/",
    },
    {
      name: "Jayanshu Bhardwaj",
      post: "Joint Secretary\nPublic Relation",
      img: "jayanshuu_iwno29",
      email: "jayanshu.240101181@iitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/jayanshu-bhardwaj-05a791322/",
    },
  ];
  const prLeads = [
    {
      name: "Sanjana Adhikari",
      post: "Social Media Lead",
      img: "pic_-_Sanjana_Adhikari_lxddhm",
      email: "sanjana.240102169@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/sanjana-adhikari-541bab2a3",
    },

    {
      name: "Shashank Shekhar",
      post: "Event & Membership Coordinator",
      img: "shashankk_bbihmd",
      email: "shashankshekhar2734@gmail.com",
      linkedin: "https://www.linkedin.com/in/shashank-shekhar-4b6179339/",
    },
    {
      name: "Anushka Sonkar",
      post: "Event and Membership Coordinator",
      img: "Screenshot_2026-04-20_190608_s86hsv",
      email: "anushka.240102057@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/anushka-sonkar-2b9ba5324",
    },
    {
      name: "Sukrit Aryan",
      post: "Design and Content Lead",
      img: "Sukrit_Aryan_xgrmzg",
      email: "sukritaryan1@gmail.com",
      linkedin: "https://www.linkedin.com/in/sukrit-aryan",
    },
    {
      name: "Satyak Atul Govindwar",
      post: "Outreach Lead",
      img: "SATYAK_GOVINDWAR_nshcyu",
      email: "satyakatulgovindwar@gmail.com",
      linkedin: "https://www.linkedin.com/in/satyak-govindwar-6b2246324",
    },
  ];
  const programLeads = [

    {
      name: "Harsh Kumar Yadav",
      post: "Research & Development Lead",
      img: "IMG_20251006_094850_-_HARSH_YADAV_drkoll",
      email: "harsh.240101010@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/harsh-kumar-yadav-20844a2b6",
    },
    {
      name: "Krish Sonkar",
      post: "Research and Development Lead",
      img: "1759778636960_-_KRISH_SONKAR_uiuvvy",
      email: "krish.240101127@iiitbh.ac.in",
      linkedin: "#",
    },
    {
      name: "Anuj Sah",
      post: "Digixplore Lead",
      img: "Anuj_Sah_yohlp3",
      email: "anujah375@gmail.com",
      linkedin: "#",
    },
    {
      name: "Divya",
      post: "Digixplore Lead",
      img: "IMG-20260301-WA0099_-_Divya_Patlan_nndf4y",
      email: "divya.240101288@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/divya-patlan-4a2018324",
    },
    {
      name: "Twinkle Kumari",
      post: "Web Developmnt Lead",
      img: "twinkle_akhjbq",
      email: "twinkle.240101143@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/twinkle-kumari-b09306325/",
    },
    {
      name: "Sumendra Singh",
      post: "Akshar Lead",
      img: "https://ui-avatars.com/api/?name=Sumendra+Singh&background=random&color=fff&size=256",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Sneha Verma",
      post: "Akshar Lead",
      img: "https://ui-avatars.com/api/?name=Sneha+Verma&background=random&color=fff&size=256",
      email: "#",
      linkedin: "#",
    },
    {
      name: "Navneet Jaiswal",
      post: "Operations Lead",
      img: "IMG_20260413_104213_-_Navneet_Jaiswal_1_stokob",
      email: "navneet.240101028@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/navneet-jaiswal-8aa05b322",
    },
    {
      name: "Prabhat Rai",
      post: "Operations Lead",
      img: "prabhat_-_Prabhat_Rai_jax0i7",
      email: "prabhat.240103257@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/prabhat-rai",
    },
  ]
  const technicalLeads = [
    {
      name: "Jayanshu Bhardwaj",
      post: "Netritva Lead",
      img: "jayanshu_gdrakx",
      email: "jayanshu18@gmail.com",
      linkedin: "https://www.linkedin.com/in/jayanshu-bhardwaj-05a791322/",
    },
    {
      name: "Ishani Karpoor",
      post: "App Development Lead",
      img: "ishani_punner",
      email: "ishani.240103291@iiitbh.ac.in",
      linkedin: "https://www.linkedin.com/in/ishani-karpoor-8a73b1312",
    },
  ]


  const ProfileCard = ({ member, isCloudinary = true }) => {
    const isCloudinaryFinal = member.img && typeof member.img === 'string' && member.img.startsWith("http") ? false : isCloudinary;
    const imgSrc = isCloudinaryFinal ? cloudinaryImage(member.img) : member.img;
    const hasLinkedin = member.linkedin && member.linkedin !== "#";

    return (
      <div className="flex flex-col items-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative group">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-[6px] border-gray-50 shadow-inner group-hover:border-blue-50 transition-colors duration-300">
          <img
            src={imgSrc}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center w-full flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-1">{member.name}</h2>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-6 px-4 whitespace-pre-line">
            {member.post}
          </p>

          {/* Divider */}
          <div className="w-12 h-[2px] bg-gray-200 mb-6 group-hover:bg-blue-300 transition-colors duration-300"></div>

          {/* Social Links */}
          <div className="flex justify-center gap-5 items-center">
            <a
              href={`mailto:${member.email}`}
              className="text-gray-400 group-hover:text-red-300 hover:!text-red-600 transition-colors duration-300 flex items-center"
              title="Send Email"
            >
              <MdEmail size={28} />
            </a>

            <a
              href={hasLinkedin ? member.linkedin : "#"}
              target={hasLinkedin ? "_blank" : "_self"}
              rel="noreferrer"
              className={`transition-colors duration-300 flex items-center ${hasLinkedin ? "text-gray-400 group-hover:text-blue-300 hover:!text-[#0A66C2]" : "text-gray-200 cursor-not-allowed"}`}
              title={hasLinkedin ? "LinkedIn Profile" : "LinkedIn coming soon"}
              onClick={(e) => { if (!hasLinkedin) e.preventDefault(); }}
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const SectionHeader = ({ title }) => (
    <div className="flex flex-col items-center text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 oswald-font-3 tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="w-full bg-[#FAFAFA] font-sans pb-24">
      {/* Hero Section */}
      <div className="w-full bg-[#0F172A] py-20 md:py-28 px-6 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px]"></div>
        <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-xs md:text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Our People</h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 oswald-font-3 tracking-tight">The Minds Behind Unnati</h2>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">Meet the dedicated team of faculty, leaders, and student volunteers who drive our mission of equitable education forward.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-20">

        {/* GOVERNING BODY */}
        <section className="mb-24">
          <SectionHeader title="Governing Body" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {facultyExecutive.map((member, index) => (
              <ProfileCard key={index} member={member} isCloudinary={false} />
            ))}
          </div>
        </section>

        {/* EXECUTIVE BODY */}
        <section className="mb-24">
          <SectionHeader title="Executive Body 2025-26" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {membersExecutive.map((member, index) => (
              <ProfileCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* TEAM LEADS */}
        <section>
          <SectionHeader title="Team Leads" />

          {/* Toggle Button */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-100 p-1 rounded-full inline-flex relative shadow-sm border border-gray-200">
              <button
                onClick={() => setIsVerticalLayout(false)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${!isVerticalLayout ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Horizontal Stack
              </button>
              <button
                onClick={() => setIsVerticalLayout(true)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${isVerticalLayout ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Vertical Columns
              </button>
            </div>
          </div>

          {!isVerticalLayout ? (
            /* Horizontal Stack Layout (New) */
            <div className="flex flex-col gap-16">
              {/* Programs */}
              <div className="flex flex-col gap-8">
                <div className="bg-blue-600 text-white rounded-2xl py-4 px-6 text-center shadow-lg max-w-sm mx-auto w-full">
                  <h3 className="oswald-font-3 text-2xl tracking-wide">PROGRAMS </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
                  {programLeads.map((member, index) => (
                    <ProfileCard key={index} member={member} />
                  ))}
                </div>
              </div>

              {/* PR & Operations */}
              <div className="flex flex-col gap-8">
                <div className="bg-[#FFC107] text-black rounded-2xl py-4 px-6 text-center shadow-lg max-w-sm mx-auto w-full">
                  <h3 className="oswald-font-3 text-2xl tracking-wide"> PUBLIC RELATIONS</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
                  {prLeads.map((member, index) => (
                    <ProfileCard key={index} member={member} />
                  ))}
                </div>
              </div>

              {/* Technical */}
              <div className="flex flex-col gap-8">
                <div className="bg-blue-600 text-white rounded-2xl py-4 px-6 text-center shadow-lg max-w-sm mx-auto w-full">
                  <h3 className="oswald-font-3 text-2xl tracking-wide">TECHNICAL</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
                  {technicalLeads.map((member, index) => (
                    <ProfileCard key={index} member={member} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Vertical Columns Layout (Original) */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {/* Programs */}
              <div className="flex flex-col gap-6">
                <div className="bg-blue-600 text-white rounded-2xl py-4 px-6 text-center shadow-lg">
                  <h3 className="oswald-font-3 text-2xl tracking-wide">PROGRAMS </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {programLeads.map((member, index) => (
                    <ProfileCard key={index} member={member} />
                  ))}
                </div>
              </div>

              {/* PR & Operations */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#FFC107] text-black rounded-2xl py-4 px-6 text-center shadow-lg">
                  <h3 className="oswald-font-3 text-2xl tracking-wide">PERSONAL RELATIONS</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {prLeads.map((member, index) => (
                    <ProfileCard key={index} member={member} />
                  ))}
                </div>
              </div>

              {/* Technical */}
              <div className="flex flex-col gap-6">
                <div className="bg-blue-600 text-white rounded-2xl py-4 px-6 text-center shadow-lg">
                  <h3 className="oswald-font-3 text-2xl tracking-wide">TECHNICAL</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {technicalLeads.map((member, index) => (
                    <ProfileCard key={index} member={member} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ExecutiveBody;
