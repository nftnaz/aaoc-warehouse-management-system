import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Plus, 
  Edit, 
  QrCode, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  RefreshCw
} from 'lucide-react';
import { StockItem } from '../types';

interface StockReportProps {
  items: StockItem[];
  onAddItem: (newItem: Omit<StockItem, 'id' | 'srNo'>) => void;
  onEditItem: (item: StockItem) => void;
}

export const StockReport: React.FC<StockReportProps> = ({ items, onAddItem, onEditItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [barcodeSearch, setBarcodeSearch] = useState<string>('');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<StockItem>>({
    itemCode: '',
    shortDescription: '',
    longDescription: '',
    category: 'Drilling Chemicals',
    uom: 'PCS',
    quantity: 10,
    binLocation: 'A-01-01',
    stockStatus: 'In Stock',
    batchNumber: 'BTR-2025-001',
    serialNumber: 'N/A',
    lastGRNDate: new Date().toISOString().split('T')[0],
    lastIssueDate: new Date().toISOString().split('T')[0],
    minimumStock: 5,
    maximumStock: 50,
    reorderLevel: 10,
    reservedQuantity: 0,
    availableQuantity: 10,
    unitPrice: 150,
    remarks: 'Standard stock item',
    barcode: 'BC' + Math.floor(100000 + Math.random() * 900000)
  });

  // Filter Items
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.binLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.barcode && item.barcode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || item.stockStatus === selectedStatus;

    const matchesBarcode = barcodeSearch === '' || (item.barcode && item.barcode.toLowerCase() === barcodeSearch.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus && matchesBarcode;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Sr No,Item Code,Short Description,Long Description,Category,UOM,Quantity,Bin Location,Stock Status,Batch No,Serial No,Last GRN Date,Last Issue Date,Min Stock,Max Stock,Reorder Level,Reserved Qty,Available Qty,Remarks'
    ];
    const rows = filteredItems.map((item, idx) => [
      idx + 1,
      `"${item.itemCode}"`,
      `"${item.shortDescription}"`,
      `"${item.longDescription}"`,
      `"${item.category}"`,
      `"${item.uom}"`,
      item.quantity,
      `"${item.binLocation}"`,
      `"${item.stockStatus}"`,
      `"${item.batchNumber}"`,
      `"${item.serialNumber || 'N/A'}"`,
      item.lastGRNDate,
      item.lastIssueDate,
      item.minimumStock,
      item.maximumStock,
      item.reorderLevel,
      item.reservedQuantity,
      item.availableQuantity,
      `"${item.remarks}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AAOC_Stock_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Window
  const handlePrint = () => {
    window.print();
  };

  // Submit Add/Edit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onEditItem({ ...editingItem, ...formData } as StockItem);
      setEditingItem(null);
    } else {
      onAddItem(formData as Omit<StockItem, 'id' | 'srNo'>);
      setShowAddModal(false);
    }
  };

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-4">
      
      {/* Header Controls Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-[#024097]" />
            Materials Stock Report
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time oilfield inventory control, bin tracking, and reorder levels.
          </p>
        </div>

        {/* Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowBarcodeModal(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Barcode Scan</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                itemCode: 'ITEM-' + Math.floor(100 + Math.random() * 900),
                shortDescription: '',
                longDescription: '',
                category: 'Drilling Chemicals',
                uom: 'PCS',
                quantity: 10,
                binLocation: 'A-01-01',
                stockStatus: 'In Stock',
                batchNumber: 'BTR-2025-01',
                serialNumber: 'N/A',
                lastGRNDate: new Date().toISOString().split('T')[0],
                lastIssueDate: new Date().toISOString().split('T')[0],
                minimumStock: 5,
                maximumStock: 50,
                reorderLevel: 10,
                reservedQuantity: 0,
                availableQuantity: 10,
                unitPrice: 200,
                remarks: 'New material item',
                barcode: 'BC' + Math.floor(100000 + Math.random() * 900000)
              });
              setShowAddModal(true);
            }}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Item Code, Description, Batch, Bin, Barcode..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024097]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024097] font-semibold"
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024097] font-semibold"
          >
            <option value="ALL">All Stock Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Critical Stock">Critical Stock</option>
            <option value="Dead Stock">Dead Stock</option>
          </select>
        </div>
      </div>

      {/* Main Stock Data Table (With all 19 columns) */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto max-h-[620px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#031C3F] text-white sticky top-0 z-10 select-none">
              <tr className="divide-x divide-blue-900 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-2.5 text-center w-12">Sr No</th>
                <th className="p-2.5 whitespace-nowrap">Item Code</th>
                <th className="p-2.5 min-w-[160px]">Short Description</th>
                <th className="p-2.5 min-w-[200px]">Long Description</th>
                <th className="p-2.5 whitespace-nowrap">Category</th>
                <th className="p-2.5 whitespace-nowrap">UOM</th>
                <th className="p-2.5 text-right whitespace-nowrap">Qty</th>
                <th className="p-2.5 whitespace-nowrap">Bin Location</th>
                <th className="p-2.5 whitespace-nowrap">Status</th>
                <th className="p-2.5 whitespace-nowrap">Batch No</th>
                <th className="p-2.5 whitespace-nowrap">Serial No</th>
                <th className="p-2.5 whitespace-nowrap">Last GRN</th>
                <th className="p-2.5 whitespace-nowrap">Last Issue</th>
                <th className="p-2.5 text-right whitespace-nowrap">Min</th>
                <th className="p-2.5 text-right whitespace-nowrap">Max</th>
                <th className="p-2.5 text-right whitespace-nowrap">Reorder</th>
                <th className="p-2.5 text-right whitespace-nowrap">Reserved</th>
                <th className="p-2.5 text-right whitespace-nowrap font-black text-amber-300">Available</th>
                <th className="p-2.5 min-w-[140px]">Remarks</th>
                <th className="p-2.5 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={20} className="p-8 text-center text-slate-500 font-semibold">
                    No matching materials found in Stock Report.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => {
                  let statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                  if (item.stockStatus === 'Low Stock') statusBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
                  if (item.stockStatus === 'Critical Stock') statusBadgeClass = 'bg-red-100 text-red-800 border-red-300 animate-pulse';
                  if (item.stockStatus === 'Dead Stock') statusBadgeClass = 'bg-purple-100 text-purple-800 border-purple-300';

                  return (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors divide-x divide-slate-100">
                      <td className="p-2 text-center font-semibold text-slate-500">{idx + 1}</td>
                      <td className="p-2 font-black text-[#024097] whitespace-nowrap">{item.itemCode}</td>
                      <td className="p-2 font-bold text-slate-800">{item.shortDescription}</td>
                      <td className="p-2 text-slate-600 max-w-xs truncate" title={item.longDescription}>{item.longDescription}</td>
                      <td className="p-2 text-slate-700 font-medium whitespace-nowrap">{item.category}</td>
                      <td className="p-2 font-mono text-slate-600 text-[11px] whitespace-nowrap">{item.uom}</td>
                      <td className="p-2 text-right font-black text-slate-900">{item.quantity}</td>
                      <td className="p-2 font-mono font-bold text-blue-900 bg-blue-50/60 rounded text-center whitespace-nowrap">{item.binLocation}</td>
                      <td className="p-2 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeClass}`}>
                          {item.stockStatus}
                        </span>
                      </td>
                      <td className="p-2 font-mono text-slate-700 whitespace-nowrap">{item.batchNumber}</td>
                      <td className="p-2 font-mono text-slate-500 whitespace-nowrap">{item.serialNumber || 'N/A'}</td>
                      <td className="p-2 text-slate-600 whitespace-nowrap">{item.lastGRNDate}</td>
                      <td className="p-2 text-slate-600 whitespace-nowrap">{item.lastIssueDate}</td>
                      <td className="p-2 text-right font-medium text-slate-600">{item.minimumStock}</td>
                      <td className="p-2 text-right font-medium text-slate-600">{item.maximumStock}</td>
                      <td className="p-2 text-right font-bold text-amber-700">{item.reorderLevel}</td>
                      <td className="p-2 text-right text-slate-600">{item.reservedQuantity}</td>
                      <td className="p-2 text-right font-black text-emerald-700 bg-emerald-50">{item.availableQuantity}</td>
                      <td className="p-2 text-slate-500 text-[11px] max-w-xs truncate">{item.remarks}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setFormData(item);
                            setShowAddModal(true);
                          }}
                          className="p-1 text-blue-700 hover:bg-blue-100 rounded"
                          title="Edit Item"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Data Stats */}
        <div className="bg-slate-50 p-3 border-t border-slate-200 text-xs text-slate-600 flex justify-between items-center font-semibold">
          <span>Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> material records</span>
          <span>AAOC Gabon Warehouse Inventory Database</span>
        </div>
      </div>

      {/* Add / Edit Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-[#024097]" />
                {editingItem ? 'Edit Stock Item' : 'Add New Material Stock Item'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Item Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.itemCode}
                    onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-bold"
                  >
                    <option value="Drilling Chemicals">Drilling Chemicals</option>
                    <option value="Pipes & Casing">Pipes & Casing</option>
                    <option value="Valves & Flanges">Valves & Flanges</option>
                    <option value="Safety Equipment">Safety Equipment</option>
                    <option value="Heavy Machinery Parts">Heavy Machinery Parts</option>
                    <option value="Electrical & Instrumentation">Electrical & Instrumentation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">UOM *</label>
                  <input
                    type="text"
                    required
                    value={formData.uom}
                    onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bin Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.binLocation}
                    onChange={(e) => setFormData({ ...formData, binLocation: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Long Description</label>
                <textarea
                  rows={2}
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      const res = formData.reservedQuantity || 0;
                      setFormData({ 
                        ...formData, 
                        quantity: qty,
                        availableQuantity: Math.max(0, qty - res)
                      });
                    }}
                    className="w-full p-2 border border-slate-300 rounded font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Stock</label>
                  <input
                    type="number"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({ ...formData, minimumStock: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reorder Level</label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded font-bold text-amber-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Stock</label>
                  <input
                    type="number"
                    value={formData.maximumStock}
                    onChange={(e) => setFormData({ ...formData, maximumStock: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Status</label>
                  <select
                    value={formData.stockStatus}
                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded font-bold"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Critical Stock">Critical Stock</option>
                    <option value="Dead Stock">Dead Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Remarks</label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#024097] text-white rounded font-bold shadow hover:bg-blue-800"
                >
                  {editingItem ? 'Save Changes' : 'Add Item to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barcode Scanner / Search Modal */}
      {showBarcodeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Barcode / QR Scanner</h3>
            <p className="text-xs text-slate-500 mt-1">Scan or type material barcode to locate item in stock</p>

            <div className="my-6">
              <input
                type="text"
                autoFocus
                value={barcodeSearch}
                onChange={(e) => setBarcodeSearch(e.target.value)}
                placeholder="Scan or enter Barcode (e.g., BAR10098231)..."
                className="w-full p-3 border-2 border-[#024097] rounded-lg text-center font-mono font-bold text-sm bg-slate-50"
              />
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setBarcodeSearch('');
                  setShowBarcodeModal(false);
                }}
                className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded text-xs"
              >
                Clear & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
