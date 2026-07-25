import React, { useState } from 'react';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Printer, 
  Mail, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { StockItem, RMRRequest, Manifest, GRNEntry } from '../types';

interface ReportsProps {
  initialReportType?: string;
  stockItems: StockItem[];
  rmrList: RMRRequest[];
  manifests: Manifest[];
  grns: GRNEntry[];
}

export const Reports: React.FC<ReportsProps> = ({
  initialReportType = 'Report of Inward',
  stockItems,
  rmrList,
  manifests,
  grns
}) => {
  const [selectedReport, setSelectedReport] = useState<string>(initialReportType);
  const [dateRange, setDateRange] = useState<string>('This Month');
  const [emailScheduleActive, setEmailScheduleActive] = useState<boolean>(true);
  const [scheduleEmail, setScheduleEmail] = useState<string>('logistics@aaoc-gabon.com');

  const reportList = [
    'Report of Inward',
    'Report of Outward',
    'Report of Manifest',
    'GRN Report',
    'OSDR Report',
    'RMR Report',
    'Stock Movement Report',
    'Dead Stock Report',
    'Low Stock Report',
    'Fast Moving Items',
    'Slow Moving Items',
    'Bin-wise Report',
    'Monthly Consumption',
    'Transaction History',
    'User Activity Log',
    'Automatic Email Schedule'
  ];

  // Chart Mock Data for Monthly Consumption
  const monthlyData = [
    { month: 'Jan', inward: 120, outward: 95 },
    { month: 'Feb', inward: 140, outward: 110 },
    { month: 'Mar', inward: 180, outward: 160 },
    { month: 'Apr', inward: 200, outward: 175 },
    { month: 'May', inward: 240, outward: 210 }
  ];

  const categoryDistribution = [
    { name: 'Drilling Chemicals', value: 450, color: '#024097' },
    { name: 'Pipes & Casing', value: 320, color: '#059669' },
    { name: 'Valves & Flanges', value: 180, color: '#D97706' },
    { name: 'Safety Equipment', value: 120, color: '#7C3AED' }
  ];

  const handleExportCSV = () => {
    alert(`Exporting ${selectedReport} to Excel/CSV spreadsheet...`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#024097]" />
            Oilfield Warehouse ERP Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Comprehensive audit reports, consumption analytics, movement velocity & automated report distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-[#024097] hover:bg-blue-800 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Selector Dropdown & Filter Controls */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Report Type</label>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="w-full p-2.5 text-xs font-extrabold text-[#024097] bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024097]"
          >
            {reportList.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Time Period</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-2.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month (May 2025)</option>
            <option value="Last Quarter">Last Quarter</option>
            <option value="Year 2025">Full Year 2025</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Warehouse Filter</label>
          <select className="w-full p-2.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg">
            <option value="ALL">Central Supply Depot - Port Gentil (All Bays)</option>
            <option value="BAY-A">Bay A - Chemicals & Powders</option>
            <option value="YARD-B">Yard B - Tubulars & Casings</option>
          </select>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Consumption vs Inward Bar Chart */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-xs font-extrabold text-[#024097] uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#024097]" />
            Monthly Material Inward vs Outward Movement (Tons/Units)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                <YAxis style={{ fontSize: '11px' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="inward" fill="#024097" name="Inward GRN Receipts" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outward" fill="#D97706" name="Outward Issues to Rigs" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-xs font-extrabold text-[#024097] uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#024097]" />
            Inventory Volume Distribution by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Automatic Email Configuration View (if selected) */}
      {selectedReport === 'Automatic Email Schedule' ? (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-extrabold text-[#024097] flex items-center gap-2 pb-2 border-b border-slate-200">
            <Mail className="w-5 h-5 text-purple-700" />
            Automatic Email Report Distribution Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Recipients Email List *</label>
              <input
                type="email"
                value={scheduleEmail}
                onChange={(e) => setScheduleEmail(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Report Schedule Frequency</label>
              <select className="w-full p-2.5 border border-slate-300 rounded font-bold">
                <option value="Daily">Daily Summary (06:00 AM)</option>
                <option value="Weekly">Weekly Digest (Mondays 08:00 AM)</option>
                <option value="Monthly">Monthly Closing Report</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => alert(`Automatic Email Schedule saved for ${scheduleEmail}!`)}
            className="px-5 py-2 bg-[#024097] text-white font-extrabold rounded text-xs shadow"
          >
            Save Automatic Email Schedule
          </button>
        </div>
      ) : (
        /* Dynamic Data Table for Selected Report */
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#024097]" />
              Data Records for "{selectedReport}"
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
              Verified Operational Logs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-[#031C3F] text-white font-bold text-[11px] uppercase">
                <tr>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Item / Entity</th>
                  <th className="p-3">Category / Field</th>
                  <th className="p-3 text-right">Quantity</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp / Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {stockItems.slice(0, 6).map((st, idx) => (
                  <tr key={st.id} className="hover:bg-blue-50/50">
                    <td className="p-3 font-mono font-bold text-[#024097]">{st.itemCode}</td>
                    <td className="p-3 font-semibold text-slate-800">{st.shortDescription}</td>
                    <td className="p-3 text-slate-600">{st.category}</td>
                    <td className="p-3 text-right font-black text-slate-900">{st.quantity} {st.uom}</td>
                    <td className="p-3 font-bold text-emerald-800">{st.stockStatus}</td>
                    <td className="p-3 text-slate-500">{st.lastGRNDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
