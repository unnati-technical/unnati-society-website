import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import AdminEvents from './pages/AdminEvents';
import AdminDonations from './pages/AdminDonations';
import AdminTeamLeads from './pages/AdminTeamLeads';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/funds" element={<AdminDonations />} />
        <Route path="/admin/teamleads" element={<AdminTeamLeads />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
