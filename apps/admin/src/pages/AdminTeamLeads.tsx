import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Users,
  UserPlus,
  MoreVertical,
  GripVertical,
  Layers,
  Calendar,
  Globe,
  Plus,
  Mail,
  Edit,
  Trash2,
  X,
  ChevronDown,
  Link,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { auth } from '../lib/firebase';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadershipApi } from '../api/leadership.api';
import { queryKeys } from '../constants/queryKeys';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3005';

const BADGE_COLORS = [
  { label: 'Blue', value: 'blue', bg: 'bg-blue-100', text: 'text-blue-800' },
  { label: 'Yellow', value: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  { label: 'Green', value: 'green', bg: 'bg-green-100', text: 'text-green-800' },
  { label: 'Purple', value: 'purple', bg: 'bg-purple-100', text: 'text-purple-800' },
  { label: 'Red', value: 'red', bg: 'bg-red-100', text: 'text-red-800' },
];

const getBadgeClass = (color: string) => {
  const found = BADGE_COLORS.find(c => c.value === color);
  return found ? `${found.bg} ${found.text}` : 'bg-blue-100 text-blue-800';
};



// --- EMPTY STATES ---
const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
      <Users size={28} className="text-gray-400" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 mb-1">No members yet</h3>
    <p className="text-sm text-gray-400 mb-4">Add your first member to this section</p>
    <button onClick={onAdd} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
      <Plus size={16} /> Add Member
    </button>
  </div>
);

// --- SORTABLE WRAPPERS ---
const SortableSectionItem = ({ id, index, section }: { id: string, index: number, section: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{index + 1}</span>
      <span className="text-sm font-medium text-gray-700 truncate">{section.name}</span>
      <div {...attributes} {...listeners} className="ml-auto cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 focus:outline-none">
        <GripVertical size={15} className="flex-shrink-0" />
      </div>
    </div>
  );
};

const SortableMemberCard = ({ id, member, openMenu, setOpenMenu, openEditMember, setDeleteConfirm }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: transform ? 999 : 'auto' };

  return (
    <div
      ref={setNodeRef} style={style}
      className="group relative bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div {...attributes} {...listeners} className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 focus:outline-none">
        <GripVertical size={16} />
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setOpenMenu(openMenu === member.id ? null : member.id)}
          className="p-1.5 bg-white shadow-sm border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700"
        >
          <MoreVertical size={14} />
        </button>
        {openMenu === member.id && (
          <div className="absolute right-0 top-8 z-30 bg-white rounded-xl shadow-xl border border-gray-200 w-40 py-1">
            <button
              onClick={() => { openEditMember(member, member.sectionId || ''); setOpenMenu(null); }}
              className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit size={12} /> Edit Member
            </button>
            <button
              onClick={() => { setDeleteConfirm({ open: true, type: 'member', id: member.id, name: member.fullName }); setOpenMenu(null); }}
              className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="w-[90px] h-[90px] rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-sm flex-shrink-0">
        <img
          src={member.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.fullName)}&background=e0e7ff&color=4f46e5&size=200&font-size=0.4&bold=true`}
          alt={member.fullName}
          className="w-full h-full object-cover pointer-events-none"
          onError={e => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.fullName)}&background=e0e7ff&color=4f46e5&size=200`; }}
        />
      </div>

      <h3 className="text-sm font-bold text-gray-900 text-center leading-tight">{member.fullName}</h3>
      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest text-center mt-1.5 min-h-[28px] line-clamp-2">{member.designation}</p>

      <div className="flex gap-2 mt-3">
        <a href={member.email ? `mailto:${member.email}` : '#'} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors pointer-events-auto">
          <Mail size={13} />
        </a>
        <a href={member.linkedin || '#'} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors pointer-events-auto">
          <Link size={13} />
        </a>
      </div>
    </div>
  );
};


import { useAuth } from '../contexts/AuthContext';

const AdminTeamLeads = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const [selectedYearId, setSelectedYearId] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sections, setSections] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All Sections');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSectionMenu, setOpenSectionMenu] = useState<string | null>(null);

  // Modals
  const [memberModal, setMemberModal] = useState<{ open: boolean; sectionId: string; member: any | null }>({ open: false, sectionId: '', member: null });
  const [sectionModal, setSectionModal] = useState<{ open: boolean; section: any | null }>({ open: false, section: null });
  const [yearModal, setYearModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; type: 'member' | 'section'; id: string; name: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageFileRef = useRef<HTMLInputElement>(null);

  // Forms
  const emptyMemberForm = { fullName: '', designation: '', department: '', email: '', linkedin: '', instagram: '', profileImage: '', bio: '', isPublished: true };
  const [memberForm, setMemberForm] = useState(emptyMemberForm);
  const [sectionForm, setSectionForm] = useState({ name: '', slug: '', badgeColor: 'blue', isVisible: true });
  const [yearForm, setYearForm] = useState({ year: '' });

  const { data: allData = [], isLoading } = useQuery({
    queryKey: queryKeys.leadership,
    queryFn: leadershipApi.getLeadershipData,
  });

  const years = allData;

  // --- OPTIMISTIC MUTATION HELPERS ---
  // Surgically update a member in the nested leadership cache without a full refetch
  const updateMemberInCache = (memberId: string, updater: (m: any) => any) => {
    queryClient.setQueryData(queryKeys.leadership, (old: any[]) => {
      if (!old) return old;
      return old.map(year => ({
        ...year,
        sections: year.sections.map((section: any) => ({
          ...section,
          members: section.members.map((m: any) =>
            m.id === memberId ? updater(m) : m
          ),
        })),
      }));
    });
  };

  const removeMemberFromCache = (memberId: string) => {
    queryClient.setQueryData(queryKeys.leadership, (old: any[]) => {
      if (!old) return old;
      return old.map(year => ({
        ...year,
        sections: year.sections.map((section: any) => ({
          ...section,
          members: section.members.filter((m: any) => m.id !== memberId),
        })),
      }));
    });
  };

  const addMemberToSectionInCache = (sectionId: string, member: any) => {
    queryClient.setQueryData(queryKeys.leadership, (old: any[]) => {
      if (!old) return old;
      return old.map(year => ({
        ...year,
        sections: year.sections.map((section: any) =>
          section.id === sectionId
            ? { ...section, members: [...(section.members || []), member] }
            : section
        ),
      }));
    });
  };

  // --- MUTATIONS ---

  const updateMemberMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      leadershipApi.updateMember(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any in-flight refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.leadership });
      // Snapshot the current cache
      const previous = queryClient.getQueryData(queryKeys.leadership);
      // Optimistically update the member in the cache instantly
      updateMemberInCache(id, (m) => ({ ...m, ...data }));
      return { previous };
    },
    onError: (err: any, variables, context) => {
      toast.error(err?.message || 'Failed to update member');
      // Rollback to previous cache state
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.leadership, context.previous);
      }
    },
    onSuccess: () => {
      toast.success('Member updated!');
    },
    onSettled: () => {
      // Sync with server in background — does NOT block the UI
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const createMemberMutation = useMutation({
    mutationFn: (data: any) => leadershipApi.createMember(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.leadership });
      const previous = queryClient.getQueryData(queryKeys.leadership);
      // Optimistically add a placeholder member
      const tempMember = { id: `temp-${Date.now()}`, ...data, displayOrder: 9999 };
      addMemberToSectionInCache(data.sectionId, tempMember);
      return { previous };
    },
    onError: (err: any, variables, context) => {
      toast.error(err?.message || 'Failed to add member');
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.leadership, context.previous);
      }
    },
    onSuccess: () => {
      toast.success('Member added!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (id: string) => leadershipApi.deleteMember(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.leadership });
      const previous = queryClient.getQueryData(queryKeys.leadership);
      removeMemberFromCache(id);
      return { previous };
    },
    onError: (err: any, variables, context) => {
      toast.error(err?.message || 'Failed to delete member');
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.leadership, context.previous);
      }
    },
    onSuccess: () => {
      toast.success('Member deleted');
      setDeleteConfirm(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      leadershipApi.updateSection(id, data),
    onError: (err: any) => toast.error(err?.message || 'Failed to update section'),
    onSuccess: () => {
      toast.success('Section updated!');
      setSectionModal({ open: false, section: null });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const createSectionMutation = useMutation({
    mutationFn: (data: any) => leadershipApi.createSection(data),
    onError: (err: any) => toast.error(err?.message || 'Failed to create section'),
    onSuccess: () => {
      toast.success('Section created!');
      setSectionModal({ open: false, section: null });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (id: string) => leadershipApi.deleteSection(id),
    onError: (err: any) => toast.error(err?.message || 'Failed to delete section'),
    onSuccess: () => {
      toast.success('Section deleted');
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const createYearMutation = useMutation({
    mutationFn: (year: string) => leadershipApi.createYear({ year }),
    onError: (err: any) => toast.error(err?.message || 'Failed to create year'),
    onSuccess: (_, year) => {
      toast.success(`Year ${year} created!`);
      setYearModal(false);
      setYearForm({ year: '' });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
    },
  });

  const activateYearMutation = useMutation({
    mutationFn: (id: string) => leadershipApi.setYearActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
      toast.success('Year is now active on the public website!');
    },
    onError: (err: any) => toast.error(err?.message || 'Failed to set active year'),
  });

  // Derived saving state from any active mutation
  const saving = updateMemberMutation.isPending || createMemberMutation.isPending ||
    deleteMemberMutation.isPending || updateSectionMutation.isPending ||
    createSectionMutation.isPending || deleteSectionMutation.isPending ||
    createYearMutation.isPending || activateYearMutation.isPending;

  useEffect(() => {
    if (allData.length > 0 && !selectedYearId) {
      const savedYearId = localStorage.getItem('admin_team_leads_selected_year');
      const found = allData.find(y => y.id === savedYearId);
      const active = found || allData[0];
      setSelectedYearId(active.id);
      setSelectedYear(active.year);
    }
    
    if (selectedYearId) {
      const found = allData.find(y => y.id === selectedYearId);
      if (found) setSections(found.sections || []);
    }
  }, [allData, selectedYearId]);


  const switchYear = (yearId: string) => {
    const found = allData.find(y => y.id === yearId);
    if (found) {
      setSelectedYearId(yearId);
      setSelectedYear(found.year);
      setSections(found.sections || []);
      setActiveTab('All Sections');
      localStorage.setItem('admin_team_leads_selected_year', yearId);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleSectionDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      
      setSections(newSections);
      
      try {
        const payload = newSections.map((s, index) => ({ id: s.id, displayOrder: index }));
        await leadershipApi.reorderSections(payload);
        toast.success('Section order updated');
        queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
      } catch {
        toast.error('Failed to save section order');
        queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
      }
    }
  };

  const handleMemberDragEnd = async (event: DragEndEvent, sectionId: string) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const sectionIndex = sections.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return;
      
      const newSections = [...sections];
      const members = newSections[sectionIndex].members || [];
      const oldIndex = members.findIndex((m: any) => m.id === active.id);
      const newIndex = members.findIndex((m: any) => m.id === over.id);
      
      const newMembers = arrayMove(members, oldIndex, newIndex);
      newSections[sectionIndex].members = newMembers;
      
      setSections(newSections);
      
      try {
        const payload = newMembers.map((m: any, index: number) => ({ id: m.id, sectionId, displayOrder: index }));
        await leadershipApi.reorderMembers(payload);
        toast.success('Member order updated');
        queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
      } catch {
        toast.error('Failed to save member order');
        queryClient.invalidateQueries({ queryKey: queryKeys.leadership });
      }
    }
  };

  // --- YEAR CRUD ---
  const createYear = () => {
    if (!yearForm.year.trim()) return;
    createYearMutation.mutate(yearForm.year.trim());
  };

  // --- SECTION CRUD ---
  const saveSection = () => {
    if (!sectionForm.name.trim()) return;
    const slug = sectionForm.name.toLowerCase().replace(/\s+/g, '-');
    if (sectionModal.section) {
      updateSectionMutation.mutate({ id: sectionModal.section.id, data: { ...sectionForm, slug } });
    } else {
      createSectionMutation.mutate({ ...sectionForm, slug, yearId: selectedYearId });
    }
    setSectionForm({ name: '', slug: '', badgeColor: 'blue', isVisible: true });
  };

  const deleteSection = (id: string) => {
    deleteSectionMutation.mutate(id);
  };

  // --- MEMBER CRUD ---
  const openAddMember = (sectionId: string) => {
    setMemberForm(emptyMemberForm);
    setMemberModal({ open: true, sectionId, member: null });
  };

  const openEditMember = (member: any, sectionId: string) => {
    setMemberForm({
      fullName: member.fullName || '',
      designation: member.designation || '',
      department: member.department || '',
      email: member.email || '',
      linkedin: member.linkedin || '',
      instagram: member.instagram || '',
      profileImage: member.profileImage || '',
      bio: member.bio || '',
      isPublished: member.isPublished ?? true,
    });
    setMemberModal({ open: true, sectionId, member });
  };

  const saveMember = () => {
    if (!memberForm.fullName.trim() || !memberForm.designation.trim()) {
      toast.error('Full Name and Designation are required');
      return;
    }
    const { member, sectionId } = memberModal;
    // Close the modal IMMEDIATELY for instant UX — optimistic update handles UI
    setMemberModal({ open: false, sectionId: '', member: null });
    if (member) {
      updateMemberMutation.mutate({ id: member.id, data: memberForm });
    } else {
      createMemberMutation.mutate({ ...memberForm, sectionId, displayOrder: 0 });
    }
  };

  // --- IMAGE UPLOAD ---
  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await leadershipApi.uploadImage(formData);
      const { url } = res;
      setMemberForm(f => ({ ...f, profileImage: url }));
      toast.success('Photo uploaded!');
    } catch (e: any) {
      toast.error(e?.message || 'Image upload failed');
    } finally { setUploadingImage(false); }
  };

  const deleteMember = (id: string) => {
    deleteMemberMutation.mutate(id);
  };

  const filteredSections = activeTab === 'All Sections' ? sections : sections.filter(s => s.name === activeTab);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading leadership data…</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F8FAFC]" onClick={() => { setOpenMenu(null); setOpenSectionMenu(null); }}>

        {/* PAGE HEADER */}
        <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Executive / Team Leads Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage executive members and team leads for different categories and years.</p>
          </div>
          <div className="flex gap-3 items-center">
            {/* YEAR DROPDOWN */}
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={selectedYearId}
                  onChange={e => switchYear(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer h-full"
                >
                  {years.map(y => <option key={y.id} value={y.id}>{y.year}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              
              {/* SET AS LIVE BUTTON */}
              {(() => {
                const isYearActive = years.find(y => y.id === selectedYearId)?.isActive;
                return (
                  <button
                    onClick={(e) => { e.stopPropagation(); activateYearMutation.mutate(selectedYearId); }}
                    disabled={isYearActive || activateYearMutation.isPending}
                    className={`text-sm px-3 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-sm ${
                      isYearActive 
                        ? 'bg-green-100 text-green-700 border border-green-200 cursor-default' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Globe size={15} /> {isYearActive ? 'Live on Website' : 'Set as Live'}
                  </button>
                );
              })()}
            </div>
            {/* CREATE NEW YEAR */}
            <button
              onClick={e => { e.stopPropagation(); setYearModal(true); }}
              className="text-sm bg-white border border-gray-300 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-1.5"
            >
              <Calendar size={15} /> New Year
            </button>
            {/* ADD SECTION */}
            <button
              onClick={e => { e.stopPropagation(); setSectionForm({ name: '', slug: '', badgeColor: 'blue', isVisible: true }); setSectionModal({ open: true, section: null }); }}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-sm"
            >
              <Plus size={16} /> Add Section
            </button>
          </div>
        </div>

        <div className="px-8 max-w-[1400px] mx-auto pb-20">

          {/* TABS */}
          <div className="flex gap-1 border-b border-gray-200 mt-6 mb-8 overflow-x-auto">
            {['All Sections', ...sections.map(s => s.name)].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>


          {/* NO YEARS STATE */}
          {years.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center text-center">
              <Calendar size={40} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No years added yet</h3>
              <p className="text-sm text-gray-400 mb-5">Create your first year to start adding sections and members.</p>
              <button onClick={() => setYearModal(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Create First Year
              </button>
            </div>
          )}

          {/* SECTIONS */}
          {filteredSections.map(section => (
            <div key={section.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
              {/* SECTION HEADER */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">{section.name} {selectedYear}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getBadgeClass(section.badgeColor)}`}>
                    {section.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-medium">{section.members?.length || 0} Members</span>
                  <button
                    onClick={e => { e.stopPropagation(); openAddMember(section.id); }}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={15} /> Add Member
                  </button>
                  {/* SECTION 3-DOT MENU */}
                  <div className="relative" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenSectionMenu(openSectionMenu === section.id ? null : section.id)}
                      className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openSectionMenu === section.id && (
                      <div className="absolute right-0 top-9 z-30 bg-white rounded-xl shadow-lg border border-gray-200 w-44 py-1">
                        <button
                          onClick={() => { setSectionForm({ name: section.name, slug: section.slug, badgeColor: section.badgeColor, isVisible: section.isVisible }); setSectionModal({ open: true, section }); setOpenSectionMenu(null); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Edit size={14} /> Edit Section
                        </button>
                        <button
                          onClick={() => { setDeleteConfirm({ open: true, type: 'section', id: section.id, name: section.name }); setOpenSectionMenu(null); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 size={14} /> Delete Section
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* MEMBER CARDS */}
              {!section.members || section.members.length === 0 ? (
                <EmptyState onAdd={() => openAddMember(section.id)} />
              ) : (
                <DndContext id={`dnd-section-members-${section.id}`} sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleMemberDragEnd(e, section.id)}>
                  <SortableContext items={section.members.map((m: any) => m.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                      {section.members.map((member: any) => (
                        <SortableMemberCard
                          key={member.id}
                          id={member.id}
                          member={{...member, sectionId: section.id}}
                          openMenu={openMenu}
                          setOpenMenu={setOpenMenu}
                          openEditMember={openEditMember}
                          setDeleteConfirm={setDeleteConfirm}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}

              {/* DRAG HANDLE HINT */}
              {section.members && section.members.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-xs">
                  <GripVertical size={14} />
                  <span>Drag & drop to reorder members</span>
                </div>
              )}
            </div>
          ))}

          {/* NO SECTIONS STATE (year exists but no sections) */}
          {years.length > 0 && sections.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center text-center mt-4">
              <Layers size={40} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No sections yet for {selectedYear}</h3>
              <p className="text-sm text-gray-400 mb-5">Add sections like "Executive Body", "Team Leads", etc.</p>
              <button onClick={() => { setSectionForm({ name: '', slug: '', badgeColor: 'blue', isVisible: true }); setSectionModal({ open: true, section: null }); }} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Add First Section
              </button>
            </div>
          )}

          {/* SECTION DISPLAY ORDER */}
          {sections.length > 1 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Section Display Order</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Manage the order in which sections appear on the public website.</p>
                </div>
              </div>
              <DndContext id="dnd-sections" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSectionDragEnd}>
                <SortableContext items={sections.map(s => s.id)} strategy={horizontalListSortingStrategy}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {sections.map((sec, idx) => (
                      <SortableSectionItem key={sec.id} id={sec.id} index={idx} section={sec} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <p className="text-xs text-gray-400 mt-4">✓ Changes are saved automatically.</p>
            </div>
          )}
        </div>

        {/* ======== MODALS ======== */}

        {/* ADD / EDIT MEMBER MODAL */}
        {memberModal.open && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setMemberModal({ open: false, sectionId: '', member: null })}>
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
                <h3 className="text-lg font-bold text-gray-900">{memberModal.member ? 'Edit Member' : 'Add New Member'}</h3>
                <button onClick={() => setMemberModal({ open: false, sectionId: '', member: null })} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {/* AVATAR PREVIEW + UPLOAD */}
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
                  <div
                    className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex-shrink-0 cursor-pointer relative group"
                    onClick={() => imageFileRef.current?.click()}
                  >
                    {memberForm.profileImage ? (
                      <img src={memberForm.profileImage} className="w-full h-full object-cover" alt="Preview" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400"><Users size={28} /></div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      {uploadingImage ? <Loader2 size={20} className="text-white animate-spin" /> : <UserPlus size={20} className="text-white" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile Photo</label>
                    <input
                      ref={imageFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f); }}
                    />
                    <button
                      type="button"
                      onClick={() => imageFileRef.current?.click()}
                      disabled={uploadingImage}
                      className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50"
                    >
                      {uploadingImage ? <><Loader2 size={15} className="animate-spin" /> Uploading…</> : <><UserPlus size={15} /> Click to upload photo</>}
                    </button>
                    <p className="text-xs text-gray-400 mt-1.5">Or paste URL below</p>
                    <input
                      type="text"
                      value={memberForm.profileImage}
                      onChange={e => setMemberForm(f => ({ ...f, profileImage: e.target.value }))}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-xs mt-1.5 text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={memberForm.fullName} onChange={e => setMemberForm(f => ({ ...f, fullName: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="e.g. Dheeraj Yadav" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Designation <span className="text-red-500">*</span></label>
                    <input type="text" value={memberForm.designation} onChange={e => setMemberForm(f => ({ ...f, designation: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="e.g. PRESIDENT" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                    <input type="text" value={memberForm.department} onChange={e => setMemberForm(f => ({ ...f, department: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="e.g. Programs, Technical" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" value={memberForm.email} onChange={e => setMemberForm(f => ({ ...f, email: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="member@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL</label>
                    <input type="url" value={memberForm.linkedin} onChange={e => setMemberForm(f => ({ ...f, linkedin: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram URL</label>
                    <input type="url" value={memberForm.instagram} onChange={e => setMemberForm(f => ({ ...f, instagram: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="https://instagram.com/..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                    <textarea rows={3} value={memberForm.bio} onChange={e => setMemberForm(f => ({ ...f, bio: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none" placeholder="Short bio about the member..." />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <div
                        onClick={() => setMemberForm(f => ({ ...f, isPublished: !f.isPublished }))}
                        className={`w-11 h-6 rounded-full transition-colors ${memberForm.isPublished ? 'bg-blue-600' : 'bg-gray-300'} relative flex-shrink-0`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${memberForm.isPublished ? 'translate-x-5' : ''}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Published (visible on website)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={() => setMemberModal({ open: false, sectionId: '', member: null })} className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium text-sm transition-colors">
                  Cancel
                </button>
                <button onClick={saveMember} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors disabled:opacity-60 flex items-center gap-2">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  {memberModal.member ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD / EDIT SECTION MODAL */}
        {sectionModal.open && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSectionModal({ open: false, section: null })}>
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">{sectionModal.section ? 'Edit Section' : 'Add New Section'}</h3>
                <button onClick={() => setSectionModal({ open: false, section: null })} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Section Name <span className="text-red-500">*</span></label>
                  <input type="text" value={sectionForm.name} onChange={e => setSectionForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="e.g. Executive Body, Team Leads" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Badge Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {BADGE_COLORS.map(c => (
                      <button
                        key={c.value}
                        onClick={() => setSectionForm(f => ({ ...f, badgeColor: c.value }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${c.bg} ${c.text} ${sectionForm.badgeColor === c.value ? 'border-blue-600 scale-105' : 'border-transparent'}`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      onClick={() => setSectionForm(f => ({ ...f, isVisible: !f.isVisible }))}
                      className={`w-11 h-6 rounded-full transition-colors ${sectionForm.isVisible ? 'bg-blue-600' : 'bg-gray-300'} relative flex-shrink-0`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${sectionForm.isVisible ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Visible on public website</span>
                  </label>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={() => setSectionModal({ open: false, section: null })} className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium text-sm">Cancel</button>
                <button onClick={saveSection} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm flex items-center gap-2 disabled:opacity-60">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  {sectionModal.section ? 'Save Changes' : 'Create Section'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CREATE YEAR MODAL */}
        {yearModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setYearModal(false)}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Create New Year</h3>
                <button onClick={() => setYearModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Academic Year <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={yearForm.year}
                  onChange={e => setYearForm({ year: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="e.g. 2025-26"
                  onKeyDown={e => e.key === 'Enter' && createYear()}
                />
                <p className="text-xs text-gray-400 mt-1.5">Use format: 2025-26</p>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={() => setYearModal(false)} className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium text-sm">Cancel</button>
                <button onClick={createYear} disabled={saving || !yearForm.year.trim()} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm flex items-center gap-2 disabled:opacity-60">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Calendar size={15} />}
                  Create Year
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM */}
        {deleteConfirm?.open && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Delete {deleteConfirm.type === 'member' ? 'Member' : 'Section'}?</h3>
                  <p className="text-sm text-gray-500">"{deleteConfirm.name}" will be permanently removed.</p>
                </div>
              </div>
              {deleteConfirm.type === 'section' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                  <p className="text-xs text-red-600 font-medium">⚠ This will also delete all members in this section.</p>
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button
                  onClick={() => deleteConfirm.type === 'member' ? deleteMember(deleteConfirm.id) : deleteSection(deleteConfirm.id)}
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminTeamLeads;
