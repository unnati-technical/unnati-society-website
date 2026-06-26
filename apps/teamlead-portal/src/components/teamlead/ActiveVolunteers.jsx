import React from 'react';
import { ArrowUp } from 'lucide-react';

const volunteersData = [
  {
    name: 'Sneha Kumari',
    hours: '24 hrs contributed',
    impact: '20%',
    image: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Rohit Anand',
    hours: '20 hrs contributed',
    impact: '15%',
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Anjali Singh',
    hours: '18 hrs contributed',
    impact: '10%',
    image: 'https://i.pravatar.cc/150?img=9'
  },
  {
    name: 'Vikram Raj',
    hours: '16 hrs contributed',
    impact: '8%',
    image: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Priya Sharma',
    hours: '15 hrs contributed',
    impact: '5%',
    image: 'https://i.pravatar.cc/150?img=20'
  }
];

const ActiveVolunteers = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-[#0F172A]">Top Active Volunteers</h2>
        <a href="#" className="text-xs font-bold text-brand-primary hover:underline">View All</a>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {volunteersData.map((volunteer, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 border border-transparent transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <img src={volunteer.image} alt={volunteer.name} className="w-10 h-10 rounded-full border border-gray-200" />
              <div>
                <h4 className="font-extrabold text-sm text-[#0F172A] mb-0.5">{volunteer.name}</h4>
                <p className="text-[11px] font-semibold text-gray-500">{volunteer.hours}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-[11px] font-bold">
              <ArrowUp size={10} strokeWidth={3} />
              <span>{volunteer.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveVolunteers;
