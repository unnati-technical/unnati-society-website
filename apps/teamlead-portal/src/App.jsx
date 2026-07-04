import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

const TeamLeadDashboard = lazy(() => import('./pages/TeamLeadDashboard'));
const TeamLeadInitiatives = lazy(() => import('./pages/TeamLeadInitiatives'));
const TeamLeadTasks = lazy(() => import('./pages/TeamLeadTasks'));
const TeamLeadVolunteers = lazy(() => import('./pages/TeamLeadVolunteers'));
const TeamLeadMessages = lazy(() => import('./pages/TeamLeadMessages'));

const GlobalLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/teamlead/dashboard" replace />} />
          <Route path="/teamlead/dashboard" element={<TeamLeadDashboard />} />
          <Route path="/teamlead/initiatives" element={<TeamLeadInitiatives />} />
          <Route path="/teamlead/tasks" element={<TeamLeadTasks />} />
          <Route path="/teamlead/volunteers" element={<TeamLeadVolunteers />} />
          <Route path="/teamlead/messages" element={<TeamLeadMessages />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
