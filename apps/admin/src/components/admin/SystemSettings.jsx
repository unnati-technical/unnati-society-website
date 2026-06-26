import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Settings, Save, Loader2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    SMTP_USER: '',
    SMTP_PASS: '',
    ADMIN_EMAIL: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/system-settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(prev => ({ ...prev, ...data }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {};
      if (settings.SMTP_USER) payload.SMTP_USER = settings.SMTP_USER;
      if (settings.SMTP_PASS) payload.SMTP_PASS = settings.SMTP_PASS;
      if (settings.ADMIN_EMAIL) payload.ADMIN_EMAIL = settings.ADMIN_EMAIL;

      const res = await fetch('/api/system-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      
      toast.success('SMTP Configuration saved successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
          <Settings size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">SMTP & Email Configuration</h3>
          <p className="text-sm text-gray-500">Manage sender account and default admin email.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col flex-1">
          <div className="space-y-5 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email Account (SMTP_USER)</label>
              <input
                type="email"
                name="SMTP_USER"
                value={settings.SMTP_USER}
                onChange={handleChange}
                placeholder="e.g. sender@gmail.com"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">This email address will be used to send all automated emails.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">App Password (SMTP_PASS)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="SMTP_PASS"
                  value={settings.SMTP_PASS}
                  onChange={handleChange}
                  placeholder="16-character App Password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <KeyRound size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">For Gmail, use an App Password, not your regular password.</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Admin Email (ADMIN_EMAIL)</label>
              <input
                type="email"
                name="ADMIN_EMAIL"
                value={settings.ADMIN_EMAIL}
                onChange={handleChange}
                placeholder="e.g. admin@unnatisociety.org"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">Used as a fallback if no dynamic recipients are configured.</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Configuration
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default SystemSettings;
