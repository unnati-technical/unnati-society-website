import React, { useEffect } from 'react';
import TeamLeadLayout from '../components/teamlead/TeamLeadLayout';
import KpiCards from '../components/teamlead/KpiCards';
import OverviewCharts from '../components/teamlead/OverviewCharts';
import UpcomingSessions from '../components/teamlead/UpcomingSessions';
import MyTasks from '../components/teamlead/MyTasks';
import ActiveVolunteers from '../components/teamlead/ActiveVolunteers';
import RecentMessages from '../components/teamlead/RecentMessages';
import ReportsSnapshot from '../components/teamlead/ReportsSnapshot';
import { Users, Clock, Heart, Award, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const TeamLeadDashboard = () => {
  const { currentUser, userProfile } = useAuth();
  
  const userAccess = userProfile || {
    name: currentUser?.displayName || currentUser?.email?.split('@')[0],
    status: 'Junior Lead',
    msgAccess: 'No Access'
  };
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TeamLeadLayout>
      <div className="max-w-[1400px] mx-auto">
        
        {/* KPI Cards Row */}
        <KpiCards />

        {/* Overview Charts */}
        <OverviewCharts />

        {/* 2-Column Grid for Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UpcomingSessions />
          <MyTasks />
        </div>

        {/* 2-Column Grid for Volunteers & Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ActiveVolunteers />
          {userAccess.msgAccess !== 'No Access' ? (
            <RecentMessages />
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Restricted Access</h3>
              <p className="text-sm text-gray-500 max-w-[250px]">You do not have permission to view contact messages. Contact an admin for access.</p>
            </div>
          )}
        </div>

        {/* Reports Snapshot */}
        <ReportsSnapshot />

        {/* Bottom Impact Banner */}
        <div className="bg-[#0F172A] rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl mb-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex items-center gap-6 z-10">
            <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              {userAccess.status === 'Sr. Team Lead' ? <Award size={36} className="text-white" /> : <span className="text-4xl">🏆</span>}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Great job, {userAccess.name}! 🎉</h2>
              <p className="text-sm text-gray-400 font-medium">Your dedication as a {userAccess.status} is making a real difference.<br/>Keep inspiring and empowering!</p>
            </div>
          </div>

          <div className="flex items-center gap-8 md:gap-12 z-10 border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 pl-0 md:pl-10">
             <div>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Your Impact This Month</p>
               <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-blue-400" />
                    <div>
                      <p className="text-xl font-extrabold text-white leading-none">2,450</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Beneficiaries</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-green-400" />
                    <div>
                      <p className="text-xl font-extrabold text-white leading-none">420</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Hours Contributed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-pink-400" />
                    <div>
                      <p className="text-xl font-extrabold text-white leading-none">92%</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Engagement Score</p>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </TeamLeadLayout>
  );
};

export default TeamLeadDashboard;
