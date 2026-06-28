import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search, Filter, Download, Plus, MoreVertical, ChevronDown,
  Users, Clock, CheckCircle, XCircle, Shield, Eye, EyeOff,
  KeyRound, UserPlus, Trash2, Edit3, MessageSquare, TrendingUp, TrendingDown, Calendar, ArrowRight, Pause, ChevronRight, Check,
  ShieldCheck, Award, User, ArrowUpDown, X, Info, ThumbsUp, ThumbsDown, Star, RotateCcw
} from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';

// Icon Map for backend string to Lucide component
const LucideIcons = {
  UserPlus, CheckCircle, XCircle, TrendingUp, TrendingDown, Shield, Trash2, Info, KeyRound, MessageSquare, Clock
};
import { toast } from 'sonner';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

// ──────────────────────────────────────────
// CONSTANTS & COLORS
// ──────────────────────────────────────────

const ALL_POSITIONS = [
  'PRESIDENT',
  'VICE-PRESIDENT',
  'SECRETARY',
  'Joint Secretary Programs',
  'Joint Secretary Public Relation',
  'Joint Secretary Technical',
  'Social Media Lead',
  'Event & Membership Coordinator',
  'Design and Content Lead',
  'Outreach Lead',
  'Research & Development Lead',
  'Digixplore Lead',
  'Web Development Lead',
  'Akshar Lead',
  'Operations Lead',
  'Netritva Lead',
  'App Development Lead'
];

const positionColors = {
  'PRESIDENT': 'bg-blue-50 text-blue-700 border-blue-200',
  'VICE-PRESIDENT': 'bg-blue-50 text-blue-700 border-blue-200',
  'SECRETARY': 'bg-blue-50 text-blue-700 border-blue-200',
  'Joint Secretary Programs': 'bg-violet-50 text-violet-700 border-violet-200',
  'Joint Secretary Public Relation': 'bg-violet-50 text-violet-700 border-violet-200',
  'Joint Secretary Technical': 'bg-violet-50 text-violet-700 border-violet-200',
  'Social Media Lead': 'bg-green-50 text-green-700 border-green-200',
  'Event & Membership Coordinator': 'bg-orange-50 text-orange-700 border-orange-200',
  'Design and Content Lead': 'bg-rose-50 text-rose-700 border-rose-200',
  'Outreach Lead': 'bg-teal-50 text-teal-700 border-teal-200',
  'Research & Development Lead': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Digixplore Lead': 'bg-purple-50 text-purple-700 border-purple-200',
  'Web Development Lead': 'bg-blue-50 text-blue-700 border-blue-200',
  'Akshar Lead': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Operations Lead': 'bg-amber-50 text-amber-700 border-amber-200',
  'Netritva Lead': 'bg-pink-50 text-pink-700 border-pink-200',
  'App Development Lead': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const accessColors = {
  'Can View & Reply': 'text-green-700 bg-green-50',
  'Can View Only': 'text-blue-700 bg-blue-50',
  'No Access': 'text-red-700 bg-red-50',
  'Request Pending': 'text-orange-700 bg-orange-50',
};

const statusColors = {
  'Sr. Team Lead': 'bg-purple-100 text-purple-800 border-purple-200',
  'Team Lead': 'bg-blue-100 text-blue-800 border-blue-200',
  'Junior Lead': 'bg-green-100 text-green-800 border-green-200',
};

const avatarColors = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-orange-400 to-red-500',
  'from-teal-400 to-cyan-600',
  'from-green-400 to-emerald-600',
  'from-rose-400 to-pink-600',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-blue-500',
];

// ──────────────────────────────────────────
// DONUT CHART (SVG)
// ──────────────────────────────────────────
// ──────────────────────────────────────────
// DONUT CHART (SVG)
// ──────────────────────────────────────────
const DonutChart = ({ accessData = [], total = 0 }) => {
  const defaultColors = {
    'Can View & Reply': '#2563EB',
    'Can View Only': '#22C55E',
    'No Access': '#EF4444',
    'Request Pending': '#F59E0B'
  };

  const data = accessData.map(d => ({ ...d, color: defaultColors[d.label] || '#9CA3AF' }));
  const safeTotal = total || 1; // avoid divide by zero

  const r = 52, cx = 70, cy = 70, stroke = 20;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const segments = data.map(d => {
    const len = (d.value / safeTotal) * circ;
    const seg = { ...d, offset, len };
    offset += len;
    return seg;
  });

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${s.len} ${circ - s.len}`}
              strokeDashoffset={-s.offset}
              style={{ transformOrigin: `${cx}px ${cy}px`, transform: 'rotate(-90deg)' }}
              className="transition-all duration-500 ease-in-out"
            />
          ))}
          <text x={cx} y={cy - 6} textAnchor="middle" className="text-2xl font-extrabold" fontSize="22" fontWeight="800" fill="#111827">{total}</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#6B7280">TOTAL</text>
        </svg>
      </div>
      <div className="space-y-2 flex-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-gray-600 font-medium">{d.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{d.value}</span>
              <span className="text-gray-400">({Math.round((d.value/safeTotal)*100)}%)</span>
            </div>
          </div>
        ))}
        {data.length === 0 && <p className="text-xs text-gray-500">No data available</p>}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────
// ACTION DROPDOWN
// ──────────────────────────────────────────
// ──────────────────────────────────────────
// ACTION DROPDOWN
// ──────────────────────────────────────────
const ActionMenu = ({ lead, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const actions = [
    { icon: User, label: 'View Details', color: 'text-gray-700', onClick: () => setOpen(false) },
    { icon: Edit3, label: 'Edit Profile', color: 'text-gray-700', onClick: () => setOpen(false) },
    { icon: Pause, label: 'Suspend', color: 'text-yellow-600', onClick: () => { onUpdate(lead.id, { credStatus: 'Rejected' }); setOpen(false); } },
    { icon: Trash2, label: 'Delete', color: 'text-red-600', onClick: () => { onDelete(lead.id); setOpen(false); } },
  ];

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
        <MoreVertical size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-8 z-50 w-44 bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/60 overflow-hidden"
          >
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={a.onClick}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 transition-colors ${a.color} ${i === actions.length - 1 ? 'border-t border-gray-100' : ''}`}
              >
                <a.icon size={14} />
                {a.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ──────────────────────────────────────────
// ADD TEAM LEAD MODAL
// ──────────────────────────────────────────
// ──────────────────────────────────────────
// ADD TEAM LEAD MODAL
// ──────────────────────────────────────────
const AddTeamLeadModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: 'Select Position', msgAccess: 'No Access', password: ''
  });

  if (!open) return null;

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || formData.position === 'Select Position') {
      toast.error('Please fill required fields (Name, Email, Password, Position)');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Add New Team Lead</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in the details to add a new team lead</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
            <input type="text" placeholder="e.g. Rahul Kumar" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
            <input type="email" placeholder="e.g. rahul@unnati.org" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Initial Password</label>
            <input type="text" placeholder="e.g. Unnati@2024" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Position</label>
            <select value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white">
              <option>Select Position</option>
              {ALL_POSITIONS.map(pos => <option key={pos}>{pos}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Contact Message Access</label>
            <select value={formData.msgAccess} onChange={e => setFormData({...formData, msgAccess: e.target.value})} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-white">
              <option>No Access</option>
              <option>Can View Only</option>
              <option>Can View & Reply</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="px-5 py-2.5 text-sm font-bold text-white bg-[#2563EB] rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2"><Plus size={15} /> Add Team Lead</button>
        </div>
      </motion.div>
    </div>
  );
};

// ──────────────────────────────────────────
// SELECT FILTER
// ──────────────────────────────────────────
const SelectFilter = ({ value, onChange, options, width = 'w-36' }) => (
  <div className={`relative ${width}`}>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none px-3 py-2 pr-8 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 cursor-pointer"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
    <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

// ──────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────
const AdminTeamLeads = () => {
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('All Positions');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [accessFilter, setAccessFilter] = useState('All Access');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [, setLoading] = useState(true);

  // Data States
  const [teamLeads, setTeamLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, active: 0, inactive: 0 });
  const [accessStats, setAccessStats] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/team-leads?_t=${Date.now()}`);
      const data = await res.json();
      setTeamLeads(data.leads || []);
      setStats(data.stats || { total: 0, pending: 0, active: 0, inactive: 0 });
      setAccessStats(data.accessStats || []);
      setActivityLog(data.activityLogs || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const handleAddSubmit = async (formData) => {
    try {
      const res = await fetch('/api/team-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Team Lead added successfully!');
        setShowModal(false);
        fetchData();
      } else {
        const errorData = await res.json().catch(() => null);
        toast.error(errorData?.message || 'Failed to add Team Lead');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await fetch(`/api/team-leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Updated successfully');
        await fetchData();
      } else {
        const errData = await res.json().catch(() => null);
        toast.error(errData?.message || 'Failed to update');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team lead?')) return;
    try {
      const res = await fetch(`/api/team-leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Deleted successfully');
        setTeamLeads(prev => prev.filter(l => l.id !== id));
        await fetchData();
      } else {
        const errData = await res.json().catch(() => null);
        toast.error(errData?.message || 'Failed to delete');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleGenerate = async (id) => {
    try {
      const res = await fetch(`/api/team-leads/${id}/generate-password`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        // Keep the toast visible longer since it contains the password
        toast.success(`Generated new password: ${data.password}`, { duration: 10000 });
        fetchData();
      } else {
        toast.error('Failed to generate password');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(`Password reset link sent to ${email}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to send reset link');
    }
  };

  const filtered = teamLeads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchPos = posFilter === 'All Positions' || l.position === posFilter;
    const matchStatus = statusFilter === 'All Status' || l.status === statusFilter;
    const matchAccess = accessFilter === 'All Access' || l.msgAccess === accessFilter;
    return matchSearch && matchPos && matchStatus && matchAccess;
  });

  const statCards = [
    { title: 'Total Team Leads', value: stats.total, sub: 'Active team leads', subColor: 'text-green-600', icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', border: 'border-blue-100' },
    { title: 'Pending Approval', value: stats.pending, sub: 'Awaiting review', subColor: 'text-orange-500', icon: Clock, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', border: 'border-orange-100' },
    { title: 'Active', value: stats.active, sub: 'Currently active', subColor: 'text-green-600', icon: CheckCircle, iconBg: 'bg-green-50', iconColor: 'text-green-600', border: 'border-green-100' },
    { title: 'Inactive', value: stats.inactive, sub: 'Deactivated', subColor: 'text-red-500', icon: XCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500', border: 'border-red-100' },
  ];

  return (
    <AdminLayout>
      <AnimatePresence>
        {showModal && <AddTeamLeadModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddSubmit} />}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto pb-10">

        {/* ── PAGE HEADER ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">Team Leads Management</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage team leads, their access, roles, and permissions.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download size={15} /> Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md shadow-blue-500/20"
            >
              <Plus size={15} /> Add New Team Lead
            </button>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`bg-white rounded-2xl border ${c.border} p-5 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon size={20} className={c.iconColor} />
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-500 mb-1">{c.title}</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{c.value}</p>
                <p className={`text-xs font-semibold ${c.subColor} flex items-center gap-1`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.subColor.replace('text-', 'bg-')}`} />
                  {c.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── TEAM LEADS TABLE CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
          {/* Filters */}
          <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team leads..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all"
              />
            </div>
            <SelectFilter value={posFilter} onChange={setPosFilter} options={['All Positions', ...ALL_POSITIONS]} />
            <SelectFilter value={statusFilter} onChange={setStatusFilter} options={['All Status', 'Sr. Team Lead', 'Team Lead', 'Junior Lead']} />
            <SelectFilter value={accessFilter} onChange={setAccessFilter} options={['All Access', 'Can View & Reply', 'Can View Only', 'No Access', 'Request Pending']} />
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={13} /> Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {['Team Lead', 'Position', 'Contact', 'Login Credentials', 'Access to Contact Messages', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Team Lead */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-sm`}>
                          {lead.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none">{lead.name}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{lead.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select 
                          value={lead.position} 
                          onChange={(e) => handleUpdate(lead.id, { position: e.target.value })}
                          className={`appearance-none outline-none cursor-pointer inline-flex items-center gap-1.5 pl-2.5 pr-6 py-1.5 rounded-lg text-[11px] font-bold border hover:border-gray-300 transition-colors ${positionColors[lead.position] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
                        >
                          <option value="Pending Assignment">Pending Assignment</option>
                          {ALL_POSITIONS.map(pos => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-xs font-semibold text-gray-700">{lead.phone}</p>
                    </td>

                    {/* Login Credentials */}
                    <td className="px-5 py-4">
                      <p className="text-xs text-gray-700 font-medium mb-1">{lead.loginEmail}</p>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lead.credStatus === 'Approved' ? 'bg-green-100 text-green-700' : lead.credStatus === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                          {lead.credStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        {lead.credStatus === 'Pending Approval' && (
                          <>
                            <button onClick={() => handleUpdate(lead.id, { credStatus: 'Approved' })} className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-lg text-[10px] font-bold text-green-700 hover:bg-green-100 transition-colors">
                              <ThumbsUp size={10} /> Approve
                            </button>
                            <button onClick={() => handleUpdate(lead.id, { credStatus: 'Rejected' })} className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-lg text-[10px] font-bold text-red-600 hover:bg-red-100 transition-colors">
                              <ThumbsDown size={10} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Access to Contact Messages */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select 
                          value={lead.msgAccess} 
                          onChange={(e) => handleUpdate(lead.id, { msgAccess: e.target.value })}
                          className={`appearance-none outline-none cursor-pointer inline-flex items-center gap-1.5 pl-2.5 pr-6 py-1.5 rounded-lg text-[11px] font-bold ${accessColors[lead.msgAccess] || 'bg-gray-100 text-gray-700'} border border-transparent hover:border-gray-200 transition-colors`}
                        >
                          <option value="Can View & Reply">Can View & Reply</option>
                          <option value="Can View Only">Can View Only</option>
                          <option value="No Access">No Access</option>
                          <option value="Request Pending">Request Pending</option>
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusColors[lead.status]}`}>
                        {lead.status === 'Sr. Team Lead' && <Star size={10} />}
                        {lead.status === 'Team Lead' && <Shield size={10} />}
                        {lead.status === 'Junior Lead' && <User size={10} />}
                        {lead.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <ActionMenu lead={lead} onUpdate={handleUpdate} onDelete={handleDelete} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium">Showing {filtered.length} team leads</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${page === p ? 'bg-[#2563EB] text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM 3-COL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Login Credentials Overview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-extrabold text-gray-900 mb-1">Login Credentials Overview</h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">Login credentials can only be changed after administrator approval.</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                { label: 'Approved Credentials', value: teamLeads.filter(l => l.credStatus === 'Approved').length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Pending Approval', value: teamLeads.filter(l => l.credStatus === 'Pending Approval').length, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
                { label: 'Rejected', value: teamLeads.filter(l => l.credStatus === 'Rejected').length, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                { label: 'Total Leads', value: teamLeads.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', isText: true },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                    <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
                      <Icon size={16} className={s.color} />
                    </div>
                    <p className={`font-extrabold mb-0.5 ${s.isText ? 'text-base' : 'text-2xl'} text-gray-900`}>{s.value}</p>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Access Control for Contact Messages */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-extrabold text-gray-900">Access Control for Contact Messages</h3>
            </div>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">Control which team leads can view and respond to contact form submissions.</p>
            <DonutChart accessData={accessStats} total={teamLeads.length} />
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                <Shield size={13} /> Manage Access
              </button>
            </div>
          </div>

          {/* Team Lead Hierarchy */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-extrabold text-gray-900 mb-1">Team Lead Roles & Hierarchy</h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">Admin can promote or demote team leads based on their performance.</p>
            <div className="space-y-3">
              {[
                { title: 'Senior Team Leads', count: `${teamLeads.filter(l => l.status === 'Sr. Team Lead').length} Members`, color: 'bg-purple-500', textColor: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-100', icon: Award, perms: ['Manage Team Leads', 'Approve Tasks', 'Access All Modules'] },
                { title: 'Team Leads', count: `${teamLeads.filter(l => l.status === 'Team Lead').length} Members`, color: 'bg-blue-500', textColor: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', icon: Shield, perms: ['Manage Assigned Team', 'Review Tasks'] },
                { title: 'Junior Leads', count: `${teamLeads.filter(l => l.status === 'Junior Lead').length} Members`, color: 'bg-green-500', textColor: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100', icon: User, perms: ['Limited Access', 'Assigned Responsibilities Only'] },
              ].map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <div key={i} className={`flex items-start gap-3 p-4 ${tier.bg} border ${tier.border} rounded-xl`}>
                    <div className={`w-8 h-8 ${tier.color} rounded-lg flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon size={15} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-xs font-extrabold ${tier.textColor}`}>{tier.title}</p>
                        <span className={`text-[10px] font-bold ${tier.textColor} opacity-70`}>{tier.count}</span>
                      </div>
                      <div className="space-y-0.5">
                        {tier.perms.map((p, j) => (
                          <p key={j} className="text-[10px] text-gray-600 flex items-center gap-1">
                            <span className={`w-1 h-1 rounded-full ${tier.color} shrink-0`} /> {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors">
                <Award size={13} /> Manage Roles
              </button>
            </div>
          </div>
        </div>

        {/* ── RECENT ACTIVITY LOG ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">Recent Activity Log</h3>
              <p className="text-xs text-gray-500 mt-0.5">Latest actions performed by admin.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {['Action', 'Team Lead', 'Details', 'Date'].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activityLog.map((log) => {
                  const Icon = LucideIcons[log.icon] || Info;
                  const colorMap = { 
                    green: 'bg-green-50 text-green-600', 
                    blue: 'bg-blue-50 text-blue-600', 
                    purple: 'bg-purple-50 text-purple-600', 
                    orange: 'bg-orange-50 text-orange-600', 
                    yellow: 'bg-yellow-50 text-yellow-600',
                    red: 'bg-red-50 text-red-600'
                  };
                  return (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${colorMap[log.color] || colorMap.blue}`}>
                            <Icon size={13} />
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-700">{log.leadName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-500 font-medium">{log.details}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 flex justify-center">
            <button className="flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-blue-700 transition-colors">
              View Full Activity Log <ChevronRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminTeamLeads;
