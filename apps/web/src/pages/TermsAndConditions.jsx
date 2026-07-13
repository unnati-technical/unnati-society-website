import React from 'react';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
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
            Terms & Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Please read these terms carefully before using the Unnati Society website.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6 border-b pb-4">Terms of Use</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">1. General Website Use</h3>
              <p>
                The content of the pages of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
              </p>
              
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">2. Donations</h3>
              <p>
                All donations made through the website are voluntary. By making a donation, you confirm that the funds are your own and are not derived from any illegal activity. Unnati Society reserves the right to decline any donation at its sole discretion.
              </p>

              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">3. Intellectual Property</h3>
              <p>
                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice.
              </p>

              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">4. Third-Party Links</h3>
              <p>
                From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6 border-b pb-4">Cancellation & Refund Policy</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We are incredibly grateful for your donations and support. However, we understand that situations may arise where a refund is requested.
              </p>
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">1. Refund Requests</h3>
              <p>
                Donations made to Unnati Society are generally non-refundable. However, in the event of an erroneous deduction or a duplicate transaction, a refund request can be initiated within 7 days of the transaction.
              </p>
              <h3 className="text-xl font-semibold text-[#1E293B] mt-6 mb-2">2. Processing</h3>
              <p>
                To request a refund, please contact us at <strong>technical.ir@iiitbh.ac.in</strong> with your transaction ID and proof of the duplicate deduction. Approved refunds will be processed and credited back to the original method of payment within 7-10 business days.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
