import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Clock, CheckCircle, XCircle, Calendar, 
  Download, Plus, Search, Filter, RotateCcw, ChevronDown
} from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { VolunteerTable } from '../components/admin/volunteers/VolunteerTable';
import { VolunteerDetails } from '../components/admin/volunteers/VolunteerDetails';
import { useVolunteerStore } from '../store/useVolunteerStore';
import { mockVolunteers } from '../data/mockVolunteers';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../lib/firebase';
import { AdminAddVolunteerModal } from '../components/admin/volunteers/AdminAddVolunteerModal';

// Real API call
const fetchVolunteers = async () => {
  const res = await fetch(`/api/volunteers?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch volunteers');
  return res.json();
};

export default function AdminVolunteers() {
  const { 
    selectedVolunteerId, setSelectedVolunteerId,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    programFilter, setProgramFilter,
    roleFilter, setRoleFilter,
    cityFilter, setCityFilter,
    resetFilters
  } = useVolunteerStore();

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const { data: volunteers = [], isLoading } = useQuery({
    queryKey: ['volunteers'],
    queryFn: fetchVolunteers,
  });

  const selectedVolunteer = useMemo(() => {
    return volunteers.find(v => v.id === selectedVolunteerId);
  }, [volunteers, selectedVolunteerId]);

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.volunteerId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || v.status === statusFilter;
      const matchProgram = programFilter === 'All' || v.program === programFilter;
      const matchRole = roleFilter === 'All' || v.role === roleFilter;
      const matchCity = cityFilter === 'All' || v.address.includes(cityFilter);
      return matchSearch && matchStatus && matchProgram && matchRole && matchCity;
    });
  }, [volunteers, searchQuery, statusFilter, programFilter, roleFilter, cityFilter]);

  const handleExport = () => {
    const headers = [
      'Volunteer ID', 'Name', 'Email', 'Phone', 'Status', 
      'Program', 'Role', 'Applied Date', 'Gender', 'Location', 'College'
    ];

    const csvRows = filteredVolunteers.map(v => {
      // Escape commas and quotes inside fields
      const escape = (text: string) => `"${(text || '').replace(/"/g, '""')}"`;
      
      // Force Excel to treat phone numbers as text instead of scientific notation
      const formatPhone = (phone: string) => `="${phone || ''}"`;

      return [
        v.volunteerId,
        escape(v.name),
        escape(v.email),
        formatPhone(v.phone),
        v.status,
        escape(v.program),
        escape(v.role),
        escape(v.appliedDate),
        v.gender,
        escape(v.preferredLocation),
        escape(v.college)
      ].join(',');
    });

    const csvString = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `volunteers_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statsCards = [
    { label: 'Total Applications', value: volunteers.length.toLocaleString(), sub: 'All time', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: volunteers.filter((v: any) => v.status === 'Pending').length.toLocaleString(), sub: 'Awaiting review', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Approved', value: volunteers.filter((v: any) => v.status === 'Approved').length.toLocaleString(), sub: 'Active volunteers', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected', value: volunteers.filter((v: any) => v.status === 'Rejected').length.toLocaleString(), sub: 'Not approved', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'This Month', value: volunteers.filter((v: any) => {
        const d = new Date(v.appliedDate);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length.toLocaleString(), sub: 'New applications', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-10 flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#111827] tracking-tight leading-tight">Volunteers</h1>
            <p className="text-[15px] text-gray-500 mt-1">View and manage all volunteer applications</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Download size={16} /> Export
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-[10px] hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={16} /> Add Volunteer
            </button>
          </div>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {statsCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E5E7EB] transition-transform duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
                  <card.icon size={20} className={card.color} />
                </div>
                <p className="text-sm font-semibold text-gray-500">{card.label}</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-xs text-gray-400 font-medium">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-[#F8FAFC]">
          <div className="relative flex-1 min-w-[280px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search volunteers by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <SelectFilter value={statusFilter} onChange={setStatusFilter} options={['Status: All', 'Pending', 'Approved', 'Under Review', 'Rejected']} />
          <SelectFilter value={programFilter} onChange={setProgramFilter} options={['Program: All', 'DigiXplore', 'Akshar', 'Netritva', 'Career Guidance', 'Cyber Awareness']} />
          <SelectFilter value={roleFilter} onChange={setRoleFilter} options={['Role: All', 'Teaching Volunteer', 'English Mentor', 'Leadership Volunteer', 'Mentor', 'Content Volunteer']} />
          <SelectFilter value={cityFilter} onChange={setCityFilter} options={['City: All', 'Patna', 'Gaya', 'Bodh Gaya']} />
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[10px] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={16} /> More Filters
          </button>
          
          <button 
            onClick={resetFilters}
            className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {/* Table / Loading State */}
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <VolunteerTable data={filteredVolunteers} />
        )}

        {/* Volunteer Details Panel */}
        <AnimatePresence>
          {selectedVolunteer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              transition={{ duration: 0.2 }}
            >
              <VolunteerDetails 
                volunteer={selectedVolunteer} 
                onBack={() => setSelectedVolunteerId(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AdminAddVolunteerModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />

      </div>
    </AdminLayout>
  );
}

function SelectFilter({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) {
  return (
    <div className="relative min-w-[140px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-2.5 pr-10 bg-white border border-[#E5E7EB] rounded-[10px] text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
      >
        {options.map((opt) => (
          <option key={opt} value={opt === options[0] ? 'All' : opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
