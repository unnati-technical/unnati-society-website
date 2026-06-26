import React from 'react';

const reportsData = [
  {
    title: 'Monthly Report',
    date: 'April 2025',
    metric: '2,450 Beneficiaries',
    bars: [40, 60, 80, 50, 90, 70, 100, 80],
    color: 'bg-brand-primary'
  },
  {
    title: 'Volunteer Report',
    date: 'April 2025',
    metric: '156 Active Volunteers',
    bars: [30, 40, 60, 50, 70, 90, 80, 100],
    color: 'bg-green-500'
  },
  {
    title: 'Session Report',
    date: 'April 2025',
    metric: '32 Sessions Conducted',
    bars: [80, 70, 60, 90, 50, 100, 80, 60],
    color: 'bg-purple-500'
  },
  {
    title: 'Impact Report',
    date: 'April 2025',
    metric: '92% Engagement',
    bars: [50, 60, 70, 80, 60, 90, 100, 80],
    color: 'bg-orange-500'
  }
];

const ReportsSnapshot = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-extrabold text-[#0F172A]">Reports Snapshot</h2>
        <a href="#" className="text-xs font-bold text-brand-primary hover:underline">View Full Report</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportsData.map((report, idx) => (
          <div key={idx} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <h4 className="font-extrabold text-[#0F172A] text-sm mb-1">{report.title}</h4>
            <p className="text-[10px] font-bold text-gray-400 mb-4">{report.date}</p>
            <p className="text-xs font-bold text-gray-700 mb-6">{report.metric}</p>
            
            {/* Mini Bar Chart Mock */}
            <div className="flex items-end justify-between h-12 gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              {report.bars.map((height, i) => (
                <div 
                  key={i} 
                  className={`w-full rounded-t-sm ${report.color}`} 
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSnapshot;
