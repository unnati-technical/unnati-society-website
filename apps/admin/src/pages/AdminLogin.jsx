import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle, ShieldCheck } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ADMIN_EMAIL = 'unnati.ir@iiitbh.ac.in';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (email !== ADMIN_EMAIL) {
      setError('Access Denied: Only the official Unnati Admin email is allowed.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Admin Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      // If the user doesn't exist yet, auto-create it (since we locked it to the single email)
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
         try {
             await createUserWithEmailAndPassword(auth, email, password);
             toast.success('Admin Account Initialized & Logged In!');
             navigate('/admin/dashboard');
         } catch (createErr) {
             setError('Invalid password or account setup failed.');
         }
      } else {
         setError('Invalid password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== ADMIN_EMAIL) {
        await auth.signOut();
        setError('Access Denied: Only the official Unnati Admin email is allowed.');
        return;
      }
      toast.success('Admin Google login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to log in with Google.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F5E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-400/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#0B1F5E] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Admin Portal</h2>
            <p className="mt-2 text-sm font-medium text-gray-500">Restricted Access</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-3 text-sm font-bold shadow-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="unnati.ir@iiitbh.ac.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : <><LogIn size={18} /> Secure Login</>}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400 font-bold uppercase tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
        <p className="text-center mt-6 text-blue-200 text-sm font-medium">Unnati Society © 2026</p>
      </div>
    </div>
  );
};

export default AdminLogin;
