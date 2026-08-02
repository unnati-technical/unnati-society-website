import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiSearch, FiChevronDown, FiClock, FiMapPin, 
  FiBriefcase, FiUsers, FiBookOpen, FiAward, FiGlobe, 
  FiHeart, FiCheckCircle, FiChevronRight, FiFilter,
  FiArrowRight, FiInfo, FiTag
} from 'react-icons/fi';
const UnnatiLogo = 'https://ik.imagekit.io/unnati/v1782396887/unnati_assets/Unnati.png';

// Mock Data
const OPPORTUNITIES = [
  {
    id: 1,
    title: "DigiXplore Volunteer",
    program: "DigiXplore",
    description: "Teach digital literacy and technology skills to students in underserved communities.",
    category: "Education",
    tags: ["Teaching"],
    duration: "2–4 hrs/week",
    mode: "Remote / Offline",
    color: "blue",
    icon: <FiBookOpen />,
    deadline: "Open",
    about: "The DigiXplore program aims to bridge the digital divide by equipping young students with essential computer skills, internet navigation, and basic coding.",
    responsibilities: [
      "Conduct weekly digital literacy sessions",
      "Prepare and adapt lesson plans based on student needs",
      "Track student progress and provide feedback"
    ],
    requirements: [
      "Proficiency in basic computer skills and internet usage",
      "Patience and strong communication skills",
      "Commitment of at least 2 hours per week"
    ],
    skills: ["Teaching", "Digital Literacy", "Communication"]
  },
  {
    id: 2,
    title: "Akshar Program Volunteer",
    program: "Akshar",
    description: "Support foundational learning and help children improve reading and writing skills.",
    category: "Education",
    tags: ["Teaching"],
    duration: "2–3 hrs/week",
    mode: "Offline",
    color: "green",
    icon: <FiBookOpen />,
    deadline: "Open",
    about: "Akshar focuses on strengthening foundational literacy and numeracy for primary school students, ensuring they build the skills needed for future success.",
    responsibilities: [
      "Assist teachers in classroom activities",
      "Conduct one-on-one reading and writing exercises",
      "Organize educational games and activities"
    ],
    requirements: [
      "Fluency in the local language",
      "Passion for working with children",
      "Reliable offline availability"
    ],
    skills: ["Teaching", "Patience", "Child Psychology"]
  },
  {
    id: 3,
    title: "Netritva Leadership Mentor",
    program: "Netritva",
    description: "Mentor students and guide them in leadership and personal growth.",
    category: "Mentorship",
    tags: ["Mentorship"],
    duration: "1–2 hrs/week",
    mode: "Remote",
    color: "purple",
    icon: <FiUsers />,
    deadline: "Upcoming",
    about: "Netritva connects experienced individuals with ambitious students to foster leadership, soft skills, and career readiness.",
    responsibilities: [
      "Conduct regular one-on-one mentoring sessions",
      "Help students set and achieve personal goals",
      "Share industry insights and experiences"
    ],
    requirements: [
      "Prior leadership or professional experience",
      "Strong active listening and empathy",
      "Commitment to a 3-month mentorship cycle"
    ],
    skills: ["Leadership", "Coaching", "Active Listening"]
  },
  {
    id: 4,
    title: "Outreach & Campaign Volunteer",
    program: "Outreach",
    description: "Help organize campaigns, workshops, and outreach initiatives.",
    category: "Outreach",
    tags: ["Outreach"],
    duration: "3–5 hrs/week",
    mode: "Offline",
    color: "orange",
    icon: <FiGlobe />,
    deadline: "Rolling",
    about: "Be the face of Unnati Society. Outreach volunteers are crucial for organizing community events, spreading awareness, and expanding our impact footprint.",
    responsibilities: [
      "Assist in planning and executing community events",
      "Engage with local stakeholders and schools",
      "Distribute awareness materials"
    ],
    requirements: [
      "Excellent interpersonal and networking skills",
      "Ability to travel locally",
      "Enthusiastic and energetic personality"
    ],
    skills: ["Event Management", "Networking", "Public Speaking"]
  },
  {
    id: 5,
    title: "Creative Content Volunteer",
    program: "Marketing",
    description: "Design graphics, create content, photography, and storytelling.",
    category: "Creative",
    tags: ["Creative"],
    duration: "2–4 hrs/week",
    mode: "Remote",
    color: "pink",
    icon: <FiBriefcase />,
    deadline: "Urgent",
    about: "Help us tell our story. Creative volunteers produce engaging content for our social media, website, and newsletters to amplify our mission.",
    responsibilities: [
      "Create visually appealing graphics and short videos",
      "Write compelling stories highlighting volunteer impact",
      "Manage social media calendars"
    ],
    requirements: [
      "Experience with design tools (Canva, Photoshop, etc.)",
      "Strong writing or visual storytelling skills",
      "Portfolio of previous work"
    ],
    skills: ["Graphic Design", "Copywriting", "Social Media"]
  }
];

const categoryColors = {
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
  pink: 'bg-pink-50 text-pink-600 border-pink-200',
};

const iconColors = {
  blue: 'text-blue-500 bg-blue-100',
  green: 'text-green-500 bg-green-100',
  purple: 'text-purple-500 bg-purple-100',
  orange: 'text-orange-500 bg-orange-100',
  pink: 'text-pink-500 bg-pink-100',
};

const ExploreOpportunitiesModal = ({ isOpen, onClose, onApplyClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [modeFilter, setModeFilter] = useState('All Modes');
  const [durationFilter, setDurationFilter] = useState('All Durations');
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOpportunities = OPPORTUNITIES.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || opp.category === categoryFilter;
    const matchesMode = modeFilter === 'All Modes' || opp.mode.includes(modeFilter);
    const matchesDuration = durationFilter === 'All Durations' || opp.duration.includes(durationFilter.split(' ')[0]);
    
    return matchesSearch && matchesCategory && matchesMode && matchesDuration;
  });

  // Variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300, duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md"
      >
        <motion.div 
          variants={modalVariants}
          className="bg-white w-full max-w-[1500px] h-[95vh] md:h-[92vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden relative"
        >
          {/* TOP INFO STRIP */}
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="hidden md:flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-2 text-blue-600 font-bold">
                <span role="img" aria-label="wave">👋</span> Over 500+ Changemakers
              </span>
              <span className="flex items-center gap-1.5"><FiHeart className="text-red-500"/> Meaningful Impact</span>
              <span className="flex items-center gap-1.5"><FiClock className="text-blue-500"/> Flexible Time Commitment</span>
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-green-500"/> Certificates Provided</span>
              <span className="flex items-center gap-1.5"><FiGlobe className="text-indigo-500"/> Remote & In-Person</span>
            </div>
            <div className="md:hidden text-blue-600 font-bold text-sm">Explore Opportunities</div>
            <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors ml-auto">
              <FiX size={20} />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden relative">
            
            {/* LEFT PANEL (35%) */}
            <div className="hidden lg:flex w-[35%] bg-gradient-to-br from-[#F8FAFC] to-blue-50 border-r border-blue-100 flex-col overflow-y-auto custom-scrollbar">
              <div className="p-10">
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden shrink-0 border border-gray-100">
                    <img loading="lazy" src={UnnatiLogo} alt="Unnati Society Logo" className="w-full h-full object-cover scale-125" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0F172A] leading-tight tracking-wide">UNNATI SOCIETY</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">An Institute Outreach Activity</p>
                  </div>
                </div>

                {/* Hero Section */}
                <h1 className="text-4xl font-extrabold text-[#0F172A] leading-[1.1] mb-6">
                  Explore Opportunities.<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Create Impact.</span>
                </h1>
                <p className="text-gray-600 mb-10">
                  Discover meaningful volunteer roles where your skills, time, and passion can empower students and build a better tomorrow.
                </p>

                {/* Impact Cards */}
                <div className="grid grid-cols-3 gap-3 mb-10">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2"><FiUsers size={18}/></div>
                    <div className="text-xl font-bold text-[#0F172A]">500+</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mt-1 leading-tight">Active<br/>Volunteers</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2"><FiBookOpen size={18}/></div>
                    <div className="text-xl font-bold text-[#0F172A]">25k+</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mt-1 leading-tight">Students<br/>Impacted</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2"><FiAward size={18}/></div>
                    <div className="text-xl font-bold text-[#0F172A]">250+</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mt-1 leading-tight">Programs<br/>Conducted</div>
                  </div>
                </div>

                {/* Checklist */}
                <h3 className="text-blue-600 font-bold mb-4">Why Explore Opportunities?</h3>
                <div className="space-y-3 mb-10">
                  {[
                    "Find roles matching your interests",
                    "Flexible volunteering options",
                    "Gain leadership experience",
                    "Earn certificates and recommendations",
                    "Build your professional network",
                    "Create measurable impact"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <FiCheckCircle size={12} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Quote Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative mb-10">
                  <span className="text-4xl text-blue-100 absolute top-4 left-4 font-serif">"</span>
                  <p className="text-gray-600 text-sm italic relative z-10 font-medium leading-relaxed">
                    The best way to find yourself is to lose yourself in the service of others.
                  </p>
                  <p className="text-blue-600 text-xs font-bold mt-3 relative z-10">— Mahatma Gandhi</p>
                </div>

                {/* Image Section */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1528305047817-48f804517316?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Volunteers" 
                    className="w-full h-40 object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* RIGHT PANEL (65%) */}
            <div className="w-full lg:w-[65%] flex flex-col bg-white overflow-hidden relative">
              
              {/* Header & Filters (Sticky) */}
              <div className="p-6 md:p-8 border-b border-gray-100 bg-white z-10">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Find the Right Opportunity for You</h2>
                <p className="text-gray-500 text-sm mb-6">Browse available volunteering opportunities and choose what aligns best with your interests.</p>

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search roles, programs, or skills..." 
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    <div className="relative shrink-0">
                      <select 
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 hover:bg-gray-50 cursor-pointer"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option>All Categories</option>
                        <option>Education</option>
                        <option>Mentorship</option>
                        <option>Technology</option>
                        <option>Creative</option>
                        <option>Outreach</option>
                        <option>Fundraising</option>
                        <option>Leadership</option>
                        <option>Research</option>
                        <option>Administration</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="relative shrink-0">
                      <select 
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 hover:bg-gray-50 cursor-pointer"
                        value={modeFilter}
                        onChange={(e) => setModeFilter(e.target.value)}
                      >
                        <option>All Modes</option>
                        <option>Remote</option>
                        <option>Offline</option>
                        <option>Hybrid</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="relative shrink-0">
                      <select 
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 hover:bg-gray-50 cursor-pointer"
                        value={durationFilter}
                        onChange={(e) => setDurationFilter(e.target.value)}
                      >
                        <option>All Durations</option>
                        <option>1–2 Hours / Week</option>
                        <option>2–4 Hours / Week</option>
                        <option>5–8 Hours / Week</option>
                        <option>10+ Hours / Week</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50 custom-scrollbar relative">
                
                {/* Opportunity List */}
                <div className="space-y-4 mb-8">
                  {filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map((opp) => (
                      <motion.div 
                        key={opp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                        onClick={() => setSelectedRole(opp)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconColors[opp.color]}`}>
                            {opp.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-bold text-[#0F172A] text-lg group-hover:text-blue-600 transition-colors">{opp.title}</h3>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${categoryColors[opp.color]}`}>
                                {opp.category}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{opp.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                              <div className="flex items-center gap-1.5"><FiTag /> {opp.tags[0]}</div>
                              <div className="flex items-center gap-1.5"><FiClock /> {opp.duration}</div>
                              <div className="flex items-center gap-1.5"><FiMapPin /> {opp.mode}</div>
                            </div>
                          </div>
                          <div className="hidden sm:flex self-center">
                            <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                              Explore <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiSearch size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A] mb-2">No opportunities found</h3>
                      <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                  )}
                </div>

                {filteredOpportunities.length > 0 && (
                  <div className="text-center mb-12">
                    <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all text-sm flex items-center gap-2 mx-auto">
                      View More Opportunities <FiChevronDown />
                    </button>
                  </div>
                )}

                {/* Bottom CTA Section */}
                <div className="rounded-2xl p-8 text-white text-center shadow-lg relative overflow-hidden bg-blue-900">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Volunteers Background" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" 
                  />
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <FiHeart size={120} />
                  </div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <FiHeart size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 relative z-10">Can't Find the Right Role?</h3>
                  <p className="text-blue-100 mb-6 max-w-md mx-auto relative z-10">
                    Tell us your interests and we'll notify you when a matching opportunity becomes available.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-900 font-bold rounded-xl shadow-sm hover:bg-blue-50 transition-all">
                      Suggest an Opportunity
                    </button>
                    <button 
                      onClick={() => {
                        onClose();
                        if(onApplyClick) onApplyClick();
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 border border-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <FiUsers /> Apply as Volunteer
                    </button>
                  </div>
                </div>

              </div>

              {/* ROLE DETAILS DRAWER (Slide in from right) */}
              <AnimatePresence>
                {selectedRole && (
                  <motion.div 
                    variants={drawerVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl border-l border-gray-100 z-50 flex flex-col"
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                      <div className="font-bold text-gray-700 text-sm flex items-center gap-2">
                        <FiInfo /> Role Details
                      </div>
                      <button onClick={() => setSelectedRole(null)} className="p-2 bg-white hover:bg-red-50 hover:text-red-500 border border-gray-200 rounded-full transition-colors">
                        <FiX size={16} />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                      <div className={`inline-block px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-4 ${categoryColors[selectedRole.color]}`}>
                        {selectedRole.category}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-2">{selectedRole.title}</h2>
                      <p className="text-gray-500 text-sm mb-6">{selectedRole.program} Program</p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><FiMapPin /> Mode</div>
                          <div className="font-bold text-gray-800 text-sm">{selectedRole.mode}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><FiClock /> Duration</div>
                          <div className="font-bold text-gray-800 text-sm">{selectedRole.duration}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 col-span-2">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><FiCheckCircle /> Deadline</div>
                          <div className="font-bold text-gray-800 text-sm">{selectedRole.deadline}</div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-[#0F172A] mb-2">About the Role</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{selectedRole.about}</p>
                        </div>

                        <div>
                          <h3 className="font-bold text-[#0F172A] mb-3">Key Responsibilities</h3>
                          <ul className="space-y-2">
                            {selectedRole.responsibilities.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <FiChevronRight className="text-blue-500 mt-0.5 shrink-0" /> {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-[#0F172A] mb-3">Requirements</h3>
                          <ul className="space-y-2">
                            {selectedRole.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <FiChevronRight className="text-blue-500 mt-0.5 shrink-0" /> {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold text-[#0F172A] mb-3">Preferred Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedRole.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                          <h3 className="font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                            <FiAward className="text-blue-600"/> Benefits
                          </h3>
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center gap-2 text-xs text-gray-700 font-medium"><FiCheckCircle className="text-green-500"/> Certificate</div>
                            <div className="flex items-center gap-2 text-xs text-gray-700 font-medium"><FiCheckCircle className="text-green-500"/> LOR</div>
                            <div className="flex items-center gap-2 text-xs text-gray-700 font-medium"><FiCheckCircle className="text-green-500"/> Networking</div>
                            <div className="flex items-center gap-2 text-xs text-gray-700 font-medium"><FiCheckCircle className="text-green-500"/> Portfolio</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-white">
                      <button 
                        onClick={() => {
                          onClose();
                          if(onApplyClick) onApplyClick();
                        }}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mb-3"
                      >
                        Apply Now <FiArrowRight />
                      </button>
                      <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">
                        Save Opportunity
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExploreOpportunitiesModal;
