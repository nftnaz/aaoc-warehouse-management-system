import React from 'react';
import { Settings, ShieldCheck, Mail, Database, Bell } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#024097]" />
          System Settings & Warehouse Configuration
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Configure organization branding, bin layout rules, automated emails, and database backups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Company Profile */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 space-y-3">
          <h3 className="text-sm font-extrabold text-[#024097] flex items-center gap-2 pb-2 border-b">
            <ShieldCheck className="w-4 h-4 text-[#024097]" />
            Organization Profile
          </h3>
          <div className="text-xs space-y-2">
            <div>
              <span className="font-bold text-slate-700 block">Company Name:</span>
              <span className="text-slate-900 font-bold">Arab African Oil Company (AAOC) + Gabon Oil Company (IO)</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block">Warehouse Location:</span>
              <span className="text-slate-900">Port Gentil Central Supply Base, Gabon</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block">Operational Standard:</span>
              <span className="text-slate-900">API Spec Q1 / ISO 9001:2015</span>
            </div>
          </div>
        </div>

        {/* Card 2: Notification Rules */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 space-y-3">
          <h3 className="text-sm font-extrabold text-[#024097] flex items-center gap-2 pb-2 border-b">
            <Bell className="w-4 h-4 text-[#024097]" />
            Automated Notification Routing
          </h3>
          <div className="text-xs space-y-2">
            <div className="p-2 bg-slate-50 rounded border flex items-center justify-between">
              <span>RMR Submitted &rarr; Warehouse Alert Email</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
            <div className="p-2 bg-slate-50 rounded border flex items-center justify-between">
              <span>RMR Approved &rarr; Engineer Notification</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
            <div className="p-2 bg-slate-50 rounded border flex items-center justify-between">
              <span>Manifest Dispatched &rarr; Field Team Email</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
            <div className="p-2 bg-slate-50 rounded border flex items-center justify-between">
              <span>Field Ack &rarr; Auto-return Email to Depot</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
