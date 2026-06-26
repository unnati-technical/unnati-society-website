import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Lock } from 'lucide-react';

const userData = [
  { id: 1, name: 'Arjun Kumar', role: 'Team Lead', email: 'arjun.kumar@unnatissociety.org', status: 'Active', joined: 'May 10, 2025', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Sneha Kumari', role: 'Volunteer', email: 'sneha.kumari@gmail.com', status: 'Active', joined: 'May 11, 2025', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Rohit Anand', role: 'Volunteer', email: 'rohit.anand@gmail.com', status: 'Active', joined: 'May 12, 2025', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 4, name: 'Anjali Singh', role: 'Volunteer', email: 'anjali.singh@gmail.com', status: 'Active', joined: 'May 13, 2025', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 5, name: 'Kahalgaon High School', role: 'School', email: 'info@kahalgaonhigh.edu.in', status: 'Active', joined: 'May 8, 2025', avatar: 'https://ui-avatars.com/api/?name=KH&background=0D8ABC&color=fff' },
  { id: 6, name: 'Sultanganj Inter College', role: 'School', email: 'sultanganjcollege@gmail.com', status: 'Active', joined: 'May 9, 2025', avatar: 'https://ui-avatars.com/api/?name=SC&background=f59e0b&color=fff' },
];

const tabs = ['All Users', 'Team Leads', 'Volunteers', 'Students', 'Schools'];

const UserManagementPreview = () => {
  const [activeTab, setActiveTab] = useState('All Users');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">User Management Overview</h3>
        <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View All Users</span>
      </div>

      <div className="px-6 pt-4 border-b border-gray-100 flex overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-3 px-6 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Name</th>
              <th className="py-3 px-6 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Role</th>
              <th className="py-3 px-6 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Email</th>
              <th className="py-3 px-6 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="py-3 px-6 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Joined On</th>
              <th className="py-3 px-6 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs font-bold text-[#0F172A]">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6">
                  <span className={`text-[10px] font-bold ${
                    user.role === 'Team Lead' ? 'text-indigo-600' :
                    user.role === 'School' ? 'text-[#2563EB]' : 'text-blue-500'
                  }`}>{user.role}</span>
                </td>
                <td className="py-3 px-6 text-xs text-gray-500 font-medium">{user.email}</td>
                <td className="py-3 px-6">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                    user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-[11px] font-semibold text-gray-500">{user.joined}</td>
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <button className="hover:text-[#2563EB] transition-colors"><Eye size={14} /></button>
                    <button className="hover:text-amber-500 transition-colors"><Edit2 size={14} /></button>
                    <button className="hover:text-gray-600 transition-colors"><Lock size={14} /></button>
                    <button className="hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPreview;
