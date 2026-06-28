import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, Search, Clock, CheckCircle2, MapPin, X, Loader2, ChevronLeft, Phone, Calendar, Users,
  Bell, FileText, Download, Eye, ChevronDown, Check, Briefcase, Mail, Info, FileEdit, Printer, Copy, Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { auth } from '../lib/firebase';

const AdminCampusVisits = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/campus-visits?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to fetch campus visits (${res.status}): ${errText}`);
      }
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    window.scrollTo(0, 0);
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      setRequests(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/campus-visit/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Request marked as ${newStatus.toLowerCase()}`);
    } catch (err) {
      toast.error(err.message);
      fetchRequests();
    }
  };

  const handleRowClick = async (req) => {
    if (expandedRequestId === req.id) {
      setExpandedRequestId(null);
      setActionMenuOpen(false);
      return;
    }
    
    setExpandedRequestId(req.id);
    setActionMenuOpen(false);
    
    if (req.status === 'PENDING') {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(`/api/outreach/campus-visit/${req.id}/status`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'REVIEWED' }),
        });
        if (res.ok) {
          const updated = { ...req, status: 'REVIEWED' };
          setRequests(prev => prev.map(m => m.id === req.id ? updated : m));
        }
      } catch { /* silent */ }
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.coordinatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filter === 'PENDING') matchesFilter = req.status === 'PENDING' || req.status === 'REVIEWED';
    else if (filter !== 'ALL') matchesFilter = req.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'PENDING' || r.status === 'REVIEWED').length,
    approved: requests.filter(r => r.status === 'ACCEPTED').length,
    completed: requests.filter(r => r.status === 'COMPLETED').length,
    rejected: requests.filter(r => r.status === 'REJECTED').length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-700 border border-orange-200">Pending Review</span>;
      case 'REVIEWED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-700 border border-orange-200">Pending Review</span>;
      case 'ACCEPTED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-700 border border-green-200">Approved</span>;
      case 'COMPLETED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 border border-purple-200">Completed</span>;
      case 'REJECTED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-700 border border-red-200">Rejected</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  const handleExport = () => {
    try {
      const headers = ['Request ID', 'Institution', 'Type', 'City', 'Coordinator', 'Email', 'Phone', 'Students', 'Teachers', 'Status', 'Submitted'];
      const csvData = filteredRequests.map(r => [
        r.id,
        `"${r.institutionName.replace(/"/g, '""')}"`,
        r.institutionType,
        `"${(r.city || '').replace(/"/g, '""')}"`,
        `"${r.coordinatorName.replace(/"/g, '""')}"`,
        r.email,
        r.phone,
        r.studentsCount || 0,
        r.teachersCount || 0,
        r.status,
        new Date(r.createdAt).toLocaleDateString()
      ]);
      
      const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `CampusVisits_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Exported to CSV successfully');
    } catch (err) {
      toast.error('Failed to export data');
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-[1500px] mx-auto pb-24 text-slate-800 font-sans">
        
        {/* Main Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campus Visit Requests</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Manage and review all school campus visit requests</p>
          </div>

        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-[18px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 h-[120px] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">{stats.total}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Total Requests</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">All time</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[18px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 h-[120px] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Clock className="text-orange-500" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">{stats.pending}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Pending Review</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Awaiting action</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[18px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 h-[120px] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">{stats.approved}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Approved Visits</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">This month</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[18px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 h-[120px] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">{stats.completed}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Completed Visits</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">This month</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[18px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 h-[120px] flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <X className="text-red-500" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 leading-tight">{stats.rejected}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Rejected Visits</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">This month</div>
            </div>
          </div>
        </div>

        {/* Tabs and Controls */}
        <div className="bg-white rounded-t-[18px] border-b border-slate-200 px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-4 mt-12 shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-slate-100 border-b-0">
          <div className="flex items-center gap-6 overflow-x-auto w-full xl:w-auto scrollbar-hide">
            {[
              { id: 'ALL', label: 'All Requests' },
              { id: 'PENDING', label: 'Pending Review', badge: stats.pending },
              { id: 'ACCEPTED', label: 'Approved Visits' },
              { id: 'COMPLETED', label: 'Completed Visits' },
              { id: 'REJECTED', label: 'Rejected Visits' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative py-2 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${filter === tab.id ? 'text-[#16A34A]' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {tab.badge}
                  </span>
                )}
                {filter === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#16A34A]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by school name, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-400"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0">
              <FileText size={16} /> Filter
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
            >
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-b-[18px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr_80px] gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="pl-4">School / Institution</div>
            <div>Location</div>
            <div>Visit Date</div>
            <div>Purpose</div>
            <div>Coordinator</div>
            <div>Status</div>
            <div>Submitted On</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-50">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 font-medium flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Loading requests...
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Building size={24} className="text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">No requests found matching your criteria.</p>
              </div>
            ) : (
              filteredRequests.map(req => {
                const isExpanded = expandedRequestId === req.id;
                return (
                  <React.Fragment key={req.id}>
                    {/* Row */}
                    <div 
                      onClick={() => handleRowClick(req)}
                      className={`grid grid-cols-[2fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr_80px] gap-4 p-4 items-center cursor-pointer transition-all duration-200 hover:bg-slate-50 ${isExpanded ? 'bg-[#16A34A]/5 border-l-2 border-l-[#16A34A]' : 'border-l-2 border-l-transparent'}`}
                    >
                      <div className="flex items-start gap-3 pl-4 min-w-0">
                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Building size={16} className="text-blue-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{req.institutionName}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{req.institutionType || 'School'}</p>
                        </div>
                      </div>
                      
                      <div className="min-w-0">
                        <p className="text-xs text-slate-700 truncate">{req.city ? `${req.city}, ${req.state}` : 'N/A'}</p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">{req.prefDate || 'N/A'}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{req.prefTime || 'Any time'}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {req.purposes?.slice(0, 2).map((p, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium whitespace-nowrap">{p}</span>
                        ))}
                        {req.purposes?.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">+{req.purposes.length - 2}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">{req.coordinatorName}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{req.email}</p>
                      </div>

                      <div>
                        {getStatusBadge(req.status)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-slate-700 truncate">{new Date(req.createdAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">
                          {new Date(req.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">
                          <Eye size={16} />
                        </div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 transition-all duration-300 ${isExpanded ? 'rotate-180 bg-slate-200' : 'hover:bg-slate-200'}`}>
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Accordion Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden bg-[#F8FAFC] border-t border-b border-slate-100"
                        >
                          <div className="p-8 max-w-[1200px] mx-auto">
                            
                            {/* Panel Header */}
                            <div className="flex items-center justify-between mb-10">
                              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                                Request ID: <span className="font-mono text-slate-900">CVR-{req.id.split('-')[0].toUpperCase()}</span>
                              </div>
                              <div className="text-xs font-medium text-slate-500">
                                Submitted on {new Date(req.createdAt).toLocaleString()}
                              </div>
                            </div>

                            {/* Progress Stepper */}
                            <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
                              <div className="flex items-center flex-1">
                                <div className="flex flex-col items-center gap-2 relative z-10 w-32">
                                  <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-sm font-bold shadow-sm">1</div>
                                  <span className="text-[11px] font-bold text-[#16A34A] text-center">Institution Details</span>
                                  <span className="text-[9px] text-[#16A34A] font-semibold text-center">Completed</span>
                                </div>
                                <div className="flex-1 h-0.5 bg-[#16A34A] -mx-4 z-0"></div>
                                <div className="flex flex-col items-center gap-2 relative z-10 w-32">
                                  <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-sm font-bold shadow-sm">2</div>
                                  <span className="text-[11px] font-bold text-[#16A34A] text-center">Visit Requirements</span>
                                  <span className="text-[9px] text-[#16A34A] font-semibold text-center">Completed</span>
                                </div>
                                <div className="flex-1 h-0.5 bg-[#16A34A] -mx-4 z-0"></div>
                                <div className="flex flex-col items-center gap-2 relative z-10 w-32">
                                  <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-sm font-bold shadow-sm">3</div>
                                  <span className="text-[11px] font-bold text-[#16A34A] text-center">Contact & Confirmation</span>
                                  <span className="text-[9px] text-[#16A34A] font-semibold text-center">Completed</span>
                                </div>
                              </div>
                            </div>

                            {/* SECTION 1: Institution Details */}
                            <div className="mb-10">
                              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                                <Building size={20} className="text-[#16A34A]" /> 1. Institution Details
                              </h3>
                              <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Institution Name</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.institutionName}</p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Institution Type</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.institutionType || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Affiliated Board</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.board || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Website</p>
                                    {req.website ? (
                                      <a href={req.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2563EB] hover:underline">{req.website}</a>
                                    ) : (
                                      <p className="text-sm font-semibold text-slate-900">N/A</p>
                                    )}
                                  </div>
                                </div>
                                <div className="border-t border-slate-100 pt-6">
                                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-4">
                                    <MapPin size={14} className="text-blue-500" /> Location
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">State</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.state || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">District</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.district || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">City / Town</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.city || 'N/A'}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Complete Address</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.address || 'N/A'}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* SECTION 2: Visit Requirements */}
                            <div className="mb-10">
                              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                                <Briefcase size={20} className="text-[#16A34A]" /> 2. Visit Requirements
                              </h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {/* Card 1: Student Information */}
                                <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100">
                                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-4">
                                    <Users size={16} className="text-blue-500" /> Student Information
                                  </h4>
                                  <div className="grid grid-cols-2 gap-4 mb-5">
                                    <div>
                                      <p className="text-[10px] font-semibold text-slate-400 mb-1">Student Count</p>
                                      <p className="text-lg font-bold text-slate-900">{req.studentsCount || '0'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-semibold text-slate-400 mb-1">Teacher Count</p>
                                      <p className="text-lg font-bold text-slate-900">{req.teachersCount || '0'}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-semibold text-slate-400 mb-2">Classes / Grades (Selected)</p>
                                    <div className="flex flex-wrap gap-2">
                                      {req.classes?.map((c, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-md text-[10px] font-semibold">{c}</span>
                                      )) || <span className="text-xs text-slate-400">None specified</span>}
                                    </div>
                                  </div>
                                </div>

                                {/* Card 2: Visit Purpose */}
                                <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100">
                                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-4">
                                    <CheckCircle2 size={16} className="text-[#16A34A]" /> Visit Purpose <span className="text-[10px] font-normal text-slate-400">(Selected)</span>
                                  </h4>
                                  <div className="space-y-3">
                                    {['Career Guidance', 'Technology Exposure', 'Digital Literacy', 'Motivational Session', 'Higher Education Guidance'].map((purpose, i) => {
                                      const isSelected = req.purposes?.includes(purpose);
                                      return (
                                        <div key={i} className="flex items-center gap-2">
                                          {isSelected ? (
                                            <CheckCircle2 size={14} className="text-[#16A34A] shrink-0" />
                                          ) : (
                                            <div className="w-3.5 h-3.5 rounded border border-slate-200 shrink-0"></div>
                                          )}
                                          <span className={`text-xs ${isSelected ? 'font-semibold text-slate-900' : 'text-slate-400'}`}>{purpose}</span>
                                        </div>
                                      )
                                    })}
                                    {req.purposes?.filter(p => !['Career Guidance', 'Technology Exposure', 'Digital Literacy', 'Motivational Session', 'Higher Education Guidance'].includes(p)).map((otherPurpose, i) => (
                                      <div key={`other-${i}`} className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[#16A34A] shrink-0" />
                                        <span className="text-xs font-semibold text-slate-900">{otherPurpose}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Card 3: Preferred Activities */}
                                <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100">
                                  <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-4">
                                    <FileEdit size={16} className="text-[#F59E0B]" /> Preferred Activities <span className="text-[10px] font-normal text-slate-400">(Selected)</span>
                                  </h4>
                                  <div className="space-y-3">
                                    {['Faculty Interaction', 'Student Interaction', 'Research Labs Visit', 'Coding Workshop', 'Innovation Showcase'].map((activity, i) => {
                                      const isSelected = req.activities?.includes(activity);
                                      return (
                                        <div key={i} className="flex items-center gap-2">
                                          {isSelected ? (
                                            <CheckCircle2 size={14} className="text-[#F59E0B] shrink-0" />
                                          ) : (
                                            <div className="w-3.5 h-3.5 rounded border border-slate-200 shrink-0"></div>
                                          )}
                                          <span className={`text-xs ${isSelected ? 'font-semibold text-slate-900' : 'text-slate-400'}`}>{activity}</span>
                                        </div>
                                      )
                                    })}
                                     {req.activities?.filter(a => !['Faculty Interaction', 'Student Interaction', 'Research Labs Visit', 'Coding Workshop', 'Innovation Showcase'].includes(a)).map((otherActivity, i) => (
                                      <div key={`other-act-${i}`} className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[#F59E0B] shrink-0" />
                                        <span className="text-xs font-semibold text-slate-900">{otherActivity}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Schedule Preferences */}
                              <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-4">
                                  <Calendar size={16} className="text-blue-500" /> Schedule Preferences
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Preferred Date</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.prefDate || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Alternative Date</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.altDate || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold text-slate-400 mb-1">Preferred Time</p>
                                    <p className="text-sm font-semibold text-slate-900">{req.prefTime || 'N/A'}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* SECTION 3: Contact & Confirmation */}
                            <div className="mb-10">
                              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                                <Phone size={20} className="text-[#16A34A]" /> 3. Contact & Confirmation
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Coordinator Details */}
                                <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100">
                                  <h4 className="text-xs font-bold text-slate-900 mb-4">Coordinator Details</h4>
                                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">Coordinator Name</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.coordinatorName}</p>
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">Designation</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.designation || 'N/A'}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">Email Address</p>
                                      <p className="text-sm font-semibold text-[#2563EB]">{req.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">Phone</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-semibold text-slate-400 mb-1">WhatsApp</p>
                                      <p className="text-sm font-semibold text-slate-900">{req.whatsapp || 'N/A'}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Additional Notes */}
                                <div className="flex flex-col gap-4">
                                  <div className="bg-white rounded-[16px] p-6 shadow-sm border border-slate-100 flex-1">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-4">
                                      <FileText size={16} className="text-blue-500" /> Additional Notes
                                    </h4>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                      {req.notes || 'No additional notes provided.'}
                                    </p>
                                  </div>
                                  <div className="bg-orange-50 rounded-[16px] p-5 border border-orange-100">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-orange-800 mb-2">
                                      <Info size={16} /> Important Note
                                    </h4>
                                    <p className="text-xs text-orange-700 leading-relaxed font-medium">
                                      By submitting this request, you agree that your institution will manage the transportation of students and ensure they are accompanied by designated teachers. Confirmation of the visit is subject to the availability of our resources and faculty.
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </div>

                            {/* BOTTOM SECTION */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                              {/* Timeline */}
                              <div>
                                <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-6">
                                  <Clock size={20} className="text-[#2563EB]" /> Activity Timeline
                                </h3>
                                <div className="relative pl-4 border-l-2 border-blue-100 space-y-6 ml-2">
                                  <div className="relative">
                                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-[#F8FAFC]"></div>
                                    <p className="text-sm font-bold text-slate-900">Request Submitted</p>
                                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{new Date(req.createdAt).toLocaleString()}</p>
                                  </div>
                                  {(req.status === 'REVIEWED' || req.status === 'ACCEPTED' || req.status === 'REJECTED') && (
                                    <div className="relative">
                                      <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-[#F8FAFC]"></div>
                                      <p className="text-sm font-bold text-slate-900">Under Review</p>
                                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Request is assigned to admin for review.</p>
                                    </div>
                                  )}
                                  <div className="relative">
                                    <div className={`absolute -left-[21px] w-3 h-3 rounded-full ${req.status === 'ACCEPTED' ? 'bg-[#16A34A]' : req.status === 'REJECTED' ? 'bg-red-500' : 'bg-orange-300'} ring-4 ring-[#F8FAFC]`}></div>
                                    <p className="text-sm font-bold text-slate-900">
                                      {req.status === 'ACCEPTED' ? 'Request Approved' : req.status === 'REJECTED' ? 'Request Rejected' : 'Pending Decision'}
                                    </p>
                                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                                      {req.status === 'ACCEPTED' ? 'Visit has been scheduled.' : req.status === 'REJECTED' ? 'Visit was declined.' : 'Awaiting admin approval.'}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Admin Notes */}
                              <div>
                                <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-6">
                                  <FileEdit size={20} className="text-[#16A34A]" /> Admin Notes (Internal)
                                </h3>
                                <div className="bg-white rounded-[16px] p-5 shadow-sm border border-slate-100 flex flex-col h-[200px]">
                                  <textarea 
                                    className="w-full flex-1 resize-none bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                                    placeholder="Add your notes here..."
                                  ></textarea>
                                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                    <span className="text-[10px] font-semibold text-slate-400">These notes are only visible to admins.</span>
                                    <button className="px-4 py-1.5 bg-[#16A34A] hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors">
                                      Save Note
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Sticky Bottom Action Bar */}
                            <div className="sticky bottom-6 bg-white rounded-[16px] shadow-[0_10px_40px_rgba(15,23,42,0.1)] border border-slate-100 p-4 flex flex-wrap items-center justify-between gap-4 mt-8 z-20">
                              <div className="relative">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setActionMenuOpen(!actionMenuOpen); }}
                                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${actionMenuOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                  More Actions <ChevronDown size={16} className={`transition-transform duration-200 ${actionMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                  {actionMenuOpen && (
                                    <motion.div 
                                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute left-0 bottom-full mb-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden z-50"
                                    >
                                      <div className="p-1">
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); window.print(); setActionMenuOpen(false); }}
                                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors text-left"
                                        >
                                          <Printer size={15} /> Print Details
                                        </button>
                                        <button 
                                          onClick={(e) => { 
                                            e.stopPropagation(); 
                                            navigator.clipboard.writeText(req.email); 
                                            toast.success('Email copied to clipboard!');
                                            setActionMenuOpen(false); 
                                          }}
                                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors text-left"
                                        >
                                          <Copy size={15} /> Copy Email
                                        </button>
                                        
                                        {(req.status === 'ACCEPTED' || req.status === 'REJECTED') && (
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); updateStatus(req.id, 'PENDING'); setActionMenuOpen(false); }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-left mt-1 border-t border-slate-100 pt-2"
                                          >
                                            <Clock size={15} /> Mark as Pending
                                          </button>
                                        )}
                                        
                                        <button 
                                          onClick={(e) => { 
                                            e.stopPropagation(); 
                                            toast.error('Delete functionality is not enabled yet.');
                                            setActionMenuOpen(false); 
                                          }}
                                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left mt-1 border-t border-slate-100 pt-2"
                                        >
                                          <Trash2 size={15} /> Delete Request
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              <div className="flex gap-3">
                                {req.status !== 'REJECTED' && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); updateStatus(req.id, 'REJECTED'); }}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold text-sm rounded-[12px] transition-colors"
                                  >
                                    <X size={16} /> Reject Request
                                  </button>
                                )}
                                {req.status !== 'ACCEPTED' && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); updateStatus(req.id, 'ACCEPTED'); }}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] hover:bg-green-700 text-white font-bold text-sm rounded-[12px] transition-colors"
                                  >
                                    <CheckCircle2 size={16} /> Approve Request
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
        
        {/* Print Layout */}
        {expandedRequestId && (
          <div id="print-section" className="font-sans text-slate-800 p-8 max-w-4xl mx-auto hidden">
            {(() => {
              const req = requests.find(r => r.id === expandedRequestId);
              if (!req) return null;
              return (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b-2 border-slate-900 pb-6 mb-6">
                    <div>
                      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">UNNATI SOCIETY</h1>
                      <h2 className="text-xl font-bold text-slate-500 mt-1 uppercase tracking-wider">Campus Visit Request</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-500">Request ID: {req.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-sm font-semibold text-slate-500">Submitted: {new Date(req.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm font-bold text-slate-900 mt-2 uppercase">Status: {req.status}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <h3 className="text-lg font-extrabold uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Institution Details</h3>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-bold w-24 inline-block text-slate-600">Name:</span> <span className="font-semibold text-slate-900">{req.institutionName}</span></p>
                        <p className="text-sm"><span className="font-bold w-24 inline-block text-slate-600">Type:</span> {req.institutionType}</p>
                        <p className="text-sm"><span className="font-bold w-24 inline-block text-slate-600">Board:</span> {req.board || 'N/A'}</p>
                        <p className="text-sm"><span className="font-bold w-24 inline-block text-slate-600">Website:</span> {req.website || 'N/A'}</p>
                        <p className="text-sm mt-2"><span className="font-bold block text-slate-600 mb-1">Address:</span> {req.address}<br/>{req.city}, {req.district}, {req.state}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-extrabold uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Coordinator Contact</h3>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-bold w-28 inline-block text-slate-600">Name:</span> <span className="font-semibold text-slate-900">{req.coordinatorName}</span></p>
                        <p className="text-sm"><span className="font-bold w-28 inline-block text-slate-600">Designation:</span> {req.designation}</p>
                        <p className="text-sm"><span className="font-bold w-28 inline-block text-slate-600">Email:</span> {req.email}</p>
                        <p className="text-sm"><span className="font-bold w-28 inline-block text-slate-600">Phone:</span> {req.phone}</p>
                        <p className="text-sm"><span className="font-bold w-28 inline-block text-slate-600">WhatsApp:</span> {req.whatsapp || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-extrabold uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Visit Specifications</h3>
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-sm"><span className="font-bold w-40 inline-block text-slate-600">Students Count:</span> {req.studentsCount || 'N/A'}</p>
                      <p className="text-sm"><span className="font-bold w-40 inline-block text-slate-600">Teachers Count:</span> {req.teachersCount || 'N/A'}</p>
                      <p className="text-sm"><span className="font-bold w-40 inline-block text-slate-600">Preferred Date:</span> {req.prefDate || 'N/A'}</p>
                      <p className="text-sm"><span className="font-bold w-40 inline-block text-slate-600">Alternate Date:</span> {req.altDate || 'N/A'}</p>
                      <p className="text-sm"><span className="font-bold w-40 inline-block text-slate-600">Preferred Time:</span> {req.prefTime || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-extrabold uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Activities & Purposes</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-bold text-sm text-slate-600">Classes Involved:</span>
                        <p className="text-sm mt-1 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">{req.classes?.join(', ') || 'None selected'}</p>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-600">Purposes of Visit:</span>
                        <p className="text-sm mt-1 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">{req.purposes?.join(', ') || 'None selected'}</p>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-600">Activities of Interest:</span>
                        <p className="text-sm mt-1 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">{req.activities?.join(', ') || 'None selected'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {req.notes && (
                    <div className="mt-10">
                      <h3 className="text-lg font-extrabold uppercase tracking-wide border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">Additional Notes</h3>
                      <p className="text-sm italic font-medium bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-900">{req.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-16 pt-8 border-t-2 border-slate-200 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document generated by Unnati Society Admin Portal</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminCampusVisits;
