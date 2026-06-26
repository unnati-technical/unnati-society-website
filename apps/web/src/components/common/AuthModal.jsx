import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiEye, FiEyeOff, FiLock, FiShield, FiCheckCircle } from 'react-icons/fi';
import { FaGraduationCap, FaUserTie, FaHandsHelping, FaUsers } from 'react-icons/fa';
const UnnatiLogo = 'https://res.cloudinary.com/dyubgh5k4/image/upload/v1782396887/unnati_assets/Unnati.png';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const roles = [
  { 
    id: 'volunteer', label: 'Volunteer', icon: <FaHandsHelping size={20} />, 
    activeClass: 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20', 
    btnClass: 'bg-gradient-to-r from-[#2563EB] to-blue-500 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30',
    focusRingClass: 'focus:ring-[#2563EB]',
    textClass: 'text-[#2563EB] hover:text-blue-700',
    checkboxClass: 'checked:bg-[#2563EB] checked:border-[#2563EB]'
  },
  { 
    id: 'student', label: 'Student', icon: <FaGraduationCap size={20} />, 
    activeClass: 'bg-[#10B981] text-white shadow-md shadow-green-500/20', 
    btnClass: 'bg-gradient-to-r from-[#10B981] to-green-500 hover:from-green-600 hover:to-green-700 shadow-green-500/30',
    focusRingClass: 'focus:ring-[#10B981]',
    textClass: 'text-[#10B981] hover:text-green-700',
    checkboxClass: 'checked:bg-[#10B981] checked:border-[#10B981]'
  },
  { 
    id: 'team', label: 'Team', icon: <FaUsers size={20} />, 
    activeClass: 'bg-[#F59E0B] text-white shadow-md shadow-orange-500/20', 
    btnClass: 'bg-gradient-to-r from-[#F59E0B] to-orange-500 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30',
    focusRingClass: 'focus:ring-[#F59E0B]',
    textClass: 'text-[#F59E0B] hover:text-orange-700',
    checkboxClass: 'checked:bg-[#F59E0B] checked:border-[#F59E0B]'
  }
];

const interests = [
  'Digital Literacy', 'Teaching', 'Mentorship', 'Career Guidance', 
  'Content Creation', 'Design', 'Web Development', 'App Development', 
  'Outreach', 'Research', 'Operations', 'Event Management'
];

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'success'
  const [role, setRole] = useState('volunteer');
  const [showPassword, setShowPassword] = useState(false);
  const [signupStep, setSignupStep] = useState(1); // 1, 2, 3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: '', phone: '',
    gender: '', age: '', city: '', state: '', college: '', linkedin: '',
    selectedInterests: [], availability: [], experience: '', termsAccepted: false, consent: false
  });

  const checkTeamLeadApproval = async (user) => {
    try {
      const token = await user.getIdToken(true);
      const res = await fetch('/api/team-leads/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const profile = await res.json();
        if (profile.credStatus === 'Approved') {
          return 'approved';
        } else if (profile.credStatus === 'Rejected') {
          return 'rejected';
        } else {
          return 'pending';
        }
      }
      return 'not_found';
    } catch (err) {
      console.error(err);
      return 'error';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }));
  };

  const handleAvailabilityToggle = (avail) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(avail)
        ? prev.availability.filter(a => a !== avail)
        : [...prev.availability, avail]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === 'login') {
        const userCred = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (role === 'team') {
          const status = await checkTeamLeadApproval(userCred.user);
          if (status === 'approved') {
            toast.success(`Successfully logged in as Team Lead!`);
            navigate('/teamlead/dashboard');
            onClose();
          } else if (status === 'pending') {
            auth.signOut();
            toast.error('Your application is still pending admin approval.');
          } else if (status === 'rejected') {
            auth.signOut();
            toast.error('Your application was rejected by the admin.');
          } else {
            auth.signOut();
            toast.error('Access Denied. Contact the admin for details.');
          }
        } else {
          toast.success(`Successfully logged in as ${role}!`);
          resetAndClose();
        }
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        if (role === 'team') {
          await fetch('/api/team-leads/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone
            })
          });
        }
        setMode('success');
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      const userCred = await signInWithPopup(auth, googleProvider);
      if (role === 'team') {
        const status = await checkTeamLeadApproval(userCred.user);
        if (status === 'approved') {
          toast.success(`Successfully logged in as Team Lead!`);
          navigate('/teamlead/dashboard');
          onClose();
        } else if (status === 'pending') {
          auth.signOut();
          toast.error('Your application is still pending admin approval.');
        } else if (status === 'not_found') {
          // Auto-apply if the user doesn't exist in the system yet
          await fetch('/api/team-leads/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: userCred.user.displayName || 'Unknown User',
              email: userCred.user.email,
              phone: 'Not Provided'
            })
          });
          auth.signOut();
          toast.success('Your Team Lead application has been submitted and is pending admin approval.');
        } else if (status === 'rejected') {
          auth.signOut();
          toast.error('Your application was rejected by the admin.');
        } else {
          auth.signOut();
          toast.error('Access Denied. Contact the admin for details.');
        }
      } else {
        toast.success(`Successfully logged in with Google!`);
        resetAndClose();
      }
    } catch (error) {
      toast.error(error.message || 'Google Sign-In failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsSubmitting(true);
      const userCred = await signInWithPopup(auth, githubProvider);
      if (role === 'team') {
        const status = await checkTeamLeadApproval(userCred.user);
        if (status === 'approved') {
          toast.success(`Successfully logged in as Team Lead!`);
          navigate('/teamlead/dashboard');
          onClose();
        } else if (status === 'pending') {
          auth.signOut();
          toast.error('Your application is still pending admin approval.');
        } else if (status === 'not_found') {
          // Auto-apply if the user doesn't exist in the system yet
          await fetch('/api/team-leads/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: userCred.user.displayName || 'Unknown User',
              email: userCred.user.email,
              phone: 'Not Provided'
            })
          });
          auth.signOut();
          toast.success('Your Team Lead application has been submitted and is pending admin approval.');
        } else if (status === 'rejected') {
          auth.signOut();
          toast.error('Your application was rejected by the admin.');
        } else {
          auth.signOut();
          toast.error('Access Denied. Contact the admin for details.');
        }
      } else {
        toast.success(`Successfully logged in with GitHub!`);
        resetAndClose();
      }
    } catch (error) {
      toast.error(error.message || 'GitHub Sign-In failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setMode('login');
    setSignupStep(1);
    setFormData({
      email: '', password: '', confirmPassword: '', name: '', phone: '',
      gender: '', age: '', city: '', state: '', college: '', linkedin: '',
      selectedInterests: [], availability: [], experience: '', termsAccepted: false, consent: false
    });
    onClose();
  };

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

  if (!isOpen) return null;

  const currentRoleInfo = roles.find(r => r.id === role) || roles[0];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1428]/55 backdrop-blur-md overflow-y-auto py-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white w-[95vw] max-w-[1200px] h-[90vh] max-h-[800px] rounded-[24px] shadow-[0_40px_100px_rgba(0,0,0,0.18)] flex flex-col lg:flex-row overflow-hidden border border-white/20 relative my-auto"
        >
          {/* LEFT BRANDING PANEL (35%) */}
          <div className="hidden lg:flex w-[35%] bg-gradient-to-b from-[#041C5C] via-[#0A2D88] to-[#2563EB] flex-col p-8 text-white relative shrink-0 overflow-hidden">
            
            {/* Background Animated Rings */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 opacity-20 animate-[spin_30s_linear_infinite]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/10 opacity-30 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/20 opacity-50" />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Logo Centerpiece */}
              <div className="flex flex-col items-center mt-12 mb-6">
                <div className="w-[200px] h-[200px] rounded-full bg-white/10 backdrop-blur-xl border border-white/20 p-4 mb-4 flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.4)] relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
                  <img loading="lazy" src={UnnatiLogo} alt="Unnati Society" className="w-full h-full object-contain relative z-10 scale-110" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-wide mb-1 text-center text-white">UNNATI SOCIETY</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#FBBF24]"></div>
                  <h3 className="text-[10px] tracking-[0.15em] font-bold text-[#FBBF24] uppercase">AN INSTITUTE OUTREACH ACTIVITY</h3>
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#FBBF24]"></div>
                </div>
                
                <h2 className="text-xl font-bold text-center leading-snug mb-6">
                  Empowering Students.<br />
                  Building <span className="text-[#FBBF24]">Better Futures</span>.
                </h2>
              </div>

              {/* Impact Cards */}
              <div className="grid grid-cols-4 gap-2 mb-4 shrink-0 mt-auto relative z-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors shadow-lg">
                  <span className="text-lg mb-1">🎓</span>
                  <h4 className="font-bold text-sm leading-none mb-1">25k+</h4>
                  <p className="text-[8px] text-white/70 uppercase tracking-wider leading-tight">Students<br/>Impacted</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors shadow-lg">
                  <span className="text-lg mb-1">🏫</span>
                  <h4 className="font-bold text-sm leading-none mb-1">100+</h4>
                  <p className="text-[8px] text-white/70 uppercase tracking-wider leading-tight">Schools<br/>Connected</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors shadow-lg">
                  <span className="text-lg mb-1">👥</span>
                  <h4 className="font-bold text-sm leading-none mb-1">500+</h4>
                  <p className="text-[8px] text-white/70 uppercase tracking-wider leading-tight">Volunteers</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors shadow-lg">
                  <span className="text-lg mb-1">❤️</span>
                  <h4 className="font-bold text-sm leading-none mb-1">250+</h4>
                  <p className="text-[8px] text-white/70 uppercase tracking-wider leading-tight">Programs<br/>Conducted</p>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex gap-3 shrink-0 shadow-lg relative z-10">
                <span className="text-3xl text-[#FBBF24] font-serif leading-none mt-1">"</span>
                <div>
                  <p className="text-xs font-medium leading-relaxed mb-2 text-white/90">
                    Education is the most powerful weapon which you can use to change the world.
                  </p>
                  <p className="text-[10px] text-[#FBBF24] font-bold">— Nelson Mandela</p>
                </div>
              </div>
            </div>

            {/* Bottom Line Art decoration */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDEyMDAgMjAwIj48cGF0aCBkPSJNMCAyMDBWMTEwaDUwVjUwaDQwVjkwaDMwVjMwaDQwVjE1MGgzMFY4MGg1MFY1MGgzMHYxNTBoMzBWNzBoNTB2MTMwaDMwVjlwaDQwVjQwaDMwVjE1MGg0MHY1MGgzMFY2MGg1MHYxNDBoMzBWOTBoNTBWNDBoMzBWMTEwaDQwVjUwaDQwdjE1MGgzMFY2MGg1MFYyMGgzMHYxODBoMzBWODBoNTBWNDBoMzB2MTYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] bg-bottom bg-repeat-x opacity-40 z-0"></div>
          </div>

          {/* RIGHT AUTH PANEL (65%) */}
          <div className="w-full lg:w-[65%] bg-[#F8FAFC] flex flex-col relative overflow-hidden">
            {/* Close Button */}
            <button onClick={resetAndClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors z-50 shadow-sm">
              <FiX size={20} />
            </button>

            {mode === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full text-center">
                   <div className="w-24 h-24 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100">
                     <FiCheckCircle size={48} />
                   </div>
                   <h2 className="text-3xl font-bold text-[#111827] mb-3">Application Submitted</h2>
                   <p className="text-gray-600 text-sm mb-8 leading-relaxed">Thank you for joining Unnati Society. Our team will review your application and contact you within 24–48 hours.</p>
                   
                   <div className="flex flex-col gap-3 w-full">
                     <button onClick={resetAndClose} className="w-full py-3 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                       Return Home
                     </button>
                     <button onClick={resetAndClose} className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
                       Explore Opportunities
                     </button>
                   </div>
                 </motion.div>
              </div>
            ) : mode === 'login' ? (
              <div className="flex-1 flex flex-col p-10 max-w-2xl mx-auto w-full justify-center">
                <h2 className="text-3xl font-bold text-[#111827] mb-2">Welcome Back!</h2>
                <p className="text-gray-600 text-sm mb-8">Sign in to continue your Unnati Society account.</p>

                {/* Role Selector */}
                <div className="flex bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm mb-8 shrink-0">
                  {roles.map(r => (
                    <button 
                      key={r.id} 
                      onClick={() => setRole(r.id)}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all duration-300 ${role === r.id ? r.activeClass : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      {r.icon}
                      {r.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email address" className={`w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm ${currentRoleInfo.focusRingClass}`} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-[#111827]">Password <span className="text-red-500">*</span></label>
                      <button type="button" className={`text-xs font-bold transition-colors ${currentRoleInfo.textClass}`}>Forgot Password?</button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <FiLock size={16} />
                      </div>
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} required placeholder="Enter your password" className={`w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm ${currentRoleInfo.focusRingClass}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600">
                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative flex items-center">
                        <input type="checkbox" className={`peer w-4 h-4 border-2 border-gray-300 rounded cursor-pointer appearance-none transition-all ${currentRoleInfo.checkboxClass}`} />
                        <FiCheckCircle className="absolute inset-0 m-auto text-white opacity-0 pointer-events-none scale-50 transition-all peer-checked:opacity-100 peer-checked:scale-100" size={12}/>
                      </div>
                      <span className="text-xs font-medium text-[#111827]">Remember me</span>
                    </label>
                    
                    <button type="button" className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentRoleInfo.textClass}`}>
                      <FiShield size={14} /> Use OTP instead
                    </button>
                  </div>

                  <button type="submit" disabled={isSubmitting} className={`w-full py-3 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${currentRoleInfo.btnClass}`}>
                    <FiLock size={16} />
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-[1px] bg-gray-200"></div>
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">or continue with</span>
                  <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={handleGoogleSignIn} disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" onClick={handleGithubSignIn} disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#24292e] border-2 border-[#24292e] rounded-xl font-bold text-sm text-white hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="mt-8 pt-6 flex items-center justify-between border-t border-gray-200">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <FiShield className="text-gray-400" size={14}/>
                    Secure and protected.
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    Don't have an account? <button onClick={() => { setMode('signup'); setSignupStep(1); }} className={`font-bold hover:underline ml-1 transition-colors ${currentRoleInfo.textClass}`}>Apply as Volunteer</button>
                  </div>
                </div>
              </div>
            ) : (
              // SIGNUP MODE
              <div className="flex-1 flex flex-col p-10 max-w-2xl mx-auto w-full">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-[#111827] mb-2">Join Unnati</h2>
                  <p className="text-gray-600 text-sm">Become part of a movement creating educational opportunities.</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2563EB] rounded-full z-0 transition-all duration-300" style={{ width: `${((signupStep - 1) / 2) * 100}%` }}></div>
                  
                  {[1, 2, 3].map(step => (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-1.5 bg-[#F8FAFC] px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${signupStep >= step ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/30' : 'bg-gray-200 text-gray-400 border-2 border-white'}`}>
                        {signupStep > step ? <FiCheckCircle size={16} /> : step}
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${signupStep >= step ? 'text-[#111827]' : 'text-gray-400'}`}>
                        {step === 1 ? 'Personal' : step === 2 ? 'Skills' : 'Account'}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  {signupStep === 1 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">Full Name</label>
                          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">Email</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none" placeholder="john@example.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">Phone Number</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none" placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">Gender</label>
                          <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none appearance-none">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">City</label>
                          <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none" placeholder="Bhagalpur" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">State</label>
                          <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none" placeholder="Bihar" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-[#111827] mb-1.5">College / Organization</label>
                          <input type="text" name="college" value={formData.college} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none" placeholder="IIIT Bhagalpur" />
                        </div>
                      </div>
                      <button type="button" onClick={() => setSignupStep(2)} className="mt-4 w-full py-3 bg-gradient-to-r from-[#2563EB] to-blue-500 text-white font-bold text-sm rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-600/30">
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {signupStep === 2 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-lg font-bold text-[#111827] mb-1">Interests</h3>
                        <p className="text-gray-500 text-xs mb-3">Select the areas where you'd like to contribute.</p>
                        <div className="flex flex-wrap gap-2">
                          {interests.map(interest => (
                            <button 
                              type="button" 
                              key={interest} 
                              onClick={() => handleInterestToggle(interest)}
                              className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition-all ${formData.selectedInterests.includes(interest) ? 'bg-blue-50 border-blue-500 text-[#2563EB]' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'}`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#111827] mb-2">Availability</h3>
                        <div className="flex gap-3">
                          {['Weekdays', 'Weekends', 'Flexible'].map(avail => (
                            <button 
                              type="button" 
                              key={avail} 
                              onClick={() => handleAvailabilityToggle(avail)}
                              className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-bold transition-all ${formData.availability.includes(avail) ? 'bg-blue-50 border-blue-500 text-[#2563EB]' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'}`}
                            >
                              {avail}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#111827] mb-2">Experience</h3>
                        <textarea name="experience" value={formData.experience} onChange={handleInputChange} rows="2" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none resize-none" placeholder="Briefly describe your experience..."></textarea>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <button type="button" onClick={() => setSignupStep(1)} className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors">
                          Back
                        </button>
                        <button type="button" onClick={() => setSignupStep(3)} className="flex-[2] py-3 bg-gradient-to-r from-[#2563EB] to-blue-500 text-white font-bold text-sm rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-600/30">
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {signupStep === 3 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4">
                      
                      <div>
                        <label className="block text-xs font-bold text-[#111827] mb-1.5">Password</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} required className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none shadow-sm" placeholder="Create a strong password" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600">
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#111827] mb-1.5">Confirm Password</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none shadow-sm" placeholder="Confirm your password" />
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2 flex flex-col gap-3">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} required className="mt-0.5 w-4 h-4 border-2 border-gray-300 rounded text-[#2563EB] focus:ring-[#2563EB]" />
                          <span className="text-[11px] font-medium text-gray-700 leading-tight">
                            I agree to the <a href="#" className="text-[#2563EB] font-bold hover:underline">Terms and Conditions</a> and Privacy Policy.
                          </span>
                        </label>
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} className="mt-0.5 w-4 h-4 border-2 border-gray-300 rounded text-[#2563EB] focus:ring-[#2563EB]" />
                          <span className="text-[11px] font-medium text-gray-700 leading-tight">
                            I consent to communication from Unnati Society.
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button type="button" onClick={() => setSignupStep(2)} className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors">
                          Back
                        </button>
                        <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-gradient-to-r from-[#2563EB] to-blue-500 text-white font-bold text-sm rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2">
                          {isSubmitting ? 'Creating...' : 'Create Account'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>

                <div className="mt-8 pt-6 flex items-center justify-between border-t border-gray-200">
                  <div className="text-xs font-medium text-gray-600">
                    Already have an account? <button onClick={() => setMode('login')} className="text-[#2563EB] font-bold hover:underline ml-1">Sign In</button>
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

export default AuthModal;
