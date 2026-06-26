import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  FiX, FiCheckCircle, FiUsers, FiMapPin, FiBookOpen, 
  FiBriefcase, FiPhone, FiMail, FiCalendar, FiClock,
  FiFileText, FiShield, FiHeadphones, FiCheck, FiInfo,
  FiTarget, FiMessageSquare, FiImage, FiGlobe
} from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';

const CampusVisitModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const STORAGE_KEY = 'unnati_campus_visit_draft';
  const DRAFT_EXPIRATION = 60 * 60 * 1000; // 1 hour

  // Form State
  const [formData, setFormData] = useState(() => {
    const defaultState = {
      // Step 1
      institutionName: '',
      institutionType: '',
      board: '',
      website: '',
      state: '',
      district: '',
      city: '',
      address: '',
      // Step 2
      studentsCount: '',
      teachersCount: '',
      classes: [],
      purposes: [],
      activities: [],
      prefDate: '',
      altDate: '',
      prefTime: '',
      // Step 3
      coordinatorName: '',
      designation: '',
      email: '',
      phone: '',
      whatsapp: '',
      notes: ''
    };

    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const { data, timestamp } = JSON.parse(saved);
          if (Date.now() - timestamp < DRAFT_EXPIRATION) {
            return { ...defaultState, ...data };
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
    }
    return defaultState;
  });

  useEffect(() => {
     if (isOpen) {
       localStorage.setItem(STORAGE_KEY, JSON.stringify({
         data: formData,
         timestamp: Date.now()
       }));
     }
   }, [formData, isOpen]);

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

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.institutionName || !formData.institutionName.trim()) {
        toast.error('Institution Name is required');
        return false;
      }
      if (!formData.institutionType) {
        toast.error('Institution Type is required');
        return false;
      }
      if (!formData.state) {
        toast.error('State is required');
        return false;
      }
      if (!formData.district) {
        toast.error('District is required');
        return false;
      }
      if (!formData.city || !formData.city.trim()) {
        toast.error('City/Town is required');
        return false;
      }
      if (!formData.address || !formData.address.trim()) {
        toast.error('Complete Address is required');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.studentsCount) {
        toast.error('Student Count is required');
        return false;
      }
      if (parseInt(formData.studentsCount, 10) <= 0) {
        toast.error('Student Count must be greater than 0');
        return false;
      }
      if (!formData.teachersCount) {
        toast.error('Teacher Count is required');
        return false;
      }
      if (parseInt(formData.teachersCount, 10) <= 0) {
        toast.error('Teacher Count must be greater than 0');
        return false;
      }
      if (!formData.prefDate) {
        toast.error('Preferred Date is required');
        return false;
      }
      if (!formData.prefTime) {
        toast.error('Preferred Time Slot is required');
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.coordinatorName || !formData.coordinatorName.trim()) {
        toast.error('Coordinator Name is required');
        return false;
      }
      if (!formData.designation || !formData.designation.trim()) {
        toast.error('Designation is required');
        return false;
      }
      if (!formData.email || !formData.email.trim()) {
        toast.error('Email Address is required');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        toast.error('Please enter a valid email address');
        return false;
      }
      if (!formData.phone || !formData.phone.trim()) {
        toast.error('Phone number is required');
        return false;
      }
      const phoneClean = formData.phone.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        toast.error('Please enter a valid 10-digit phone number');
        return false;
      }
      if (formData.whatsapp && formData.whatsapp.trim()) {
        const whatsappClean = formData.whatsapp.replace(/\D/g, '');
        if (whatsappClean.length < 10) {
          toast.error('Please enter a valid 10-digit WhatsApp number');
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/outreach/campus-visit', {
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
      toast.error(error.message || 'Error submitting request. Please try again.');
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
          className="bg-gray-50 w-[90vw] max-w-[1400px] h-[88vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        >
          {/* HEADER */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <FaBuilding size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] leading-tight">Book a Campus Visit</h2>
                <p className="text-xs text-gray-500 font-medium">Plan an inspiring visit for your students to IIIT Bhagalpur</p>
              </div>
            </div>
            <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
              <FiX size={16} />
            </button>
          </div>

          {/* MAIN CONTENT AREA */}
          {isSuccess ? (
            <div className="flex-1 flex flex-col bg-white p-8 overflow-y-auto custom-scrollbar">
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full my-auto mx-auto text-center">
                 <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                   <FiCheckCircle size={40} />
                 </div>
                 <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Request Submitted Successfully</h2>
                 <p className="text-gray-600 text-sm mb-6">Thank you for your interest. Our outreach team will review your request and contact you within 24–48 hours.</p>
                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                   <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Reference ID</p>
                   <p className="text-lg font-mono font-bold text-gray-800">CV-2026-00125</p>
                 </div>
                 <div className="flex gap-4 justify-center">
                   <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 text-sm transition-colors">
                     Download Summary
                   </button>
                   <button onClick={resetAndClose} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-sm transition-colors">
                     Back to Outreach Page
                   </button>
                 </div>
               </motion.div>
            </div>
          ) : (
            <div className="flex-1 flex overflow-y-auto">
              {/* LEFT SIDEBAR */}
              <div className="hidden lg:flex w-[320px] bg-white border-r border-gray-200 flex-col p-6 shrink-0 h-fit min-h-full">
                <div className="rounded-xl overflow-hidden mb-6 h-36 shrink-0 relative">
                  <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782476427/outreach_campus_visit3_zii4fj.jpg" alt="Campus" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6">
                  <h4 className="text-blue-700 font-bold text-sm mb-3">What Students Experience</h4>
                  <ul className="space-y-2.5">
                    {[
                      { icon: <FiMapPin />, text: "Explore IIIT Bhagalpur Campus" },
                      { icon: <FiUsers />, text: "Meet Engineering Students" },
                      { icon: <FiBriefcase />, text: "Learn About Career Opportunities" },
                      { icon: <FiMessageSquare />, text: "Interact With Faculty" },
                      { icon: <FiTarget />, text: "Visit Innovation & Research Labs" },
                      { icon: <FiMonitor />, text: "Understand Modern Technologies" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-blue-900 font-medium">
                        <div className="text-blue-500">{item.icon}</div>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex-1">
                  <h4 className="text-gray-700 font-bold text-sm mb-4">Our Outreach Impact</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><FiUsers size={14}/></div>
                      <div>
                        <div className="font-bold text-[#0F172A] text-sm">4000+</div>
                        <div className="text-[10px] text-gray-500 font-medium">Students Guided</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0"><FaBuilding size={14}/></div>
                      <div>
                        <div className="font-bold text-[#0F172A] text-sm">20+</div>
                        <div className="text-[10px] text-gray-500 font-medium">Schools Visited</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0"><FiMapPin size={14}/></div>
                      <div>
                        <div className="font-bold text-[#0F172A] text-sm">Across Bhaglpur & Nearby</div>
                        <div className="text-[10px] text-gray-500 font-medium">Our Reach</div>
                      </div>
                    </div>
                    {/* <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0"><FiPhone size={14}/></div>
                      <div>
                        <div className="font-bold text-[#0F172A] text-sm">95%</div>
                        <div className="text-[10px] text-gray-500 font-medium">Positive Feedback</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN (FORM) */}
              <div className="flex-1 flex flex-col bg-white">
                {/* STEPPER */}
                <div className="px-10 py-6 border-b border-gray-100 shrink-0 sticky top-0 bg-white z-20">
                  <div className="flex items-center justify-center max-w-lg mx-auto relative">
                    <div className="absolute left-0 top-3 w-full h-[2px] bg-gray-100 z-0"></div>
                    <div className="absolute left-0 top-3 h-[2px] bg-blue-600 z-0 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
                    
                    {[
                      { num: 1, title: "Institution Details", desc: "Tell us about your institution" },
                      { num: 2, title: "Visit Requirements", desc: "Share your visit preferences" },
                      { num: 3, title: "Contact & Confirmation", desc: "Provide coordinator details" }
                    ].map((s) => (
                      <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 w-1/3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${step >= s.num ? 'bg-blue-600 text-white ring-4 ring-white' : 'bg-gray-200 text-gray-500 ring-4 ring-white'}`}>
                          {step > s.num ? <FiCheck size={12} /> : s.num}
                        </div>
                        <div className="text-center">
                          <div className={`text-[11px] font-bold ${step >= s.num ? 'text-blue-600' : 'text-gray-400'}`}>{s.title}</div>
                          <div className="text-[9px] text-gray-400 hidden sm:block mt-0.5">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FORM CONTENT */}
                <div className="flex-1 p-8 pb-28">
                  <form className="flex flex-col max-w-3xl mx-auto w-full">
                    
                    {/* STEP 1 */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col space-y-6 pb-4">
                        <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-2"><FaBuilding /> Institution Information</h3>
                        
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Institution Name <span className="text-red-500">*</span></label>
                            <input type="text" name="institutionName" value={formData.institutionName} onChange={handleInputChange} placeholder="Enter institution name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Institution Type <span className="text-red-500">*</span></label>
                            <select name="institutionType" value={formData.institutionType} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                              <option value="">Select institution type</option>
                              <option>Government School</option><option>Private School</option><option>College</option><option>Coaching Institute</option><option>NGO</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Affiliated Board / University</label>
                            <select name="board" value={formData.board} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                              <option value="">Select board or university</option>
                              <option>CBSE</option><option>ICSE</option><option>Bihar Board</option><option>State Board</option><option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Institution Website (Optional)</label>
                            <div className="relative">
                              <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
                              <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://www.example.com" className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mt-4 mb-2"><FiMapPin /> Location</h3>
                        
                        <div className="grid grid-cols-3 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">State <span className="text-red-500">*</span></label>
                            <select name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                              <option value="">Select state</option>
                              <option>Bihar</option><option>Jharkhand</option><option>West Bengal</option><option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">District <span className="text-red-500">*</span></label>
                            <select name="district" value={formData.district} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                              <option value="">Select district</option>
                              <option>Bhagalpur</option><option>Patna</option><option>Munger</option><option>Banka</option><option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">City / Town <span className="text-red-500">*</span></label>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                          </div>
                        </div>

                        <div className="flex-1 min-h-0 flex flex-col">
                          <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Complete Address <span className="text-red-500">*</span></label>
                          <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter complete address..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none flex-1 min-h-[80px]"></textarea>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col space-y-5 pb-4">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Column 1 */}
                          <div className="space-y-5 flex flex-col">
                            <div>
                              <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2 mb-3">Student Information</h3>
                              <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Student Count *</label>
                                  <input type="number" name="studentsCount" value={formData.studentsCount} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 outline-none" placeholder="e.g. 50"/>
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Teacher Count *</label>
                                  <input type="number" name="teachersCount" value={formData.teachersCount} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 outline-none" placeholder="e.g. 3"/>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Classes/Grades (Select multiple)</label>
                                <div className="flex flex-wrap gap-1.5">
                                  {['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Undergraduate'].map(c => (
                                    <label key={c} className={`px-2 py-1 border rounded text-[10px] cursor-pointer font-medium transition-colors ${formData.classes.includes(c) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                      <input type="checkbox" className="hidden" onChange={() => handleArrayToggle('classes', c)} checked={formData.classes.includes(c)} />
                                      {c}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex-1 min-h-0 flex flex-col">
                              <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2 mb-3">Schedule Preferences</h3>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Preferred Date *</label>
                                  <input type="date" name="prefDate" value={formData.prefDate} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 outline-none text-gray-600" />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Alternative Date (Optional)</label>
                                  <input type="date" name="altDate" value={formData.altDate} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 outline-none text-gray-600" />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Preferred Time *</label>
                                  <select name="prefTime" value={formData.prefTime} onChange={handleInputChange} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:border-blue-500 outline-none text-gray-600 bg-white">
                                    <option value="">Select Time Slot</option><option>Morning (10 AM - 1 PM)</option><option>Afternoon (2 PM - 5 PM)</option><option>Full Day (10 AM - 4 PM)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Column 2 */}
                          <div className="space-y-5 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2 mb-3">Visit Purpose</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {['Career Guidance', 'Campus Tour', 'Technology Exposure', 'Digital Literacy', 'Motivational Session', 'Higher Education Guidance'].map(p => (
                                  <label key={p} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" onChange={() => handleArrayToggle('purposes', p)} checked={formData.purposes.includes(p)} className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                                    <span className="text-[11px] text-gray-700 font-medium group-hover:text-black">{p}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="flex-1 min-h-0">
                              <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2 mb-3">Preferred Activities</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {['Faculty Interaction', 'Student Interaction', 'Research Labs Visit', 'Coding Workshop', 'Innovation Showcase'].map(a => (
                                  <label key={a} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" onChange={() => handleArrayToggle('activities', a)} checked={formData.activities.includes(a)} className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                                    <span className="text-[11px] text-gray-700 font-medium group-hover:text-black">{a}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col space-y-6 pb-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col space-y-4">
                            <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2">Coordinator Details</h3>
                            
                            <div>
                              <label className="block text-xs font-bold text-[#0F172A] mb-1">Coordinator Name *</label>
                              <input type="text" name="coordinatorName" value={formData.coordinatorName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="Full name"/>
                            </div>
                            
                            <div>
                              <label className="block text-xs font-bold text-[#0F172A] mb-1">Designation *</label>
                              <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="e.g. Principal, Teacher"/>
                            </div>
                            
                            <div>
                              <label className="block text-xs font-bold text-[#0F172A] mb-1">Email Address *</label>
                              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="Email"/>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-[#0F172A] mb-1">Phone *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="Mobile No."/>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-[#0F172A] mb-1">WhatsApp</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="WhatsApp No."/>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-4">
                            <h3 className="text-sm font-bold text-blue-600 border-b border-gray-100 pb-2">Additional Notes</h3>
                            <div className="flex-1 flex flex-col">
                              <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none flex-1 min-h-[120px]" placeholder="Any specific requirements or questions?"></textarea>
                            </div>
                            
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 shrink-0">
                              <h4 className="text-orange-800 text-xs font-bold flex items-center gap-1.5 mb-2"><FiShield /> Important Note</h4>
                              <p className="text-[10px] text-orange-700 leading-relaxed">By submitting this request, you agree that your institution will manage the transportation of students and ensure they are accompanied by designated teachers. Confirmation of the visit is subject to the availability of our resources and faculty.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* FOOTER NAVIGATION */}
                <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0 sticky bottom-0 z-20">
                  <span className="text-xs text-gray-400 font-medium">Step {step} of 3</span>
                  <div className="flex items-center gap-3">
                    {step > 1 && (
                      <button onClick={handlePrev} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors">
                        Previous
                      </button>
                    )}
                    {step < 3 ? (
                      <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                        Next Step &rarr;
                      </button>
                    ) : (
                      <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                        {isSubmitting ? 'Submitting...' : 'Submit Request'} {<FiCheckCircle />}
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* RIGHT SIDEBAR */}
              <div className="hidden xl:flex w-[280px] bg-white border-l border-gray-200 flex-col p-6 shrink-0 space-y-6 h-fit min-h-full">

                <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-5">
                  <h4 className="text-blue-600 font-bold text-sm mb-3 flex items-center gap-2"><FiShield /> Important Guidelines</h4>
                  <ul className="space-y-2.5">
                    {['Advance booking required', 'Confirmation subject to availability', 'Students must be accompanied by teachers', 'School manages transportation', 'Carry institution ID and authorization letter', 'Visit schedule will be shared after approval'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-blue-900 font-medium leading-tight">
                        <div className="text-blue-500 mt-0.5"><FiCheckCircle size={12}/></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50/50 border border-green-100 rounded-xl p-5">
                  <h4 className="text-green-700 font-bold text-sm mb-2 flex items-center gap-2"><FiHeadphones /> Need Help?</h4>
                  <p className="text-[11px] text-green-900 mb-4 leading-relaxed">Our outreach team is here to help you plan the perfect visit.</p>
                  <div className="space-y-2 text-[11px] text-green-800 font-medium">
                    <div className="flex items-center gap-2"><FiMail className="text-green-600"/> outreach.ir@iiitbh.ac.in</div>
                    <div className="flex items-center gap-2"><FiPhone className="text-green-600"/> +91 7348145325</div>
                  </div>
                </div>

              </div>
            </div>
          )}
          
          {/* SECURE FOOTER */}
          <div className="bg-gray-100 border-t border-gray-200 px-6 py-2 shrink-0 flex items-center gap-2 text-[10px] text-gray-500 font-medium">
            <FiShield /> Your information is secure and will only be used for visit coordination.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Quick fix for FiMonitor import which was missing above.
const FiMonitor = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;

export default CampusVisitModal;
