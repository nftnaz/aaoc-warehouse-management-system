import React, { useState } from 'react';
import { 
  Home, 
  ArrowDownLeft, 
  Boxes, 
  ArrowUpRight, 
  FilePlus, 
  Truck, 
  BarChart3, 
  ChevronDown, 
  Users, 
  Settings, 
  History, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onNavigate: (moduleName: string) => void;
  currentUserRole: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onNavigate, currentUserRole }) => {
  const [reportsOpen, setReportsOpen] = useState(
    activeModule.startsWith('Report') || activeModule === 'Reports'
  );

  const navItems = [
    { name: 'Dashboard', icon: Home, badge: null },
    { name: 'Materials Inward', icon: ArrowDownLeft, badge: null },
    { name: 'Materials Stock Report', icon: Boxes, badge: null },
    { name: 'Materials Outward', icon: ArrowUpRight, badge: null },
    { name: 'Create RMR', icon: FilePlus, badge: 'NEW' },
    { name: 'Create Manifest', icon: Truck, badge: null },
  ];

  const reportItems = [
    'Report of Inward',
    'Report of Outward',
    'Report of Manifest',
    'RMR Report',
    'Stock Movement Report',
    'Low Stock Report'
  ];

  const bottomItems = [
    { name: 'User Management', icon: Users },
    { name: 'Settings', icon: Settings },
    { name: 'Audit Trail', icon: History }
  ];

  return (
    <aside className="w-64 bg-[#031C3F] text-slate-200 min-h-[calc(100vh-100px)] flex flex-col justify-between shrink-0 select-none shadow-xl border-r border-blue-900/50">
      
      {/* Top Nav Group */}
      <div className="py-4 px-3 space-y-1">
        
        {/* Main Nav Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-700/40 border-l-4 border-amber-400 pl-2.5'
                  : 'hover:bg-blue-900/40 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-300'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Reports Accordion Group */}
        <div className="pt-1">
          <button
            onClick={() => setReportsOpen(!reportsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeModule.includes('Report') || activeModule === 'Reports'
                ? 'bg-blue-900/80 text-white'
                : 'hover:bg-blue-900/40 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4 text-blue-300" />
              <span>Reports</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${reportsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {reportsOpen && (
            <div className="ml-4 pl-3 mt-1 border-l border-blue-800/80 space-y-1">
              {reportItems.map((rep) => {
                const isSubActive = activeModule === rep || (activeModule === 'Reports' && rep === 'Report of Inward');
                return (
                  <button
                    key={rep}
                    onClick={() => onNavigate(rep)}
                    className={`w-full text-left py-1.5 px-2 rounded text-[11px] font-semibold transition-colors flex items-center gap-2 ${
                      isSubActive ? 'text-amber-300 font-bold bg-blue-800/50' : 'text-slate-400 hover:text-slate-100 hover:bg-blue-900/30'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>{rep}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Group */}
      <div className="p-3 border-t border-blue-900/60 space-y-1">
        
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-blue-900/40 text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-blue-300" />
              <span>{item.name}</span>
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={() => {
            alert('Logged out from AAOC Warehouse ERP. Re-logging as Logistics Supervisor...');
            onNavigate('Dashboard');
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-red-300 hover:bg-red-950/40 hover:text-red-100 transition-colors mt-2"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Logout</span>
        </button>

        {/* Role Badge Footer */}
        <div className="mt-3 p-2 bg-blue-950/80 rounded border border-blue-800/60 text-center">
          <p className="text-[10px] text-blue-300 font-medium">Logged in as:</p>
          <p className="text-xs font-extrabold text-amber-300 truncate">{currentUserRole}</p>
        </div>

      </div>
    </aside>
  );
};
