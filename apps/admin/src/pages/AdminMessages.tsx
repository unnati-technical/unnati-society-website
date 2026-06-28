import React, { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Search, Clock, CheckCircle2, Inbox, Reply, X, Send, 
  Loader2, ChevronLeft, CornerDownLeft
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { auth } from '../lib/firebase';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const replyRef = useRef(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contact?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchMessages();
    window.scrollTo(0, 0);
  }, []);

  // Auto-focus reply box when opened
  useEffect(() => {
    if (showReplyBox && replyRef.current) {
      setTimeout(() => replyRef.current?.focus(), 100);
    }
  }, [showReplyBox]);

  const updateStatus = async (id, newStatus) => {
    try {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      if (selectedMessage?.id === id) setSelectedMessage(prev => ({ ...prev, status: newStatus }));

      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Message marked as ${newStatus.toLowerCase()}`);
    } catch (err) {
      toast.error(err.message);
      fetchMessages();
    }
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      toast.error('Please write a reply before sending.');
      return;
    }
    setIsSending(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/contact/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ replyText: replyText.trim() }),
      });
      if (!res.ok) throw new Error('Failed to send reply');
      
      // Update local state to REPLIED
      const updated = { ...selectedMessage, status: 'REPLIED' };
      setSelectedMessage(updated);
      setMessages(prev => prev.map(m => m.id === updated.id ? updated : m));
      
      setReplyText('');
      setShowReplyBox(false);
      toast.success(`Reply sent to ${selectedMessage.email}! ✅`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleSelectMessage = async (msg) => {
    setSelectedMessage(msg);
    setShowReplyBox(false);
    setReplyText('');

    // Auto-mark as REVIEWED when opened (if still PENDING)
    if (msg.status === 'PENDING') {
      try {
        const res = await fetch(`/api/contact/${msg.id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'REVIEWED' }),
        });
        if (res.ok) {
          const updated = { ...msg, status: 'REVIEWED' };
          setMessages(prev => prev.map(m => m.id === msg.id ? updated : m));
          setSelectedMessage(updated);
        }
      } catch { /* silent — non-critical */ }
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REVIEWED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REPLIED': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-10 flex gap-6 h-[calc(100vh-140px)] relative">
        
        {/* Messages List Column */}
        <div className={`flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${selectedMessage ? 'hidden lg:flex' : 'flex'} w-full lg:w-1/2 shrink-0`}>
          <div className="p-6 border-b border-gray-100 shrink-0">
            <h2 className="text-xl font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
              <Inbox className="text-[#2563EB]" /> Contact Messages
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
              </div>
              <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 shrink-0">
                {['ALL', 'PENDING', 'REVIEWED', 'REPLIED'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-white shadow-sm text-[#2563EB]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <div className="p-8 text-center text-gray-400 font-medium flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Loading messages...
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">No messages found.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredMessages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-5 cursor-pointer transition-colors hover:bg-gray-50 border-l-4 ${selectedMessage?.id === msg.id ? 'border-[#2563EB] bg-blue-50/30' : msg.status === 'PENDING' ? 'border-yellow-400' : msg.status === 'REPLIED' ? 'border-green-400' : 'border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="font-bold text-gray-900 truncate">{msg.subject}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getStatusColor(msg.status)}`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{msg.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        {msg.name} <span className="text-gray-300">•</span> {msg.role}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0 z-10 lg:static lg:inset-auto bg-white rounded-2xl shadow-xl lg:shadow-sm border border-gray-100 flex flex-col flex-1 lg:flex-1 h-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 lg:p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {/* Mobile back button */}
                  <button
                    className="lg:hidden p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => { setSelectedMessage(null); setShowReplyBox(false); }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                  <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Clock size={14} /> {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <button 
                  onClick={() => { setSelectedMessage(null); setShowReplyBox(false); }}
                  className="hidden lg:flex p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="p-6 md:p-8">
                  <h1 className="text-2xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                    {selectedMessage.subject}
                  </h1>
                  
                  {/* Sender card */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-inner shrink-0">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900">{selectedMessage.name}</h3>
                      <div className="flex items-center gap-2 text-sm flex-wrap">
                        <a href={`mailto:${selectedMessage.email}`} className="text-[#2563EB] hover:underline font-medium truncate">
                          {selectedMessage.email}
                        </a>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 font-medium bg-gray-200 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider shrink-0">{selectedMessage.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-loose whitespace-pre-wrap mb-8">
                    {selectedMessage.message}
                  </div>

                  {/* ── INLINE REPLY COMPOSER ── */}
                  <AnimatePresence>
                    {showReplyBox && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="border border-[#2563EB]/30 rounded-2xl overflow-hidden shadow-sm"
                      >
                        {/* Reply header bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#2563EB]/5 border-b border-[#2563EB]/10">
                          <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                            <CornerDownLeft size={15} />
                            Replying to <span className="text-gray-700 font-semibold">{selectedMessage.email}</span>
                          </div>
                          <button
                            onClick={() => { setShowReplyBox(false); setReplyText(''); }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        {/* Subject preview */}
                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                          <p className="text-xs text-gray-500 font-medium">
                            Subject: <span className="text-gray-700">Re: {selectedMessage.subject}</span>
                          </p>
                        </div>

                        {/* Textarea */}
                        <textarea
                          ref={replyRef}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Dear ${selectedMessage.name},\n\nThank you for reaching out to Unnati Society...`}
                          rows={6}
                          className="w-full px-4 py-4 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none leading-relaxed"
                          onKeyDown={(e) => {
                            // Ctrl+Enter or Cmd+Enter to send
                            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                              e.preventDefault();
                              sendReply();
                            }
                          }}
                        />

                        {/* Footer actions */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
                          <p className="text-[11px] text-gray-400 font-medium">
                            Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono">Ctrl+Enter</kbd> to send
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setShowReplyBox(false); setReplyText(''); }}
                              className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={sendReply}
                              disabled={isSending || !replyText.trim()}
                              className="flex items-center gap-2 px-5 py-2 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-blue-500/20"
                            >
                              {isSending ? (
                                <><Loader2 size={13} className="animate-spin" /> Sending...</>
                              ) : (
                                <><Send size={13} /> Send Reply</>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer actions */}
              <div className="p-4 lg:p-6 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center gap-3 shrink-0">
                {/* Reply button — toggles the inline composer */}
                {!showReplyBox && (
                  <button
                    onClick={() => setShowReplyBox(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-blue-500/20"
                  >
                    <Reply size={16} /> Reply
                  </button>
                )}

                {selectedMessage.status !== 'REVIEWED' && selectedMessage.status !== 'REPLIED' && (
                  <button 
                    onClick={() => updateStatus(selectedMessage.id, 'REVIEWED')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl transition-colors"
                  >
                    <CheckCircle2 size={16} className="text-green-500" /> Mark as Reviewed
                  </button>
                )}
                
                {selectedMessage.status !== 'PENDING' && (
                  <button 
                    onClick={() => updateStatus(selectedMessage.id, 'PENDING')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl transition-colors ml-auto"
                  >
                    Mark as Unread
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty state (desktop) */}
        {!selectedMessage && (
          <div className="hidden lg:flex flex-col items-center justify-center flex-1 h-full bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Mail size={40} className="text-blue-300" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Select a message</h3>
            <p className="text-gray-500 font-medium text-center max-w-sm">
              Choose a message from the list to view its contents and reply directly from here.
            </p>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
