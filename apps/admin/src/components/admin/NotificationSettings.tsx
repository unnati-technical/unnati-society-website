import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Mail, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../../api/notifications.api';
import { queryKeys } from '../../constants/queryKeys';

const NotificationSettings = () => {
  const queryClient = useQueryClient();
  const { data: recipients = [], isLoading } = useQuery({
    queryKey: queryKeys.notificationRecipients,
    queryFn: async () => {
      const res = await notificationsApi.getRecipients();
      return res || [];
    }
  });

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const addMutation = useMutation({
    mutationFn: (data: any) => notificationsApi.addRecipient(data),
    onSuccess: () => {
      toast.success('Recipient added successfully');
      setNewEmail('');
      setNewName('');
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationRecipients });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to add recipient');
    }
  });

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!newEmail) return;
    addMutation.mutate({ email: newEmail, name: newName });
  };

  const removeMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.removeRecipient(id),
    onSuccess: () => {
      toast.success('Recipient removed');
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationRecipients });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to remove recipient');
    }
  });

  const handleRemove = (id: string) => {
    if (!window.confirm('Are you sure you want to remove this recipient?')) return;
    removeMutation.mutate(id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Mail size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Notification Recipients</h3>
          <p className="text-sm text-gray-500">Manage who receives contact form emails.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Name (Optional)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <button
            type="submit"
            disabled={addMutation.isPending || !newEmail}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {addMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            Add
          </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
      ) : recipients.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">No recipients configured. Falling back to default admin email.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Email Address</th>
                <th className="pb-3 font-semibold">Added On</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recipients.map((recipient) => (
                <tr key={recipient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-sm text-gray-900 font-medium">
                    {recipient.name || <span className="text-gray-400 italic">None</span>}
                  </td>
                  <td className="py-3 text-sm text-gray-600">{recipient.email}</td>
                  <td className="py-3 text-sm text-gray-500">
                    {new Date(recipient.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleRemove(recipient.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Recipient"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationSettings;
