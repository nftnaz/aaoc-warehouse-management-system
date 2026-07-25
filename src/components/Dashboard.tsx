import React from 'react';
import { 
  Download, 
  Boxes, 
  Upload, 
  FilePlus2, 
  Truck, 
  BarChart3, 
  ArrowRight, 
  DollarSign, 
  FileCheck2, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Settings, 
  ShieldAlert, 
  Building2, 
  Flame, 
  ShieldCheck, 
  Inbox, 
  PackageCheck
} from 'lucide-react';
import { DashboardKPIs, Notification, RMRRequest, Manifest } from '../types';

// Using background image generated for workover rig oilfield atmosphere
import bgRigImage from '../assets/images/workover_rig_bg_1784977414465.jpg';

interface DashboardProps {
  kpis: DashboardKPIs;
  notifications: Notification[];
  onNavigate: (moduleName: string) => void;
  onAcknowledgeManifest: (manifestId: string) => void;
  recentRMRs: RMRRequest[];
  recentManifests: Manifest[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  kpis,
  notifications,
  onNavigate,
  onAcknowledgeManifest,
  recentRMRs,
  recentManifests
}) => {
  return (
    <div 
      className="relative min-h-[calc(100vh-100px)] bg-cover bg-center bg-fixed text-slate-800 p-4 lg:p-6 space-y-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.72), rgba(3, 28, 63, 0.88)), url(${bgRigImage})`
      }}
    >
      <div className="max-w-[1800px] mx-auto space-y-6">

        {/* Top Section: Main Tiles (Left 2/3) + KPIs Panel (Right 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Dashboard 6 Tiles (Cols 1 to 7/8) */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Tile 1: Materials Inward */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#024097] flex items-center justify-center font-bold shadow-inner group-hover:bg-[#024097] group-hover:text-white transition-colors">
                    <Download className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Materials Inward</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Record and manage inward materials, GRN, QC & OSDR.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigate('Materials Inward')}
                  className="px-4 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all group-hover:translate-x-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tile 2: Materials Stock Report */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#024097] flex items-center justify-center font-bold shadow-inner group-hover:bg-[#024097] group-hover:text-white transition-colors">
                    <Boxes className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Materials Stock Report</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">View and analyze current stock status, bin locations & batches.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigate('Materials Stock Report')}
                  className="px-4 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all group-hover:translate-x-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tile 3: Materials Outward */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#024097] flex items-center justify-center font-bold shadow-inner group-hover:bg-[#024097] group-hover:text-white transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Materials Outward</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Issue and manage outward materials, picking & gate passes.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigate('Materials Outward')}
                  className="px-4 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all group-hover:translate-x-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tile 4: Create RMR (NEW) */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden">
              <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow uppercase">
                NEW
              </span>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-inner group-hover:bg-purple-700 group-hover:text-white transition-colors">
                    <FilePlus2 className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Create RMR</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Raise Material Requisition Request for field rigs & sites.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigate('Create RMR')}
                  className="px-4 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all group-hover:translate-x-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tile 5: Create Manifest */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shadow-inner group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Truck className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Create Manifest</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Create and manage material shipping manifests for rigs.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigate('Create Manifest')}
                  className="px-4 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all group-hover:translate-x-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tile 6: Reports */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-inner group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Reports</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Inward, Outward, Manifest, Dead Stock & Consumption Analytics.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => onNavigate('Reports')}
                  className="px-4 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all group-hover:translate-x-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Side: KPI Panel (Cols 8 to 12) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-[#024097] tracking-wider uppercase flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#024097]" />
                  Key Performance Indicators
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Live Data</span>
              </div>

              {/* KPI Grid 2x4 */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                
                {/* KPI 1 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#024097] flex items-center justify-center font-bold shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Total Stock Value</div>
                    <div className="text-sm font-black text-slate-900">
                      ${kpis.totalStockValue.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Today's GRN</div>
                    <div className="text-base font-black text-slate-900">{kpis.todaysGRN}</div>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Today's Dispatch</div>
                    <div className="text-base font-black text-slate-900">{kpis.todaysDispatch}</div>
                  </div>
                </div>

                {/* KPI 4 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Pending RMR</div>
                    <div className="text-base font-black text-purple-900">{kpis.pendingRMR}</div>
                  </div>
                </div>

                {/* KPI 5 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Pending Manifest</div>
                    <div className="text-base font-black text-slate-900">{kpis.pendingManifest}</div>
                  </div>
                </div>

                {/* KPI 6 */}
                <div className="p-3 bg-red-50/80 rounded-lg border border-red-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-red-600 uppercase">Low Stock Items</div>
                    <div className="text-base font-black text-red-700">{kpis.lowStockItems}</div>
                  </div>
                </div>

                {/* KPI 7 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Active Rigs</div>
                    <div className="text-base font-black text-slate-900">{kpis.activeRigs}</div>
                  </div>
                </div>

                {/* KPI 8 */}
                <div className="p-3 bg-slate-50/90 rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Rigless Requests</div>
                    <div className="text-base font-black text-slate-900">{kpis.riglessRequests}</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-semibold">
              <span>OSDR Pending Entry: <strong className="text-amber-700">{kpis.osdrPending}</strong></span>
              <button 
                onClick={() => onNavigate('Materials Inward')}
                className="text-[#024097] hover:underline font-bold"
              >
                View OSDR →
              </button>
            </div>
          </div>

        </div>

        {/* Middle Section: Quick Access Modules (Left) + Latest Notifications (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Quick Access Modules */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80">
            <h3 className="text-xs font-extrabold text-[#024097] tracking-wider uppercase mb-3 flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[#024097]" />
              Quick Access Modules
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              
              <button onClick={() => onNavigate('Materials Inward')} className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <Download className="w-5 h-5 text-[#024097] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Inward</span>
              </button>

              <button onClick={() => onNavigate('Materials Stock Report')} className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <Boxes className="w-5 h-5 text-[#024097] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Stock Report</span>
              </button>

              <button onClick={() => onNavigate('Materials Outward')} className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <Upload className="w-5 h-5 text-[#024097] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Outward</span>
              </button>

              <button onClick={() => onNavigate('Create RMR')} className="p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group relative">
                <span className="absolute top-1 right-1 bg-amber-500 text-slate-950 text-[8px] font-black px-1 rounded">NEW</span>
                <FilePlus2 className="w-5 h-5 text-purple-700 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Create RMR</span>
              </button>

              <button onClick={() => onNavigate('Create Manifest')} className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <Truck className="w-5 h-5 text-teal-700 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Manifest</span>
              </button>

              <button onClick={() => onNavigate('Reports')} className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <BarChart3 className="w-5 h-5 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Reports</span>
              </button>

              <button onClick={() => onNavigate('User Management')} className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <Users className="w-5 h-5 text-slate-700 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Users</span>
              </button>

              <button onClick={() => onNavigate('Settings')} className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center transition-all group">
                <Settings className="w-5 h-5 text-slate-700 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-slate-800 leading-tight">Settings</span>
              </button>

            </div>
          </div>

          {/* Latest Notifications List */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-extrabold text-[#024097] tracking-wider uppercase flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#024097]" />
                Latest Notifications
              </h3>
              <button 
                onClick={() => onNavigate('Audit Trail')} 
                className="text-xs font-bold text-[#024097] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto mt-2">
              {notifications.map((notif) => (
                <div key={notif.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    {notif.type === 'RMR_APPROVED' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    {notif.type === 'MANIFEST_CREATED' && <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                    {notif.type === 'LOW_STOCK' && <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
                    {notif.type === 'ACKNOWLEDGEMENT' && <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />}
                    {notif.type === 'QC_ALERT' && <FileCheck2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-bold text-slate-900">{notif.title}</p>
                      <p className="text-slate-600 text-[11px] leading-snug">{notif.message}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">{notif.timestamp}</span>
                    {notif.type === 'MANIFEST_CREATED' && notif.relatedId && (
                      <button
                        onClick={() => onAcknowledgeManifest(notif.relatedId!)}
                        className="mt-1 px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded shadow transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section: Summary Overview */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-xl border border-slate-200/80">
          <div className="pb-3 border-b border-slate-200 mb-4">
            <h3 className="text-xs font-extrabold text-[#024097] tracking-wider uppercase flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#024097]" />
              Summary Overview
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Summary 1 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Total Items</div>
              <div className="text-xl font-black text-slate-900 mt-1">{kpis.totalItemsCount.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">All Stock Items</div>
            </div>

            {/* Summary 2 */}
            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">Available Stock Items</div>
              <div className="text-xl font-black text-emerald-700 mt-1">{kpis.availableStockItems.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-600 mt-0.5">Ready for Issue</div>
            </div>

            {/* Summary 3 */}
            <div className="p-3 bg-red-50/80 rounded-lg border border-red-200">
              <div className="text-[10px] font-bold text-red-700 uppercase">Critical Stock Items</div>
              <div className="text-xl font-black text-red-700 mt-1">{kpis.criticalStockItems}</div>
              <div className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                <ShieldAlert className="w-3 h-3 text-red-600" />
                <span>Requires Attention</span>
              </div>
            </div>

            {/* Summary 4 */}
            <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200">
              <div className="text-[10px] font-bold text-purple-800 uppercase">Dead Stock Items</div>
              <div className="text-xl font-black text-purple-900 mt-1">{kpis.deadStockItems}</div>
              <div className="text-[10px] text-purple-600 mt-0.5">Not Moved &gt; 180 Days</div>
            </div>

            {/* Summary 5 */}
            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
              <div className="text-[10px] font-bold text-amber-800 uppercase">OSDR Pending</div>
              <div className="text-xl font-black text-amber-900 mt-1">{kpis.osdrPending}</div>
              <div className="text-[10px] text-amber-700 mt-0.5">Pending Claims</div>
            </div>

            {/* Summary 6 */}
            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200">
              <div className="text-[10px] font-bold text-[#024097] uppercase">QC Pending</div>
              <div className="text-xl font-black text-[#024097] mt-1">{kpis.qcPending}</div>
              <div className="text-[10px] text-blue-600 mt-0.5">Pending Inspection</div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Bar */}
      <footer className="w-full bg-[#031C3F] text-amber-300 py-2.5 px-4 text-center rounded-lg shadow-inner border border-blue-900 flex items-center justify-center gap-2 text-xs font-black tracking-wider uppercase">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span>Safety First. Quality Always. Excellence in Every Operation.</span>
      </footer>
    </div>
  );
};
