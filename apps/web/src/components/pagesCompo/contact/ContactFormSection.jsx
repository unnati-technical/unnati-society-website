import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactApi } from '../../../api/contact.api';
import { MapPin, Mail, Phone, Send, Loader2 } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(100),
  role: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

const ContactFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '', email: '', subject: '', role: '', message: '',
    }
  });

  const messageText = useWatch({ control, name: "message", defaultValue: "" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await contactApi.submit(data);

      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-8 lg:py-10">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[40%] flex flex-col"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 bg-[#2563EB]"></div>
                <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider">Get In Touch</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-4">How Can We Help You?</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reach out to us for collaborations, partnerships, event invitations, volunteering opportunities, or any other queries.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {/* Location Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-2">Our Location</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Indian Institute of Information Technology<br />
                    Bhagalpur<br />
                    Sabour, Bihar – 813210, India
                  </p>
                  <a href="https://maps.google.com/?q=IIIT+Bhagalpur" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] font-bold text-sm hover:underline flex items-center gap-1">
                    View on Map →
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-1">Email Us</h4>
                  <a href="mailto:contact@unnatisociety.org" className="block text-sm text-gray-600 hover:text-[#2563EB] mb-0.5">unnati.ir@iiitbh.ac.in</a>
                  <a href="mailto:partnerships@unnatisociety.org" className="block text-sm text-gray-600 hover:text-[#2563EB]">outreach.ir@iiitbh.ac.in</a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-1">Call Us</h4>
                  <a href="tel:+919334117404" className="block text-sm text-gray-600 hover:text-[#2563EB] mb-0.5">+91 7348145325</a>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mon-Sat 9AM-6PM</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-auto bg-gradient-to-r from-[#EFF6FF] to-[#EEF2FF] p-5 rounded-2xl shadow-sm border border-blue-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all group">
                <div>
                  <h4 className="font-extrabold text-[#1E3A8A] text-sm">Connect With Us</h4>
                  <p className="text-[11px] text-blue-600/70 font-semibold tracking-wide uppercase mt-0.5">Join our community</p>
                </div>
                <div className="flex gap-2.5">
                  <a href="https://www.instagram.com/unnati_society_iiitbh_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:shadow-md hover:shadow-pink-500/20 transition-all hover:-translate-y-1">
                    <FaInstagram size={18} />
                  </a>
                  <a href="https://x.com/Unnati_Welfare" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-black hover:shadow-md hover:shadow-gray-500/20 transition-all hover:-translate-y-1">
                    <FaXTwitter size={18} />
                  </a>
                  <a href="https://www.linkedin.com/company/unnati-society-iiit-bhagalpur/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:shadow-md hover:shadow-blue-500/20 transition-all hover:-translate-y-1">
                    <FaLinkedinIn size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-[60%] flex flex-col"
          >
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-8">
                <Send className="text-[#2563EB]" size={28} />
                <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A]">Send Us a Message</h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Your Name <span className="text-red-500">*</span></label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#2563EB]'} bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#2563EB]'} bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Subject <span className="text-red-500">*</span></label>
                  <input
                    {...register("subject")}
                    type="text"
                    placeholder="What is this regarding?"
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#2563EB]'} bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject.message}</p>}
                </div>

                {/* Role/Persona */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">I am writing as a <span className="text-red-500">*</span></label>
                  <select
                    {...register("role")}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#2563EB]'} bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none`}
                  >
                    <option value="">Select an option</option>
                    <option value="Student">Student</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="School">School</option>
                    <option value="College">College</option>
                    <option value="Organization">Organization</option>
                    <option value="NGO">NGO</option>
                    <option value="Partner">Partner</option>
                    <option value="Media">Media</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.role && <p className="text-red-500 text-xs mt-1 font-medium">{errors.role.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Message <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <textarea
                      {...register("message")}
                      rows="4"
                      placeholder="Type your message here..."
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#2563EB]'} bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none`}
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400">
                      {messageText.length}/1000
                    </div>
                  </div>
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
