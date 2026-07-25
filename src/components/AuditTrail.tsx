import React, { useState } from 'react';
import { History, Search, ShieldCheck, Filter } from 'lucide-react';
import { AuditLog } from '../types';

interface AuditTrailProps {
  logs: AuditLog[];
}

export const AuditTrail: React.FC<AuditTrailProps> = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState('ALL');

  const filteredLogs = logs.filter(l => {
    const matchesSearch = 
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase());
    
    const matchesModule = selectedModule === 'ALL' || l.module === selectedModule;

    return matchesSearch && matchesModule;
  });

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
            <History className="w-6 h-6 text-[#024097]" />
            Complete ERP Audit Trail & System Log
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Immutable tracking log of user actions, approvals, manifest creations, and stock updates.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User, Action, or Log details..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold"
          >
            <option value="ALL">All ERP Modules</option>
            <option value="Create RMR">Create RMR</option>
            <option value="Create Manifest">Create Manifest</option>
            <option value="Materials Inward">Materials Inward</option>
            <option value="Materials Stock Report">Materials Stock Report</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-xs divide-y divide-slate-200">
          <thead className="bg-[#031C3F] text-white font-bold text-[11px] uppercase">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">User</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
              <th className="p-3">Module</th>
              <th className="p-3">Log Details</th>
              <th className="p-3">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredLogs.map((l) => (
              <tr key={l.id} className="hover:bg-blue-50/50">
                <td className="p-3 font-mono text-slate-500 whitespace-nowrap">{l.timestamp}</td>
                <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{l.user}</td>
                <td className="p-3 font-bold text-purple-900 bg-purple-50 whitespace-nowrap">{l.role}</td>
                <td className="p-3 font-black text-[#024097] whitespace-nowrap">{l.action}</td>
                <td className="p-3 font-semibold text-slate-700 whitespace-nowrap">{l.module}</td>
                <td className="p-3 text-slate-700">{l.details}</td>
                <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{l.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
