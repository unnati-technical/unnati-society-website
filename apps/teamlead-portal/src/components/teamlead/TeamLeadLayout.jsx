import React from 'react';

import { 
  LayoutDashboard, FolderKanban, Users, CalendarDays, 
  School, FileText, MessageSquare, PieChart, 
  CheckSquare, MessageCircle, HelpCircle, FileCheck, 
  Headphones, ChevronDown, Bell, Menu, Palette
} from 'lucide-react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const sidebarLinks = [
  {
    group: 'Manage',
    items: [
      { name: 'My Initiatives', icon: FolderKanban, path: '/teamlead/initiatives' },
      { name: 'Tasks & Assignments', icon: CheckSquare, path: '/teamlead/tasks' },
      { name: 'Volunteers', icon: Users, path: '/teamlead/volunteers' },
      { name: 'Sessions & Events', icon: CalendarDays, path: '/teamlead/sessions' },
      { name: 'Schools & Partners', icon: School, path: '/teamlead/schools' },
      { name: 'Resources', icon: FileText, path: '/teamlead/resources' },
    ]
  },
  {
    group: 'Engagement',
    items: [
      { name: 'Messages', icon: MessageSquare, path: '/teamlead/messages' },
      { name: 'Reports & Analytics', icon: PieChart, path: '/teamlead/reports' },
      { name: 'Attendance', icon: FileCheck, path: '/teamlead/attendance' },
      { name: 'Feedback', icon: MessageCircle, path: '/teamlead/feedback' },
    ]
  },
  {
    group: 'Support',
    items: [
      { name: 'Help Center', icon: HelpCircle, path: '/teamlead/help' },
      { name: 'Guidelines', icon: FileText, path: '/teamlead/guidelines' },
      { name: 'Contact Support', icon: Headphones, path: '/teamlead/support' },
    ]
  }
];

const TeamLeadLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, setTheme } = useTheme();
  const { currentUser, userProfile, logout } = useAuth();

  // If there is no authenticated user, redirect to login page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (userProfile && userProfile.credStatus !== 'Approved') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Approval Pending</h1>
        <p className="text-gray-600 max-w-md mb-6">Your Team Lead application is currently being reviewed by an Administrator. Please check back later.</p>
        <button onClick={() => logout()} className="px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors">
          Return to Home
        </button>
      </div>
    );
  }

  // Use the fetched profile from backend, or default fallbacks while loading
  const userAccess = userProfile || {
    msgAccess: 'No Access',
    status: 'Junior Lead',
    name: currentUser.displayName || currentUser.email?.split('@')[0]
  };

  // Filter sidebar links based on permissions
  const filteredSidebarLinks = sidebarLinks.map(group => {
    return {
      ...group,
      items: group.items.filter(item => {
        if (item.name === 'Messages' && userAccess.msgAccess === 'No Access') return false;
        if (item.name === 'Volunteers' && userAccess.status === 'Junior Lead') return false;
        return true;
      })
    };
  }).filter(group => group.items.length > 0);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full hidden lg:flex sticky top-0 overflow-y-auto pb-4">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center shrink-0 shadow-sm transition-colors">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-6-3v7.5l6 3 6-3v-7.5l-6 3z" /></svg>
          </div>
          <div>
            <h2 className="font-extrabold text-brand-dark text-sm tracking-tight leading-tight transition-colors">UNNATI SOCIETY</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5 font-bold">An Institute Outreach Activity</p>
          </div>
        </div>

        {/* Dashboard Main Link */}
        <div className="px-4 mb-4">
          <Link 
            to="/teamlead/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentPath === '/teamlead/dashboard' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-primary'}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-4 space-y-6">
          {filteredSidebarLinks.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 px-4">{group.group}</h3>
              <ul className="space-y-1">
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = currentPath.startsWith(item.path);
                  return (
                    <li key={i}>
                      <Link 
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-brand-light text-brand-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-primary'}`}
                      >
                        <Icon size={18} />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-4 mt-6">
          <div className="bg-[#0F172A] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl transition-colors"></div>
             
             <h4 className="font-extrabold text-base mb-1">Let's Build a</h4>
             <h4 className="font-extrabold text-brand-primary text-base mb-3 transition-colors">Better Tomorrow.</h4>
             <p className="text-xs text-gray-400 mb-4 leading-relaxed font-medium">Your leadership can create a lasting impact in the lives of students and communities.</p>
             <button className="w-full bg-brand-secondary hover:brightness-110 text-[#0F172A] font-extrabold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-secondary/20">
               Partner With Us
             </button>
          </div>
          {/* User Profile */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold shadow-inner">
                {userAccess.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {userAccess.name}
                </span>
                <span className="text-xs text-gray-500">{userAccess.status}</span>
              </div>
            </div>
            <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Logout">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0F172A] flex items-center gap-2 tracking-tight">
              Welcome back, Team Lead! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Here's what's happening with your initiatives today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            
            {/* Theme Switcher */}
            <div className="hidden lg:flex items-center gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
              <button 
                onClick={() => setTheme('default')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${theme === 'default' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                IIIT
              </button>
              <button 
                onClick={() => setTheme('theme-school')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${theme === 'theme-school' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                School
              </button>
              <button 
                onClick={() => setTheme('theme-ngo')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${theme === 'theme-ngo' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                NGO
              </button>
            </div>

            {/* Notifications */}
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
               <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
};

export default TeamLeadLayout;
