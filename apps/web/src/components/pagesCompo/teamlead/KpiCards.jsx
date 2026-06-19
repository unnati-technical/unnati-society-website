import React from 'react';
import { Target, GraduationCap, Users, School, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const kpiData = [
  {
    title: 'Active Initiatives',
    value: '12',
    trend: '+ 2 from last week',
    trendUp: true,
    icon: Target,
    color: 'bg-blue-50 text-[#2563EB]',
    iconColor: '#2563EB'
  },
  {
    title: 'Sessions This Week',
    value: '8',
    trend: '+ 3 from last week',
    trendUp: true,
    icon: GraduationCap,
    color: 'bg-green-50 text-green-600',
    iconColor: '#16A34A'
  },
  {
    title: 'Volunteers',
    value: '156',
    trend: '+ 18 from last week',
    trendUp: true,
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
    iconColor: '#9333EA'
  },
  {
    title: 'Schools Connected',
    value: '24',
    trend: '+ 4 from last week',
    trendUp: true,
    icon: School,
    color: 'bg-orange-50 text-orange-600',
    iconColor: '#EA580C'
  }
];

const KpiCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={idx}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                 <Icon size={24} />
              </div>
              <p className="text-[32px] font-extrabold text-[#0F172A] leading-none tracking-tight">{kpi.value}</p>
            </div>
            
            <div>
              <h3 className="text-[13px] font-extrabold text-gray-500 uppercase tracking-wide mb-2">{kpi.title}</h3>
              <p className={`text-[11px] font-extrabold flex items-center gap-1 ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trendUp ? <ArrowUp size={12} strokeWidth={3} /> : <ArrowDown size={12} strokeWidth={3} />}
                {kpi.trend}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KpiCards;
