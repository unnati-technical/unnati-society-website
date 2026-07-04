import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, FolderKanban, School, ArrowUp, ArrowDown } from 'lucide-react';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../api/analytics.api';
import { queryKeys } from '../../constants/queryKeys';

const defaultKpiData = [
  { title: 'Total Beneficiaries', value: '0', trend: '0%', trendUp: true, icon: Users, color: 'bg-blue-500 text-white' },
  { title: 'Active Volunteers', value: '0', trend: '0%', trendUp: true, icon: GraduationCap, color: 'bg-emerald-500 text-white' },
  { title: 'Active Initiatives', value: '0', trend: '0%', trendUp: true, icon: FolderKanban, color: 'bg-indigo-500 text-white' },
  { title: 'Schools Connected', value: '0', trend: '0%', trendUp: true, icon: School, color: 'bg-orange-500 text-white' }
];

const AdminKpiCards = () => {
  const { data: kpiData = defaultKpiData } = useQuery({
    queryKey: queryKeys.analyticsKpis,
    queryFn: async () => {
      const res = await analyticsApi.getKpis();
      return (res || []).map((item: any, idx: number) => ({
        ...item,
        icon: defaultKpiData[idx]?.icon || Users,
        color: defaultKpiData[idx]?.color || 'bg-blue-500 text-white'
      }));
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={idx}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex items-start gap-5"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${kpi.color}`}>
               <Icon size={26} />
            </div>
            
            <div>
              <p className="text-3xl font-extrabold text-[#0F172A] leading-none mb-1 tracking-tight">{kpi.value}</p>
              <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wide mb-3">{kpi.title}</h3>
              <p className={`text-[11px] font-bold flex items-center gap-1 ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trendUp ? <ArrowUp size={12} strokeWidth={3} /> : <ArrowDown size={12} strokeWidth={3} />}
                {kpi.trend}
                <span className="text-gray-400 ml-1 font-semibold">vs last week</span>
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdminKpiCards;
