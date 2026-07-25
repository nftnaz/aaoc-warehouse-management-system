import React, { useState } from 'react';
import { 
  FilePlus, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Clock, 
  User, 
  AlertCircle, 
  ArrowRight,
  Flame,
  FileText
} from 'lucide-react';
import { RMRRequest, RMRItem, RMRStatus, PriorityLevel, StockItem, UserRole } from '../types';

interface CreateRMRProps {
  rmrList: RMRRequest[];
  stockItems: StockItem[];
  currentUserRole: UserRole;
  onCreateRMR: (rmr: RMRRequest) => void;
  onUpdateRMRStatus: (rmrId: string, status: RMRStatus, reason?: string) => void;
  onConvertToManifest: (rmr: RMRRequest) => void;
}

export const CreateRMR: React.FC<CreateRMRProps> = ({
  rmrList,
  stockItems,
  currentUserRole,
  onCreateRMR,
  onUpdateRMRStatus,
  onConvertToManifest
}) => {
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [rigName, setRigName] = useState('Workover Rig-05');
  const [riglessFieldName, setRiglessFieldName] = useState('Rabi Main Field');
  const [department, setDepartment] = useState<RMRRequest['department']>('Workover');
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [requiredDate, setRequiredDate] = useState('2025-05-25');
  const [requestedBy, setRequestedBy] = useState('Eng. Michel Nguema');

  // Multi-item rows in form
  const [items, setItems] = useState<RMRItem[]>([
    {
      id: 'ITEM-1',
      itemCode: stockItems[0]?.itemCode || 'DRL-BAR-100',
      shortDescription: stockItems[0]?.shortDescription || 'Barite Drilling Grade 4.2 SG',
      uom: stockItems[0]?.uom || 'BAG (1000 KG)',
      requiredQty: 10,
      availableStock: stockItems[0]?.availableQuantity || 400,
      remarks: 'Urgent well completion'
    }
  ]);

  const handleItemCodeChange = (index: number, code: string) => {
    const selected = stockItems.find(s => s.itemCode === code);
    if (!selected) return;

    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      itemCode: selected.itemCode,
      shortDescription: selected.shortDescription,
      uom: selected.uom,
      availableStock: selected.availableQuantity
    };
    setItems(newItems);
  };

  const handleItemQtyChange = (index: number, qty: number) => {
    const newItems = [...items];
    newItems[index].requiredQty = qty;
    setItems(newItems);
  };

  const handleAddItemRow = () => {
    const firstStock = stockItems[0];
    setItems([
      ...items,
      {
        id: `ITEM-${items.length + 1}`,
        itemCode: firstStock?.itemCode || 'DRL-BAR-100',
        shortDescription: firstStock?.shortDescription || 'Barite Drilling Grade 4.2 SG',
        uom: firstStock?.uom || 'BAG (1000 KG)',
        requiredQty: 5,
        availableStock: firstStock?.availableQuantity || 400,
        remarks: ''
      }
    ]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRMR: RMRRequest = {
      id: `RMR-2025-05-${Math.floor(1000 + Math.random() * 9000)}`,
      rigName,
      riglessFieldName,
      department,
      priority,
      requiredDate,
      requestedBy,
      createdDate: new Date().toLocaleString(),
      status: 'Submitted',
      items
    };

    onCreateRMR(newRMR);
    setShowForm(false);
    alert(`RMR ${newRMR.id} submitted! Warehouse Supervisor notification triggered.`);
  };

  const getStatusBadge = (status: RMRStatus) => {
    switch (status) {
      case 'Draft': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Submitted': return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'Under Review': return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Approved': return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black';
      case 'Rejected': return 'bg-red-100 text-red-900 border-red-300';
      case 'Manifest Created': return 'bg-blue-100 text-[#024097] border-blue-300 font-black';
      case 'Closed': return 'bg-slate-800 text-white border-slate-900';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      {/* Header & Engineer Workflow Banner */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
              <FilePlus className="w-6 h-6 text-purple-700" />
              Requisition Material Request (RMR) - Engineer Module
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Field Engineers material request workflow with warehouse review, status tracking, and direct manifest generation.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-lg shadow-md flex items-center gap-2 text-xs transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create New RMR Request</span>
          </button>
        </div>

        {/* Workflow Stepper Diagram */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold overflow-x-auto min-w-[650px] p-2 bg-slate-50 rounded-lg">
            <span className="text-purple-800 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 1. Create RMR</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-amber-800 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2. Warehouse Review</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-800 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 3. Approved</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-800 flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> 4. Create Manifest</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 5. Issue & Dispatch</span>
          </div>
        </div>
      </div>

      {/* New RMR Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl border-2 border-[#024097] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-base font-extrabold text-[#024097] flex items-center gap-2">
              <FilePlus className="w-5 h-5 text-purple-700" />
              New Material Requisition Request (RMR)
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Rig Name *</label>
              <select
                value={rigName}
                onChange={(e) => setRigName(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-800"
              >
                <option value="Workover Rig-05">Workover Rig-05</option>
                <option value="Workover Rig-01">Workover Rig-01</option>
                <option value="Workover Rig-02">Workover Rig-02</option>
                <option value="Rigless Field - Gamba">Rigless Field - Gamba</option>
                <option value="Rigless Field - Rabi">Rigless Field - Rabi</option>
                <option value="Offshore Platform West">Offshore Platform West</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Rigless Field Name</label>
              <input
                type="text"
                value={riglessFieldName}
                onChange={(e) => setRiglessFieldName(e.target.value)}
                placeholder="e.g. Rabi Main Field"
                className="w-full p-2.5 border border-slate-300 rounded-lg font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Department *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
              >
                <option value="Drilling">Drilling</option>
                <option value="Workover">Workover</option>
                <option value="Production">Production</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Subsea">Subsea</option>
                <option value="Logistics">Logistics</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority Level *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-black text-amber-800"
              >
                <option value="Low">Low Priority</option>
                <option value="Normal">Normal Priority</option>
                <option value="High">High Priority</option>
                <option value="Emergency">Emergency / Rig Stop</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Required Date *</label>
              <input
                type="date"
                required
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Requesting Field Engineer *</label>
              <input
                type="text"
                required
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-[#024097]"
              />
            </div>
          </div>

          {/* RMR Items List Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Required Materials List</h4>
              <button
                type="button"
                onClick={handleAddItemRow}
                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-[#024097] rounded text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Material Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((row, idx) => (
                <div key={row.id} className="grid grid-cols-12 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 items-center text-xs">
                  
                  {/* Material Item Selector */}
                  <div className="col-span-5">
                    <label className="block text-[10px] text-slate-500 font-bold">Item Code & Description</label>
                    <select
                      value={row.itemCode}
                      onChange={(e) => handleItemCodeChange(idx, e.target.value)}
                      className="w-full p-1.5 border border-slate-300 rounded font-bold text-slate-800"
                    >
                      {stockItems.map(s => (
                        <option key={s.id} value={s.itemCode}>
                          {s.itemCode} - {s.shortDescription} (Stock: {s.availableQuantity})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* UOM */}
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-500 font-bold">UOM</label>
                    <input
                      type="text"
                      disabled
                      value={row.uom}
                      className="w-full p-1.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px]"
                    />
                  </div>

                  {/* Available Stock Indicator */}
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-500 font-bold">Stock Available</label>
                    <span className={`block p-1.5 rounded font-black text-center ${
                      row.availableStock < row.requiredQty ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {row.availableStock}
                    </span>
                  </div>

                  {/* Required Qty */}
                  <div className="col-span-2">
                    <label className="block text-[10px] text-slate-500 font-bold">Required Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={row.requiredQty}
                      onChange={(e) => handleItemQtyChange(idx, Number(e.target.value))}
                      className="w-full p-1.5 border border-slate-300 rounded font-black text-slate-900"
                    />
                  </div>

                  {/* Delete Row */}
                  <div className="col-span-1 text-center pt-3">
                    <button
                      type="button"
                      onClick={() => handleRemoveItemRow(idx)}
                      disabled={items.length === 1}
                      className="text-red-500 hover:text-red-700 disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#024097] hover:bg-blue-800 text-white rounded-lg text-xs font-extrabold shadow-lg flex items-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              <span>Submit RMR Request</span>
            </button>
          </div>
        </form>
      )}

      {/* RMR Request Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-700" />
            Existing Material Requisition Requests ({rmrList.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">Auto-notifies Warehouse upon submission</span>
        </div>

        <div className="divide-y divide-slate-200">
          {rmrList.map((rmr) => (
            <div key={rmr.id} className="p-4 space-y-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-base text-[#024097]">{rmr.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(rmr.status)}`">
                    {rmr.status}
                  </span>
                  <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-2 py-0.5 rounded">
                    {rmr.priority} Priority
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-semibold">
                  Requested by: <strong className="text-slate-800">{rmr.requestedBy}</strong> ({rmr.department})
                </div>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg text-xs">
                <div><span className="text-slate-500">Rig Target:</span> <strong className="text-slate-900">{rmr.rigName}</strong></div>
                <div><span className="text-slate-500">Field Name:</span> <strong className="text-slate-900">{rmr.riglessFieldName || 'N/A'}</strong></div>
                <div><span className="text-slate-500">Required Date:</span> <strong className="text-amber-800">{rmr.requiredDate}</strong></div>
                <div><span className="text-slate-500">Submitted:</span> <span className="text-slate-600">{rmr.createdDate}</span></div>
              </div>

              {/* Items Summary Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold text-[11px]">
                    <tr className="divide-x divide-slate-200">
                      <th className="p-2">Item Code</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">UOM</th>
                      <th className="p-2 text-right">Req Qty</th>
                      <th className="p-2 text-right">In Stock</th>
                      <th className="p-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {rmr.items.map((item) => (
                      <tr key={item.id} className="divide-x divide-slate-100">
                        <td className="p-2 font-mono font-bold text-[#024097]">{item.itemCode}</td>
                        <td className="p-2 font-semibold text-slate-800">{item.shortDescription}</td>
                        <td className="p-2 text-slate-600 font-mono text-[11px]">{item.uom}</td>
                        <td className="p-2 text-right font-black text-slate-900">{item.requiredQty}</td>
                        <td className="p-2 text-right font-bold text-emerald-700 bg-emerald-50">{item.availableStock}</td>
                        <td className="p-2 text-slate-500 text-[11px]">{item.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Workflow Actions */}
              <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                <div className="text-xs text-slate-500">
                  {rmr.manifestId && (
                    <span className="text-blue-900 font-bold bg-blue-50 px-2 py-1 rounded">
                      Linked Manifest: {rmr.manifestId}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Warehouse Approval Controls */}
                  {rmr.status === 'Submitted' && (
                    <>
                      <button
                        onClick={() => {
                          const reason = prompt('Reason for rejecting RMR:');
                          if (reason) onUpdateRMRStatus(rmr.id, 'Rejected', reason);
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject RMR</span>
                      </button>

                      <button
                        onClick={() => {
                          onUpdateRMRStatus(rmr.id, 'Approved');
                          alert(`RMR ${rmr.id} Approved! Notification sent to Engineer.`);
                        }}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve RMR</span>
                      </button>
                    </>
                  )}

                  {/* Create Manifest Action */}
                  {rmr.status === 'Approved' && (
                    <button
                      onClick={() => onConvertToManifest(rmr)}
                      className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-extrabold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Truck className="w-4 h-4 text-amber-300" />
                      <span>Create Shipping Manifest</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
