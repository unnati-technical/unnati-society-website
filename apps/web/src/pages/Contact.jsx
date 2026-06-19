import React from 'react';
import Navbar from '../components/common/Navbar';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';
import ContactHero from '../components/pagesCompo/contact/ContactHero';
import ContactFormSection from '../components/pagesCompo/contact/ContactFormSection';
import ContactLocation from '../components/pagesCompo/contact/ContactLocation';
import ContactStats from '../components/pagesCompo/contact/ContactStats';
import ContactFaq from '../components/pagesCompo/contact/ContactFaq';
import ContactCta from '../components/pagesCompo/contact/ContactCta';
import { Toaster } from 'sonner';

const Contact = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans overflow-x-hidden">
      <Toaster position="top-right" richColors />
      <Navbar />
      <NavUnn />
      
      <main>
        <ContactHero />
        <ContactFormSection />
        <ContactLocation />
        <ContactStats />
        <ContactFaq />
        <ContactCta />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;