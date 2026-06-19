import React from 'react';

const tasksData = [
  {
    title: 'Prepare session plan for AI Basics Workshop',
    date: 'May 13, 2025',
    status: 'Completed',
    statusColor: 'bg-green-50 text-green-600',
    checked: true
  },
  {
    title: 'Share resources with volunteers',
    date: 'May 14, 2025',
    status: 'In Progress',
    statusColor: 'bg-blue-50 text-blue-600',
    checked: false
  },
  {
    title: 'Confirm school participation',
    date: 'May 14, 2025',
    status: 'Pending',
    statusColor: 'bg-orange-50 text-orange-600',
    checked: false
  },
  {
    title: 'Upload report for last session',
    date: 'May 15, 2025',
    status: 'Pending',
    statusColor: 'bg-orange-50 text-orange-600',
    checked: false
  },
  {
    title: 'Review volunteer feedback',
    date: 'May 16, 2025',
    status: 'Not Started',
    statusColor: 'bg-gray-100 text-gray-600',
    checked: false
  }
];

const MyTasks = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-[#0F172A]">My Tasks</h2>
        <a href="#" className="text-xs font-bold text-[#2563EB] hover:underline">View All</a>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        {tasksData.map((task, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 border border-transparent transition-colors cursor-pointer group">
            {/* Checkbox (Mocked) */}
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${task.checked ? 'border-[#2563EB] bg-[#2563EB]' : 'border-gray-300'}`}>
              {task.checked && (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            
            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className={`font-bold text-sm mb-1 truncate ${task.checked ? 'text-gray-400 line-through' : 'text-[#0F172A]'}`}>
                  {task.title}
                </h4>
                <p className="text-xs font-medium text-gray-500">{task.date}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 ${task.statusColor}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
