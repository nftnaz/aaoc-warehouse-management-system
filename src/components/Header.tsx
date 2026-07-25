import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, CheckCircle2, AlertTriangle, FileText, Truck, ShieldCheck, X } from 'lucide-react';
import { Logo } from './Logo';
import { Notification, UserRole } from '../types';

interface HeaderProps {
  notifications: Notification[];
  onNotificationClick: (notif: Notification) => void;
  onSearch: (query: string) => void;
  currentUserRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNavigate: (module: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onNotificationClick,
  onSearch,
  currentUserRole,
  onRoleChange,
  onNavigate
}) => {
  const [timeString, setTimeString] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      const datePart = now.toLocaleDateString('en-US', options);
      const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setTimeString(`${datePart} | ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSearchModal(true);
    }
  };

  return (
    <header className="w-full bg-white shadow-md border-b border-slate-200 sticky top-0 z-40">
      {/* Top Header Section */}
      <div className="max-w-[1920px] mx-auto px-4 py-2 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('Dashboard')}>
          <Logo variant="full" className="shrink-0 scale-95 origin-left" />
        </div>

        {/* Center Title & Subtitle */}
        <div className="hidden md:flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl lg:text-3xl font-black text-[#024097] tracking-tight flex items-center gap-2">
            Warehouse Management System
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-0.5">
            <span className="w-8 h-[2px] bg-amber-500"></span>
            <span>Efficient Handling. Accurate Records. Complete Control.</span>
            <span className="w-8 h-[2px] bg-amber-500"></span>
          </div>
        </div>

        {/* Right Section: Search, Bell & User Profile */}
        <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-64 md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (Item Code, Description, RMR, GRN...)"
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#024097] focus:bg-white text-slate-800 placeholder-slate-400 font-medium transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-[#024097]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#024097]" />
                    <span className="font-bold text-slate-800 text-sm">System Notifications</span>
                  </div>
                  <span className="text-[11px] bg-blue-100 text-[#024097] px-2 py-0.5 rounded-full font-bold">
                    {unreadCount} New
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onNotificationClick(n);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-xs hover:bg-blue-50/60 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex items-start gap-2.5">
                        {n.type === 'RMR_APPROVED' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {n.type === 'MANIFEST_CREATED' && <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                        {n.type === 'LOW_STOCK' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                        {n.type === 'ACKNOWLEDGEMENT' && <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />}
                        {n.type === 'QC_ALERT' && <FileText className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">{n.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-100 text-center bg-slate-50">
                  <button
                    onClick={() => {
                      onNavigate('Audit Trail');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-bold text-[#024097] hover:underline"
                  >
                    View All Audit Trails & Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#024097] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden xl:block leading-tight">
                <div className="text-[11px] text-slate-500 font-semibold">Welcome,</div>
                <div className="text-xs font-bold text-slate-800">{currentUserRole}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">Switch Role / User Context</p>
                  <p className="text-[10px] text-slate-500">Test engineer or warehouse supervisor views</p>
                </div>
                <div className="py-1">
                  {(['Warehouse Supervisor', 'Field Engineer', 'QC Inspector', 'Logistics Manager'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange(role);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center justify-between ${
                        currentUserRole === role ? 'font-bold text-[#024097] bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{role}</span>
                      {currentUserRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-[#024097]" />}
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-100 mt-1 pt-1 px-4 py-1.5 text-[11px] text-slate-500 flex justify-between">
                  <span>Dept: Logistics & Field Ops</span>
                  <span className="font-mono text-emerald-600 font-bold">● Online</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sub-Header Dark Bar */}
      <div className="w-full bg-[#031C3F] text-white px-4 py-1 text-xs font-medium flex flex-wrap items-center justify-between border-t border-blue-900 shadow-inner">
        <div className="flex items-center gap-3">
          <span className="bg-blue-900/60 px-2.5 py-0.5 rounded text-[11px] tracking-wide text-blue-200 font-semibold border border-blue-700/50">
            {timeString || 'Tuesday, May 20, 2025 | 02:45 PM'}
          </span>
        </div>
        <div className="hidden sm:block text-slate-300 tracking-wider font-semibold text-[11px] italic">
          AAOC - Powering Progress, Energizing Africa
        </div>
      </div>

      {/* Global Search Results Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#024097]" />
                Global Search Results for "{searchQuery}"
              </h3>
              <button onClick={() => setShowSearchModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-xs text-slate-600">
                Matching modules and items found in inventory, RMR, and Manifest records:
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div
                  onClick={() => {
                    onNavigate('Materials Stock Report');
                    setShowSearchModal(false);
                  }}
                  className="p-3 bg-slate-50 rounded-lg hover:bg-blue-50 cursor-pointer border border-slate-200"
                >
                  <span className="font-bold text-xs text-[#024097]">Stock Items Matching "{searchQuery}"</span>
                  <p className="text-[11px] text-slate-600">Click to view in Materials Stock Report</p>
                </div>
                <div
                  onClick={() => {
                    onNavigate('Create RMR');
                    setShowSearchModal(false);
                  }}
                  className="p-3 bg-slate-50 rounded-lg hover:bg-blue-50 cursor-pointer border border-slate-200"
                >
                  <span className="font-bold text-xs text-amber-700">RMR Records Matching "{searchQuery}"</span>
                  <p className="text-[11px] text-slate-600">Click to view in Requisition Requests</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSearchModal(false)}
                className="px-4 py-1.5 bg-[#024097] text-white rounded text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
