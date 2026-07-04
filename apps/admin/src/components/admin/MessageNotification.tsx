import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contactApi } from '../../api/contact.api';
import { queryKeys } from '../../constants/queryKeys';

const MessageNotification = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: messages = [] } = useQuery({
    queryKey: queryKeys.messages,
    queryFn: async () => {
      const res = await contactApi.getMessages();
      return res || [];
    }
  });

  useEffect(() => {
    const lastViewed = parseInt(localStorage.getItem('messages_last_viewed') || '0', 10);
    const newPending = messages.filter((m: any) => {
      const msgTime = new Date(m.createdAt).getTime();
      return m.status === 'PENDING' && msgTime > lastViewed;
    });
    setPendingCount(newPending.length);
  }, [messages]);

  // Clear the badge when on the messages page
  useEffect(() => {
    if (location.pathname === '/admin/messages') {
      localStorage.setItem('messages_last_viewed', Date.now().toString());
      setPendingCount(0);
    }
  }, [location.pathname]);

  const handleClick = () => {
    localStorage.setItem('messages_last_viewed', Date.now().toString());
    setPendingCount(0);
    navigate('/admin/messages');
  };

  return (
    <button 
      onClick={handleClick}
      className="relative text-gray-500 hover:text-[#2563EB] transition-colors hidden sm:block"
      title="View Messages"
    >
      <MessageSquare size={20} />
      {pendingCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
          {pendingCount > 99 ? '99+' : pendingCount}
        </span>
      )}
    </button>
  );
};

export default MessageNotification;
