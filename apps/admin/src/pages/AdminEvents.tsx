import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon, MapPin, Calendar, Clock, Edit, Trash2, Eye, EyeOff, Save, ShieldAlert, ArrowRight, Activity, Zap, CheckCircle, ToggleRight, ToggleLeft, Sparkles, XCircle, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { eventsApi } from '../api/events.api';
import { useEvents } from '../queries/useEvents';
import { useCreateEvent, useUpdateEvent, useDeleteEvent } from '../mutations/useEventMutations';
import { Skeleton } from '../components/ui/SkeletonLoader';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKeys';

const CARD_COLORS = [
  { label: 'Blue', value: 'bg-blue-400', textColor: 'text-white' },
  { label: 'Yellow', value: 'bg-yellow-400', textColor: 'text-gray-900' },
  { label: 'Green', value: 'bg-emerald-500', textColor: 'text-white' },
  { label: 'Purple', value: 'bg-purple-500', textColor: 'text-white' },
  { label: 'Rose', value: 'bg-rose-500', textColor: 'text-white' },
  { label: 'Indigo', value: 'bg-indigo-500', textColor: 'text-white' },
];

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

const isExpired = (dateStr) => new Date(dateStr) < new Date();

const EmptyModal = ({ onClose, onSave, initial }) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initial || {
    title: '', description: '', date: '', location: '', link: '', color: 'bg-blue-400', eventType: 'AUTO', photos: []
  });
  const [saving, setSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error('Title and Date are required');
      return;
    }
    setSaving(true);
    try {
      const res = await onSave(form);
      if (!initial && selectedFiles.length > 0 && res?.id) {
        const formData = new FormData();
        selectedFiles.forEach(f => formData.append('photos', f));
        const toastId = toast.loading('Uploading event photos...');
        try {
          await eventsApi.uploadPhotos(res.id, formData);
          toast.success('Photos uploaded successfully!', { id: toastId });
          queryClient.invalidateQueries({ queryKey: queryKeys.events });
        } catch {
          toast.error('Event created, but photos failed to upload', { id: toastId });
        }
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 my-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">{initial ? 'Edit Event' : 'New Event'}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Event Title *</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Unnati Prashasti Samaroh"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Brief description of the event..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Event Type</label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.eventType || 'AUTO'}
                onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}
              >
                <option value="AUTO">Auto (Deletes when date passes)</option>
                <option value="MANUAL">Manual (Stays permanently)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Date *</label>
              <input
                type="datetime-local"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Location</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Bhagalpur"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">ImageKit Link (optional)</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. https://res.imagekit.com/drhkvdtw2/image/upload/..."
              value={form.link}
              onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
            />
          </div>

          {!initial && (
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Event Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setSelectedFiles(files);
                }}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
              />
              {selectedFiles.length > 0 && (
                <p className="text-xs text-gray-500 mt-1.5 font-medium">
                  {selectedFiles.length} file(s) selected
                </p>
              )}
            </div>
          )}
          
          {initial && (
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Event Photos</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.photos?.map((photo, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, photos: f.photos.filter((_, index) => index !== i) }))}
                      className="absolute top-1 right-1 bg-white rounded-full text-red-500 hover:bg-red-50 p-0.5 shadow-sm"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files);
                    if (!files.length) return;
                    const formData = new FormData();
                    files.forEach(f => formData.append('photos', f));
                    const toastId = toast.loading('Uploading photos...');
                    try {
                      const res = await eventsApi.uploadPhotos(initial.id, formData);
                      setForm(f => ({ ...f, photos: res?.photos || [] }));
                      toast.success('Photos uploaded', { id: toastId });
                      queryClient.invalidateQueries({ queryKey: queryKeys.events });
                    } catch {
                      toast.error('Upload failed', { id: toastId });
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5 mt-2">Card Color</label>
            <div className="flex gap-2 flex-wrap">
              {CARD_COLORS.map(c => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setForm(f => ({ ...f, color: c.value }))}
                  className={`w-8 h-8 rounded-full border-4 transition-all ${c.value} ${form.color === c.value ? 'border-gray-700 scale-125' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-lg shadow-blue-200">
              {saving ? 'Saving...' : (initial ? 'Update Event' : 'Create Event')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminEvents = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { data: events = [], isLoading: isLoadingEvents } = useEvents();

  const loading = isLoadingEvents;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 320 : scrollLeft + 320;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const [modal, setModal] = useState(null);

  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCreate = async (form: any) => {
    return createEventMutation.mutateAsync(form);
  };
  
  const handleUpdate = async (form: any) => {
    return updateEventMutation.mutateAsync({ id: modal.id, form });
  };
  
  const handleDelete = (id: string) => {
    if (!confirm('Delete this event?')) return;
    deleteEventMutation.mutate(id);
  };

  const displayedEvents = events
    .filter(ev => !isExpired(ev.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getEventDate = (dateStr) => {
    const d = new Date(dateStr);
    return { day: d.getDate(), month: MONTHS[d.getMonth()], full: d };
  };

  const getColor = (ev, idx) => ev.color || CARD_COLORS[idx % CARD_COLORS.length].value;

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Events Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage the "Our Upcoming Events" section on the homepage</p>
          </div>
          <button
            onClick={() => setModal('new')}
            className="flex items-center justify-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus size={16} /> New Event
          </button>
        </div>

        {/* Events Grid - Preview of how they look on homepage */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-gray-900 text-sm">
              Homepage Preview — OUR UPCOMING EVENTS
            </h3>
            <div className="flex items-center gap-3">
              {displayedEvents.length > 3 && (
                <div className="flex gap-1.5 mr-2">
                  <button
                    onClick={() => scroll('left')}
                    className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-full transition cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-full transition cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
              <span className="hidden sm:inline-block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Live Preview</span>
            </div>
          </div>
          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="min-w-[260px] h-32 rounded-2xl" />
              ))}
            </div>
          ) : displayedEvents.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <Calendar size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium text-sm">No upcoming events</p>
              <p className="text-xs mt-1">Add a new event above</p>
            </div>
          ) : (
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {displayedEvents.map((ev, idx) => {
                const { day, month } = getEventDate(ev.date);
                const year = new Date(ev.date).getFullYear();
                const photo = ev.photos && ev.photos.length > 0 ? ev.photos[0] : null;
                return (
                  <div
                    key={ev.id || idx}
                    className="min-w-[300px] w-[300px] flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm h-[370px] shrink-0 relative"
                  >
                    {/* Event Image */}
                    <div className="relative h-40 w-full bg-slate-100 overflow-hidden shrink-0">
                      {photo ? (
                        <img
                          src={photo}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-blue-400" />
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden">
                      <div className="space-y-1.5">
                        <span className="text-[#3B82F6] text-[10px] font-black tracking-widest uppercase block">
                          Tentative: {day} {month} {year}
                        </span>
                        <h3 className="font-extrabold text-sm text-gray-900 leading-snug line-clamp-2 uppercase">
                          {ev.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                          {ev.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-bold pt-3 border-t border-gray-50 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{ev.location || "TBA"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Events Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-extrabold text-gray-900 text-sm">All Events ({events.length})</h3>
            <div className="flex items-center gap-3 md:gap-4 text-xs">
              <span className="flex items-center gap-1 text-gray-600 font-bold"><div className="w-2 h-2 rounded-full bg-slate-300"></div> System</span>
              <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle size={12} /> Upcoming</span>
              <span className="flex items-center gap-1 text-gray-400 font-bold"><Clock size={12} /> Expired</span>
            </div>
          </div>

          {loading ? (
            <div className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex items-center gap-4 px-6 py-4">
                  <Skeleton className="w-12 h-14 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="w-8 h-8 rounded-xl" />
                    <Skeleton className="w-8 h-8 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">No events yet. Create your first event!</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {events.map((ev, idx) => {
                const { day, month, full } = getEventDate(ev.date);
                const expired = isExpired(ev.date);
                return (
                  <div key={ev.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors ${expired ? 'opacity-60' : ''}`}>
                    {/* Date badge */}
                    <div className={`w-12 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 ${getColor(ev, idx)}`}>
                      <span className={`font-black text-lg leading-none ${ev.isHoliday ? 'text-gray-800' : 'text-white'}`}>{day}</span>
                      <span className={`text-[10px] font-bold ${ev.isHoliday ? 'text-gray-600' : 'text-white/80'}`}>{month}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-gray-900 text-sm truncate">{ev.title}</p>
                        {ev.isHoliday && (
                          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 border border-gray-200">System Holiday</span>
                        )}
                        {expired ? (
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">Expired</span>
                        ) : (
                          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0">Upcoming</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                          <Calendar size={11} /> {full.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                        </span>
                        {ev.location && (
                          <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                            <MapPin size={11} /> {ev.location}
                          </span>
                        )}
                      </div>
                      {ev.description && <p className="text-[11px] text-gray-400 mt-0.5 truncate">{ev.description}</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!ev.isHoliday && (
                        <>
                          <button
                            onClick={() => {
                              const tzOffset = new Date().getTimezoneOffset() * 60000;
                              const localDate = new Date(new Date(ev.date).getTime() - tzOffset).toISOString().slice(0,16);
                              setModal({
                                ...ev,
                                date: localDate,
                                link: ev.link || '',
                                color: ev.color || 'bg-blue-400'
                              });
                            }}
                            className="p-2 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(ev.id)}
                            className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {modal === 'new' && (
        <EmptyModal onClose={() => setModal(null)} onSave={handleCreate} />
      )}

      {/* Edit Modal */}
      {modal && modal !== 'new' && (
        <EmptyModal onClose={() => setModal(null)} onSave={handleUpdate} initial={modal} />
      )}
    </AdminLayout>
  );
};

export default AdminEvents;
