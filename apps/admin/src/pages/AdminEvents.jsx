import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import {
  Plus, Pencil, Trash2, Calendar, MapPin, Link2, Sparkles,
  CheckCircle, Clock, XCircle, ToggleLeft, ToggleRight, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

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
  const [form, setForm] = useState(initial || {
    title: '', description: '', date: '', location: '', link: '', color: 'bg-blue-400', eventType: 'AUTO', photos: []
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error('Title and Date are required');
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in fade-in slide-in-from-bottom-4">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-extrabold text-gray-900">{initial ? 'Edit Event' : 'New Event'}</h2>
          <p className="text-xs text-gray-500 mt-0.5">Fill in the details below</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Event Title *</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Unnati Prasasthi Samaroh"
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
          <div className="grid grid-cols-2 gap-4">
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
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Link (optional)</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. /media/PrashastiMedia"
              value={form.link}
              onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
            />
          </div>
          
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
                      className="absolute top-1 right-1 bg-white rounded-full text-red-500 hover:bg-red-50 p-0.5"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative">
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
                      const res = await fetch(`/api/events/${initial.id}/photos`, {
                        method: 'POST',
                        body: formData
                      });
                      if (!res.ok) throw new Error();
                      const updated = await res.json();
                      setForm(f => ({ ...f, photos: updated.photos }));
                      toast.success('Photos uploaded', { id: toastId });
                    } catch {
                      toast.error('Upload failed', { id: toastId });
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Card Color</label>
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
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : (initial ? 'Update Event' : 'Create Event')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true); // Auto mode = false (only upcoming)
  const [autoMode, setAutoMode] = useState(true);
  const [modal, setModal] = useState(null); // null | 'new' | event object (for edit)

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Add timestamp to prevent browser caching
      const [eventsRes, settingsRes] = await Promise.all([
        fetch(`/api/events?all=true&_t=${Date.now()}`),
        fetch(`/api/events/settings/auto-mode?_t=${Date.now()}`)
      ]);
      
      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (settingsRes.ok) {
        const { autoMode: serverAutoMode } = await settingsRes.json();
        setAutoMode(serverAutoMode);
      }
    } catch (err) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoMode = async () => {
    const newMode = !autoMode;
    setAutoMode(newMode); // Optimistic UI update
    try {
      const res = await fetch('/api/events/settings/auto-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoMode: newMode }),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success(`Auto Mode ${newMode ? 'enabled' : 'disabled'}`);
    } catch (err) {
      setAutoMode(!newMode); // Revert on failure
      toast.error('Failed to save auto mode setting');
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCreate = async (form) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }),
    });
    if (res.ok) { toast.success('Event created!'); fetchEvents(); }
    else toast.error('Failed to create event');
  };

  const handleUpdate = async (form) => {
    const res = await fetch(`/api/events/${modal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }),
    });
    if (res.ok) { toast.success('Event updated!'); fetchEvents(); }
    else toast.error('Failed to update event');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Event deleted'); fetchEvents(); }
    else toast.error('Failed to delete event');
  };

  // Auto mode: filter out expired events automatically (only for AUTO events)
  const displayedEvents = autoMode
    ? events.filter(e => e.eventType !== 'AUTO' || !isExpired(e.date))
    : events;

  const getEventDate = (dateStr) => {
    const d = new Date(dateStr);
    return { day: d.getDate(), month: MONTHS[d.getMonth()], full: d };
  };

  const getColor = (ev, idx) => ev.color || CARD_COLORS[idx % CARD_COLORS.length].value;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Events Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage the "Our Upcoming Events" section on the homepage</p>
          </div>
          <button
            onClick={() => setModal('new')}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus size={16} /> New Event
          </button>
        </div>

        {/* Auto Mode Toggle */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${autoMode ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Sparkles size={22} className={autoMode ? 'text-blue-600' : 'text-gray-400'} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Auto Calendar Mode</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {autoMode
                    ? 'Events past their date are automatically hidden from the public homepage.'
                    : 'Manual mode — all events show on the homepage regardless of date.'}
                </p>
              </div>
              <button
                onClick={toggleAutoMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${autoMode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {autoMode ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                {autoMode ? 'Auto' : 'Manual'}
              </button>
            </div>
            {autoMode && (
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50 rounded-lg px-3 py-2 w-fit">
                <CheckCircle size={12} /> Showing {displayedEvents.length} upcoming of {events.length} total events
              </div>
            )}
          </div>
        </div>

        {/* Events Grid - Preview of how they look on homepage */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-gray-900 text-sm">
              Homepage Preview — OUR UPCOMING EVENTS
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Live Preview</span>
          </div>
          {displayedEvents.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <Calendar size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium text-sm">No upcoming events</p>
              <p className="text-xs mt-1">Add a new event above</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {displayedEvents.map((ev, idx) => {
                const { day, month } = getEventDate(ev.date);
                const color = getColor(ev, idx);
                return (
                  <div key={ev.id} className={`min-w-[260px] rounded-2xl p-5 border-none flex justify-between items-center ${color} relative`}>
                    {ev.isHoliday && (
                      <div className="absolute top-2 right-2 bg-white/40 text-[10px] font-bold px-1.5 py-0.5 rounded text-gray-800">
                        Holiday
                      </div>
                    )}
                    <div>
                      <h1 className={`text-4xl font-black ${ev.isHoliday ? 'text-gray-800' : 'text-white'} leading-none`}>{day}</h1>
                      <p className={`${ev.isHoliday ? 'text-gray-600' : 'text-white/80'} text-sm font-bold mb-3`}>{month}</p>
                      <h2 className="font-extrabold text-white text-sm uppercase leading-tight max-w-[160px]">{ev.title}</h2>
                    </div>
                    <div className="bg-white/30 rounded-full p-2.5">
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Events Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 text-sm">All Events ({events.length})</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-gray-600 font-bold"><div className="w-2 h-2 rounded-full bg-slate-300"></div> System</span>
              <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle size={12} /> Upcoming</span>
              <span className="flex items-center gap-1 text-gray-400 font-bold"><Clock size={12} /> Expired</span>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">Loading events...</div>
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
