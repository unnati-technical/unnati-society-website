import React from 'react';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavUnn />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-16 bg-[#0F172A] text-white overflow-hidden">
        {/* Modern Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 font-serif"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Please read these policies carefully before using the Unnati Society website or making a donation.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          {/* Privacy Policy */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6 border-b pb-4">Privacy Policy</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>Unnati Society, IIIT Bhagalpur</strong> ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Unnati Society.
              </p>
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">1. Information We Collect</h3>
              <p>
                We collect information from you when you visit our website, register as a volunteer, fill out a contact form, or make a donation. This may include your name, email address, phone number, and address.
              </p>
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">2. How We Use Your Information</h3>
              <p>
                Any of the information we collect from you may be used in one of the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process your donations and issue receipts.</li>
                <li>To send periodic emails regarding upcoming events, campaigns, or your volunteer status.</li>
                <li>To improve our website and services.</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">3. Data Security</h3>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. Payment processing is handled securely by Razorpay, and we do not store your credit card or bank details on our servers.
              </p>
            </div>
          </div>

          {/* Contact Us Reference */}
          <div>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6 border-b pb-4">Contact Us</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                If you have any questions about these Policies, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> technical.ir@iiitbh.ac.in</li>
                <li><strong>Address:</strong> IIIT Bhagalpur, Sabour, Bhagalpur, Bihar, 813210</li>
                <li><strong>Phone:</strong> +91 7348145325</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
