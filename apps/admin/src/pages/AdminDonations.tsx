import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Search, Clock, CheckCircle2, XCircle, FileText, ChevronLeft, MapPin, 
  CreditCard, ChevronDown, Check, Building, FileEdit, Printer, Copy, Download,
  MoreVertical, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../components/admin/AdminLayout';
import { donationsApi } from '../api/donations.api';
import { queryKeys } from '../constants/queryKeys';

const AdminDonations = () => {
  const queryClient = useQueryClient();
  const { data: rawDonations = [], isLoading } = useQuery({
    queryKey: queryKeys.donations,
    queryFn: async () => {
      const res = await donationsApi.getAll();
      return res || [];
    }
  });

  const donations = Array.isArray(rawDonations) 
    ? rawDonations 
    : (rawDonations as any).data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [expandedDonationId, setExpandedDonationId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredDonations = donations.filter((donation: any) => {
    const matchesSearch = 
      (donation.donorName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (donation.donorEmail ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donation.transactionId ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filter !== 'ALL') matchesFilter = donation.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: donations.length,
    completed: donations.filter((d: any) => d.status === 'COMPLETED').length,
    pending: donations.filter((d: any) => d.status === 'PENDING').length,
    failed: donations.filter((d: any) => d.status === 'FAILED').length,
    totalAmount: donations
      .filter((d: any) => d.status === 'COMPLETED')
      .reduce((sum: number, d: any) => sum + (d.amount || 0), 0)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-700 border border-orange-200">Pending</span>;
      case 'COMPLETED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-700 border border-green-200">Completed</span>;
      case 'FAILED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-700 border border-red-200">Failed</span>;
      case 'REFUNDED': return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 border border-purple-200">Refunded</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  const formatCurrency = (amount: number, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
  };

  const handleExport = () => {
    try {
      const headers = ['Donation ID', 'Name', 'Email', 'Phone', 'PAN', 'Amount', 'Currency', 'Status', 'Transaction ID', 'Date'];
      const csvData = filteredDonations.map((d: any) => [
        d.id,
        `"${(d.donorName || '').replace(/"/g, '""')}"`,
        d.donorEmail,
        d.donorPhone || 'N/A',
        d.donorPan || 'N/A',
        d.amount,
        d.currency,
        d.status,
        d.transactionId || 'N/A',
        new Date(d.createdAt).toLocaleDateString()
      ]);
      
      const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `donations_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Export successful');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export data');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDonations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDonations.map((d: any) => d.id));
    }
  };

  const toggleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto p-4 lg:p-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight">Donations & Funds</h1>
              <p className="text-[#64748B] mt-1 text-sm max-w-2xl">
                Manage incoming donations, view transaction history, and export donor data.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="bg-white border border-[#E5E7EB] text-[#475569] hover:bg-gray-50 px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Volume', value: formatCurrency(stats.totalAmount), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Total Transactions', value: stats.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Pending / Failed', value: stats.pending + stats.failed, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={22} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-[#64748B]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0F172A] mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_10px_rgba(15,23,42,0.02)] overflow-hidden">
            <div className="p-4 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
              <div className="flex flex-wrap items-center gap-2">
                {['ALL', 'COMPLETED', 'PENDING', 'FAILED'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === f 
                        ? 'bg-white text-[#2563EB] shadow-sm border border-[#E5E7EB]' 
                        : 'text-[#64748B] hover:bg-gray-100 hover:text-[#0F172A] border border-transparent'
                    }`}
                  >
                    {f === 'ALL' ? 'All Donations' : f.charAt(0) + f.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name, email, txn id..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
              <div className="bg-blue-50/50 border-b border-[#E5E7EB] p-3 px-6 flex items-center justify-between">
                <span className="text-sm font-medium text-[#2563EB]">
                  {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <button className="text-sm bg-white border border-[#E5E7EB] text-[#475569] hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors shadow-sm">
                    Export Selected
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto min-h-[400px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                  <p>Loading donations...</p>
                </div>
              ) : filteredDonations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Heart size={32} className="text-gray-300" />
                  </div>
                  <p className="text-[#0F172A] font-medium">No donations found</p>
                  <p className="text-sm mt-1">Adjust filters or search term</p>
                </div>
              ) : (
                <table className="w-full text-left text-sm text-[#0F172A] border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-6 py-4 w-[40px]">
                        <div className="flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.length === filteredDonations.length && filteredDonations.length > 0}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                          />
                        </div>
                      </th>
                      <th className="px-6 py-4">Donor Information</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Transaction ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredDonations.map((donation: any) => {
                      const isExpanded = expandedDonationId === donation.id;
                      const isSelected = selectedIds.includes(donation.id);
                      return (
                        <React.Fragment key={donation.id}>
                          <tr 
                            onClick={() => setExpandedDonationId(isExpanded ? null : donation.id)}
                            className={`group cursor-pointer transition-colors ${
                              isExpanded || isSelected ? 'bg-blue-50/30' : 'hover:bg-gray-50'
                            }`}
                          >
                            <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                              <div className="flex items-center justify-center">
                                <input 
                                  type="checkbox" 
                                  checked={isSelected}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    toggleSelect(e as any, donation.id);
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center text-rose-700 font-bold shrink-0 shadow-sm border border-rose-300">
                                  {donation.donorName?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div>
                                  <div className="font-semibold text-[#0F172A]">{donation.donorName}</div>
                                  <div className="text-xs text-[#64748B] mt-0.5">{donation.donorEmail}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-[#0F172A]">{formatCurrency(donation.amount, donation.currency)}</div>
                              <div className="text-xs text-[#64748B] mt-0.5">{donation.currency}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-mono text-xs text-[#475569] bg-gray-100 px-2 py-1 rounded">
                                {donation.transactionId || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-[#0F172A] font-medium">{new Date(donation.createdAt).toLocaleDateString()}</div>
                              <div className="text-[#64748B] text-xs mt-0.5">
                                {new Date(donation.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getStatusBadge(donation.status)}
                            </td>
                          </tr>
                          
                          {/* Expanded Content View */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.tr
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden"
                              >
                                <td colSpan={6} className="p-0">
                                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    
                                    {/* Column 1: Details */}
                                    <div className="space-y-6">
                                      <div>
                                        <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Donor Details</h4>
                                        <div className="space-y-3">
                                          <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
                                              <MapPin size={14} className="text-[#64748B]" />
                                            </div>
                                            <div>
                                              <div className="text-xs text-[#64748B] mb-0.5">Address</div>
                                              <div className="text-sm font-medium text-[#0F172A]">{donation.donorAddress || 'Not provided'}</div>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
                                              <FileText size={14} className="text-[#64748B]" />
                                            </div>
                                            <div>
                                              <div className="text-xs text-[#64748B] mb-0.5">PAN Number</div>
                                              <div className="text-sm font-mono text-[#0F172A]">{donation.donorPan || 'Not provided'}</div>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
                                              <MapPin size={14} className="text-[#64748B]" />
                                            </div>
                                            <div>
                                              <div className="text-xs text-[#64748B] mb-0.5">Phone</div>
                                              <div className="text-sm font-medium text-[#0F172A]">{donation.donorPhone || 'Not provided'}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Column 2: Payment info */}
                                    <div className="space-y-6">
                                      <div>
                                        <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Payment Information</h4>
                                        <div className="space-y-3">
                                          <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
                                              <CreditCard size={14} className="text-[#64748B]" />
                                            </div>
                                            <div>
                                              <div className="text-xs text-[#64748B] mb-0.5">Transaction ID</div>
                                              <div className="text-sm font-mono text-[#0F172A] break-all">{donation.transactionId || 'N/A'}</div>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
                                              <Clock size={14} className="text-[#64748B]" />
                                            </div>
                                            <div>
                                              <div className="text-xs text-[#64748B] mb-0.5">Last Updated</div>
                                              <div className="text-sm font-medium text-[#0F172A]">
                                                {new Date(donation.updatedAt).toLocaleString()}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Column 3: Actions */}
                                    <div className="space-y-4 flex flex-col justify-end h-full">
                                      {donation.status === 'COMPLETED' && (
                                        <button className="w-full flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#0F172A] px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                                          <Printer size={16} />
                                          Print Receipt
                                        </button>
                                      )}
                                    </div>
                                    
                                  </div>
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* Pagination area */}
            {!isLoading && filteredDonations.length > 0 && (
              <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between text-sm text-[#64748B] bg-gray-50/50">
                <div>
                  Showing 1 to {filteredDonations.length} of {filteredDonations.length} entries
                </div>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-[#E5E7EB] rounded hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
                  <button className="px-3 py-1 border border-[#E5E7EB] rounded bg-white font-medium text-[#2563EB]">1</button>
                  <button className="px-3 py-1 border border-[#E5E7EB] rounded hover:bg-gray-100 disabled:opacity-50" disabled>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDonations;
