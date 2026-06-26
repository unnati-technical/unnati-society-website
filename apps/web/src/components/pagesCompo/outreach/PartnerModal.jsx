import React, { useState, useEffect } from 'react';
import { X, Handshake, ShieldCheck, ArrowRight, ChevronDown, Check, UploadCloud, Calendar, Download, Home, FileText, Send, Shield } from 'lucide-react';
import { toast } from 'sonner';

const AREA_OPTIONS = [
  'Digital Literacy', 'Career Guidance', 'STEM', 'Innovation', 'AI', 'Coding', 'Cyber Safety',
  'Skill Development', 'Teacher Training', 'Leadership', 'Scholarships', 'Research',
  'Community Outreach', 'Women Empowerment', 'Environment', 'Healthcare', 'Other'
];

const PartnerModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    partnershipInterest: '',
    areasOfInterest: [],
    message: '',
    meetingDate: '',
    documentUrl: ''
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [showAreas, setShowAreas] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleArea = (area) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(area)
        ? prev.areasOfInterest.filter(a => a !== area)
        : [...prev.areasOfInterest, area]
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("File exceeds 5MB limit");
    setUploadedFile(file);
    setFormData(prev => ({ ...prev, documentUrl: file.name }));
  };

  const isValid = formData.name && formData.organization && formData.email && formData.phone && formData.partnershipInterest && formData.areasOfInterest.length > 0 && formData.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return toast.error('Please fill all required fields');

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'areasOfInterest') {
          data.append(key, JSON.stringify(formData[key]));
        } else if (key !== 'documentUrl') {
          data.append(key, formData[key]);
        }
      });
      
      data.append('organizationType', 'Not Specified');
      data.append('collaborationMode', 'Not Specified');
      data.append('meetingMode', 'Not Specified');
      data.append('website', '');
      data.append('linkedin', '');

      if (uploadedFile) {
        data.append('file', uploadedFile);
      }

      const response = await fetch('/api/outreach/partner', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Failed to submit request');
      setReferenceId(`PART-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '', organization: '', email: '', phone: '',
      partnershipInterest: '', areasOfInterest: [],
      message: '', meetingDate: '', documentUrl: ''
    });
    setUploadedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center font-sans px-2 lg:px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0C1220]/70 backdrop-blur-[12px]" onClick={isSuccess ? undefined : resetAndClose} />

      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-[1200px] h-[92vh] max-h-[850px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300"
      >
        
        {/* Left Panel */}
        <div className="hidden md:flex w-[38%] bg-[#081B3A] flex-col relative text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#081B3A] to-[#040C1D] z-0" />
          <div className="p-5 lg:p-8 xl:p-12 flex-1 z-10 flex flex-col overflow-y-auto scrollbar-none min-h-0">
            <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 xl:mb-8 relative shrink-0">
              <Handshake size={24} className="text-[#FBBF24] xl:w-8 xl:h-8" />
              <div className="absolute -inset-1 border border-[#FBBF24]/30 rounded-full animate-pulse" />
            </div>

            <h1 className="text-[28px] lg:text-[32px] xl:text-[44px] font-bold leading-tight mb-2 xl:mb-4 tracking-tight shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Partner With <span className="text-[#FBBF24]">Us</span>
            </h1>
            <div className="w-[40px] xl:w-[60px] h-1 bg-[#FBBF24] mb-3 xl:mb-6 rounded-full shrink-0" />
            
            <p className="text-[13px] lg:text-[14px] xl:text-[16px] text-white/90 leading-[150%] xl:leading-[170%] mb-5 xl:mb-10 font-normal shrink-0">
              Together, we can create meaningful impact through education, innovation, and outreach. Let's build a better tomorrow for our students and communities.
            </p>

            <div className="space-y-2.5 lg:space-y-4 xl:space-y-5 mt-auto">
              {[
                { title: 'Create Impact', desc: 'Help us empower more students and communities.', icon: <ArrowRight size={18} className="xl:w-5 xl:h-5"/> },
                { title: 'Collaborate', desc: 'Work together on initiatives that bring real change.', icon: <Handshake size={18} className="xl:w-5 xl:h-5"/> },
                { title: 'Sustainable Growth', desc: 'Build long-term value through meaningful partnerships.', icon: <Check size={18} className="xl:w-5 xl:h-5"/> },
                { title: 'Stronger Communities', desc: 'Support inclusive development across regions.', icon: <ShieldCheck size={18} className="xl:w-5 xl:h-5"/> }
              ].map((card, i) => (
                <div key={i} className="flex items-start gap-3 xl:gap-4 cursor-default group">
                  <div className="w-9 h-9 xl:w-12 xl:h-12 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-white/10 transition-all text-[#8BA5E4]">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[13px] xl:text-[15px] mb-0.5 xl:mb-1">{card.title}</h3>
                    <p className="text-[11px] xl:text-[13px] text-white/60 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-[120px] xl:h-[200px] w-full shrink-0 relative mt-auto overflow-hidden z-10 bg-[#040C1D]">
             <img loading="lazy" src="https://res.cloudinary.com/dyubgh5k4/image/upload/v1782396803/unnati_assets/iiit-bhagalpur.png" alt="IIIT Bhagalpur Building" className="absolute inset-0 w-full h-full object-cover opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#040C1D] via-[#040C1D]/60 to-transparent" />
          </div>
        </div>

        {/* Right Panel (Form or Success) */}
        <div className="w-full md:w-[62%] h-full bg-white relative flex flex-col">
          
          {/* Close Button */}
          <button 
            onClick={resetAndClose}
            className="absolute top-4 right-4 xl:top-6 xl:right-6 w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors z-50"
          >
            <X size={24} />
          </button>

          <div className="p-6 lg:p-8 xl:p-12 h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pb-20 md:pb-8">
            
            {!isSuccess ? (
              <>
                <div className="mb-6 xl:mb-8 flex items-center gap-3 shrink-0 pr-10">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-white border border-[#E5E7EB] rounded-[14px] flex items-center justify-center text-[#2563EB] shrink-0 shadow-sm">
                    <Handshake size={24} className="xl:w-7 xl:h-7" />
                  </div>
                  <div>
                    <h2 className="text-[24px] lg:text-[28px] xl:text-[32px] font-bold text-[#0F172A] leading-none tracking-tight mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Become a Partner</h2>
                    <p className="text-[13px] xl:text-[14px] text-[#475569] font-medium leading-tight">Fill out the form below and our team will connect with you.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 xl:space-y-5 flex-1 flex flex-col">
                  
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 shrink-0">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#334155]">Full Name <span className="text-red-500">*</span></label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-11 border border-[#E2E8F0] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-400" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#334155]">Organization / Company <span className="text-red-500">*</span></label>
                      <input required type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full h-11 border border-[#E2E8F0] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-400" placeholder="Enter organization name" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 shrink-0">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#334155]">Email Address <span className="text-red-500">*</span></label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-11 border border-[#E2E8F0] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-400" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#334155]">Phone Number <span className="text-red-500">*</span></label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-11 border border-[#E2E8F0] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-gray-400" placeholder="Enter your phone number" />
                    </div>
                  </div>

                  {/* Row 3 - Partnership Type */}
                  <div className="space-y-1.5 relative shrink-0">
                    <label className="text-[13px] font-semibold text-[#334155]">Partnership Type <span className="text-red-500">*</span></label>
                    <select required name="partnershipInterest" value={formData.partnershipInterest} onChange={handleChange} className="w-full h-11 border border-[#E2E8F0] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all appearance-none bg-white text-[#0F172A]">
                      <option value="" disabled>Select partnership type</option>
                      {['CSR Partnership', 'Educational Partnership', 'Technology Partnership', 'Internship Collaboration', 'Research Collaboration', 'Funding', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-[34px] text-gray-400 pointer-events-none" size={16} />
                  </div>

                  {/* Row 4 - Area of Interest (Multi-Select Fake) */}
                  <div className="space-y-1.5 relative shrink-0">
                    <label className="text-[13px] font-semibold text-[#334155]">Area of Interest <span className="text-red-500">*</span></label>
                    <div 
                      className="w-full min-h-[44px] border border-[#E2E8F0] rounded-[8px] px-4 py-2 flex flex-wrap gap-2 items-center cursor-pointer focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-50 transition-all bg-white"
                      onClick={() => setShowAreas(!showAreas)}
                    >
                      {formData.areasOfInterest.length === 0 && <span className="text-gray-400 text-[14px]">Select area of interest</span>}
                      {formData.areasOfInterest.map(area => (
                        <span key={area} className="bg-[#F1F5F9] border border-gray-200 text-[#334155] text-[12px] px-2 py-1 rounded-[6px] flex items-center gap-1 font-medium">
                          {area}
                          <X size={12} className="cursor-pointer text-gray-400 hover:text-red-500" onClick={(e) => { e.stopPropagation(); toggleArea(area); }}/>
                        </span>
                      ))}
                      <ChevronDown className="absolute right-4 top-[14px] text-gray-400 pointer-events-none" size={16} />
                    </div>
                    {showAreas && (
                      <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg p-3 grid grid-cols-2 lg:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                        {AREA_OPTIONS.map(area => (
                          <label key={area} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-md transition-colors text-[13px] text-[#475569]">
                            <input type="checkbox" checked={formData.areasOfInterest.includes(area)} onChange={() => toggleArea(area)} className="accent-[#2563EB] w-4 h-4 rounded" />
                            {area}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Row 5 - Message */}
                  <div className="space-y-1.5 relative shrink-0">
                    <label className="text-[13px] font-semibold text-[#334155]">How can you collaborate with us? <span className="text-red-500">*</span></label>
                    <textarea 
                      required name="message" value={formData.message} onChange={handleChange} maxLength={1000} rows={4}
                      className="w-full border border-[#E2E8F0] rounded-[8px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all resize-none placeholder:text-gray-400"
                      placeholder="Tell us about your ideas, resources, and how you'd like to contribute..."
                    />
                    <div className="absolute bottom-3 right-3 text-[11px] font-medium text-gray-400">{formData.message.length}/1000</div>
                  </div>

                  {/* Row 6 - Date & File */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 shrink-0 mt-2">
                    <div className="space-y-1.5 relative">
                      <label className="text-[13px] font-semibold text-[#334155]">Preferred Time to Connect</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-[13px] text-gray-400" />
                        <input type="date" name="meetingDate" value={formData.meetingDate} onChange={handleChange} className="w-full h-11 border border-[#E2E8F0] rounded-[8px] pl-10 pr-4 text-[14px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 transition-all text-[#0F172A]" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-[#334155]">Additional Documents (Optional)</label>
                      <div className="flex items-center gap-3 h-11">
                        <input type="file" className="hidden" id="fileUpload" accept=".pdf,.doc,.docx" onChange={handleFile} />
                        <label htmlFor="fileUpload" className="h-full px-4 rounded-[8px] border border-[#E2E8F0] bg-white text-[#2563EB] text-[13px] font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors shrink-0">
                          <UploadCloud size={16} /> Upload File
                        </label>
                        {uploadedFile ? (
                          <div className="text-[12px] font-medium text-gray-700 truncate">{uploadedFile.name}</div>
                        ) : (
                          <span className="text-[12px] text-gray-400">PDF, DOC, DOCX (Max. 5MB)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Privacy Alert */}
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[8px] p-3 xl:p-4 flex gap-3 items-center mt-6 shrink-0">
                    <ShieldCheck className="text-[#16A34A] shrink-0" size={20} />
                    <p className="text-[13px] text-[#15803D] font-medium">
                      Your information is safe with us. We respect your privacy.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 shrink-0 mt-auto">
                    <button 
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="w-full h-12 rounded-[8px] bg-[#2563EB] text-white text-[15px] font-bold hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send size={18}/> Submit Partnership Request</>
                      )}
                    </button>
                  </div>

                </form>
              </>
            ) : (
              // Success Screen
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500 p-8">
                <div className="w-24 h-24 xl:w-32 xl:h-32 bg-blue-50 rounded-[20px] flex items-center justify-center mb-6 xl:mb-8 relative">
                  <Handshake size={48} className="text-[#2563EB] xl:w-16 xl:h-16" />
                </div>
                <h2 className="text-[28px] xl:text-[36px] font-bold text-[#0F172A] mb-3 xl:mb-4 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Partnership Request Submitted</h2>
                <p className="text-[14px] xl:text-[16px] text-[#475569] max-w-md mx-auto leading-relaxed mb-6 xl:mb-8">
                  Thank you for reaching out. Our team will review your request and connect with you shortly.
                </p>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] px-6 py-3 mb-8 xl:mb-10">
                  <p className="text-[11px] xl:text-[12px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Reference ID</p>
                  <p className="text-[14px] xl:text-[16px] font-bold text-[#0F172A] font-mono">{referenceId}</p>
                </div>
                
                <div className="flex gap-3 xl:gap-4 w-full max-w-md">
                  <button onClick={resetAndClose} className="flex-1 h-12 rounded-[8px] bg-[#2563EB] text-white font-bold text-[14px] xl:text-[15px] flex items-center justify-center gap-2 hover:bg-[#1D4ED8] transition-all">
                    <Home size={18} /> Return Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
