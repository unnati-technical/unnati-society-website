import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminMessages = lazy(() => import('./pages/AdminMessages'));
const AdminEvents = lazy(() => import('./pages/AdminEvents'));
const AdminDonations = lazy(() => import('./pages/AdminDonations'));
const AdminTeamLeads = lazy(() => import('./pages/AdminTeamLeads'));
const AdminVolunteers = lazy(() => import('./pages/AdminVolunteers'));
const AdminCampusVisits = lazy(() => import('./pages/AdminCampusVisits'));
const AdminSchoolInvites = lazy(() => import('./pages/AdminSchoolInvites'));
const AdminPartnerRequests = lazy(() => import('./pages/AdminPartnerRequests'));
const AdminEmailNotifications = lazy(() => import('./pages/AdminEmailNotifications'));
const AdminCertificates = lazy(() => import('./pages/AdminCertificates'));
const AdminRoles = lazy(() => import('./pages/AdminRoles'));
const AdminWelcome = lazy(() => import('./pages/AdminWelcome'));
const AdminHomeMedia = lazy(() => import('./pages/AdminHomeMedia'));
const AdminLeaderboard = lazy(() => import('./pages/AdminLeaderboard'));
const AdminSubscribers = lazy(() => import('./pages/admin/Subscribers'));

const GlobalLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/welcome" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Navigate to="/admin/welcome" replace />} />
          <Route path="/admin/welcome" element={<AdminWelcome />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/funds" element={<AdminDonations />} />
          <Route path="/admin/teamleads" element={<AdminTeamLeads />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/campus-visits" element={<AdminCampusVisits />} />
          <Route path="/admin/school-invites" element={<AdminSchoolInvites />} />
          <Route path="/admin/partner-requests" element={<AdminPartnerRequests />} />
          <Route path="/admin/email-notifications" element={<AdminEmailNotifications />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/roles" element={<AdminRoles />} />
          <Route path="/admin/home-media" element={<AdminHomeMedia />} />
          <Route path="/admin/leaderboard" element={<AdminLeaderboard />} />
          <Route path="/admin/subscribers" element={<AdminSubscribers />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
