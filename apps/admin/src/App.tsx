import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import AdminEvents from './pages/AdminEvents';
import AdminDonations from './pages/AdminDonations';
import AdminTeamLeads from './pages/AdminTeamLeads';
import AdminVolunteers from './pages/AdminVolunteers';
import AdminCampusVisits from './pages/AdminCampusVisits';
import AdminSchoolInvites from './pages/AdminSchoolInvites';
import AdminPartnerRequests from './pages/AdminPartnerRequests';
import AdminEmailNotifications from './pages/AdminEmailNotifications';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/funds" element={<AdminDonations />} />
        <Route path="/admin/teamleads" element={<AdminTeamLeads />} />
        <Route path="/admin/volunteers" element={<AdminVolunteers />} />
        <Route path="/admin/campus-visits" element={<AdminCampusVisits />} />
        <Route path="/admin/school-invites" element={<AdminSchoolInvites />} />
        <Route path="/admin/partner-requests" element={<AdminPartnerRequests />} />
        <Route path="/admin/email-notifications" element={<AdminEmailNotifications />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
