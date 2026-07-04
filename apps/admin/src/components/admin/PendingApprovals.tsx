import React from 'react';
import { UserPlus, School, Handshake, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../api/analytics.api';
import { queryKeys } from '../../constants/queryKeys';

const PendingApprovals = () => {
  const { data: approvals = [] } = useQuery({
    queryKey: queryKeys.analyticsPending,
    queryFn: async () => {
      const res = await analyticsApi.getPendingApprovals();
      const data = res;
      const items = [];
      
      if (data.volunteers && data.volunteers.length > 0) {
        items.push({
          id: 'v1',
          title: `${data.volunteers.length} New Volunteers`,
          desc: 'Require approval',
          icon: UserPlus,
          color: 'text-orange-500'
        });
      }
      if (data.schools && data.schools.length > 0) {
        items.push({
          id: 's1',
          title: `${data.schools.length} New Schools`,
          desc: 'Require approval',
          icon: School,
          color: 'text-blue-500'
        });
      }
      if (data.partners && data.partners.length > 0) {
        items.push({
          id: 'p1',
          title: `${data.partners.length} Partner Requests`,
          desc: 'Require review',
          icon: Handshake,
          color: 'text-emerald-500'
        });
      }
      return items;
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">Pending Approvals</h3>
        <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View All</span>
      </div>

      <div className="space-y-4 flex-1">
        {approvals.length === 0 ? (
          <div className="text-center text-gray-400 text-xs mt-10">No pending approvals</div>
        ) : (
          approvals.map((app) => {
            const Icon = app.icon;
            return (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <Icon size={18} className={app.color} strokeWidth={2.5}/>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0F172A]">{app.title}</h4>
                    <p className="text-[10px] font-medium text-gray-500">{app.desc}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-blue-100 text-[#2563EB] text-[10px] font-bold hover:bg-blue-50 transition-colors">
                  Review
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;
