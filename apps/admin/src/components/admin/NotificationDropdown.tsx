import React, { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Clock, Trash2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../../api/notifications.api';
import { queryKeys } from '../../constants/queryKeys';

const NotificationDropdown = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: async () => {
      const res = await notificationsApi.getNotifications();
      return res || [];
    },
    refetchInterval: 30000 // poll every 30s
  });

  const unreadCount = notifications.filter((n: any) => n.status === 'UNREAD').length;

  const readAllMutation = useMutation({
    mutationFn: () => notificationsApi.readAll(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications });
      const previous = queryClient.getQueryData(queryKeys.notifications);
      queryClient.setQueryData(queryKeys.notifications, (old: any) => {
        if (!old) return old;
        return old.map((n: any) => ({ ...n, status: 'READ' }));
      });
      return { previous };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKeys.notifications, context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    }
  });

  // Auto-mark all as read when dropdown is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      readAllMutation.mutate();
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

  const readOneMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.readOne(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications });
      const previous = queryClient.getQueryData(queryKeys.notifications);
      queryClient.setQueryData(queryKeys.notifications, (old: any) => {
        if (!old) return old;
        return old.map((n: any) => n.id === id ? { ...n, status: 'READ' } : n);
      });
      return { previous };
    },
    onError: (err, id, context) => {
      toast.error('Failed to update notification');
      queryClient.setQueryData(queryKeys.notifications, context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    }
  });

  const markAsRead = (id: string) => {
    readOneMutation.mutate(id);
  };

  const markAllAsRead = () => {
    readAllMutation.mutate();
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


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
