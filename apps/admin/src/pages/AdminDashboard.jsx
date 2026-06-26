import React, { useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminKpiCards from '../components/admin/AdminKpiCards';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import OperationsOverview from '../components/admin/OperationsOverview';
import RecentActivities from '../components/admin/RecentActivities';
import UpcomingEvents from '../components/admin/UpcomingEvents';
import UserManagementPreview from '../components/admin/UserManagementPreview';
import AdminTaskSummary from '../components/admin/AdminTaskSummary';
import PendingApprovals from '../components/admin/PendingApprovals';
import ReportsSnapshot from '../components/admin/ReportsSnapshot';
import ImpactAndReach from '../components/admin/ImpactAndReach';
import NotificationSettings from '../components/admin/NotificationSettings';
import SystemSettings from '../components/admin/SystemSettings';

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
