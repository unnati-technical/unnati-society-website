import React, { useEffect, Suspense, lazy } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminKpiCards from '../components/admin/AdminKpiCards';
import OperationsOverview from '../components/admin/OperationsOverview';
import RecentActivities from '../components/admin/RecentActivities';
import UpcomingEvents from '../components/admin/UpcomingEvents';
import UserManagementPreview from '../components/admin/UserManagementPreview';
import PendingApprovals from '../components/admin/PendingApprovals';
import NotificationSettings from '../components/admin/NotificationSettings';
import SystemSettings from '../components/admin/SystemSettings';
import { Loader2 } from 'lucide-react';

const AdminAnalytics = lazy(() => import('../components/admin/AdminAnalytics'));
const AdminTaskSummary = lazy(() => import('../components/admin/AdminTaskSummary'));
const ReportsSnapshot = lazy(() => import('../components/admin/ReportsSnapshot'));
const ImpactAndReach = lazy(() => import('../components/admin/ImpactAndReach'));

const ChartSkeleton = () => (
  <div className="w-full h-[300px] bg-white rounded-2xl border border-gray-100 flex items-center justify-center animate-pulse shadow-sm">
    <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
  </div>
);

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto pb-10">
        <AdminKpiCards />
        
        <Suspense fallback={<ChartSkeleton />}>
          <AdminAnalytics />
        </Suspense>
        
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
              <Suspense fallback={<ChartSkeleton />}>
                <AdminTaskSummary />
              </Suspense>
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
            <Suspense fallback={<ChartSkeleton />}>
              <ReportsSnapshot />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={<ChartSkeleton />}>
          <ImpactAndReach />
        </Suspense>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
