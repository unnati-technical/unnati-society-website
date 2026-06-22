import React, { useEffect } from 'react';
import AdminLayout from '../../components/pagesCompo/admin/AdminLayout';
import AdminKpiCards from '../../components/pagesCompo/admin/AdminKpiCards';
import AdminAnalytics from '../../components/pagesCompo/admin/AdminAnalytics';
import OperationsOverview from '../../components/pagesCompo/admin/OperationsOverview';
import RecentActivities from '../../components/pagesCompo/admin/RecentActivities';
import UpcomingEvents from '../../components/pagesCompo/admin/UpcomingEvents';
import UserManagementPreview from '../../components/pagesCompo/admin/UserManagementPreview';
import AdminTaskSummary from '../../components/pagesCompo/admin/AdminTaskSummary';
import PendingApprovals from '../../components/pagesCompo/admin/PendingApprovals';
import ReportsSnapshot from '../../components/pagesCompo/admin/ReportsSnapshot';
import ImpactAndReach from '../../components/pagesCompo/admin/ImpactAndReach';
import NotificationSettings from '../../components/pagesCompo/admin/NotificationSettings';
import SystemSettings from '../../components/pagesCompo/admin/SystemSettings';

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-10">
        <AdminKpiCards />
        <AdminAnalytics />
        <OperationsOverview />
        
        {/* Three Column Split for Activities, Events, and Tasks/Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 h-full">
            <RecentActivities />
          </div>
          <div className="lg:col-span-1 h-full">
            <UpcomingEvents />
          </div>
          <div className="lg:col-span-1 h-full flex flex-col gap-6">
            <div className="flex-1 min-h-[220px]">
              <AdminTaskSummary />
            </div>
            <div className="flex-1 min-h-[220px]">
              <PendingApprovals />
            </div>
          </div>
        </div>

        <UserManagementPreview />
        
        {/* Settings and Snapshots */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 h-full">
            <SystemSettings />
          </div>
          <div className="lg:col-span-1 h-full">
            <NotificationSettings />
          </div>
          <div className="lg:col-span-1 h-full">
            <ReportsSnapshot />
          </div>
        </div>

        <ImpactAndReach />

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
