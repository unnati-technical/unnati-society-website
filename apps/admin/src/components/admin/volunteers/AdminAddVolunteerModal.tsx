import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Loader2 } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { volunteersApi } from '../../../api/volunteers.api';
import { queryKeys } from '../../../constants/queryKeys';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminAddVolunteerModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interests: 'Teaching',
    city: '',
  });
  const queryClient = useQueryClient();

  const addVolunteerMutation = useMutation({
    mutationFn: (data: any) => volunteersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.volunteers });
      toast.success('Volunteer added successfully');
      setFormData({ fullName: '', email: '', phone: '', interests: 'Teaching', city: '' });
      onClose();
    },
    onError: () => {
      toast.error('Error adding volunteer');
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVolunteerMutation.mutate({
      ...formData,
      interests: [formData.interests]
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserPlus size={20} className="text-blue-600" /> Add Volunteer
            </h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="+91 9876543210" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Program</label>
                <select value={formData.interests} onChange={e => setFormData({...formData, interests: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
                  <option>Teaching</option>
                  <option>Mentorship</option>
                  <option>Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="City" />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={addVolunteerMutation.isPending} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-sm">
                {addVolunteerMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                Add Volunteer
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
