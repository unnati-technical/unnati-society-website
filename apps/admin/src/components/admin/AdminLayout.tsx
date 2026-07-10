import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, UserSquare2, School, Handshake,
  FolderKanban, CalendarDays, CheckSquare, BarChart3, Settings, ShieldAlert,
  Bell, MessageSquare, ChevronDown, Menu, Search, FileText, IndianRupee,
  Activity, Zap, X, PanelRight, LogOut, Mail, Image, Trophy
} from 'lucide-react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import MessageNotification from './MessageNotification';
import { useAuth } from '../../contexts/AuthContext';
import { CalendarRemindersModal } from './CalendarRemindersModal';

const sidebarGroups = [
  {
    title: 'Management',
    items: [
      { name: 'Certificates', icon: FileText, path: '/admin/certificates' },
      { name: 'Team Leads', icon: UserSquare2, path: '/admin/teamleads' },
      { name: 'Volunteers', icon: Handshake, path: '/admin/volunteers' },
      { name: 'Campus Visits', icon: School, path: '/admin/campus-visits' },
      { name: 'School Invites', icon: School, path: '/admin/school-invites' },
      { name: 'Partner Requests', icon: Handshake, path: '/admin/partner-requests' },
      { name: 'Roles & Permissions', icon: ShieldAlert, path: '/admin/roles' },
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'Events Management', icon: CalendarDays, path: '/admin/events' },
      { name: 'Messages', icon: Bell, path: '/admin/messages' },
      { name: 'Home Media', icon: Image, path: '/admin/home-media' },
      { name: 'Leaderboard', icon: Trophy, path: '/admin/leaderboard' },
    ]
  },
  {
    title: 'Finance & Support',
    items: [
      { name: 'Donations & Funds', icon: IndianRupee, path: '/admin/funds' },
      { name: 'Expense Management', icon: IndianRupee, path: '/admin/expenses' },
      { name: 'Email Notifications', icon: Mail, path: '/admin/email-notifications' },
    ]
  }
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarStart] = useState(new Date());
  const [calendarEnd] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const { currentUser, logout } = useAuth();

  // Protect Admin Dashboard
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR (Dark Navy) */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#0B1F5E] text-white flex flex-col transition-all duration-300 lg:static lg:flex shrink-0 ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} ${isLeftCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        
        {/* Logo Area */}
        <div className={`p-6 flex items-center ${isLeftCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20" title="Unnati Society">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-6-3v7.5l6 3 6-3v-7.5l-6 3z" /></svg>
            </div>
            {!isLeftCollapsed && (
              <div>
                <h2 className="font-extrabold text-white text-sm tracking-tight leading-tight">UNNATI SOCIETY</h2>
                <p className="text-[8px] text-blue-200 uppercase tracking-widest mt-0.5 font-bold">Institute Outreach</p>
              </div>
            )}
          </div>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>


        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide pb-6">
          {sidebarGroups.map((group, idx) => (
            <div key={idx}>
              {!isLeftCollapsed && <h3 className="text-[9px] font-extrabold text-blue-300/70 uppercase tracking-widest mb-3 px-4">{group.title}</h3>}
              <ul className={`space-y-1 ${isLeftCollapsed ? 'mt-4' : ''}`}>
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = currentPath.startsWith(item.path);
                  return (
                    <li key={i}>
                      <Link 
                        to={item.path}
                        title={isLeftCollapsed ? item.name : ''}
                        className={`flex items-center gap-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${isLeftCollapsed ? 'justify-center px-0' : 'px-4'} ${isActive ? 'bg-[#2563EB]/20 text-white border border-[#2563EB]/30' : 'text-blue-200/80 hover:bg-white/5 hover:text-white'}`}
                      >
                        <Icon size={16} />
                        {!isLeftCollapsed && <span>{item.name}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

      </aside>

      {/* OVERLAY FOR MOBILE */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* MIDDLE & RIGHT PANEL CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-3 flex items-center justify-between gap-4 shrink-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <button 
              className="hidden lg:block text-gray-500 hover:text-[#2563EB] transition-colors" 
              onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
              title={isLeftCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={20} />
            </button>
            
            {/* Search */}
            <div className="relative hidden md:block max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search volunteers, students, schools, programs..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Date Range */}
            <div 
              onClick={() => setShowCalendar(true)}
              className="hidden lg:flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span>{calendarStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {calendarEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <CalendarDays size={14} className="text-gray-400 ml-1"/>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

            {/* Icons */}
            <NotificationDropdown />
            <MessageNotification />

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-[#0F172A] leading-tight">Admin</p>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">{currentUser?.email || 'unnati.ir@iiitbh.ac.in'}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 shadow-sm group-hover:border-blue-500 transition-all bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT + RIGHT SIDEBAR WRAPPER */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Dashboard Scroll Area */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-hide">
            


            {children}
            
            {/* FOOTER */}
            <footer className="mt-12 bg-[#0B1F5E] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-6-3v7.5l6 3 6-3v-7.5l-6 3z" /></svg>
                </div>
                <div>
                  <h2 className="font-extrabold text-white text-sm tracking-tight leading-none">UNNATI SOCIETY</h2>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-blue-200">
                <a href="#" className="hover:text-white transition-colors">Programs</a>
                <a href="#" className="hover:text-white transition-colors">Resources</a>
                <a href="#" className="hover:text-white transition-colors">Contact Information</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </div>

              <div className="text-[10px] text-blue-300/50 font-medium text-center md:text-right">
                <p>&copy; 2026 Unnati Society. All Rights Reserved.</p>
                <p className="mt-1">Building Brighter Futures, Together.</p>
              </div>
            </footer>
          </main>



        </div>
      </div>
      
      <CalendarRemindersModal 
        isOpen={showCalendar} 
        onClose={() => setShowCalendar(false)} 
        startDate={calendarStart}
        endDate={calendarEnd}
      />
    </div>
  );
};

export default AdminLayout;
