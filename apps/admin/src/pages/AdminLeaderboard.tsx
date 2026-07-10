import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Plus,
  Trash2,
  Save,
  Upload,
  Loader2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { volunteerLeaderboardApi, LeaderboardEntry } from '../api/volunteer-leaderboard.api';

interface RankCardFormProps {
  rank: number;
  entry: LeaderboardEntry | null;
  month: string;
  onSaveSuccess: () => void;
}

const RankCardForm: React.FC<RankCardFormProps> = ({ rank, entry, month, onSaveSuccess }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [workshops, setWorkshops] = useState('0');
  const [hours, setHours] = useState('0');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setName(entry.name);
      setRole(entry.role);
      setWorkshops(String(entry.workshops));
      setHours(String(entry.hours));
      setLinkedin(entry.linkedin || '');
      setInstagram(entry.instagram || '');
      setFile(null);
    } else {
      setName('');
      setRole('');
      setWorkshops('0');
      setHours('0');
      setLinkedin('');
      setInstagram('');
      setFile(null);
    }
  }, [entry, month]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) {
      toast.error('Name and Role are required.');
      return;
    }

    setSaving(true);
    const toastId = toast.loading(`Saving Rank ${rank} volunteer...`);

    try {
      const formData = new FormData();
      formData.append('month', month);
      formData.append('rank', String(rank));
      formData.append('name', name);
      formData.append('role', role);
      formData.append('workshops', workshops);
      formData.append('hours', hours);
      formData.append('linkedin', linkedin);
      formData.append('instagram', instagram);
      if (file) {
        formData.append('file', file);
      }

      await volunteerLeaderboardApi.upsert(formData);
      toast.success(`Rank ${rank} volunteer updated successfully!`, { id: toastId });
      onSaveSuccess();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to save volunteer details.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!entry) return;
    if (!window.confirm(`Are you sure you want to delete the entry for Rank ${rank}?`)) return;

    const toastId = toast.loading(`Deleting Rank ${rank} entry...`);
    try {
      await volunteerLeaderboardApi.delete(entry.id);
      toast.success(`Rank ${rank} entry deleted.`, { id: toastId });
      onSaveSuccess();
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to delete entry.', { id: toastId });
    }
  };

  // Styling properties depending on rank
  const rankColors = {
    1: {
      border: 'border-yellow-400',
      bg: 'bg-yellow-50/50',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.15)]',
      accent: 'text-yellow-600',
      badge: 'bg-yellow-500 text-white',
      badgeText: 'Rank 1 (Gold)',
    },
    2: {
      border: 'border-slate-300',
      bg: 'bg-slate-50/50',
      glow: 'shadow-[0_0_15px_rgba(148,163,184,0.1)]',
      accent: 'text-slate-600',
      badge: 'bg-slate-400 text-white',
      badgeText: 'Rank 2 (Silver)',
    },
    3: {
      border: 'border-amber-600/40',
      bg: 'bg-amber-50/30',
      glow: 'shadow-[0_0_15px_rgba(180,83,9,0.08)]',
      accent: 'text-amber-700',
      badge: 'bg-amber-600 text-white',
      badgeText: 'Rank 3 (Bronze)',
    },
  }[rank as 1 | 2 | 3] || {
    border: 'border-gray-200',
    bg: 'bg-white',
    glow: 'shadow-sm',
    accent: 'text-gray-600',
    badge: 'bg-gray-500 text-white',
    badgeText: `Rank ${rank}`,
  };

  return (
    <div className={`bg-white rounded-3xl border ${rankColors.border} ${rankColors.glow} p-6 flex flex-col justify-between h-full`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Header with rank info */}
        <div className="flex justify-between items-center mb-2">
          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${rankColors.badge}`}>
            {rankColors.badgeText}
          </span>
          {entry && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition"
              title="Delete this entry"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
              ) : entry?.avatar ? (
                <img src={entry.avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <Trophy size={24} className="text-gray-300" />
              )}
            </div>
            <div className="relative flex-1">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) setFile(selected);
                }}
              />
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-xs font-semibold py-2 px-3 rounded-xl transition"
              >
                <Upload size={14} />
                {file ? 'Change Photo' : 'Upload Photo'}
              </button>
            </div>
          </div>
        </div>

        {/* Name and Role */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
              Volunteer Name *
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Dheeraj Yadav"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
              Volunteer Role *
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Core Volunteer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
              Workshops Organized
            </label>
            <input
              type="number"
              min="0"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workshops}
              onChange={(e) => setWorkshops(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
              Volunteer Hours
            </label>
            <input
              type="number"
              min="0"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
              LinkedIn URL (Optional)
            </label>
            <input
              type="url"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/..."
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
              Instagram URL (Optional)
            </label>
            <input
              type="url"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://instagram.com/..."
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full mt-4 bg-[#0B1F5E] hover:bg-[#1E3A8A] text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={14} />
              Save Details
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const AdminLeaderboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [months, setMonths] = useState<string[]>([]);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddMonthModalOpen, setIsAddMonthModalOpen] = useState(false);
  const [newMonthValue, setNewMonthValue] = useState('');

  const fetchActiveMonth = async () => {
    try {
      const res = await volunteerLeaderboardApi.getActiveMonth();
      setActiveMonth(res);
      if (res && res !== 'ALL_TIME') {
        setSelectedMonth(res);
      }
    } catch (err) {
      console.error('Failed to fetch active month', err);
    }
  };

  const fetchMonths = async () => {
    try {
      const activeMonths = await volunteerLeaderboardApi.getMonths();
      const uniqueMonths = Array.from(new Set(activeMonths)).filter(m => m !== 'ALL_TIME');
      uniqueMonths.sort((a, b) => b.localeCompare(a));
      if (uniqueMonths.length > 0) {
        setMonths(uniqueMonths);
        if (!selectedMonth || !uniqueMonths.includes(selectedMonth)) {
          setSelectedMonth(uniqueMonths[0]);
        }
      } else {
        setMonths(['2026-08']);
        setSelectedMonth('2026-08');
      }
    } catch (error) {
      console.error('Failed to fetch distinct months', error);
      setMonths(['2026-08']);
      setSelectedMonth('2026-08');
    }
  };

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const data = await volunteerLeaderboardApi.getByMonth(selectedMonth);
      setEntries(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load leaderboard entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchActiveMonth();
      await fetchMonths();
    };
    init();
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [selectedMonth]);

  const handleAddMonthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonthValue) return;

    // Verify format YYYY-MM
    const regex = /^\d{4}-\d{2}$/;
    if (!regex.test(newMonthValue)) {
      toast.error('Please use the format YYYY-MM (e.g. 2026-09)');
      return;
    }

    if (months.includes(newMonthValue)) {
      toast.error('This month already exists in the selector.');
      return;
    }

    const updatedMonths = [...months, newMonthValue];
    updatedMonths.sort((a, b) => b.localeCompare(a));
    setMonths(updatedMonths);
    setSelectedMonth(newMonthValue);
    setIsAddMonthModalOpen(false);
    setNewMonthValue('');
    toast.success('New month selection added!');
  };

  const handleDeleteMonth = async () => {
    if (!selectedMonth) return;
    if (!window.confirm(`Are you sure you want to delete the ENTIRE month of ${formatMonthName(selectedMonth)}? This will delete all rank 1, 2, and 3 entries for this month.`)) {
      return;
    }

    const toastId = toast.loading('Deleting month...');
    try {
      await volunteerLeaderboardApi.deleteMonth(selectedMonth);
      toast.success('Month deleted successfully.', { id: toastId });
      const remainingMonths = months.filter(m => m !== selectedMonth);
      
      let nextMonth = '2026-08';
      if (remainingMonths.length > 0) {
        setMonths(remainingMonths);
        nextMonth = remainingMonths[0];
        setSelectedMonth(nextMonth);
      } else {
        setMonths(['2026-08']);
        setSelectedMonth('2026-08');
      }

      if (selectedMonth === activeMonth) {
        await volunteerLeaderboardApi.setMonthActive(nextMonth);
        setActiveMonth(nextMonth);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete month.', { id: toastId });
    }
  };

  const handleSetMonthActive = async () => {
    if (!selectedMonth) return;
    const toastId = toast.loading('Setting month as live...');
    try {
      await volunteerLeaderboardApi.setMonthActive(selectedMonth);
      setActiveMonth(selectedMonth);
      toast.success(`${formatMonthName(selectedMonth)} is now live on the homepage!`, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Failed to set month active.', { id: toastId });
    }
  };

  const formatMonthName = (m: string) => {
    const [year, month] = m.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getEntryByRank = (rank: number) => {
    return entries.find((e) => e.rank === rank) || null;
  };

  return (
    <AdminLayout>
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
              Volunteer Leaderboard Operations
              <div className="bg-blue-500 text-white rounded-full p-1 shadow-sm">
                <Trophy size={16} />
              </div>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Select a month to update or configure the top 3 most active volunteers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddMonthModalOpen(true)}
              className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm"
            >
              <Plus size={14} />
              Add Month Selector
            </button>
            <div className="relative">
              <select
                className="appearance-none bg-[#0B1F5E] text-white pl-4 pr-10 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m} className="bg-white text-gray-900 font-medium">
                    {formatMonthName(m)}{m === activeMonth ? ' (Live)' : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={14} />
            </div>
            {selectedMonth && months.length > 0 && selectedMonth !== activeMonth && (
              <button
                onClick={handleSetMonthActive}
                className="flex items-center gap-2 border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <Check size={14} />
                Set as Live Month
              </button>
            )}
            {selectedMonth && months.length > 0 && (
              <button
                onClick={handleDeleteMonth}
                className="flex items-center gap-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <Trash2 size={14} />
                Delete Month
              </button>
            )}
          </div>
        </div>

        {/* Leaderboard Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 size={32} className="animate-spin text-[#0B1F5E]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RankCardForm
              rank={1}
              entry={getEntryByRank(1)}
              month={selectedMonth}
              onSaveSuccess={fetchEntries}
            />
            <RankCardForm
              rank={2}
              entry={getEntryByRank(2)}
              month={selectedMonth}
              onSaveSuccess={fetchEntries}
            />
            <RankCardForm
              rank={3}
              entry={getEntryByRank(3)}
              month={selectedMonth}
              onSaveSuccess={fetchEntries}
            />
          </div>
        )}

        {/* Modal for adding a custom month selector */}
        <AnimatePresence>
          {isAddMonthModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
              >
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-sm font-extrabold text-gray-900">Add New Month Selector</h2>
                  <button
                    onClick={() => setIsAddMonthModalOpen(false)}
                    className="p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
                <form onSubmit={handleAddMonthSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block mb-1.5">
                      Select Month & Year
                    </label>
                    <input
                      type="month"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        // Converts YYYY-MM from datepicker value
                        setNewMonthValue(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsAddMonthModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                    >
                      Add Month
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminLeaderboard;
