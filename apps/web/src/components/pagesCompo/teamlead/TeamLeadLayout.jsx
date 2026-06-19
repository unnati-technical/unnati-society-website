import React from 'react';

import { 
  LayoutDashboard, FolderKanban, Users, CalendarDays, 
  School, FileText, MessageSquare, PieChart, 
  CheckSquare, MessageCircle, HelpCircle, FileCheck, 
  Headphones, ChevronDown, Bell, Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full hidden lg:flex sticky top-0 overflow-y-auto pb-4">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-6-3v7.5l6 3 6-3v-7.5l-6 3z" /></svg>
          </div>
          <div>
            <h2 className="font-extrabold text-[#1E3A8A] text-sm tracking-tight leading-tight">UNNATI SOCIETY</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5 font-bold">An Institute Outreach Activity</p>
          </div>
        </div>

        {/* Dashboard Main Link */}
        <div className="px-4 mb-4">
          <Link 
            to="/teamlead/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${currentPath === '/teamlead/dashboard' ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563EB]'}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-4 space-y-6">
          {sidebarLinks.map((group, idx) => (
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
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#2563EB]'}`}
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
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl"></div>
             
             <h4 className="font-extrabold text-base mb-1">Let's Build a</h4>
             <h4 className="font-extrabold text-blue-400 text-base mb-3">Better Tomorrow.</h4>
             <p className="text-xs text-gray-400 mb-4 leading-relaxed font-medium">Your leadership can create a lasting impact in the lives of students and communities.</p>
             <button className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-[#0F172A] font-extrabold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-yellow-500/20">
               Partner With Us
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0F172A] flex items-center gap-2 tracking-tight">
              Welcome back, Team Lead! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Here's what's happening with your initiatives today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Date Range Picker (Mock) */}
            <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
              <CalendarDays size={16} className="text-gray-400"/>
              <span>May 12 – May 18, 2025</span>
            </div>

            {/* Notifications */}
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors relative">
              <MessageSquare size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-[#0F172A] leading-tight">Arjun Kumar</p>
                <p className="text-xs text-gray-500 font-medium">Team Lead</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm group-hover:border-blue-300 transition-all" />
              <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors hidden sm:block" />
            </div>
            
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
