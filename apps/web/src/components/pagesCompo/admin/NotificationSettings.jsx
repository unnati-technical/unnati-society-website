import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const NotificationSettings = () => {
  const [recipients, setRecipients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const fetchRecipients = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/notification-recipients');
      if (!res.ok) throw new Error('Failed to fetch recipients');
      const data = await res.json();
      setRecipients(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecipients();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    setIsAdding(true);
    try {
      const res = await fetch('/api/notification-recipients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, name: newName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add recipient');
      }

      toast.success('Recipient added successfully');
      setNewEmail('');
      setNewName('');
      fetchRecipients();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this recipient?')) return;

    try {
      const res = await fetch(`/api/notification-recipients/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to remove recipient');

      toast.success('Recipient removed');
      fetchRecipients();
    } catch (err) {
      toast.error(err.message);
    }
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
          disabled={isAdding || !newEmail}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
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
