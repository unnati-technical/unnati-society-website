import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, ArrowUp } from 'lucide-react';

const lineData = [
  { name: 'May 6', beneficiaries: 500 },
  { name: 'May 7', beneficiaries: 1500 },
  { name: 'May 8', beneficiaries: 1200 },
  { name: 'May 9', beneficiaries: 2100 },
  { name: 'May 10', beneficiaries: 2200 },
  { name: 'May 11', beneficiaries: 2000 },
  { name: 'May 12', beneficiaries: 2500 },
];

const pieData = [
  { name: 'Digital Literacy', value: 35, color: 'var(--brand-primary)' },
  { name: 'Education Support', value: 25, color: '#10B981' },
  { name: 'Career Guidance', value: 20, color: '#8B5CF6' },
  { name: 'Awareness', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 8, color: '#64748B' },
];

const OverviewCharts = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-lg font-extrabold text-[#0F172A]">Overview</h2>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
          <span>This Week</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Total Beneficiaries</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-[#0F172A] leading-none">2,450</span>
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded"><ArrowUp size={10} strokeWidth={3}/> 12.5%</span>
          </div>
          <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">vs last week</p>
        </div>

        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Hours Contributed</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-[#0F172A] leading-none">420</span>
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded"><ArrowUp size={10} strokeWidth={3}/> 8.3%</span>
          </div>
          <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">vs last week</p>
        </div>

        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Tasks Completed</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-[#0F172A] leading-none">38</span>
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded"><ArrowUp size={10} strokeWidth={3}/> 18.2%</span>
          </div>
          <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">vs last week</p>
        </div>

        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Engagement Score</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-[#0F172A] leading-none">92%</span>
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded"><ArrowUp size={10} strokeWidth={3}/> 6.1%</span>
          </div>
          <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">vs last week</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        
        {/* Line Chart */}
        <div>
          <h3 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-wider">Beneficiaries Over Time</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBeneficiaries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 700 }}
                  tickFormatter={(value) => `${value >= 1000 ? value / 1000 + 'K' : value}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="beneficiaries" 
                  stroke="var(--brand-primary)" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: 'var(--brand-primary)' }}
                  activeDot={{ r: 6, fill: 'var(--brand-primary)', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div>
          <h3 className="text-xs font-extrabold text-[#0F172A] mb-6 uppercase tracking-wider">Initiatives by Category</h3>
          <div className="h-[250px] w-full flex items-center justify-between gap-6">
            <div className="h-[200px] w-[200px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex-1 flex flex-col justify-center gap-3">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <span className="text-[#0F172A]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewCharts;
