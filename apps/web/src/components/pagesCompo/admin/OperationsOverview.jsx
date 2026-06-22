import React from 'react';
import { Clock, Target, IndianRupee, Users } from 'lucide-react';

const opsData = [
  { title: 'Sessions Conducted', value: '32', trend: '+ 14.3%', color: 'text-blue-600', bg: 'bg-blue-50', icon: Users },
  { title: 'Hours Contributed', value: '420', trend: '+ 8.3%', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Clock },
  { title: 'Engagement Score', value: '92%', trend: '+ 6.1%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Target },
  { title: 'Funds Utilized', value: '₹ 1.85L', trend: '+ 11.2%', color: 'text-red-600', bg: 'bg-red-50', icon: IndianRupee },
];

const OperationsOverview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {opsData.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <h3 className="text-[11px] font-extrabold text-[#0F172A] mb-2">{item.title}</h3>
            <p className="text-2xl font-extrabold text-[#0F172A] leading-none mb-4 tracking-tight">{item.value}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 mb-0.5">↑ {item.trend}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">vs last week</p>
              </div>
              <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                <Icon size={14} className={item.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OperationsOverview;
