import React, { useEffect } from 'react';
import TeamLeadLayout from '../components/teamlead/TeamLeadLayout';
import { Search, Filter, Download, MoreVertical, Mail, Phone } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const volunteersData = [
  { id: 1, name: 'Ananya Sharma', role: 'Lead Volunteer', branch: 'IIIT Bhagalpur', joined: 'Jan 2024', hours: 145, status: 'Active', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Rahul Verma', role: 'Mentor', branch: 'IIIT Bhagalpur', joined: 'Feb 2024', hours: 98, status: 'Active', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 3, name: 'Priya Singh', role: 'Coordinator', branch: 'SFS School', joined: 'Mar 2024', hours: 56, status: 'On Leave', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'Vikram Das', role: 'Volunteer', branch: 'Mount Assisi', joined: 'Apr 2024', hours: 34, status: 'Active', avatar: 'https://i.pravatar.cc/150?img=53' },
  { id: 5, name: 'Sneha Gupta', role: 'Volunteer', branch: 'IIIT Bhagalpur', joined: 'May 2024', hours: 12, status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=44' },
];

const TeamLeadVolunteers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TeamLeadLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Volunteers Directory</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Manage and track your volunteer network</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-600 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button className="bg-brand-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-brand-primary/20 hover:brightness-110 transition-all">
              Invite Volunteer
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or role..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-600 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 border border-gray-200 transition-all w-fit">
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Volunteer Info</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Branch</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Hours</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteersData.map((vol, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={vol.id} 
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img src={vol.avatar} alt={vol.name} className="w-10 h-10 rounded-full border border-gray-200" />
                      <div>
                        <h4 className="font-extrabold text-sm text-[#0F172A]">{vol.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{vol.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-[#0F172A]">{vol.branch}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Joined {vol.joined}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-extrabold text-[#0F172A]">{vol.hours} hrs</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-block ${
                      vol.status === 'Active' ? 'bg-green-50 text-green-600' :
                      vol.status === 'On Leave' ? 'bg-orange-50 text-orange-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {vol.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-brand-light transition-colors">
                        <Mail size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-brand-light transition-colors">
                        <Phone size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeamLeadLayout>
  );
};

export default TeamLeadVolunteers;
