import React, { useState } from 'react';
import { X, Handshake, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const PartnerModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationType: '',
    partnershipInterest: '',
    collaborationMode: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.organizationType || !formData.partnershipInterest || !formData.collaborationMode) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/outreach/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      toast.success('Partnership request submitted successfully! Our team will contact you soon.');
      onClose();
      // Reset form
      setFormData({
        name: '', email: '', phone: '', organizationType: '',
        partnershipInterest: '', collaborationMode: '', message: ''
      });
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#081B3A]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto px-8 lg:px-12 py-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#1E63E9] mb-4">
              <Handshake size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#081B3A] mb-3 tracking-tight">Partner With Us</h2>
            <p className="text-[13px] text-gray-500 max-w-sm">
              Fill out the form below and our team will connect with you to explore partnership opportunities.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#081B3A]">
                  Full Name / Organization Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name or organization"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#081B3A]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#081B3A]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Organization Type */}
              <div className="space-y-2 relative">
                <label className="text-[11px] font-bold text-[#081B3A]">
                  Organization Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all appearance-none bg-white text-gray-700"
                  >
                    <option value="" disabled>Select organization type</option>
                    <option value="Corporate">Corporate / CSR</option>
                    <option value="NGO">NGO / Non-Profit</option>
                    <option value="Educational">Educational Institution</option>
                    <option value="Government">Government Body</option>
                    <option value="Individual">Individual Philanthropist</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Partnership Interest */}
              <div className="space-y-2 relative">
                <label className="text-[11px] font-bold text-[#081B3A]">
                  Partnership Interest <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="partnershipInterest"
                    value={formData.partnershipInterest}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all appearance-none bg-white text-gray-700"
                  >
                    <option value="" disabled>Select partnership interest</option>
                    <option value="Funding">Funding & Grants</option>
                    <option value="Mentorship">Mentorship Programs</option>
                    <option value="Resource">Resource Sharing</option>
                    <option value="Volunteering">Corporate Volunteering</option>
                    <option value="Awareness">Awareness Campaigns</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Collaboration Mode */}
              <div className="space-y-2 relative">
                <label className="text-[11px] font-bold text-[#081B3A]">
                  Preferred Mode of Collaboration <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="collaborationMode"
                    value={formData.collaborationMode}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all appearance-none bg-white text-gray-700"
                  >
                    <option value="" disabled>Select collaboration type</option>
                    <option value="Financial">Financial Support</option>
                    <option value="InKind">In-Kind Contributions</option>
                    <option value="Knowledge">Knowledge & Skill Sharing</option>
                    <option value="Joint">Joint Initiatives/Events</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#081B3A]">
                Message / Additional Information
              </label>
              <div className="relative">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  placeholder="Tell us more about your vision and how you'd like to partner with us..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#1E63E9] focus:ring-1 focus:ring-[#1E63E9] outline-none transition-all resize-none placeholder:text-gray-400"
                ></textarea>
                <span className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* Security Banner */}
            <div className="bg-[#F4F7FE] rounded-lg p-4 flex items-start gap-3 mt-2 border border-blue-50/50">
              <ShieldCheck className="text-[#1E63E9] shrink-0" size={18} />
              <p className="text-[11px] text-[#081B3A]/80 font-medium leading-relaxed">
                Your information is safe with us. We respect your privacy and will never share your details.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl border border-gray-200 text-sm font-bold text-[#081B3A] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl bg-[#1E63E9] text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : <>Submit Request <ArrowRight size={16}/></>}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
