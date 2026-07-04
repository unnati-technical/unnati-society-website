import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown } from 'lucide-react';

const lineData = [
  { name: 'May 6', beneficiaries: 800 },
  { name: 'May 8', beneficiaries: 1500 },
  { name: 'May 10', beneficiaries: 1100 },
  { name: 'May 12', beneficiaries: 2100 },
  { name: 'May 14', beneficiaries: 2300 },
  { name: 'May 16', beneficiaries: 2200 },
  { name: 'May 18', beneficiaries: 2800 },
];

const pieData = [
  { name: 'Digital Literacy', value: 38, color: '#2563EB' },
  { name: 'Education Support', value: 25, color: '#10B981' },
  { name: 'Career Guidance', value: 20, color: '#8B5CF6' },
  { name: 'Awareness', value: 12, color: '#F59E0B' },
  { name: 'Others', value: 5, color: '#64748B' },
];

const AdminAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* Line Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Beneficiaries Over Time</h3>
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 cursor-pointer border border-gray-200 px-2 py-1 rounded-md hover:bg-gray-50">
            This Month <ChevronDown size={12}/>
          </div>
        </div>
        <div className="h-[200px] w-full min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: 700 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: 700 }}
                tickFormatter={(value) => `${value >= 1000 ? value / 1000 + 'K' : value}`}
              />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '11px' }}
              />
              <Line 
                type="monotone" 
                dataKey="beneficiaries" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563EB' }}
                activeDot={{ r: 6, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight mb-2">Initiatives by Category</h3>
        <div className="h-[220px] w-full flex items-center justify-between gap-4 min-w-0 min-h-0">
          <div className="h-[180px] w-[180px] shrink-0 min-w-0 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
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
  );
};

export default AdminAnalytics;
