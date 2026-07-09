import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function AdminWelcome() {
  const { currentUser } = useAuth();

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-3xl border border-gray-100 shadow-sm max-w-2xl w-full text-center"
        >
          <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShieldCheck size={48} className="text-blue-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Welcome to the Admin Portal
          </h1>
          
          <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
            You are successfully logged in. Please use the navigation panel on the left to manage the Unnati platform.
          </p>

          <div className="inline-flex flex-col items-center justify-center bg-gray-50/80 p-6 rounded-2xl border border-gray-100 w-full md:w-auto min-w-[300px]">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl mb-4 border border-blue-200">
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
              Logged in as
            </div>
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
              <Mail size={18} className="text-gray-400" />
              {currentUser?.email || 'Admin'}
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
