import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, UserSquare2, School, Handshake,
  FolderKanban, CalendarDays, CheckSquare, BarChart3, Settings, ShieldAlert,
  Bell, MessageSquare, ChevronDown, Menu, Search, FileText, IndianRupee,
  Activity, Zap, X, PanelRight
} from 'lucide-react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import MessageNotification from './MessageNotification';
import { useAuth } from '../../../contexts/AuthContext';

const sidebarGroups = [
  {
    title: 'Management',
    items: [
      { name: 'User Management', icon: Users, path: '/admin/users' },
      { name: 'Team Leads', icon: UserSquare2, path: '/admin/teamleads' },
      { name: 'Volunteers', icon: Handshake, path: '/admin/volunteers' },
      { name: 'Students', icon: GraduationCap, path: '/admin/students' },
      { name: 'Schools & Partners', icon: School, path: '/admin/schools' },
      { name: 'Roles & Permissions', icon: ShieldAlert, path: '/admin/roles' },
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'Initiatives', icon: FolderKanban, path: '/admin/initiatives' },
      { name: 'Events Management', icon: CalendarDays, path: '/admin/events' },
      { name: 'Sessions', icon: CalendarDays, path: '/admin/sessions' },
      { name: 'Tasks & Assignments', icon: CheckSquare, path: '/admin/tasks' },
      { name: 'Attendance', icon: UserSquare2, path: '/admin/attendance' },
      { name: 'Resources', icon: FileText, path: '/admin/resources' },
      { name: 'Feedback', icon: MessageSquare, path: '/admin/feedback' },
      { name: 'Messages', icon: Bell, path: '/admin/messages' },
    ]
  },
  {
    title: 'Analytics',
    items: [
      { name: 'Reports & Analytics', icon: BarChart3, path: '/admin/reports' },
      { name: 'Impact Dashboard', icon: Activity, path: '/admin/impact' },
      { name: 'Data Visualization', icon: BarChart3, path: '/admin/data' },
      { name: 'Export Center', icon: FileText, path: '/admin/export' },
    ]
  },
  {
    title: 'Finance & Support',
    items: [
      { name: 'Donations & Funds', icon: IndianRupee, path: '/admin/funds' },
      { name: 'Expense Management', icon: IndianRupee, path: '/admin/expenses' },
      { name: 'Help Center', icon: MessageSquare, path: '/admin/help' },
      { name: 'Support Tickets', icon: Handshake, path: '/admin/support' },
      { name: 'System Settings', icon: Settings, path: '/admin/settings' },
    ]
  }
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();

  // Protect Admin Dashboard
  if (!currentUser || currentUser.email !== 'unnati.ir@iiitbh.ac.in') {
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

        {/* Dashboard Link */}
        <div className="px-4 mb-4">
          <Link 
            to="/admin/dashboard"
            className={`flex items-center gap-3 py-3 rounded-xl font-bold text-sm transition-all ${isLeftCollapsed ? 'justify-center px-0' : 'px-4'} ${currentPath === '/admin/dashboard' ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20' : 'text-blue-100 hover:bg-white/5 hover:text-white'}`}
            title={isLeftCollapsed ? 'Dashboard' : ''}
          >
            <LayoutDashboard size={18} />
            {!isLeftCollapsed && <span>Dashboard</span>}
          </Link>
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

        {/* Bottom Card */}
        {!isLeftCollapsed && (
          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-br from-[#2563EB] to-blue-700 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg border border-blue-500/30">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-md"></div>
              <h4 className="font-extrabold text-sm mb-1 leading-tight">Powering Change.</h4>
              <h4 className="font-extrabold text-[#FBBF24] text-sm mb-3 leading-tight">Creating Impact.</h4>
              <p className="text-[10px] text-blue-100 mb-4 font-medium leading-relaxed">Unnati Society is building a brighter tomorrow through education, outreach and community empowerment.</p>
              <button className="w-full bg-[#FBBF24] hover:bg-yellow-400 text-[#0B1F5E] font-extrabold text-[11px] py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md">
                View Impact Report <Zap size={12}/>
              </button>
            </div>
          </div>
        )}
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
            <div className="hidden lg:flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
              <span>May 12 – May 18, 2026</span>
              <CalendarDays size={14} className="text-gray-400 ml-1"/>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

            {/* Icons */}
            <button 
              className="hidden xl:block relative text-gray-500 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsRightCollapsed(!isRightCollapsed)}
              title={isRightCollapsed ? "Show Analytics Panel" : "Hide Analytics Panel"}
            >
              <PanelRight size={20} />
            </button>
            <NotificationDropdown />
            <MessageNotification />

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-[#0F172A] leading-tight">Admin</p>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">unnati.ir@iiitbh.ac.in</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 shadow-sm group-hover:border-blue-500 transition-all bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                A
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2" title="Logout">
                <X size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT + RIGHT SIDEBAR WRAPPER */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Dashboard Scroll Area */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-hide">
            
            {/* Page Header (Optional, if children don't provide it) */}
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
                Welcome back, Admin! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">Here's an overview of everything happening in Unnati Society.</p>
            </div>

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
                <p className="mt-1">Designed with ❤️ for a better tomorrow.</p>
              </div>
            </footer>
          </main>

          {/* RIGHT SIDEBAR (Desktop Only, collapses on smaller screens or stacks) */}
          <aside className={`hidden xl:flex bg-white border-l border-gray-100 flex-col overflow-y-auto scrollbar-hide shrink-0 transition-all duration-300 ${isRightCollapsed ? 'w-0 border-none p-0 opacity-0 overflow-hidden' : 'w-80 p-6 opacity-100'}`}>
            <div className="w-[272px]"> {/* Fixed width inner container to prevent text wrapping during animation */}
              {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full py-2.5 px-4 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-bold text-xs hover:bg-[#2563EB] hover:text-white transition-all text-center">Add New User</button>
                <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all text-center">Create Initiative</button>
                <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all text-center">Schedule Session</button>
                <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all text-center">Generate Report</button>
                <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all text-center">Send Announcement</button>
                <button className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all text-center">Manage Roles</button>
              </div>
            </div>

            {/* System Alerts */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">System Alerts</h3>
                <span className="text-[10px] font-bold text-[#2563EB] cursor-pointer hover:underline">View All</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
                  <ShieldAlert size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-orange-900 leading-tight">3 pending volunteer approvals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                  <CheckSquare size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-green-900 leading-tight">Server backup completed successfully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                  <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-red-900 leading-tight">2 support tickets need attention</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <Activity size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-blue-900 leading-tight">Monthly report is ready to download</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Usage */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">Data Usage</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 cursor-pointer">
                  This Month <ChevronDown size={12}/>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-500">Storage Usage</span>
                  <span className="text-[#0F172A]">65%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1">6.5 GB / 10 GB</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-500">Bandwidth Usage</span>
                  <span className="text-[#0F172A]">45%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1">45 GB / 100 GB</p>
              </div>
            </div>

            {/* Active Users */}
            <div className="mb-8">
              <h3 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-4">Active Users</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden mb-3">
                <p className="text-[10px] font-extrabold text-gray-500 uppercase">Online Now</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-[#0F172A] leading-none">128</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-2">vs last hour <span className="text-green-500 ml-1">↑ 18%</span></p>
                {/* Mock Sparkline */}
                <svg className="absolute bottom-0 right-0 w-24 h-12 opacity-50" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,30 L0,20 L10,25 L20,15 L30,22 L40,10 L50,18 L60,5 L70,12 L80,2 L90,8 L100,0 L100,30 Z" fill="#22c55e" opacity="0.2"/>
                  <path d="M0,20 L10,25 L20,15 L30,22 L40,10 L50,18 L60,5 L70,12 L80,2 L90,8 L100,0" fill="none" stroke="#22c55e" strokeWidth="2"/>
                </svg>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                <p className="text-[10px] font-extrabold text-gray-500 uppercase">This Week</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-[#0F172A] leading-none">1,245</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 mt-2">vs last week <span className="text-green-500 ml-1">↑ 12%</span></p>
                {/* Mock Sparkline */}
                <svg className="absolute bottom-0 right-0 w-24 h-12 opacity-50" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,30 L0,15 L10,20 L20,10 L30,15 L40,5 L50,12 L60,2 L70,8 L80,0 L90,5 L100,0 L100,30 Z" fill="#3b82f6" opacity="0.2"/>
                  <path d="M0,15 L10,20 L20,10 L30,15 L40,5 L50,12 L60,2 L70,8 L80,0 L90,5 L100,0" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            {/* Shortcuts */}
            <div>
              <h3 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mb-4">Shortcuts</h3>
              <div className="space-y-1">
                <a href="#" className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/5 p-2 rounded-lg transition-colors">
                  <FolderKanban size={14} className="text-gray-400"/> View All Initiatives
                </a>
                <a href="#" className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/5 p-2 rounded-lg transition-colors">
                  <Users size={14} className="text-gray-400"/> Volunteer Directory
                </a>
                <a href="#" className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/5 p-2 rounded-lg transition-colors">
                  <CalendarDays size={14} className="text-gray-400"/> Session Calendar
                </a>
                <a href="#" className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/5 p-2 rounded-lg transition-colors">
                  <BarChart3 size={14} className="text-gray-400"/> Download Reports
                </a>
                <a href="#" className="flex items-center gap-3 text-xs font-bold text-gray-600 hover:text-[#2563EB] hover:bg-[#2563EB]/5 p-2 rounded-lg transition-colors">
                  <MessageSquare size={14} className="text-gray-400"/> Feedback Analytics
                </a>
              </div>
            </div>

            </div> {/* End fixed width container */}
          </aside>

        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
