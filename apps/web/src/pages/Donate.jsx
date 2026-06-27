import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  GraduationCap, Users, Heart, BookOpen, Target,
  MapPin, ShieldCheck, FileText,
  ArrowRight,
  Laptop, Lightbulb, Building2
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import NavUnn from '../components/common/NavUnn';
import Footer from '../components/common/Footer';

/* ─── Donor Details Modal ──────────────────────────────────────────────── */
const DonorModal = ({ open, onClose, onSubmit, isProcessing }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!name || !email) return toast.error('Name and Email are required');
    onSubmit(name, email, phone, '', '');
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 lg:p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        <h3 className="text-lg font-bold text-[#081B3A] mb-1">Almost there!</h3>
        <p className="text-xs text-gray-500 mb-5">Please provide your details to complete the donation.</p>
        
        <input type="text" placeholder="Full Name *" value={name} onChange={e => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm mb-3 focus:outline-none focus:border-[#1E63E9]" />
        
        <input type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm mb-3 focus:outline-none focus:border-[#1E63E9]" />

        <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
          className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm mb-5 focus:outline-none focus:border-[#1E63E9]" />

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={isProcessing}
            className="flex-1 py-2.5 rounded-lg bg-[#1E63E9] text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            {isProcessing ? 'Processing...' : <><span>Confirm</span><ArrowRight size={14}/></>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Donate Page ──────────────────────────────────────────────────────── */
const Donate = () => {
  const [donationType, setDonationType] = useState('One Time');
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const presetAmounts = [100, 500, 1000, 2500, 5000, 'Custom'];

  const getImpactMessage = (amt) => {
    const n = Number(amt);
    if (!n) return 'Enter an amount to see your impact.';
    if (n < 500) return `Can provide basic stationery for ${Math.max(1, Math.floor(n / 100))} students.`;
    if (n < 1000) return `Can provide learning materials for ${Math.floor(n / 100)} students.`;
    if (n < 2500) return `Can fund digital literacy for ${Math.floor(n / 500)} students.`;
    if (n < 5000) return `Can support mentoring for ${Math.floor(n / 1250)} students.`;
    return `Can create a transformational impact for an entire classroom.`;
  };

  const displayAmount = amount === 'Custom' ? (customAmount || 0) : amount;

  const handleAmountClick = (val) => {
    if (val === 'Custom') { 
      setAmount('Custom'); 
      setCustomAmount(amount === 'Custom' ? customAmount : amount);
      setIsEditingAmount(true);
    }
    else {
      setAmount(val);
      setIsEditingAmount(false);
    }
  };

  const handleProceed = () => {
    const finalAmount = amount === 'Custom' ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 100) return toast.error('Minimum donation amount is ₹100');
    setModalOpen(true);
  };

  const handleScrollToCard = () => {
    document.getElementById('donation-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDonate = async (donorName, donorEmail, donorPhone, donorPan, donorAddress) => {
    const finalAmount = amount === 'Custom' ? Number(customAmount) : amount;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/donations/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount, donorName, donorEmail, donorPhone, donorPan, donorAddress })
      });
      const order = await res.json();
      if (!order || !order.orderId) throw new Error('Could not create order');
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'dummy_key',
        amount: order.amount,
        currency: order.currency,
        name: 'Unnati Society',
        description: 'NGO Donation',
        order_id: order.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/donations/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donationId: order.donationId
              })
            });
            const v = await verifyRes.json();
            if (v.success) { toast.success('Donation Successful! Thank you.'); setAmount(500); setModalOpen(false); }
            else toast.error('Payment verification failed');
          } catch { toast.error('Payment verification error'); }
        },
        prefill: { name: donorName, email: donorEmail, contact: donorPhone },
        theme: { color: '#1E63E9' }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', (r) => toast.error('Payment failed: ' + r.error.description));
      rzp1.open();
    } catch (e) {
      toast.error(e.message || 'Something went wrong!');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="w-full bg-[#F4F6FA] font-sans text-[#111827]">
      <Navbar />
      <div className="sticky top-0 z-50"><NavUnn /></div>

      <DonorModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleDonate} isProcessing={isProcessing} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#081B3A] min-h-[580px] lg:h-[620px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <img loading="lazy"             src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=80"
            alt="Students"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081B3A]/95 via-[#081B3A]/75 lg:to-transparent to-[#081B3A]/60" />
        </div>

        <div className="max-w-[1320px] mx-auto h-full px-5 lg:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14 lg:py-0">
          {/* Left: Text */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 text-[#F7B500] text-[11px] font-extrabold tracking-[0.2em] uppercase mb-5">
              <span className="w-6 h-0.5 bg-[#F7B500]"></span>MAKE A DIFFERENCE
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-[1.08] mb-5">
              Support Today,<br />
              <span className="text-[#1E63E9]">Transform Tomorrow.</span>
            </h1>
            <div className="w-16 h-1 bg-[#F7B500] mb-6 rounded-full" />
            <p className="text-sm text-gray-300 max-w-sm mb-10 leading-relaxed">
              Your contribution empowers students with education, skills, confidence, and opportunities to build a better future. Together, we can create lasting change.
            </p>
            <div className="flex flex-wrap gap-8">
              {[
                { icon: <GraduationCap size={22} />, title: 'Empowering', sub: 'Education' },
                { icon: <Users size={22} />, title: 'Building', sub: 'Better Futures' },
                { icon: <Heart size={22} />, title: 'Strengthening', sub: 'Communities' },
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-[#F7B500]">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-200 text-center leading-snug">{f.title}<br />{f.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Donation Card */}
          <div className="flex justify-center lg:justify-end" id="donation-card">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-[380px] text-[#111827]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#081B3A]">I want to Donate</h3>
                <Heart size={18} className="text-gray-300" />
              </div>

              {/* Amount Display */}
              <div 
                className={`w-full border rounded-lg py-3 px-4 flex items-center justify-between mb-4 transition-colors ${isEditingAmount ? 'border-[#1E63E9] bg-white ring-2 ring-blue-100' : 'bg-[#F4F6FA] border-gray-200 cursor-pointer hover:border-[#1E63E9]'}`}
                onClick={() => {
                  if (!isEditingAmount) {
                    setIsEditingAmount(true);
                    setAmount('Custom');
                    setCustomAmount(amount === 'Custom' ? customAmount : amount);
                  }
                }}
              >
                <div className="flex items-center gap-1 w-full">
                  <span className="font-extrabold text-2xl text-[#081B3A]">₹</span>
                  {isEditingAmount ? (
                    <input 
                      type="number" 
                      autoFocus
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      onBlur={() => { if (!customAmount || Number(customAmount) < 100) { setIsEditingAmount(false); setAmount(100); } }}
                      className="font-extrabold text-2xl text-[#081B3A] bg-transparent outline-none w-full"
                      placeholder="Enter amount"
                    />
                  ) : (
                    <span className="font-extrabold text-2xl text-[#081B3A]">{displayAmount}</span>
                  )}
                </div>
                {!isEditingAmount && <span className="text-[#1E63E9] text-xs font-bold">✎</span>}
              </div>

              {/* One Time / Monthly Toggle */}
              <div className="flex gap-2 mb-4">
                {['One Time', 'Monthly'].map(type => (
                  <button key={type} onClick={() => setDonationType(type)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${donationType === type ? 'bg-[#1E63E9] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    {type}
                  </button>
                ))}
              </div>

              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map((preset, idx) => (
                  <button key={idx} onClick={() => handleAmountClick(preset)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all border ${amount === preset ? 'bg-[#1E63E9] border-[#1E63E9] text-white shadow-md shadow-blue-200' : 'bg-white border-gray-200 text-[#081B3A] hover:border-[#1E63E9] hover:text-[#1E63E9]'}`}>
                    {preset === 'Custom' ? 'Custom' : `₹${preset}`}
                  </button>
                ))}
              </div>

              {/* Impact Message */}
              <div className="bg-[#F0F5FF] rounded-xl p-3.5 flex gap-3 items-start mb-5 border border-blue-100">
                <BookOpen className="text-[#1E63E9] shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-extrabold text-sm text-[#081B3A] mb-0.5">₹{displayAmount}</div>
                  <p className="text-[11px] text-gray-500 leading-snug">{getImpactMessage(displayAmount)}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button onClick={handleProceed}
                className="w-full bg-[#1E63E9] hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-300/40 mb-4">
                Proceed to Donate <ArrowRight size={15} />
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-green-500" /> Secure</span>
                <span>•</span>
                <span className="flex items-center gap-1"><FileText size={10} /> Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1320px] mx-auto px-5 lg:px-10 relative z-20 -mt-12 mb-20">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { icon: <Users size={26} />, stat: '4000+', label: 'Students Reached' },
              { icon: <BookOpen size={26} />, stat: '350+', label: 'Sessions Conducted' },
              { icon: <MapPin size={26} />, stat: '20+', label: 'Schools Reached' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-5 py-7 px-8">
                <div className="w-14 h-14 rounded-full border-2 border-blue-100 bg-blue-50 text-[#1E63E9] flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-[#081B3A] leading-none">{s.stat}</h3>
                  <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reports Section (Commented out for future release)
          <div className="w-full md:w-[280px] bg-[#F8FAFF] p-7 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-[#1E63E9]" />
              <span className="text-sm font-bold text-[#081B3A]">Reports</span>
            </div>
            <ul className="space-y-2 mb-5">
              {['Annual Reports', 'Financial Statements', 'Compliance Documents', 'Impact Reports'].map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E63E9] shrink-0" />{r}
                </li>
              ))}
            </ul>
            <button className="bg-[#1E63E9] hover:bg-blue-700 text-white text-[11px] font-bold py-2 px-5 rounded-lg w-fit transition-colors">
              View Reports
            </button>
          </div>
          */}
        </div>
      </section>


      {/* ── IMPACT ────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
          <div className="mb-14">
            <h2 className="text-xl font-extrabold text-[#081B3A] uppercase tracking-widest">IMPACT</h2>
            <div className="w-12 h-1 bg-[#F7B500] mt-2 rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">

            {/* Left Text */}
            <div className="flex flex-col gap-12 w-full md:w-[28%]">
              {[
                { icon: <Laptop size={18} />, color: 'text-[#1E63E9] bg-blue-50', title: 'Digital Education', desc: 'Providing students with comprehensive access to modern digital learning tools, online resources, and essential computer literacy programs.' },
                { icon: <Users size={18} />, color: 'text-orange-500 bg-orange-50', title: 'Leadership Development', desc: 'Nurturing confident, resilient, and socially responsible citizens through targeted mentorship, skill-building workshops, and peer programs.' },
              ].map((item, i) => (
                <div key={i} className="text-right">
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center ml-auto mb-3`}>{item.icon}</div>
                  <h3 className="text-[15px] font-bold text-[#081B3A] mb-1.5">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Center: 2x2 Circular Images */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[440px] shrink-0">
              {[
                { img: 'https://res.cloudinary.com/drhkvdtw2/image/upload/v1782502259/IMG_1207_ap4tzu.jpg', border: 'border-[#1E63E9]', rounded: 'rounded-tl-full rounded-tr-full rounded-br-full' },
                { img: 'https://res.cloudinary.com/drhkvdtw2/image/upload/v1782502260/IMG_0736_dmevg9.jpg', border: 'border-[#F7B500]', rounded: 'rounded-tl-full rounded-tr-full rounded-bl-full' },
                { img: 'https://res.cloudinary.com/drhkvdtw2/image/upload/v1782502260/IMG_20250301_110601_ozuxbh.jpg', border: 'border-[#F7B500]', rounded: 'rounded-tl-full rounded-br-full rounded-bl-full' },
                { img: 'https://res.cloudinary.com/drhkvdtw2/image/upload/v1782502260/IMG_20260405_164312_ykh2k8.jpg', border: 'border-[#1E63E9]', rounded: 'rounded-tr-full rounded-br-full rounded-bl-full' },
              ].map((item, i) => (
                <div key={i} className={`aspect-square overflow-hidden border-[6px] ${item.border} ${item.rounded} shadow-lg`}>
                  <img loading="lazy" src={item.img} alt={`Impact ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>

            {/* Right Text */}
            <div className="flex flex-col gap-12 w-full md:w-[28%]">
              {[
                { icon: <Target size={18} />, color: 'text-[#F7B500] bg-yellow-50', title: 'Career Guidance', desc: 'Helping students discover their true potential and guiding them toward successful, fulfilling career paths through expert counseling.' },
                { icon: <Building2 size={18} />, color: 'text-[#1E63E9] bg-blue-50', title: 'Community Outreach', desc: 'Building stronger, inclusive, and highly resilient communities by fostering collaboration, mutual support, and sustainable development.' },
              ].map((item, i) => (
                <div key={i} className="text-left">
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mb-3`}>{item.icon}</div>
                  <h3 className="text-[15px] font-bold text-[#081B3A] mb-1.5">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1320px] mx-auto px-5 lg:px-10 my-16">
        <div className="bg-[#F7B500] rounded-tl-[32px] rounded-br-[32px] px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none w-1/2 h-full">
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" preserveAspectRatio="none">
              <path d="M0 200V0C110.457 0 200 89.543 200 200H0Z" fill="#081B3A"/>
            </svg>
          </div>
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1E63E9] shrink-0 shadow-md">
              <Heart size={26} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#081B3A] mb-1">Together, we can build a better tomorrow.</h2>
              <p className="text-[#081B3A]/80 text-[12px] font-medium">Your small contribution today can create a big change in a student's life.</p>
            </div>
          </div>
          <button onClick={handleScrollToCard}
            className="bg-[#081B3A] text-[#F7B500] hover:bg-[#0c2a5e] px-7 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shrink-0 z-10 shadow-md">
            Donate Now <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
