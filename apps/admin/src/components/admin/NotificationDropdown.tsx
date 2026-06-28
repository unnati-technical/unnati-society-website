import React, { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Clock, Trash2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { auth } from '../../lib/firebase';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return; // Don't fetch if not logged in
      const res = await fetch(`/api/notifications?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => n.status === 'UNREAD').length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-mark all as read when dropdown is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      // Optimistic update immediately
      setNotifications(prev => prev.map(n => ({ ...n, status: 'READ' })));
      setUnreadCount(0);
      // Persist to backend
      auth.currentUser?.getIdToken().then(token => {
        if (token) {
          fetch('/api/notifications/read-all', { 
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
          }).catch(() => {});
        }
      });
    }

  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'READ' } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/notifications/${id}/read`, { 
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to mark read');
    } catch (err) {
      toast.error('Failed to update notification');
      fetchNotifications(); // revert optimistic update
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, status: 'READ' })));
      setUnreadCount(0);
      
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/notifications/read-all', { 
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to mark all read');
    } catch (err) {
      toast.error('Failed to update notifications');
      fetchNotifications();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes || 1}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="relative text-gray-500 hover:text-[#2563EB] transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden z-50 origin-top-right"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  <Check size={14} /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
              {notifications.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center text-gray-500">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Bell size={20} className="text-gray-400" />
                  </div>
                  <p className="font-medium text-sm">No notifications yet</p>
                  <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 transition-colors hover:bg-gray-50 cursor-pointer flex gap-3 ${notif.status === 'UNREAD' ? 'bg-blue-50/30' : ''}`}
                      onClick={() => notif.status === 'UNREAD' && markAsRead(notif.id)}
                    >
                      <div className="shrink-0 mt-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.status === 'UNREAD' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <ShieldAlert size={14} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm mb-0.5 ${notif.status === 'UNREAD' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          <Clock size={10} />
                          {formatTime(notif.createdAt)}
                        </div>
                      </div>
                      {notif.status === 'UNREAD' && (
                        <div className="shrink-0 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
              <button className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">
                View notification settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
