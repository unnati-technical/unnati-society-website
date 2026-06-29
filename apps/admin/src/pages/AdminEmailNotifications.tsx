import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Bell, Shield, Settings, Search, Plus, Filter, 
  MoreVertical, Edit2, Trash2, X, ChevronRight, User,
  CheckCircle2, AlertCircle, Clock, Save, XCircle, Building, Users,
  Heart, Calendar, FileText, Share2, Phone
} from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005';

const FORM_CATEGORIES = [
  { id: 'Volunteer Form', icon: User, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', title: 'Volunteer Registration Form', description: 'Sent whenever a volunteer submits an application.' },
  { id: 'Campus Visit', icon: Building, iconColor: 'text-indigo-600', iconBg: 'bg-indigo-50', title: 'Campus Visit Request', description: 'School requests campus visit.' },
  { id: 'Invite School', icon: Share2, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', title: 'Invite Us To School', description: 'Invitation received from school.' },
  { id: 'Partner Request', icon: Users, iconColor: 'text-orange-600', iconBg: 'bg-orange-50', title: 'Partnership Request', description: 'Organization partnership request.' },
  { id: 'Contact', icon: Phone, iconColor: 'text-purple-600', iconBg: 'bg-purple-50', title: 'Contact Form', description: 'General website inquiries.' },
  { id: 'Donation', icon: Heart, iconColor: 'text-rose-600', iconBg: 'bg-rose-50', title: 'Donation Form', description: 'Donation received.' },
  { id: 'Events', icon: Calendar, iconColor: 'text-cyan-600', iconBg: 'bg-cyan-50', title: 'Event Registration', description: 'User registers for an event.' },
  { id: 'Alumni', icon: FileText, iconColor: 'text-gray-500', iconBg: 'bg-gray-100', title: 'Alumni Registration', description: 'Alumni joins the network.' },
  { id: 'Newsletter', icon: Mail, iconColor: 'text-teal-600', iconBg: 'bg-teal-50', title: 'Newsletter Subscription', description: 'User subscribes to newsletter.' },
  { id: 'Certificates', icon: Shield, iconColor: 'text-amber-600', iconBg: 'bg-amber-50', title: 'Certificate Request', description: 'Certificate verification or request.' },
];

const ALL_CATEGORIES = FORM_CATEGORIES.map(c => c.id);

interface NotificationRecipient {
  id: string;
  name: string;
  email: string;
  department: string;
  phone: string | null;
  status: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

interface FormCategory {
  id: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  recipientsList?: NotificationRecipient[];
  recipients: string[];
  count: number;
  extraCount: number;
  updated: string;
  status: string;
}

export default function AdminEmailNotifications() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [drawerRecipient, setDrawerRecipient] = useState<FormCategory | null>(null);
  
  // Modal Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General',
    phone: '',
    status: 'Active',
    categories: [] as string[]
  });

  const { data: recipients = [], isLoading } = useQuery<NotificationRecipient[]>({
    queryKey: ['notification-recipients'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/notification-recipients`);
      if (!res.ok) throw new Error('Failed to fetch recipients');
      return res.json();
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<NotificationRecipient>) => {
      const url = editingId 
        ? `${API_URL}/notification-recipients/${editingId}`
        : `${API_URL}/notification-recipients`;
      
      const res = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-recipients'] });
      setIsAddModalOpen(false);
      toast.success(editingId ? 'Recipient updated successfully' : 'Recipient added successfully');
      setEditingId(null);
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/notification-recipients/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-recipients'] });
      toast.success('Recipient removed');
    }
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', department: 'General', phone: '', status: 'Active', categories: [] });
    setIsAddModalOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, formId: string) => {
    e.stopPropagation();
    // Edit the first recipient of this form for simplicity, or normally you'd edit the recipient directly
    // Since the UI design calls for editing the FORM, we might just open the drawer instead
    // But let's just open the add modal
    handleOpenAddModal();
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const saveRecipient = () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required');
      return;
    }
    saveMutation.mutate(formData);
  };

  // Group recipients by form category
  const formsData: FormCategory[] = useMemo(() => {
    const safeRecipients = Array.isArray(recipients) ? recipients : [];
    return FORM_CATEGORIES.map(formCat => {
      const assignedRecipients = safeRecipients.filter((r) => r.categories?.includes(formCat.id));
      const activeCount = assignedRecipients.filter((r) => r.status === 'Active').length;
      return {
        ...formCat,
        recipientsList: assignedRecipients,
        recipients: assignedRecipients.map((r) => r.email),
        count: assignedRecipients.length,
        extraCount: Math.max(0, assignedRecipients.length - 2),
        updated: assignedRecipients.length > 0 ? new Date(Math.max(...assignedRecipients.map((r) => new Date(r.updatedAt).getTime()))).toLocaleDateString() : 'N/A',
        status: activeCount > 0 ? 'Active' : 'Inactive'
      };
    });
  }, [recipients]);

  const filteredForms = formsData.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.recipients.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto p-4 lg:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight">Email Notification Recipients</h1>
              <p className="text-[#64748B] mt-1 text-sm max-w-2xl">
                Manage who receives email notifications for every form, request, application, and website activity.
              </p>
            </div>
            <button 
              onClick={handleOpenAddModal}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.2)] whitespace-nowrap self-start sm:self-auto h-[44px]"
            >
              <Plus size={18} />
              Add Recipient
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-[14px] p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(15,23,42,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Mail className="text-[#2563EB]" size={20} />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-1">Add Email Recipients</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">Assign one or multiple email addresses to each form type.</p>
            </div>
            
            <div className="bg-white rounded-[14px] p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(15,23,42,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                <Bell className="text-emerald-600" size={20} />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-1">Automatic Notifications</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">Recipients instantly receive email whenever someone submits a form.</p>
            </div>

            <div className="bg-white rounded-[14px] p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(15,23,42,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                <Shield className="text-purple-600" size={20} />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-1">Role Based</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">Assign different teams to different responsibilities securely.</p>
            </div>

            <div className="bg-white rounded-[14px] p-6 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(15,23,42,0.02)]">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                <Settings className="text-orange-600" size={20} />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-1">Manage Anytime</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">Update recipients whenever your organization changes.</p>
            </div>
          </div>

          <div className="bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_4px_16px_rgba(15,23,42,0.02)] overflow-hidden">
            <div className="p-6 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">Form Based Notifications</h2>
                <p className="text-[#64748B] text-sm mt-1">Configure notification recipients for every form available on the website.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search forms..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 h-[44px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto min-h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-48 text-gray-400">Loading...</div>
              ) : (
                <table className="w-full text-left text-sm text-[#0F172A]">
                  <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Form</th>
                      <th className="px-6 py-4">Recipients</th>
                      <th className="px-6 py-4 text-center">Recipient Count</th>
                      <th className="px-6 py-4">Last Updated</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredForms.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setDrawerRecipient(item)}>
                        <td className="px-6 py-4 h-[64px]">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                              {React.createElement(item.icon, { className: item.iconColor, size: 20 })}
                            </div>
                            <div>
                              <div className="font-semibold text-[#0F172A]">{item.title}</div>
                              <div className="text-[#64748B] text-xs mt-0.5">{item.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {item.recipients.slice(0, 2).map((recip, idx) => (
                              <span key={idx} className="inline-flex items-center bg-[#F8FAFC] border border-[#E5E7EB] text-[#0F172A] text-[13px] font-medium px-2.5 py-1 rounded-lg">
                                {recip}
                              </span>
                            ))}
                            {item.extraCount > 0 && (
                              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-[13px] font-semibold px-2.5 py-1 rounded-lg">
                                +{item.extraCount} More
                              </span>
                            )}
                            {item.count === 0 && <span className="text-gray-400 italic text-xs">No recipients added</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-medium">
                          {item.count}
                        </td>
                        <td className="px-6 py-4 text-[#64748B]">
                          {item.updated}
                        </td>
                        <td className="px-6 py-4">
                          {item.status === 'Active' ? (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors" onClick={(e) => handleEdit(e, item.id)}>
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Add Recipient Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-gray-50/50 shrink-0">
                <h3 className="font-bold text-lg text-[#0F172A]">{editingId ? 'Edit Recipient' : 'Add Notification Recipient'}</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Recipient Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-[44px] px-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm transition-all" placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Email Address</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!!editingId} className="w-full h-[44px] px-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm transition-all disabled:opacity-50" placeholder="john@unnati.org" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Department</label>
                    <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full h-[44px] px-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm transition-all">
                      <option>General</option>
                      <option>Volunteer Team</option>
                      <option>School Outreach</option>
                      <option>Programs</option>
                      <option>Finance</option>
                      <option>HR</option>
                      <option>Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Phone (Optional)</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full h-[44px] px-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm transition-all" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-[#0F172A]">Notification Categories</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#64748B]">Status ({formData.status})</span>
                      <div 
                        className={`w-10 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${formData.status === 'Active' ? 'bg-[#2563EB]' : 'bg-gray-300'}`}
                        onClick={() => setFormData(prev => ({...prev, status: prev.status === 'Active' ? 'Inactive' : 'Active'}))}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${formData.status === 'Active' ? 'right-1 translate-x-0' : 'left-1'}`}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ALL_CATEGORIES.map((cat, i) => {
                      const isChecked = formData.categories.includes(cat);
                      return (
                        <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${isChecked ? 'bg-blue-50 border-blue-200' : 'border-[#E5E7EB] bg-[#F8FAFC] hover:bg-gray-100'}`}>
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleCategory(cat)}
                            className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB]" 
                          />
                          <span className={`text-sm font-medium ${isChecked ? 'text-blue-800' : 'text-[#0F172A]'}`}>{cat}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#E5E7EB] bg-gray-50/50 flex items-center justify-end gap-3 shrink-0">
                <button onClick={() => setIsAddModalOpen(false)} className="px-5 h-[44px] rounded-xl font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button onClick={saveRecipient} disabled={saveMutation.isPending} className="px-5 h-[44px] rounded-xl font-medium bg-[#2563EB] hover:bg-blue-700 text-white shadow-[0_4px_16px_rgba(37,99,235,0.2)] transition-all flex items-center gap-2 disabled:opacity-50">
                  {saveMutation.isPending ? 'Saving...' : <><Save size={18} /> Save Recipient</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recipient Details Drawer */}
      <AnimatePresence>
        {drawerRecipient && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setDrawerRecipient(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-gray-100 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${drawerRecipient.iconBg}`}>
                    {React.createElement(drawerRecipient.icon, { className: drawerRecipient.iconColor, size: 24 })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0F172A]">{drawerRecipient.title}</h2>
                    <p className="text-sm text-[#64748B] mt-0.5">{drawerRecipient.description}</p>
                  </div>
                </div>
                <button onClick={() => setDrawerRecipient(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4">Assigned Recipients</h3>
                  {drawerRecipient.recipientsList?.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      No recipients assigned to this form yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {drawerRecipient.recipientsList?.map((rec: any) => (
                        <div key={rec.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                              {rec.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F172A]">{rec.name}</p>
                              <p className="text-xs text-[#64748B]">{rec.email} • {rec.status}</p>
                            </div>
                          </div>
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => {
                                setEditingId(rec.id);
                                setFormData({
                                  name: rec.name, email: rec.email, department: rec.department, 
                                  phone: rec.phone || '', status: rec.status, categories: rec.categories
                                });
                                setIsAddModalOpen(true);
                              }}
                              className="text-gray-400 hover:text-[#2563EB] p-2 rounded-lg hover:bg-blue-50"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm(`Remove ${rec.email}?`)) deleteMutation.mutate(rec.id);
                              }}
                              className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={handleOpenAddModal} className="mt-4 w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Recipient
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
