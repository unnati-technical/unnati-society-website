import React from 'react';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';

const events = [
  { id: 1, month: 'MAY', day: '20', title: 'AI Basics Workshop', time: '10:00 AM - 12:00 PM', location: 'Kahalgaon High School', type: 'Workshop', color: 'blue' },
  { id: 2, month: 'MAY', day: '22', title: 'Career Guidance Session', time: '11:30 AM - 01:00 PM', location: 'Sultanganj Inter College', type: 'Session', color: 'emerald' },
  { id: 3, month: 'MAY', day: '25', title: 'Digital Literacy Program', time: '02:00 PM - 04:00 PM', location: 'Jagdishpur High School', type: 'Workshop', color: 'blue' },
  { id: 4, month: 'MAY', day: '28', title: 'Volunteer Orientation', time: '04:00 PM - 05:30 PM', location: 'Online (Google Meet)', type: 'Meeting', color: 'purple', isOnline: true },
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Upcoming Sessions & Events</h3>
        <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View All</span>
      </div>

      <div className="space-y-4 flex-1">
        {events.map((evt) => (
          <div key={evt.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer group">
            {/* Date Badge */}
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
              <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-widest">{evt.month}</span>
              <span className="text-lg font-extrabold text-[#0F172A] leading-none mt-0.5">{evt.day}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-extrabold text-[#0F172A] truncate">{evt.title}</h4>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  evt.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                  evt.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                  'bg-purple-50 text-purple-600'
                }`}>
                  {evt.type}
                </span>
              </div>
              
              <div className="flex flex-col gap-1 mt-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500">
                  <Clock size={10} className="text-gray-400"/> {evt.time}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 truncate">
                  {evt.isOnline ? <Video size={10} className="text-purple-400"/> : <MapPin size={10} className="text-gray-400"/>} 
                  {evt.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
