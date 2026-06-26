import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import TeamLeadDashboard from './pages/TeamLeadDashboard';
import TeamLeadInitiatives from './pages/TeamLeadInitiatives';
import TeamLeadTasks from './pages/TeamLeadTasks';
import TeamLeadVolunteers from './pages/TeamLeadVolunteers';
import TeamLeadMessages from './pages/TeamLeadMessages';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/teamlead/dashboard" replace />} />
        <Route path="/teamlead/dashboard" element={<TeamLeadDashboard />} />
        <Route path="/teamlead/initiatives" element={<TeamLeadInitiatives />} />
        <Route path="/teamlead/tasks" element={<TeamLeadTasks />} />
        <Route path="/teamlead/volunteers" element={<TeamLeadVolunteers />} />
        <Route path="/teamlead/messages" element={<TeamLeadMessages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
