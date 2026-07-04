import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

const reportData1 = [
  { name: 'W1', value: 40 }, { name: 'W2', value: 65 }, { name: 'W3', value: 85 }, { name: 'W4', value: 120 }
];

const reportData2 = [
  { name: 'W1', value: 20 }, { name: 'W2', value: 35 }, { name: 'W3', value: 25 }, { name: 'W4', value: 45 }
];

const reportData3 = [
  { name: 'W1', value: 50 }, { name: 'W2', value: 40 }, { name: 'W3', value: 60 }, { name: 'W4', value: 80 }
];

const reportData4 = [
  { name: 'W1', value: 80 }, { name: 'W2', value: 90 }, { name: 'W3', value: 75 }, { name: 'W4', value: 110 }
];

const ReportsSnapshot = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Reports Snapshot</h3>
        <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View Full Reports</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Report Card 1 */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:shadow-sm transition-shadow">
          <h4 className="text-xs font-extrabold text-[#0F172A]">Monthly Report</h4>
          <p className="text-[10px] font-medium text-gray-500 mt-1">April 2026</p>
          <p className="text-[11px] font-bold text-[#2563EB] mt-2 mb-2">2,450 Beneficiaries</p>
          <ResponsiveContainer width="100%" height={48}>
            <BarChart data={reportData1}>
              <Bar dataKey="value" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Report Card 2 */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:shadow-sm transition-shadow">
          <h4 className="text-xs font-extrabold text-[#0F172A]">Session Report</h4>
          <p className="text-[10px] font-medium text-gray-500 mt-1">April 2026</p>
          <p className="text-[11px] font-bold text-indigo-600 mt-2 mb-2">32 Sessions</p>
          <ResponsiveContainer width="100%" height={48}>
            <BarChart data={reportData2}>
              <Bar dataKey="value" fill="#6366f1" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Report Card 3 */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:shadow-sm transition-shadow">
          <h4 className="text-xs font-extrabold text-[#0F172A]">Volunteer Report</h4>
          <p className="text-[10px] font-medium text-gray-500 mt-1">April 2026</p>
          <p className="text-[11px] font-bold text-emerald-600 mt-2 mb-2">156 Active Volunteers</p>
          <ResponsiveContainer width="100%" height={48}>
            <BarChart data={reportData3}>
              <Bar dataKey="value" fill="#10B981" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Report Card 4 */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:shadow-sm transition-shadow">
          <h4 className="text-xs font-extrabold text-[#0F172A]">Impact Report</h4>
          <p className="text-[10px] font-medium text-gray-500 mt-1">April 2026 - 92% Engagement</p>
          <div className="mt-2 mb-2" />
          <ResponsiveContainer width="100%" height={48}>
            <BarChart data={reportData4}>
              <Bar dataKey="value" fill="#F59E0B" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default ReportsSnapshot;

