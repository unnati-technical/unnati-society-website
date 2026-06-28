import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Clock, CheckCircle2, MapPin, X, Loader2, ChevronLeft, Phone, Calendar, Users, 
  FileText, Globe, Check, Briefcase, Download, Filter, MessageSquare, AlertCircle, ChevronRight, ListFilter, UserCheck, Linkedin, Building2
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import AdminLayout from '../components/admin/AdminLayout';
import { auth } from '../lib/firebase';

const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "?";
const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'APPROVED':
    case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-200';
    case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
    case 'HOLD': return 'bg-slate-100 text-slate-800 border-slate-200';
    case 'NEED_MORE_INFO': return 'bg-orange-100 text-orange-800 border-orange-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
const getStatusDisplay = (status) => {
  if (status === 'ACCEPTED') return 'Approved';
  if (status === 'NEED_MORE_INFO') return 'Need More Info';
  return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Pending';
};

const AdminPartnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Detail Panel State
  const [activeTab, setActiveTab] = useState('Overview');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/partner-requests?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch partner requests');
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

  // Sync admin notes when a request is selected
  useEffect(() => {
    if (selectedRequest) {
      setAdminNotes(selectedRequest.adminNotes || '');
    }
  }, [selectedRequest]);

  const updateStatus = async (id, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/partner-request/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      
      setRequests(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      if (selectedRequest?.id === id) {
        setSelectedRequest(prev => ({ ...prev, status: newStatus }));
      }
      toast.success(`Request marked as ${getStatusDisplay(newStatus)}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedRequest) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/partner-request/${selectedRequest.id}/notes`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes: adminNotes }),
      });
      if (!res.ok) throw new Error('Failed to save notes');
      
      setRequests(prev => prev.map(m => m.id === selectedRequest.id ? { ...m, adminNotes } : m));
      setSelectedRequest(prev => ({ ...prev, adminNotes }));
      toast.success('Admin notes saved successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDownloadPDF = (req) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("UNNATI SOCIETY", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(71, 85, 105);
    doc.text("Partner Request Summary", 105, 30, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Reference ID: PRT-${req.id.substring(0, 8).toUpperCase()}`, 20, 45);
    doc.text(`Date Submitted: ${new Date(req.createdAt).toLocaleDateString()}`, 20, 52);
    doc.text(`Status: ${getStatusDisplay(req.status)}`, 20, 59);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 64, 190, 64);
    
    let y = 74;
    const addSection = (title) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(title, 20, y);
      y += 8;
    };
    
    const addLine = (label, value) => {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(71, 85, 105);
      doc.text(`${label}:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(15, 23, 42);
      const textLines = doc.splitTextToSize(String(value || 'N/A'), 120);
      doc.text(textLines, 60, y);
      y += (textLines.length * 5) + 2;
    };

    addSection("ORGANIZATION DETAILS");
    addLine("Name", req.organization || req.name);
    addLine("Type", req.organizationType);
    addLine("Website", req.website);
    
    y += 5;
    addSection("CONTACT PERSON");
    addLine("Name", req.name);
    addLine("Email", req.email);
    addLine("Phone", req.phone);
    addLine("LinkedIn", req.linkedin);
    
    y += 5;
    addSection("PARTNERSHIP INTERESTS");
    addLine("Interest", req.partnershipInterest);
    addLine("Areas of Interest", (req.areasOfInterest || []).join(", ") || "N/A");
    addLine("Collaboration Mode", req.collaborationMode);

    y += 5;
    addSection("ADDITIONAL INFO");
    addLine("Message", req.message);
    addLine("Meeting Mode", req.meetingMode);
    addLine("Meeting Date", req.meetingDate ? new Date(req.meetingDate).toLocaleDateString() : 'N/A');
    
    doc.save(`PartnerRequest_${(req.organization || req.name).replace(/\s+/g, '_')}.pdf`);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = 
        (req.organization?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const statusMap = {
        'Pending': 'PENDING',
        'Approved': 'ACCEPTED',
        'Rejected': 'REJECTED',
        'Hold': 'HOLD',
        'Need More Info': 'NEED_MORE_INFO'
      };
      
      const matchesStatus = statusFilter === 'All' || req.status === statusMap[statusFilter];
      const matchesType = typeFilter === 'All' || req.organizationType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requests, searchTerm, statusFilter, typeFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'PENDING').length;
    const approved = requests.filter(r => r.status === 'ACCEPTED').length;
    const rejected = requests.filter(r => r.status === 'REJECTED').length;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = requests.filter(r => {
      const d = new Date(r.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    return { total, pending, approved, rejected, thisMonth };
  }, [requests]);

  const renderTimeline = () => {
    if (!selectedRequest) return null;
    
    const events = [
      {
        title: "Request Submitted",
        date: new Date(selectedRequest.createdAt),
        desc: `${selectedRequest.organization || selectedRequest.name} submitted a partnership request.`,
        icon: <FileText size={14} />,
        color: "bg-blue-100 text-blue-600 border-blue-200"
      },
      {
        title: "Under Review",
        date: new Date(selectedRequest.createdAt.getTime?.() ? selectedRequest.createdAt.getTime() + 1000*60*30 : new Date(selectedRequest.createdAt).getTime() + 1000*60*30),
        desc: "Request is assigned to Outreach team for review.",
        icon: <Check size={14} />,
        color: "bg-amber-100 text-amber-600 border-amber-200"
      }
    ];

    if (selectedRequest.documentUrl) {
      events.push({
        title: "Documents Uploaded",
        date: new Date(selectedRequest.createdAt.getTime?.() ? selectedRequest.createdAt.getTime() + 1000*60*45 : new Date(selectedRequest.createdAt).getTime() + 1000*60*45),
        desc: "Supporting files verified.",
        icon: <FileText size={14} />,
        color: "bg-purple-100 text-purple-600 border-purple-200"
      });
    }

    if (selectedRequest.status === 'ACCEPTED') {
      events.push({
        title: "Request Approved",
        date: new Date(selectedRequest.updatedAt),
        desc: "Partnership approved. Welcome aboard!",
        icon: <CheckCircle2 size={14} />,
        color: "bg-green-100 text-green-600 border-green-200"
      });
    } else if (selectedRequest.status === 'REJECTED') {
      events.push({
        title: "Request Rejected",
        date: new Date(selectedRequest.updatedAt),
        desc: "Request was declined.",
        icon: <X size={14} />,
        color: "bg-red-100 text-red-600 border-red-200"
      });
    }

    return (
      <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 mt-2">
        {events.map((ev, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[35px] w-8 h-8 rounded-full border-2 flex items-center justify-center ${ev.color}`}>
              {ev.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{ev.date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</p>
              <p className="text-sm text-slate-600 mt-2">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 py-8 min-h-screen">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Partner Requests</h1>
            <p className="text-slate-500 mt-2 max-w-2xl text-sm leading-relaxed">
              Review and manage partnership requests submitted by organizations, NGOs, companies, CSR teams, educational institutions, and collaborators.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold text-sm transition-all shadow-sm">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 font-semibold text-sm transition-all shadow-sm shadow-blue-500/20">
              <Building2 size={16} /> Become a Partner
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-[18px] border border-slate-100 p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Briefcase size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Total Requests</p>
            </div>
            <div className="flex items-baseline gap-2"><h3 className="text-3xl font-extrabold text-slate-900">{stats.total}</h3><span className="text-xs font-medium text-slate-400">All Time</span></div>
          </div>
          <div className="bg-white rounded-[18px] border border-slate-100 p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500"><Clock size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Pending Review</p>
            </div>
            <div className="flex items-baseline gap-2"><h3 className="text-3xl font-extrabold text-slate-900">{stats.pending}</h3><span className="text-xs font-medium text-slate-400">Awaiting action</span></div>
          </div>
          <div className="bg-white rounded-[18px] border border-slate-100 p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Approved</p>
            </div>
            <div className="flex items-baseline gap-2"><h3 className="text-3xl font-extrabold text-slate-900">{stats.approved}</h3><span className="text-xs font-medium text-slate-400">Active</span></div>
          </div>
          <div className="bg-white rounded-[18px] border border-slate-100 p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500"><X size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">Rejected</p>
            </div>
            <div className="flex items-baseline gap-2"><h3 className="text-3xl font-extrabold text-slate-900">{stats.rejected}</h3><span className="text-xs font-medium text-slate-400">Declined</span></div>
          </div>
          <div className="bg-white rounded-[18px] border border-slate-100 p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><Calendar size={20} /></div>
              <p className="text-sm font-semibold text-slate-500">This Month</p>
            </div>
            <div className="flex items-baseline gap-2"><h3 className="text-3xl font-extrabold text-slate-900">{stats.thisMonth}</h3><span className="text-xs font-medium text-slate-400">New requests</span></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRequest ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden"
            >
              {/* FILTER BAR */}
              <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center bg-slate-50/50">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search partner name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 h-11 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  />
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm min-w-[140px]"
                  >
                    <option value="All">Status: All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hold">Hold</option>
                    <option value="Need More Info">Need More Info</option>
                  </select>

                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm min-w-[160px]"
                  >
                    <option value="All">Type: All</option>
                    <option value="Corporate">Corporate</option>
                    <option value="NGO">NGO</option>
                    <option value="Government">Government</option>
                    <option value="Educational Institution">Educational Institution</option>
                    <option value="CSR">CSR</option>
                    <option value="Startup">Startup</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Community Organization">Community Organization</option>
                  </select>

                  <button className="h-11 px-4 flex items-center gap-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                    <Filter size={16} /> More Filters
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-10">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Partner / Organization</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Partnership Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Area of Interest</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Requested On</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Person</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {isLoading ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-20 text-center">
                          <Loader2 size={32} className="animate-spin mx-auto text-blue-500 mb-4" />
                          <p className="text-slate-500 font-medium">Loading partner requests...</p>
                        </td>
                      </tr>
                    ) : filteredRequests.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-20 text-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-slate-300" />
                          </div>
                          <p className="text-slate-500 font-medium text-lg">No partner requests found</p>
                          <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search term.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map(req => (
                        <tr 
                          key={req.id} 
                          className="bg-white hover:bg-blue-50/50 transition-colors group cursor-pointer"
                          onClick={() => setSelectedRequest(req)}
                        >
                          <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center font-bold text-blue-700 shadow-sm shrink-0 border border-blue-200">
                                {getInitials(req.organization || req.name)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{req.organization || req.name}</p>
                                <p className="text-xs text-slate-500 truncate mt-0.5 max-w-[150px]">{req.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-slate-700">{req.organizationType}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600 line-clamp-1 max-w-[150px]">{req.partnershipInterest}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">{new Date(req.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-slate-800">{req.name}</p>
                            <p className="text-xs text-slate-500">{req.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getStatusColor(req.status)}`}>
                              {getStatusDisplay(req.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setSelectedRequest(req)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
                              >
                                <ChevronRight size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/30">
                <p>Showing 1 to {filteredRequests.length} of {requests.length} results</p>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors">Previous</button>
                  <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium shadow-sm">1</button>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition-colors">Next</button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-900 font-semibold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ChevronLeft size={16} /> Back to Requests
                </button>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDownloadPDF(selectedRequest)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold text-sm transition-all shadow-sm">
                    <Download size={16} /> Download
                  </button>
                  <div className="relative group">
                    <button 
                      onClick={() => document.getElementById('review-action-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 font-semibold text-sm transition-all shadow-sm shadow-blue-500/20"
                    >
                      Take Action <ChevronRight size={16} className="rotate-90 group-hover:rotate-0 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-6 items-start">
                {/* Left Profile Panel */}
                <div className="w-full xl:w-[280px] shrink-0 space-y-4">
                  <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
                    <div className="h-20 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="px-6 pb-6 relative text-center">
                      <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md mx-auto -mt-10 flex items-center justify-center text-3xl font-extrabold text-blue-600">
                        {getInitials(selectedRequest.organization || selectedRequest.name)}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mt-3 leading-tight">{selectedRequest.organization || selectedRequest.name}</h2>
                      <p className="text-sm text-slate-500 font-medium mt-1">{selectedRequest.organizationType}</p>
                      
                      <div className="mt-4 flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedRequest.status)}`}>
                          {getStatusDisplay(selectedRequest.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-5 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact Info</h3>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <MessageSquare size={14} />
                      </div>
                      <div className="min-w-0">
                        <a href={`mailto:${selectedRequest.email}`} className="text-sm font-medium text-blue-600 hover:underline truncate block">{selectedRequest.email}</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Phone size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{selectedRequest.phone}</p>
                      </div>
                    </div>

                    {selectedRequest.website && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <Globe size={14} />
                        </div>
                        <div className="min-w-0">
                          <a href={selectedRequest.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline truncate block">{selectedRequest.website}</a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-5 space-y-4">
                     <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-slate-400" />
                      <div>
                        <p className="font-bold text-slate-700">Request Date</p>
                        <p className="text-slate-500">{new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Details Panel */}
                <div className="flex-1 w-full space-y-6">
                  {/* Tabs */}
                  <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden flex-1">
                    <div className="flex items-center border-b border-slate-100 px-2 overflow-x-auto scrollbar-hide">
                      {['Overview', 'Partnership Details', 'Contact Details', 'Documents', 'Timeline'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-5 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="p-6 md:p-8">
                      {activeTab === 'Overview' && (
                        <div className="animate-in fade-in space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Organization Information</h3>
                              <div className="space-y-4">
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Organization / Company</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.organization || selectedRequest.name}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Organization Type</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.organizationType}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Area of Interest</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.partnershipInterest}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Website</span> 
                                  <span className="font-semibold text-blue-600">{selectedRequest.website || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Details</h3>
                              <div className="space-y-4">
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Full Name</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.name}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Email</span> 
                                  <span className="font-semibold text-blue-600">{selectedRequest.email}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Phone</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.phone}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">LinkedIn</span> 
                                  <span className="font-semibold text-blue-600">{selectedRequest.linkedin || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {selectedRequest.message && (
                            <div className="pt-4 border-t border-slate-100">
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">How can you collaborate?</h3>
                              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedRequest.message}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'Partnership Details' && (
                        <div className="animate-in fade-in space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Areas of Interest</h3>
                              <div className="flex flex-wrap gap-2">
                                {(selectedRequest.areasOfInterest || []).map((area, i) => (
                                  <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">{area}</span>
                                ))}
                                {(!selectedRequest.areasOfInterest || selectedRequest.areasOfInterest.length === 0) && (
                                  <span className="text-slate-500 italic">No specific areas selected.</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Collaboration Setup</h3>
                              <div className="space-y-4">
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Primary Interest</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.partnershipInterest}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Collaboration Mode</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.collaborationMode || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'Contact Details' && (
                        <div className="animate-in fade-in space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Meeting Preferences</h3>
                              <div className="space-y-4">
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Preferred Meeting Mode</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.meetingMode || 'Not specified'}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 text-sm block mb-1">Meeting Date</span> 
                                  <span className="font-semibold text-slate-900">{selectedRequest.meetingDate ? new Date(selectedRequest.meetingDate).toLocaleDateString() : 'Not specified'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'Documents' && (
                        <div className="animate-in fade-in">
                          {selectedRequest.documentUrl ? (
                             <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-between hover:bg-slate-100 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                                  <FileText size={20} />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">Supporting_Document</p>
                                  <p className="text-xs text-slate-500">Uploaded with request</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <a 
                                  href={selectedRequest.documentUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 shadow-sm transition-all"
                                >
                                  Preview
                                </a>
                                <a 
                                  href={selectedRequest.documentUrl} 
                                  download
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
                                >
                                  <Download size={14} /> Download
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-10 text-slate-500">
                              <FileText size={32} className="mx-auto mb-3 text-slate-300" />
                              <p>No documents attached to this request.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'Timeline' && (
                        <div className="animate-in fade-in">
                          <h3 className="text-lg font-bold text-slate-900 mb-4">Request Timeline</h3>
                          {renderTimeline()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review & Action */}
                  <div id="review-action-section" className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6 md:p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Review & Action</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Admin Notes (Visible to internal team only)</label>
                        <textarea
                          rows={4}
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="Write internal remarks, next steps, or reasons for rejection here..."
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm"
                        ></textarea>
                        <div className="flex justify-end">
                          <button 
                            onClick={saveAdminNotes}
                            disabled={selectedRequest.adminNotes === adminNotes}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${selectedRequest.adminNotes === adminNotes ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-2">Change Status</label>
                        <select
                          value={selectedRequest.status}
                          onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
                          disabled={isUpdatingStatus}
                          className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="REVIEWED">Reviewed</option>
                          <option value="ACCEPTED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                          <option value="HOLD">Hold</option>
                          <option value="NEED_MORE_INFO">Need More Information</option>
                        </select>
                        {isUpdatingStatus && (
                          <div className="mt-2 text-xs text-blue-600 flex items-center gap-1 font-medium">
                            <Loader2 size={12} className="animate-spin" /> Updating status...
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'ACCEPTED')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300 transition-all group"
                      >
                        <CheckCircle2 size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Approve Request</span>
                        <span className="text-xs font-medium opacity-80 mt-1">Start partnership</span>
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'REJECTED')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all group"
                      >
                        <X size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Reject Request</span>
                        <span className="text-xs font-medium opacity-80 mt-1">Decline this request</span>
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'NEED_MORE_INFO')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:border-orange-300 transition-all group"
                      >
                        <AlertCircle size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Request More Info</span>
                        <span className="text-xs font-medium opacity-80 mt-1">Ask for details</span>
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'HOLD')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all group"
                      >
                        <Clock size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm">Move to Hold</span>
                        <span className="text-xs font-medium opacity-80 mt-1">Keep on hold</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminPartnerRequests;
