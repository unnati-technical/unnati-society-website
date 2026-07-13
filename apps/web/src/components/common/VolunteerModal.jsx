import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  FiUsers, FiX, FiClock, FiAward, FiGlobe, FiCalendar, 
  FiBookOpen, FiBriefcase, FiCheckCircle,
  FiUpload, FiArrowRight, FiArrowLeft, FiHeart
} from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { volunteersApi } from '../../api/volunteers.api';
import { uploadToCloudinary } from '../../services/cloudinary.service';
const UnnatiLogo = 'https://res.cloudinary.com/drhkvdtw2/image/upload/v1782396887/unnati_assets/Unnati.png';

const VolunteerModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const STORAGE_KEY = 'unnati_volunteer_draft';
  const DRAFT_EXPIRATION = 60 * 60 * 1000; // 1 hour

  // Form State
  const [formData, setFormData] = useState(() => {
    const defaultState = {
      fullName: '', email: '', phone: '', gender: '',
      age: '', city: '', state: '', country: '',
      college: '', currentYear: '', department: '',
      linkedin: '', portfolio: '', resume: null,
      
      interests: [], availability: '', hoursPerWeek: '',
      mode: '', hasNgoExperience: '', ngoName: '',
      experienceDesc: '', emergencyName: '', emergencyPhone: '',
      
      whyJoin: '', skills: '', careerGoals: '',
      hearAboutUs: '', startDate: '',
      consentConduct: false, consentContact: false, consentAccurate: false
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

  const [applicationId] = useState(() => Math.floor(1000 + Math.random() * 9000));

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

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, resume: url }));
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to upload resume.');
    } finally {
      setIsUploading(false);
    }
  };


  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.fullName.trim()) {
        toast.error('Full Name is required');
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
      if (!formData.gender) {
        toast.error('Gender selection is required');
        return false;
      }
      if (!formData.age) {
        toast.error('Age is required');
        return false;
      }
      const ageVal = parseInt(formData.age, 10);
      if (isNaN(ageVal) || ageVal < 16 || ageVal > 99) {
        toast.error('Please enter a valid age (minimum 16)');
        return false;
      }
      if (!formData.city || !formData.city.trim()) {
        toast.error('Current City is required');
        return false;
      }
      if (!formData.college || !formData.college.trim()) {
        toast.error('College / Organization is required');
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.whyJoin || !formData.whyJoin.trim()) {
        toast.error('Please describe why you want to join Unnati Society');
        return false;
      }
      if (!formData.skills || !formData.skills.trim()) {
        toast.error('Please describe what skills you can contribute');
        return false;
      }
      if (!formData.consentConduct) {
        toast.error('You must agree to the volunteer code of conduct');
        return false;
      }
      if (!formData.consentAccurate) {
        toast.error('You must confirm that your information is accurate');
        return false;
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

  const applyMutation = useMutation({
    mutationFn: volunteersApi.apply,
    onSuccess: () => {
      setIsSuccess(true);
      localStorage.removeItem(STORAGE_KEY);
    },
    onError: (error) => {
      // Global interceptor handles generic errors, but we can do a fallback
      // if it wasn't intercepted (e.g. non 500/401 errors)
      if (error.response?.status < 500 && error.response?.status !== 401) {
        toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
      }
    }
  });

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validateStep(1) || !validateStep(3)) return;
    
    // Strip UI-only fields and unwhitelisted fields that cause 400 Bad Request
    const { consentAccurate, consentConduct, consentContact, state, country, resume, skills: skillsStr, ...payload } = formData;
    if (resume) payload.resume = resume; // Only send if it's a valid string/url
    // Backend expects skills as string[], convert comma-separated string to array
    if (skillsStr) {
      payload.skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    }
    applyMutation.mutate(payload);
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFormData({
        fullName: '', email: '', phone: '', gender: '', age: '', city: '', state: '', country: '', college: '', currentYear: '', department: '', linkedin: '', portfolio: '', resume: null, interests: [], availability: '', hoursPerWeek: '', mode: '', hasNgoExperience: '', ngoName: '', experienceDesc: '', emergencyName: '', emergencyPhone: '', whyJoin: '', skills: '', careerGoals: '', hearAboutUs: '', startDate: '', consentConduct: false, consentContact: false, consentAccurate: false
      });
    }, 300);
    onClose();
  };

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
      >
        <motion.div 
          variants={modalVariants}
          className="bg-white w-full max-w-[1400px] h-[95vh] md:h-[90vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden relative"
        >
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="hidden md:flex flex-wrap items-center gap-6 text-sm text-blue-600 font-bold">
              <span className="flex items-center gap-2"><FiUsers /> Join 200+ Changemakers</span>
              <span className="flex items-center gap-1.5"><FiClock /> Avg Response: 24–48 Hrs</span>
              <span className="flex items-center gap-1.5"><FiAward /> Certificate Available</span>
              <span className="flex items-center gap-1.5"><FiGlobe /> Remote Opportunities</span>
              <span className="flex items-center gap-1.5"><FiCalendar /> Flexible Timing</span>
            </div>
            <div className="md:hidden text-blue-600 font-bold text-sm">Volunteer Application</div>
            <button onClick={resetAndClose} className="p-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors ml-auto">
              <FiX size={20} />
            </button>
          </div>

          {/* MAIN LAYOUT */}
          {isSuccess ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-xl max-w-lg text-center border border-gray-100">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Application Submitted!</h2>
                <p className="text-gray-600 mb-8">Thank you for applying to become a volunteer at Unnati Society. Our team will review your application and contact you within 24–48 hours.</p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left text-sm text-gray-600 space-y-2 border border-gray-100">
                  <div className="flex justify-between"><span>Status:</span> <span className="font-bold text-blue-600">Under Review</span></div>
                  <div className="flex justify-between"><span>Application ID:</span> <span className="font-mono font-bold text-gray-800">UNN-{applicationId}</span></div>
                  <div className="flex justify-between"><span>Confirmation:</span> <span className="font-medium text-green-600">Email Sent</span></div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button onClick={resetAndClose} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                    Return Home
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-1 overflow-hidden">
              
              {/* LEFT PANEL (Hidden on small screens) */}
              <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-[#F8FAFC] to-blue-50 border-r border-blue-100 flex-col overflow-y-auto custom-scrollbar">
                <div className="p-10 flex-1">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden shrink-0 border border-gray-100 p-1">
                      <img loading="lazy" src={UnnatiLogo} alt="Unnati Society Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0F172A] leading-tight tracking-wide">UNNATI SOCIETY</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">An Institute Outreach Activity</p>
                    </div>
                  </div>

                  <h1 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] leading-[1.1] mb-6">
                    Be the Change.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Make an Impact.</span>
                  </h1>
                  <p className="text-gray-600 text-lg mb-10">Your time and skills can help thousands of students dream bigger, learn better, and achieve more.</p>

                  <div className="rounded-3xl overflow-hidden shadow-xl mb-12 border-4 border-white">
                    <img loading="lazy" src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Teaching" className="w-full h-48 object-cover" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] mb-6">Why Volunteer?</h3>
                  <div className="space-y-5 mb-12">
                    {[
                      { title: "Create Real Impact", desc: "Contribute to meaningful educational initiatives.", icon: <FiHeart /> },
                      { title: "Develop Leadership", desc: "Enhance communication and teamwork skills.", icon: <FiUsers /> },
                      { title: "Build Your Network", desc: "Connect with like-minded changemakers.", icon: <FiBriefcase /> },
                      { title: "Receive Certificates", desc: "Get recognized for your valuable contributions.", icon: <FiAward /> }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-[#0F172A]">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                      <div className="text-blue-600 flex justify-center mb-2"><FiUsers size={24}/></div>
                      <div className="text-2xl font-bold text-[#0F172A]">200+</div>
                      <div className="text-xs text-gray-500 font-bold uppercase mt-1">Volunteers</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center">
                      <div className="text-blue-600 flex justify-center mb-2"><FiBookOpen size={24}/></div>
                      <div className="text-2xl font-bold text-[#0F172A]">4,000+</div>
                      <div className="text-xs text-gray-500 font-bold uppercase mt-1">Impacted</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                    <span className="text-4xl text-blue-100 absolute top-4 left-4 font-serif">"</span>
                    <p className="text-gray-600 text-sm italic relative z-10 font-medium">The smallest act of kindness is worth more than the grandest intention.</p>
                    <p className="text-blue-600 text-xs font-bold mt-3 relative z-10">— Oscar Wilde</p>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL (Form) */}
              <div className="w-full lg:w-[60%] flex flex-col bg-white overflow-hidden relative">
                
                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
                  <div className="max-w-2xl mx-auto">
                    
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Volunteer Application</h2>
                      <p className="text-gray-500">Become part of a movement creating educational opportunities for every child.</p>
                    </div>

                    {/* Progress Stepper */}
                    <div className="mb-12">
                      <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
                        
                        {[{ num: 1, label: 'Personal Details' }, { num: 2, label: 'Preferences' }, { num: 3, label: 'Final Details' }].map((s) => (
                          <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s.num ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                              {step > s.num ? <FiCheckCircle size={20} /> : s.num}
                            </div>
                            <span className={`text-xs font-bold absolute -bottom-6 whitespace-nowrap ${step >= s.num ? 'text-blue-600' : 'text-gray-400'}`}>{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form Steps */}
                    <form onSubmit={handleSubmit} className="mt-8">
                      <AnimatePresence mode="wait">
                        
                        {/* STEP 1 */}
                        {step === 1 && (
                          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 pb-2 border-b border-gray-100">
                              <FiUsers /> PERSONAL DETAILS
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Enter your full name" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="you@example.com" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="+91 XXXXX XXXXX" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
                                <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none">
                                  <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option><option value="Prefer not to say">Prefer not to say</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Age *</label>
                                <input required name="age" value={formData.age} onChange={handleInputChange} type="number" min="16" max="99" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. 21" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Current City *</label>
                                <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="City Name" />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">College / Organization *</label>
                                <input required name="college" value={formData.college} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="University or Company" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn Profile</label>
                                <input name="linkedin" value={formData.linkedin} onChange={handleInputChange} type="url" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="https://linkedin.com/in/..." />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label className="block text-sm font-bold text-gray-700 mb-2">Resume / CV Upload (Optional)</label>
                              <div className="relative border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center justify-center overflow-hidden">
                                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                {isUploading ? (
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                    <p className="font-bold text-blue-600">Uploading...</p>
                                  </div>
                                ) : formData.resume ? (
                                  <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500 shadow-sm mb-3">
                                      <FiCheckCircle size={20} />
                                    </div>
                                    <p className="font-bold text-green-600 mb-1">Resume Uploaded Successfully!</p>
                                    <p className="text-xs text-gray-500">Click to replace</p>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-3">
                                      <FiUpload size={20} />
                                    </div>
                                    <p className="font-bold text-blue-600 mb-1">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500">PDF or DOCX (Max 5MB)</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                            <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 pb-2 border-b border-gray-100">
                              <FiBriefcase /> VOLUNTEER PREFERENCES
                            </div>
                            
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-4">Areas of Interest (Select multiple)</label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['DigiXplore', 'Akshar', 'Netritva', 'Event Mgmt', 'Social Media', 'Content Writing', 'Graphic Design', 'Photography', 'Web Dev', 'Research'].map(interest => (
                                  <label 
                                    key={interest} 
                                    onClick={() => toggleInterest(interest)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.interests.includes(interest) ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-200'}`}
                                  >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${formData.interests.includes(interest) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                      {formData.interests.includes(interest) && <FiCheckCircle size={14} className="text-white"/>}
                                    </div>
                                    <span className="text-sm font-medium select-none">{interest}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Availability</label>
                                <select name="availability" value={formData.availability} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none">
                                  <option value="">Select Availability</option><option value="Weekdays">Weekdays</option><option value="Weekends">Weekends</option><option value="Flexible">Flexible</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hours Per Week</label>
                                <select name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none">
                                  <option value="">Select Hours</option><option value="1-3">1-3 Hours</option><option value="4-6">4-6 Hours</option><option value="7+">7+ Hours</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-3">Previous NGO Experience?</label>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name="hasNgoExperience" value="yes" checked={formData.hasNgoExperience === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                                  <span className="text-gray-700 font-medium">Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name="hasNgoExperience" value="no" checked={formData.hasNgoExperience === 'no'} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                                  <span className="text-gray-700 font-medium">No</span>
                                </label>
                              </div>
                            </div>
                            
                            {formData.hasNgoExperience === 'yes' && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                                <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">NGO Name / Details</label>
                                  <input name="ngoName" value={formData.ngoName} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" placeholder="Which organization?" />
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 pb-2 border-b border-gray-100">
                              <FiCheckCircle /> FINAL DETAILS
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to join Unnati Society? *</label>
                              <textarea required name="whyJoin" value={formData.whyJoin} onChange={handleInputChange} rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" placeholder="Tell us your motivation..."></textarea>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">What skills can you contribute? *</label>
                              <textarea required name="skills" value={formData.skills} onChange={handleInputChange} rows="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" placeholder="E.g., Python coding, public speaking, video editing..."></textarea>
                            </div>

                            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 mt-8 space-y-4">
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-1 flex-shrink-0">
                                  <input required type="checkbox" name="consentConduct" checked={formData.consentConduct} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                                  I agree to follow Unnati Society’s volunteer code of conduct and maintain professional behavior during all activities. <span className="text-red-500 font-bold">*</span>
                                </span>
                              </label>
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-1 flex-shrink-0">
                                  <input required type="checkbox" name="consentAccurate" checked={formData.consentAccurate} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                                  I confirm that all information provided in this application is accurate and true to the best of my knowledge. <span className="text-red-500 font-bold">*</span>
                                </span>
                              </label>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="bg-white border-t border-gray-100 p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-20 flex items-center justify-between mt-auto">
                  <div className="flex gap-4">
                    {step > 1 && (
                      <button onClick={handlePrev} className="flex items-center gap-2 px-6 py-3 font-bold text-gray-500 hover:text-[#0F172A] hover:bg-gray-100 rounded-xl transition-all">
                        <FiArrowLeft /> Back
                      </button>
                    )}
                  </div>
                  
                  {step < 3 ? (
                    <button onClick={handleNext} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all group ml-auto">
                      Next Step <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                        type="button"
                        disabled={applyMutation.isPending}
                        onClick={handleSubmit}
                        className={`px-8 py-3 font-bold rounded-xl transition-all ${
                          applyMutation.isPending ? 'bg-orange-400 cursor-not-allowed text-white' : 'bg-green-500 text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:bg-green-600'
                        }`}
                      >
                        {applyMutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">Submit Application <FiCheckCircle className="group-hover:scale-110 transition-transform"/></span>
                        )}
                      </button>
                  )}
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VolunteerModal;
