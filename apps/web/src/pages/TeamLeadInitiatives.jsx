import React, { useEffect } from 'react';
import TeamLeadLayout from '../components/pagesCompo/teamlead/TeamLeadLayout';
import { Target, Search, Filter, Plus } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const initiativesData = [
  { id: 1, title: 'Digital Literacy Drive', status: 'Active', schools: 4, volunteers: 15, progress: 65 },
  { id: 2, title: 'Career Guidance Sessions', status: 'Planning', schools: 2, volunteers: 8, progress: 20 },
  { id: 3, title: 'Health Awareness Camp', status: 'Completed', schools: 1, volunteers: 20, progress: 100 },
  { id: 4, title: 'Code for Kids', status: 'Active', schools: 3, volunteers: 12, progress: 45 },
];

const TeamLeadInitiatives = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TeamLeadLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">My Initiatives</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Manage and track your active programs</p>
          </div>
          <button className="bg-brand-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-brand-primary/20 hover:brightness-110 transition-all flex items-center gap-2 w-fit">
            <Plus size={18} />
            Create Initiative
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search initiatives..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-600 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 border border-gray-200 transition-all w-fit">
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {initiativesData.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center shrink-0">
                  <Target size={24} className="text-brand-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  item.status === 'Active' ? 'bg-green-50 text-green-600' :
                  item.status === 'Planning' ? 'bg-orange-50 text-orange-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <h3 className="font-extrabold text-[#0F172A] text-lg mb-2 group-hover:text-brand-primary transition-colors">{item.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                <span>{item.schools} Schools</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{item.volunteers} Volunteers</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="text-[#0F172A]">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TeamLeadLayout>
  );
};

export default TeamLeadInitiatives;
