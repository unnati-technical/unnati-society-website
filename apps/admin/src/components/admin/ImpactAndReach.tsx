import React from 'react';
import { Users, Building2, MapPin, Calendar, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const trendData = [
  { name: 'Jan', value: 200 }, { name: 'Feb', value: 450 }, { name: 'Mar', value: 300 },
  { name: 'Apr', value: 480 }, { name: 'May', value: 380 }, { name: 'Jun', value: 500 },
  { name: 'Jul', value: 420 }, { name: 'Aug', value: 650 }, { name: 'Sep', value: 580 },
  { name: 'Oct', value: 720 }, { name: 'Nov', value: 680 }, { name: 'Dec', value: 850 },
];

const ImpactAndReach = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      
      {/* Geographic Reach (Static India SVG placeholder & Stats) */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight mb-6">Geographic Reach</h3>
        
        <div className="flex-1 flex flex-col sm:flex-row xl:flex-col items-center justify-center gap-6">
          {/* Abstract India Map SVG Placeholder */}
          <div className="w-full max-w-[200px] h-[200px] relative shrink-0 opacity-80">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Simplified abstract shape representing India */}
              <path d="M40 5 L60 20 L75 30 L85 45 L80 60 L60 95 L50 100 L40 95 L30 70 L20 60 L10 50 L15 40 L25 30 L35 15 Z" fill="#E2E8F0" />
              <path d="M45 40 L55 35 L60 45 L50 55 Z" fill="#2563EB" opacity="0.6" /> {/* Bihar */}
              <path d="M40 50 L50 55 L55 65 L45 70 Z" fill="#3B82F6" opacity="0.4" /> {/* Jharkhand */}
              <path d="M60 45 L70 40 L75 50 L65 60 Z" fill="#60A5FA" opacity="0.4" /> {/* West Bengal */}
            </svg>
            
            {/* Markers */}
            <div className="absolute top-[40%] left-[50%] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_0_2px_white]"></div>
            <div className="absolute top-[55%] left-[45%] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_0_2px_white]"></div>
            <div className="absolute top-[48%] left-[68%] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_0_2px_white]"></div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[200px]">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span className="text-gray-500">Bihar</span>
              </div>
              <span className="text-[#0F172A]">55%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] opacity-80"></span>
                <span className="text-gray-500">Jharkhand</span>
              </div>
              <span className="text-[#0F172A]">25%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA] opacity-80"></span>
                <span className="text-gray-500">West Bengal</span>
              </div>
              <span className="text-[#0F172A]">10%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                <span className="text-gray-500">Others</span>
              </div>
              <span className="text-[#0F172A]">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Engagement Trend */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Monthly Engagement Trend</h3>
          <span className="text-[10px] font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50">This Year ▼</span>
        </div>
        
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: 700 }} tickFormatter={(value) => `${value >= 1000 ? value / 1000 + 'K' : value}`} />
              <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '11px' }} />
              <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={{ r: 3, strokeWidth: 2, fill: '#fff', stroke: '#2563EB' }} activeDot={{ r: 5, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact at a Glance */}
      <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight mb-6">Impact at a Glance</h3>
        
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2563EB] shadow-sm"><Users size={14} strokeWidth={2.5}/></div>
              <span className="text-xs font-bold text-blue-900">Students Impacted</span>
            </div>
            <span className="text-sm font-extrabold text-[#0F172A]">25,000+</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm"><MapPin size={14} strokeWidth={2.5}/></div>
              <span className="text-xs font-bold text-emerald-900">Communities Reached</span>
            </div>
            <span className="text-sm font-extrabold text-[#0F172A]">150+</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm"><Building2 size={14} strokeWidth={2.5}/></div>
              <span className="text-xs font-bold text-indigo-900">Workshops Conducted</span>
            </div>
            <span className="text-sm font-extrabold text-[#0F172A]">320+</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-600 shadow-sm"><Heart size={14} strokeWidth={2.5}/></div>
              <span className="text-xs font-bold text-orange-900">Volunteers Engaged</span>
            </div>
            <span className="text-sm font-extrabold text-[#0F172A]">500+</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ImpactAndReach;
