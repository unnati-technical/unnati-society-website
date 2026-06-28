import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  School, Search, Clock, CheckCircle2, MapPin, X, Loader2, ChevronLeft, Phone, Calendar, Users, 
  FileText, Globe, Check, XCircle, HelpCircle, PauseCircle, Download, FileDown,
  Building2, User, Mail, ChevronRight, ChevronLeft as ChevronLeftIcon, Filter, 
  MoreVertical, Eye, DownloadCloud, CheckSquare, ListFilter, UserCheck
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { auth } from '../lib/firebase';
import { jsPDF } from 'jspdf';

const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : '?';

const getStatusColor = (status: string) => {
  const s = status.toUpperCase();
  if (s === 'PENDING' || s === 'PENDING REVIEW') return 'bg-orange-100 text-orange-700 border-orange-200';
  if (s === 'APPROVED' || s === 'ACCEPTED') return 'bg-green-100 text-green-700 border-green-200';
  if (s === 'REJECTED') return 'bg-red-100 text-red-700 border-red-200';
  if (s === 'HOLD' || s === 'ON HOLD') return 'bg-gray-100 text-gray-700 border-gray-200';
  if (s === 'INFO_REQUESTED' || s === 'NEED MORE INFORMATION') return 'bg-blue-100 text-blue-700 border-blue-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const getStatusDisplay = (status: string) => {
  const s = status.toUpperCase();
  if (s === 'ACCEPTED') return 'Approved';
  if (s === 'INFO_REQUESTED') return 'Requested More Info';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export default function AdminSchoolInvites() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [schoolTypeFilter, setSchoolTypeFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  // Detail view state
  const [activeTab, setActiveTab] = useState('Overview');
  const [adminNotes, setAdminNotes] = useState('');
  const [statusDropdown, setStatusDropdown] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/invites?t=${Date.now()}`, { 
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch school invites');
      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      setStatusDropdown(selectedRequest.status);
    }
  }, [selectedRequest]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setRequests(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      if (selectedRequest?.id === id) setSelectedRequest((prev: any) => ({ ...prev, status: newStatus }));

      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/outreach/invite/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      toast.success(`Request marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message);
      fetchRequests();
    }
  };

  const handleExport = () => {
    try {
      const headers = ['Request ID', 'Institution', 'Type', 'City', 'Coordinator', 'Email', 'Phone', 'Students', 'Status', 'Submitted'];
      const csvData = filteredRequests.map(r => [
        r.id,
        `"${r.institutionName.replace(/"/g, '""')}"`,
        r.institutionType,
        `"${(r.city || '').replace(/"/g, '""')}"`,
        `"${r.coordinatorName.replace(/"/g, '""')}"`,
        r.email,
        r.phone,
        r.studentsCount || 0,
        r.status,
        new Date(r.createdAt).toLocaleDateString()
      ]);
      
      const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `SchoolInvites_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Exported to CSV successfully');
    } catch (err) {
      toast.error('Failed to export data');
    }
  };

  const handleDownloadPDF = (req: any) => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("UNNATI SOCIETY", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(71, 85, 105);
    doc.text("School Invite Request Summary", 105, 30, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Reference ID: ${req.id}`, 20, 45);
    doc.text(`Date Submitted: ${new Date(req.createdAt).toLocaleDateString()}`, 20, 52);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 57, 190, 57);
    
    let y = 67;
    const addSection = (title: string) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(title, 20, y);
      y += 8;
    };
    
    const addLine = (label: string, value: string) => {
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

    addSection("INSTITUTION DETAILS");
    addLine("Name", req.institutionName);
    addLine("Type", req.institutionType);
    addLine("Board", req.board);
    addLine("Location", `${req.city}, ${req.district}, ${req.state}`);
    addLine("Total Students", req.studentsCount);
    
    y += 5;
    addSection("CONTACT PERSON");
    addLine("Name", req.coordinatorName);
    addLine("Email", req.email);
    addLine("Phone", req.phone);
    
    y += 5;
    addSection("PROGRAMS & AUDIENCE");
    addLine("Programs", (req.programs || []).join(", ") || "N/A");
    addLine("Target Audience", (req.targetAudience || []).join(", ") || "N/A");

    y += 5;
    addSection("LOGISTICS & DATES");
    addLine("Expected Participants", req.expectedParticipants);
    addLine("Preferred Mode", req.preferredMode);
    addLine("Preferred Date", req.prefDate);
    addLine("Alternative Date", req.altDate);
    addLine("Duration", req.duration);

    y += 5;
    addSection("ADDITIONAL INFO");
    addLine("Notes", req.notes);
    addLine("Special Requirements", req.specialReqs);
    
    doc.save(`SchoolInvite_${req.institutionName.replace(/\s+/g, '_')}.pdf`);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = 
        req.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        req.coordinatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (req.city && req.city.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const statusMap: any = {
        'Pending': 'PENDING',
        'Approved': 'ACCEPTED',
        'Rejected': 'REJECTED',
        'Hold': 'HOLD',
        'Need More Info': 'INFO_REQUESTED'
      };
      
      const reqStatus = req.status === 'REVIEWED' ? 'PENDING' : req.status; // Treat reviewed as pending for filter
      const matchesStatus = statusFilter === 'All' || reqStatus === statusMap[statusFilter];
      
      const matchesDistrict = districtFilter === 'All' || req.district === districtFilter;
      const matchesType = schoolTypeFilter === 'All' || req.institutionType === schoolTypeFilter;

      return matchesSearch && matchesStatus && matchesDistrict && matchesType;
    });
  }, [requests, searchTerm, statusFilter, districtFilter, schoolTypeFilter]);

  // Derived stats
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'PENDING' || r.status === 'REVIEWED').length;
    const approved = requests.filter(r => r.status === 'ACCEPTED').length;
    const rejected = requests.filter(r => r.status === 'REJECTED').length;
    
    const now = new Date();
    const thisMonth = requests.filter(r => {
      const d = new Date(r.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { total, pending, approved, rejected, thisMonth };
  }, [requests]);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentItems = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const uniqueDistricts = ['All', ...Array.from(new Set(requests.map(r => r.district).filter(Boolean)))];
  const uniqueTypes = ['All', ...Array.from(new Set(requests.map(r => r.institutionType).filter(Boolean)))];

  const handleSelectRequest = (req: any) => {
    setSelectedRequest(req);
    // Do not auto-change status on view. Keep it as pending until explicit action.
  };

  const renderTimeline = () => {
    return (
      <div className="relative border-l border-gray-200 ml-4 space-y-6 pb-4 mt-6">
        <div className="relative pl-6">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-sm font-bold text-gray-900">Invitation Submitted</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">School submitted invitation request.</p>
        </div>
        
        {selectedRequest.status === 'ACCEPTED' && (
          <div className="relative pl-6">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <p className="text-sm font-bold text-gray-900">Invitation Approved</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(selectedRequest.updatedAt).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Admin approved the collaboration request.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-[1700px] mx-auto pb-24 text-slate-800 font-sans px-4 sm:px-8">
        
        <AnimatePresence mode="wait">
          {!selectedRequest ? (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-7"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-6">
                <div>
                  <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">School Invitations</h1>
                  <p className="text-sm text-slate-500 mt-1 font-medium max-w-2xl">
                    Review and manage invitation requests submitted by schools for outreach programs, workshops, awareness sessions, and educational collaborations.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold text-sm transition-all shadow-sm">
                    <DownloadCloud size={16} /> Export
                  </button>
                  <button onClick={() => toast.info('Open Invite School Modal (Coming Soon)')} className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 font-semibold text-sm transition-all shadow-sm shadow-blue-500/20">
                    <School size={16} /> Invite School
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Total Invitations', value: stats.total, desc: 'All Time', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: 'Pending Review', value: stats.pending, desc: 'Awaiting your action', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
                  { label: 'Approved', value: stats.approved, desc: 'Active collaborations', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'Rejected', value: stats.rejected, desc: 'Declined invitations', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
                  { label: 'This Month', value: stats.thisMonth, desc: 'New requests', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                        <stat.icon size={20} className={stat.color} strokeWidth={2.5} />
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">{stat.value}</h3>
                    <p className="text-xs text-slate-400 font-medium mt-2">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Filter Bar */}
              <div className="bg-white p-2.5 rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search schools, coordinators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all font-medium placeholder:font-normal"
                  />
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
                  <div className="flex items-center bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-100 shrink-0">
                    <span className="text-xs text-slate-500 mr-2 font-medium">Status:</span>
                    <select 
                      value={statusFilter} 
                      onChange={e => setStatusFilter(e.target.value)}
                      className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
                    >
                      {['All', 'Pending', 'Approved', 'Rejected', 'Hold', 'Need More Info'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-center bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-100 shrink-0">
                    <span className="text-xs text-slate-500 mr-2 font-medium">District:</span>
                    <select 
                      value={districtFilter} 
                      onChange={e => setDistrictFilter(e.target.value)}
                      className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer w-24 truncate"
                    >
                      {uniqueDistricts.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-100 shrink-0">
                    <span className="text-xs text-slate-500 mr-2 font-medium">Type:</span>
                    <select 
                      value={schoolTypeFilter} 
                      onChange={e => setSchoolTypeFilter(e.target.value)}
                      className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer w-32 truncate"
                    >
                      {uniqueTypes.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl hover:bg-slate-100 font-semibold text-sm transition-all shrink-0">
                    <Filter size={16} /> More Filters
                  </button>
                  
                  <button 
                    onClick={() => { setSearchTerm(''); setStatusFilter('All'); setDistrictFilter('All'); setSchoolTypeFilter('All'); }}
                    className="px-3 py-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-all shrink-0"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Main Table Card */}
              <div className="bg-white rounded-[18px] border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">All School Invitations</h3>
                  <span className="text-sm font-medium text-slate-500">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredRequests.length)}–{Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results
                  </span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-5 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                        <th className="py-3 px-5">School / Institution</th>
                        <th className="py-3 px-5">Location</th>
                        <th className="py-3 px-5">Invited On</th>
                        <th className="py-3 px-5">Coordinator</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {isLoading ? (
                        <tr><td colSpan={7} className="py-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</td></tr>
                      ) : currentItems.length === 0 ? (
                        <tr><td colSpan={7} className="py-12 text-center text-slate-500 font-medium">No invitations found.</td></tr>
                      ) : currentItems.map(req => (
                        <tr key={req.id} onClick={() => handleSelectRequest(req)} className="hover:bg-blue-50/30 transition-colors cursor-pointer group">
                          <td className="py-4 px-5"><input type="checkbox" onClick={e => e.stopPropagation()} className="rounded border-slate-300" /></td>
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                {getInitials(req.institutionName)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{req.institutionName}</p>
                                <p className="text-xs text-slate-500 font-medium">{req.institutionType}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                              <MapPin size={14} className="text-slate-400" /> {req.city || req.district}, {req.state}
                            </div>
                          </td>
                          <td className="py-4 px-5 text-slate-600 font-medium">
                            {new Date(req.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-4 px-5">
                            <p className="font-bold text-slate-800">{req.coordinatorName}</p>
                            <p className="text-xs text-slate-500 truncate max-w-[150px]">{req.email}</p>
                          </td>
                          <td className="py-4 px-5">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(req.status)}`}>
                              {getStatusDisplay(req.status)}
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={(e) => { e.stopPropagation(); handleSelectRequest(req); }} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors">
                                <Eye size={16} />
                              </button>
                              <button onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                                <MoreVertical size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({length: totalPages}).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${currentPage === i + 1 ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 mt-4"
            >
              {/* Detail Header */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-900 font-semibold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ChevronLeftIcon size={16} /> Back to Invitations
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
                        {getInitials(selectedRequest.institutionName)}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mt-3 leading-tight">{selectedRequest.institutionName}</h2>
                      <p className="text-sm text-slate-500 font-medium mt-1">{selectedRequest.institutionType}</p>
                      
                      <div className="mt-4 flex justify-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedRequest.status)}`}>
                          {getStatusDisplay(selectedRequest.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-5 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Coordinator Info</h3>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <User size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{selectedRequest.coordinatorName}</p>
                        <p className="text-xs text-slate-500 truncate">{selectedRequest.designation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Mail size={14} />
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
                  </div>
                  
                  <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-5 space-y-4">
                     <div className="flex items-center gap-3 text-sm">
                      <MapPin size={16} className="text-slate-400" />
                      <div>
                        <p className="font-bold text-slate-700">Location</p>
                        <p className="text-slate-500">{selectedRequest.city}, {selectedRequest.state}</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-3 text-sm mt-3">
                      <Clock size={16} className="text-slate-400" />
                      <div>
                        <p className="font-bold text-slate-700">Invitation Date</p>
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
                      {['Overview', 'Programs & Needs', 'Coordinator Details', 'Documents (0)', 'Timeline'].map(tab => (
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
                        <div className="space-y-8 animate-in fade-in duration-300">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <Building2 size={18} className="text-blue-500" /> Institution Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">Institution Type</span>
                                <span className="font-bold text-slate-900">{selectedRequest.institutionType}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">State</span>
                                <span className="font-bold text-slate-900">{selectedRequest.state || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">Board / Affiliation</span>
                                <span className="font-bold text-slate-900">{selectedRequest.board || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">District</span>
                                <span className="font-bold text-slate-900">{selectedRequest.district || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">Total Students</span>
                                <span className="font-bold text-slate-900">{selectedRequest.studentsCount || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">City / Town</span>
                                <span className="font-bold text-slate-900">{selectedRequest.city || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">Website</span>
                                <span className="font-bold text-blue-600 hover:underline">{selectedRequest.website || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-slate-50">
                                <span className="text-slate-500 font-medium">Complete Address</span>
                                <span className="font-bold text-slate-900 text-right max-w-[200px] truncate" title={selectedRequest.address}>{selectedRequest.address || 'N/A'}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <CheckSquare size={18} className="text-green-500" /> Programs Interested In
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedRequest.programs && selectedRequest.programs.length > 0 ? (
                                selectedRequest.programs.map((prog: string, i: number) => (
                                  <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-full">
                                    {prog}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 text-sm italic">No programs specified.</span>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                              <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Logistics</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-slate-500">Expected Participants</span> <span className="font-bold text-slate-900">{selectedRequest.expectedParticipants || 'N/A'}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Preferred Mode</span> <span className="font-bold text-slate-900">{selectedRequest.preferredMode || 'N/A'}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Preferred Date</span> <span className="font-bold text-slate-900">{selectedRequest.prefDate || 'N/A'}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Alternative Date</span> <span className="font-bold text-slate-900">{selectedRequest.altDate || 'N/A'}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Session Duration</span> <span className="font-bold text-slate-900">{selectedRequest.duration || 'N/A'}</span></div>
                              </div>
                            </div>

                            <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                              <h4 className="font-bold text-orange-900 mb-3 text-sm uppercase tracking-wider">Additional Information</h4>
                              <div className="space-y-4 text-sm">
                                <div>
                                  <span className="text-orange-700/70 font-semibold block mb-1">Additional Notes</span> 
                                  <span className="font-medium text-orange-950 block bg-white/50 p-2 rounded-lg border border-orange-100 whitespace-pre-wrap">{selectedRequest.notes || 'None'}</span>
                                </div>
                                <div>
                                  <span className="text-orange-700/70 font-semibold block mb-1">Special Requirements</span> 
                                  <span className="font-medium text-orange-950 block bg-white/50 p-2 rounded-lg border border-orange-100 whitespace-pre-wrap">{selectedRequest.specialReqs || 'None'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'Programs & Needs' && (
                         <div className="animate-in fade-in text-center py-10 text-slate-500">
                           <ListFilter size={32} className="mx-auto mb-3 text-slate-300" />
                           <p>Detailed programs mapping will appear here.</p>
                         </div>
                      )}
                      
                      {activeTab === 'Coordinator Details' && (
                         <div className="animate-in fade-in text-center py-10 text-slate-500">
                           <UserCheck size={32} className="mx-auto mb-3 text-slate-300" />
                           <p>Extended coordinator background details will appear here.</p>
                         </div>
                      )}

                      {activeTab === 'Documents (0)' && (
                         <div className="animate-in fade-in text-center py-10 text-slate-500">
                           <FileText size={32} className="mx-auto mb-3 text-slate-300" />
                           <p>No documents attached to this invitation.</p>
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
                          value={adminNotes}
                          onChange={e => setAdminNotes(e.target.value)}
                          placeholder="Add your notes here..."
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[120px]"
                        ></textarea>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Change Status</label>
                        <select 
                          value={statusDropdown}
                          onChange={e => setStatusDropdown(e.target.value)}
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="ACCEPTED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                          <option value="INFO_REQUESTED">Need More Information</option>
                          <option value="HOLD">On Hold</option>
                        </select>
                        {statusDropdown !== selectedRequest.status && (
                          <button 
                            onClick={() => updateStatus(selectedRequest.id, statusDropdown)}
                            className="w-full mt-3 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
                          >
                            Save Status
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'ACCEPTED')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-green-50 hover:bg-green-100 hover:border-green-200 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 group-hover:scale-110 transition-transform">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-green-700 text-sm">Approve Invitation</span>
                        <span className="text-xs font-medium text-green-600/70 mt-0.5">Start collaboration</span>
                      </button>

                      <button 
                         onClick={() => updateStatus(selectedRequest.id, 'REJECTED')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-red-50 hover:bg-red-100 hover:border-red-200 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-2 group-hover:scale-110 transition-transform">
                          <X size={20} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-red-700 text-sm">Reject Invitation</span>
                        <span className="text-xs font-medium text-red-600/70 mt-0.5">Decline this request</span>
                      </button>

                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'INFO_REQUESTED')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-orange-50 hover:bg-orange-100 hover:border-orange-200 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2 group-hover:scale-110 transition-transform">
                          <HelpCircle size={20} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-orange-700 text-sm">Request More Info</span>
                        <span className="text-xs font-medium text-orange-600/70 mt-0.5">Ask for more details</span>
                      </button>

                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'HOLD')}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mb-2 group-hover:scale-110 transition-transform">
                          <PauseCircle size={20} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">Move to Hold</span>
                        <span className="text-xs font-medium text-slate-500 mt-0.5">Keep on hold</span>
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
}
