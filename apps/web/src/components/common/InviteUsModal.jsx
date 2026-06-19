import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiCheckCircle, FiUser, FiMapPin, FiBookOpen, 
  FiBriefcase, FiPhone, FiMail, FiCalendar, FiClock,
  FiFileText, FiShield, FiCheck, FiUsers, FiAward,
  FiHeart, FiMonitor
} from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { BiBuildingHouse, BiChalkboard } from 'react-icons/bi';
import UnnatiLogo from '../../assets/Unnati.png';

const InviteUsModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Institution
    institutionName: '',
    institutionType: '',
    board: '',
    studentsCount: '',
    website: '',
    state: '',
    district: '',
    city: '',
    address: '',
    
    // Step 2: Program Needs
    programs: [],
    targetAudience: [],
    expectedParticipants: '',
    preferredMode: '',
    prefDate: '',
    altDate: '',
    duration: '',

    // Step 3: Contact Person
    coordinatorName: '',
    designation: '',
    phone: '',
    whatsapp: '',
    email: '',
    availability: '',
    notes: '',
    specialReqs: '',

    // Step 4: Review
    agreement1: false,
    agreement2: false
  });

  const STORAGE_KEY = 'unnati_invite_us_draft';
  const DRAFT_EXPIRATION = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const { data, timestamp } = JSON.parse(saved);
          if (Date.now() - timestamp < DRAFT_EXPIRATION) {
            setFormData(prev => ({ ...prev, ...data }));
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: formData,
        timestamp: Date.now()
      }));
    }
  }, [formData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => {
      const array = prev[field];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/outreach/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error submitting form:', error);
      // In a real app we might show a toast error here
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white w-[90vw] max-w-[1440px] h-[88vh] rounded-[24px] shadow-2xl flex overflow-hidden border border-gray-200"
        >
          {/* LEFT PANEL (30%) */}
          <div className="hidden lg:flex w-[30%] bg-gradient-to-b from-[#0F2C8C] to-[#0A1F66] flex-col p-6 text-white relative shrink-0 overflow-y-auto custom-scrollbar">
            {/* Logo */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shrink-0 shadow-lg overflow-hidden">
              <img src={UnnatiLogo} alt="Unnati Logo" className="w-full h-full object-cover scale-125" />
            </div>

            {/* Hero Message */}
            <div className="shrink-0 mb-6">
              <h2 className="text-3xl font-bold leading-tight mb-2 text-white">Invite Unnati to Your School</h2>
              <p className="text-sm text-blue-100/90 leading-relaxed font-medium">
                Let's collaborate to bring impactful sessions, workshops, and guidance programs to your students.
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="w-full h-40 rounded-2xl overflow-hidden shadow-xl mb-6 shrink-0 border-4 border-white/10 relative bg-blue-900">
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800" alt="Workshop" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-xl p-4 text-[#0F172A] mb-4 shrink-0 shadow-lg flex-1 min-h-0 flex flex-col">
              <h4 className="font-bold text-sm mb-3 text-blue-900">What You Get</h4>
              <ul className="space-y-3 overflow-hidden flex-1">
                {[
                  { title: "Expert-led Sessions", desc: "Career guidance & digital literacy", icon: <FiUsers /> },
                  { title: "Engaging Workshops", desc: "Hands-on learning & skill development", icon: <BiChalkboard /> },
                  { title: "Inspiring Talks", desc: "Motivation, leadership & innovation", icon: <FiAward /> },
                  { title: "Complete Support", desc: "From planning to execution", icon: <FiCheckCircle /> }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800 leading-tight">{item.title}</div>
                      <div className="text-[10px] text-gray-500 font-medium mt-0.5 leading-tight">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Section */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 shrink-0 backdrop-blur-md">
              <div className="flex gap-3">
                <div className="text-blue-300"><FaBuilding size={20} /></div>
                <div>
                  <p className="text-xs text-blue-50 font-medium italic leading-relaxed mb-2">
                    "Education is the most powerful weapon which you can use to change the world."
                  </p>
                  <p className="text-[10px] text-yellow-400 font-bold">— Nelson Mandela</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA (70%) */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            
            {/* HEADER */}
            <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-start shrink-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Send Us an Invitation</h2>
                <p className="text-sm text-gray-500">Fill in the details and our team will get in touch with you.</p>
              </div>
              <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
                <FiX size={16} />
              </button>
            </div>

            {/* MAIN AREA */}
            {isSuccess ? (
              <div className="flex-1 flex flex-col p-8 bg-gray-50/50 overflow-y-auto custom-scrollbar">
                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full my-auto mx-auto text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                   <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                     <FiCheckCircle size={48} />
                   </div>
                   <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Invitation Submitted Successfully</h2>
                   <p className="text-gray-600 text-sm mb-6 leading-relaxed">Thank you for inviting Unnati Society. Our outreach team will review your request and connect with you within 24–48 hours.</p>
                   <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Reference ID</p>
                     <p className="text-xl font-mono font-bold text-gray-800">OUT-2026-00152</p>
                   </div>
                   <div className="flex flex-col gap-3">
                     <button className="w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 text-sm transition-colors">
                       Download Summary
                     </button>
                     <button onClick={resetAndClose} className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 text-sm transition-colors shadow-lg shadow-blue-600/30">
                       Return to Outreach Page
                     </button>
                   </div>
                 </motion.div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* STEPPER */}
                <div className="px-10 pt-8 pb-4 shrink-0 bg-white">
                  <div className="flex items-center justify-between relative max-w-2xl mx-auto">
                    <div className="absolute left-0 top-4 w-full h-[2px] bg-gray-100 z-0"></div>
                    <div className="absolute left-0 top-4 h-[2px] bg-blue-600 z-0 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                    
                    {[
                      { num: 1, title: "Institution", icon: <BiBuildingHouse size={14}/> },
                      { num: 2, title: "Program Needs", icon: <FiMonitor size={14}/> },
                      { num: 3, title: "Contact Person", icon: <FiUsers size={14}/> },
                      { num: 4, title: "Review", icon: <FiCheck size={14}/> }
                    ].map((s) => (
                      <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s.num ? 'bg-blue-600 text-white ring-4 ring-white' : 'bg-white border-2 border-gray-200 text-gray-400 ring-4 ring-white'}`}>
                          {step > s.num ? <FiCheck size={14} /> : s.icon}
                        </div>
                        <div className={`text-[11px] font-bold ${step >= s.num ? 'text-blue-600' : 'text-gray-400'}`}>{s.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FORM WIZARD */}
                <div className="flex-1 px-10 py-4 overflow-y-auto custom-scrollbar">
                  <form className="min-h-full flex flex-col w-full mx-auto max-w-3xl">
                    
                    {/* STEP 1: Institution */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col min-h-full space-y-4 pb-4">
                        <h3 className="text-base font-bold text-blue-600 flex items-center gap-2 mb-2"><BiBuildingHouse size={18}/> Institution Information</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Institution Name <span className="text-red-500">*</span></label>
                            <input type="text" name="institutionName" value={formData.institutionName} onChange={handleInputChange} placeholder="Enter institution name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Institution Type <span className="text-red-500">*</span></label>
                            <select name="institutionType" value={formData.institutionType} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none bg-white">
                              <option value="">Select type</option>
                              <option>Government School</option><option>Private School</option><option>College</option><option>University</option><option>Coaching Institute</option><option>NGO</option><option>Training Center</option><option>Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Board / Affiliation</label>
                            <select name="board" value={formData.board} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none bg-white">
                              <option value="">Select board</option>
                              <option>CBSE</option><option>ICSE</option><option>Bihar Board</option><option>State Board</option><option>University</option><option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Total Students</label>
                            <input type="number" name="studentsCount" value={formData.studentsCount} onChange={handleInputChange} placeholder="Approx. count" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Website (Optional)</label>
                            <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" />
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-blue-600 flex items-center gap-2 mt-2 mb-2"><FiMapPin size={16}/> Location</h3>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">State <span className="text-red-500">*</span></label>
                            <select name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none bg-white">
                              <option value="">Select state</option>
                              <option>Bihar</option><option>Jharkhand</option><option>West Bengal</option><option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">District <span className="text-red-500">*</span></label>
                            <select name="district" value={formData.district} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none bg-white">
                              <option value="">Select district</option>
                              <option>Bhagalpur</option><option>Patna</option><option>Munger</option><option>Banka</option><option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-[#0F172A] mb-1">City / Town <span className="text-red-500">*</span></label>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-0 flex flex-col">
                          <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Complete Address <span className="text-red-500">*</span></label>
                          <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter complete address..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none resize-none flex-1 min-h-[60px]"></textarea>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Program Needs */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col min-h-full space-y-4 pb-4">
                        
                        <div className="flex-1 min-h-0 flex flex-col">
                          <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2 mb-2">Which Programs Are You Interested In?</h3>
                          <div className="grid grid-cols-3 gap-2 flex-1 overflow-hidden">
                            {['Digital Literacy', 'Career Guidance', 'Scholarship Awareness', 'Leadership Development', 'Women Empowerment', 'Cyber Safety', 'Soft Skills', 'Study Skills', 'Motivation Session', 'Technology Awareness'].map(p => (
                              <label key={p} className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" onChange={() => handleArrayToggle('programs', p)} checked={formData.programs.includes(p)} className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-[11px] text-gray-700 font-medium group-hover:text-black">{p}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-100">
                          <div>
                            <h3 className="text-sm font-bold text-blue-600 mb-2">Target Audience</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {['Class 6–8', 'Class 9–10', 'Class 11–12', 'College Students', 'Teachers', 'Parents'].map(a => (
                                <label key={a} className="flex items-center gap-2 cursor-pointer group">
                                  <input type="checkbox" onChange={() => handleArrayToggle('targetAudience', a)} checked={formData.targetAudience.includes(a)} className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300" />
                                  <span className="text-[11px] text-gray-700 font-medium">{a}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-sm font-bold text-blue-600 mb-2">Logistics</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] mb-1">Expected Participants</label>
                                <input type="number" name="expectedParticipants" value={formData.expectedParticipants} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs outline-none" placeholder="Count"/>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] mb-1">Preferred Mode</label>
                                <select name="preferredMode" value={formData.preferredMode} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs outline-none bg-white">
                                  <option value="">Select mode</option>
                                  <option>Offline</option><option>Online</option><option>Hybrid</option>
                                </select>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] mb-1">Preferred Date</label>
                                <input type="date" name="prefDate" value={formData.prefDate} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[10px] outline-none" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] mb-1">Alternative Date</label>
                                <input type="date" name="altDate" value={formData.altDate} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[10px] outline-none" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-[#0F172A] mb-1">Session Duration</label>
                                <select name="duration" value={formData.duration} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs outline-none bg-white">
                                  <option value="">Select</option><option>1 Hour</option><option>Half Day</option><option>Full Day</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    )}

                    {/* STEP 3: Contact Person */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col min-h-full space-y-4 pb-4">
                        <div className="grid grid-cols-2 gap-6 h-full">
                          <div className="flex flex-col space-y-3">
                            <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2">Coordinator Details</h3>
                            
                            <div>
                              <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Coordinator Name *</label>
                              <input type="text" name="coordinatorName" value={formData.coordinatorName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="Full name"/>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Designation *</label>
                              <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="e.g. Principal, Headmaster"/>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Email Address *</label>
                              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="Email"/>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Phone *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="Mobile No."/>
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-[#0F172A] mb-1">WhatsApp *</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="WhatsApp No."/>
                              </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Best Time to Call</label>
                                <select name="availability" value={formData.availability} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none bg-white">
                                  <option value="">Select availability</option><option>Morning</option><option>Afternoon</option><option>Evening</option>
                                </select>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-3 h-full">
                            <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2">Additional Information</h3>
                            <div className="flex-1 min-h-0 flex flex-col">
                              <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Additional Notes</label>
                              <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none resize-none flex-1 min-h-[60px]" placeholder="Anything else we should know?"></textarea>
                            </div>
                            <div className="flex-1 min-h-0 flex flex-col">
                              <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Special Requirements</label>
                              <textarea name="specialReqs" value={formData.specialReqs} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:border-blue-500 outline-none resize-none flex-1 min-h-[60px]" placeholder="Specific topics to cover, logistics support needed, etc."></textarea>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Review */}
                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col min-h-full space-y-4 pb-8">
                        <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2">Review & Submit</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Summary Cards */}
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Institution</div>
                            <div className="text-xs font-bold text-gray-800">{formData.institutionName || 'Not provided'}</div>
                            <div className="text-[10px] text-gray-600 mt-1">{formData.city ? `${formData.city}, ${formData.state}` : 'Location not provided'}</div>
                          </div>
                          
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Programs Requested</div>
                            <div className="text-xs font-bold text-gray-800">{formData.programs.length > 0 ? formData.programs.join(', ') : 'None selected'}</div>
                          </div>
                          
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Audience & Dates</div>
                            <div className="text-xs font-bold text-gray-800">
                              {formData.expectedParticipants || '0'} Participants ({formData.preferredMode || 'Any mode'})
                            </div>
                            <div className="text-[10px] text-gray-600 mt-1">Date: {formData.prefDate || 'Flexible'}</div>
                          </div>
                          
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Coordinator</div>
                            <div className="text-xs font-bold text-gray-800">{formData.coordinatorName || 'Not provided'}</div>
                            <div className="text-[10px] text-gray-600 mt-1">{formData.phone || 'No phone'} | {formData.email || 'No email'}</div>
                          </div>
                        </div>

                        {/* What Happens Next */}
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-2">
                          <h4 className="font-bold text-blue-800 text-xs mb-3">What Happens Next?</h4>
                          <div className="flex items-center justify-between text-[10px] font-medium text-blue-900">
                            <div className="flex flex-col items-center gap-1"><FiCheckCircle className="text-blue-600" size={16}/> Request Reviewed</div>
                            <div className="w-8 h-[1px] bg-blue-200"></div>
                            <div className="flex flex-col items-center gap-1"><FiPhone className="text-blue-600" size={16}/> Team Contacts You</div>
                            <div className="w-8 h-[1px] bg-blue-200"></div>
                            <div className="flex flex-col items-center gap-1"><FiCalendar className="text-blue-600" size={16}/> Session Planned</div>
                            <div className="w-8 h-[1px] bg-blue-200"></div>
                            <div className="flex flex-col items-center gap-1"><BiChalkboard className="text-blue-600" size={16}/> Program Delivered</div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-3 pt-6 mt-auto">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" name="agreement1" checked={formData.agreement1} onChange={handleInputChange} className="mt-0.5 w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-[11px] text-gray-700 leading-tight">I confirm that the information provided is accurate and I am authorized to invite organizations on behalf of the institution.</span>
                          </label>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" name="agreement2" checked={formData.agreement2} onChange={handleInputChange} className="mt-0.5 w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-[11px] text-gray-700 leading-tight">Our institution agrees to coordinate logistics such as space, projector, and students' availability as required for the session.</span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* FOOTER NAVIGATION */}
                <div className="px-10 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                  <span className="text-xs text-gray-400 font-medium">Step {step} of 4</span>
                  <div className="flex items-center gap-3">
                    {step > 1 && (
                      <button onClick={handlePrev} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-xl transition-colors">
                        Previous
                      </button>
                    )}
                    {step < 4 ? (
                      <button onClick={handleNext} className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        Next Step &rarr;
                      </button>
                    ) : (
                      <button onClick={handleSubmit} disabled={isSubmitting || !formData.agreement1 || !formData.agreement2} className="px-8 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        {isSubmitting ? 'Submitting...' : 'Submit Invitation'} {<FiCheckCircle />}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InviteUsModal;
