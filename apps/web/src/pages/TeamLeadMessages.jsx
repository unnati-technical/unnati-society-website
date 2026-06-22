import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Search, Clock, CheckCircle, SearchX, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TeamLeadLayout from '../components/pagesCompo/teamlead/TeamLeadLayout';
import { toast } from 'sonner';

const TeamLeadMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const { currentUser, userProfile } = useAuth();
  
  const userAccess = userProfile || {
    name: currentUser?.displayName || currentUser?.email?.split('@')[0],
    status: 'Junior Lead',
    msgAccess: 'No Access'
  };

  useEffect(() => {
    // If they have no access, we shouldn't even fetch, but the layout hides this page anyway.
    if (userAccess.msgAccess === 'No Access') {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact');
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        toast.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setShowReplyBox(false);
    setReplyText('');
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim() || userAccess.msgAccess !== 'Can View & Reply') return;
    
    try {
      const res = await fetch(`/api/contact/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyText }),
      });
      if (res.ok) {
        toast.success('Reply sent successfully!');
        setMessages(messages.map(m => m.id === selectedMessage.id ? { ...m, status: 'REPLIED' } : m));
        setSelectedMessage({ ...selectedMessage, status: 'REPLIED' });
        setShowReplyBox(false);
      } else {
        toast.error('Failed to send reply');
      }
    } catch (err) {
      toast.error('Network error while sending reply');
    }
  };

  const filtered = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  if (userAccess.msgAccess === 'No Access') {
    return (
      <TeamLeadLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <SearchX size={32} />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-sm text-gray-500">You do not have permission to view contact messages.</p>
        </div>
      </TeamLeadLayout>
    );
  }

  return (
    <TeamLeadLayout>
      <div className="max-w-[1400px] mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
        
        {/* Left Column: Message List */}
        <div className="w-full md:w-1/3 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-extrabold text-[#0F172A] mb-3">Contact Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-sm text-gray-500 font-medium animate-pulse">Loading messages...</div>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500 font-medium">No messages found.</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 cursor-pointer transition-colors ${selectedMessage?.id === msg.id ? 'bg-blue-50/50 border-l-2 border-[#2563EB]' : 'hover:bg-gray-50 border-l-2 border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-sm font-bold truncate pr-2 ${selectedMessage?.id === msg.id ? 'text-[#2563EB]' : 'text-gray-900'}`}>{msg.name}</p>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 truncate mb-2">{msg.subject}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 truncate">{msg.email}</span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${msg.status === 'REPLIED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {msg.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Message Detail */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
          {selectedMessage ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">{selectedMessage.subject}</h2>
                    <p className="text-sm font-semibold text-gray-700">{selectedMessage.name} <span className="text-gray-400 font-medium ml-1">&lt;{selectedMessage.email}&gt;</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${selectedMessage.status === 'REPLIED' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                      {selectedMessage.status === 'REPLIED' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="flex items-center gap-1.5"><Mail size={14} className="text-gray-400"/> Received via Contact Form</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400"/> {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/30">
                {userAccess.msgAccess === 'Can View & Reply' ? (
                  showReplyBox ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 text-xs font-bold text-gray-600 flex items-center gap-2">
                        <Send size={12} className="text-[#2563EB]" /> Replying to: {selectedMessage.email}
                      </div>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Dear ${selectedMessage.name},\n\n`}
                        className="w-full p-4 min-h-[120px] text-sm focus:outline-none resize-none"
                      />
                      <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                        <button onClick={() => setShowReplyBox(false)} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
                        <button onClick={handleReplySubmit} className="px-4 py-2 text-xs font-bold text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 flex items-center gap-2">
                          <Send size={12} /> Send Reply
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button 
                      onClick={() => setShowReplyBox(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-blue-50 transition-all"
                    >
                      <Send size={16} /> Write a Reply
                    </button>
                  )
                ) : (
                  <div className="text-center p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm font-semibold text-orange-700">
                    Your access level ("View Only") does not allow replying to messages.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                <Mail size={32} />
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-1">No Message Selected</h2>
              <p className="text-sm text-gray-500 font-medium">Select a message from the list to view its contents.</p>
            </div>
          )}
        </div>

      </div>
    </TeamLeadLayout>
  );
};

export default TeamLeadMessages;
