import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 32, color: '#10B981' },
  { name: 'In Progress', value: 18, color: '#2563EB' },
  { name: 'Pending', value: 16, color: '#F59E0B' },
  { name: 'Not Started', value: 12, color: '#EF4444' },
];

const AdminTaskSummary = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Task Summary</h3>
        <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View All Tasks</span>
      </div>

      <div className="flex-1 flex items-center justify-between gap-4">
        <div className="h-[140px] w-[140px] shrink-0 relative min-w-0 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-[#0F172A] leading-none tracking-tight">78</span>
            <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Total Tasks</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-500">{item.name}</span>
              </div>
              <span className="text-[#0F172A]">{item.value} <span className="text-gray-400 ml-1 font-medium">({Math.round((item.value/78)*100)}%)</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTaskSummary;
