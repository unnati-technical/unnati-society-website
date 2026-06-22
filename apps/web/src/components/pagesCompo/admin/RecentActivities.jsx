import React, { useState, useEffect } from 'react';
import { UserPlus, School, BookOpen, CheckCircle, FileText, ArrowRight, Handshake, Calendar } from 'lucide-react';

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes || 1}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch('/api/analytics/recent-activities');
        if (res.ok) {
          const data = await res.json();
          let items = [];

          if (data.events) {
            items = items.concat(data.events.map(e => ({
              id: `evt-${e.id}`,
              title: 'New Event Created',
              desc: e.title,
              time: formatTime(e.createdAt),
              createdAt: e.createdAt,
              icon: Calendar,
              color: 'text-indigo-500',
              bg: 'bg-indigo-50'
            })));
          }

          if (data.outreach) {
            items = items.concat(data.outreach.map(o => ({
              id: `out-${o.id}`,
              title: 'New Outreach Request',
              desc: o.institution,
              time: formatTime(o.createdAt),
              createdAt: o.createdAt,
              icon: Handshake,
              color: 'text-emerald-500',
              bg: 'bg-emerald-50'
            })));
          }

          // Sort by newest first
          items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setActivities(items.slice(0, 6)); // Top 6
        }
      } catch (err) {
        console.error('Failed to fetch recent activities', err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Recent Activities</h3>
        <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View All</span>
      </div>

      <div className="relative flex-1">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gray-100 z-0"></div>
        
        <div className="space-y-6 relative z-10">
          {activities.length === 0 ? (
            <div className="text-center text-gray-400 text-xs mt-10">No recent activities</div>
          ) : (
            activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="flex gap-4 group cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white ${act.bg} ${act.color} shadow-sm transition-transform group-hover:scale-110`}>
                    {act.avatar ? (
                      <img src={act.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Icon size={16} strokeWidth={2.5} />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold text-[#0F172A]">{act.title}</p>
                      <span className="text-[10px] font-bold text-gray-400">{act.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-gray-500 mt-0.5">{act.desc}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
