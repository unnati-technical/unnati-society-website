import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const sessionsData = [
  {
    date: 'MAY 13',
    title: 'AI Basics Workshop',
    time: '10:00 AM – 12:00 PM',
    location: 'Kahalgaon High School',
    type: 'Workshop',
    typeColor: 'bg-blue-50 text-blue-600'
  },
  {
    date: 'MAY 14',
    title: 'Career Guidance Session',
    time: '11:00 AM – 01:30 PM',
    location: 'Sultanganj Inter College',
    type: 'Session',
    typeColor: 'bg-green-50 text-green-600'
  },
  {
    date: 'MAY 15',
    title: 'Digital Literacy Program',
    time: '02:00 PM – 04:00 PM',
    location: 'Jagdishpur High School',
    type: 'Workshop',
    typeColor: 'bg-blue-50 text-blue-600'
  },
  {
    date: 'MAY 16',
    title: 'Volunteer Orientation',
    time: '04:00 PM – 05:30 PM',
    location: 'Online (Google Meet)',
    type: 'Meeting',
    typeColor: 'bg-purple-50 text-purple-600'
  }
];

const UpcomingSessions = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-[#0F172A]">Upcoming Sessions & Events</h2>
        <a href="#" className="text-xs font-bold text-[#2563EB] hover:underline">View All</a>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {sessionsData.map((session, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer group">
            {/* Date Box */}
            <div className="w-14 h-14 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{session.date.split(' ')[0]}</span>
              <span className="text-lg font-extrabold text-[#0F172A] leading-none mt-0.5">{session.date.split(' ')[1]}</span>
            </div>
            
            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-bold text-[#0F172A] text-sm truncate group-hover:text-[#2563EB] transition-colors">{session.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${session.typeColor}`}>
                  {session.type}
                </span>
              </div>
              
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <Clock size={12} className="text-gray-400" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 truncate">
                  <MapPin size={12} className="text-gray-400 shrink-0" />
                  <span className="truncate">{session.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;
