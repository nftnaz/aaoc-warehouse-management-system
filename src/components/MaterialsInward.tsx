import React, { useState } from 'react';
import { 
  Download, 
  FileCheck2, 
  ShieldAlert, 
  CheckCircle2, 
  UploadCloud, 
  Camera, 
  Box, 
  FileText, 
  Layers, 
  ArrowRight, 
  Plus, 
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { GRNEntry, QCEntry, OSDREntry, StockItem } from '../types';

interface MaterialsInwardProps {
  grnList: GRNEntry[];
  stockItems: StockItem[];
  onAddGRN: (grn: GRNEntry) => void;
  onUpdateGRNStatus: (grnId: string, status: GRNEntry['qcStatus'], bin?: string) => void;
  onStockUpdate: (itemCode: string, addQty: number, binLocation: string) => void;
}

export const MaterialsInward: React.FC<MaterialsInwardProps> = ({
  grnList,
  stockItems,
  onAddGRN,
  onUpdateGRNStatus,
  onStockUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'GRN' | 'QC' | 'OSDR' | 'BIN' | 'DOCS'>('GRN');

  // Form State for GRN Creation
  const [poNumber, setPoNumber] = useState('PO-AAOC-88230');
  const [supplierName, setSupplierName] = useState('Baker Hughes Gabon');
  const [deliveryNoteNo, setDeliveryNoteNo] = useState('DN-BH-2025-019');
  const [selectedItemCode, setSelectedItemCode] = useState(stockItems[0]?.itemCode || 'DRL-BAR-100');
  const [orderedQty, setOrderedQty] = useState(100);
  const [receivedQty, setReceivedQty] = useState(100);
  const [batchNumber, setBatchNumber] = useState('BTR-2025-101');
  const [receivedBy, setReceivedBy] = useState('Warehouse Team A');
  const [remarks, setRemarks] = useState('Material received in good condition at Gate 2');

  // QC Pass/Fail Form State
  const [selectedQCGRN, setSelectedQCGRN] = useState<GRNEntry | null>(null);
  const [qcInspectedQty, setQcInspectedQty] = useState(100);
  const [qcPassedQty, setQcPassedQty] = useState(100);
  const [qcFailedQty, setQcFailedQty] = useState(0);
  const [qcInspector, setQcInspector] = useState('QC Inspector Eric');
  const [qcRemarks, setQcRemarks] = useState('Passed physical and dimensional inspection');

  // OSDR State
  const [osdrType, setOsdrType] = useState<'Shortage' | 'Damaged' | 'Over Receipt' | 'Rejected'>('Shortage');
  const [osdrDiscrepancyQty, setOsdrDiscrepancyQty] = useState(5);
  const [osdrAction, setOsdrAction] = useState('Request Vendor Replacement');

  // Handle Create GRN Submit
  const handleCreateGRN = (e: React.FormEvent) => {
    e.preventDefault();
    const item = stockItems.find(s => s.itemCode === selectedItemCode);
    
    const newGRN: GRNEntry = {
      id: `GRN-2025-05-${Math.floor(1000 + Math.random() * 9000)}`,
      poNumber,
      supplierName,
      receivedDate: new Date().toISOString().split('T')[0],
      receivedBy,
      deliveryNoteNo,
      itemCode: selectedItemCode,
      description: item?.shortDescription || 'Oilfield Material',
      orderedQty: Number(orderedQty),
      receivedQty: Number(receivedQty),
      uom: item?.uom || 'PCS',
      batchNumber,
      qcStatus: 'Pending',
      remarks
    };

    onAddGRN(newGRN);
    alert(`GRN ${newGRN.id} successfully created! Passed to Pending QC queue.`);
    setActiveTab('QC');
  };

  // Handle QC Approval
  const handleQCApproval = (grn: GRNEntry, passed: boolean) => {
    if (passed) {
      onUpdateGRNStatus(grn.id, 'Approved');
      alert(`QC Approved for ${grn.id}! Ready for Bin Location Allocation.`);
      setActiveTab('BIN');
    } else {
      onUpdateGRNStatus(grn.id, 'OSDR Created');
      alert(`QC Rejected for ${grn.id}! OSDR discrepancy report generated.`);
      setActiveTab('OSDR');
    }
  };

  // Handle Bin Allocation
  const handleBinAllocation = (grn: GRNEntry, targetBin: string) => {
    onUpdateGRNStatus(grn.id, 'Approved', targetBin);
    onStockUpdate(grn.itemCode, grn.receivedQty, targetBin);
    alert(`Bin ${targetBin} allocated for ${grn.itemCode}! Stock updated automatically.`);
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      {/* Materials Inward Header & Process Flow Diagram */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
              <Download className="w-6 h-6 text-[#024097]" />
              Materials Inward Process Flow
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Receiving, Quality Control, OSDR handling, and Bin Allocation workflow.
            </p>
          </div>
        </div>

        {/* Workflow Visual Stepper */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] text-xs font-bold">
            
            <div className="flex items-center gap-2 bg-blue-100 text-[#024097] px-3 py-2 rounded-lg border border-blue-300">
              <FileText className="w-4 h-4" />
              <span>1. Purchase Order (PO)</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

            <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-2 rounded-lg border border-amber-300">
              <Download className="w-4 h-4" />
              <span>2. GRN Creation</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

            <div className="flex items-center gap-2 bg-purple-100 text-purple-900 px-3 py-2 rounded-lg border border-purple-300">
              <FileCheck2 className="w-4 h-4" />
              <span>3. Quality Inspection (QC)</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

            <div className="flex items-center gap-2 bg-red-100 text-red-900 px-3 py-2 rounded-lg border border-red-300">
              <ShieldAlert className="w-4 h-4" />
              <span>4. OSDR Entry</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

            <div className="flex items-center gap-2 bg-teal-100 text-teal-900 px-3 py-2 rounded-lg border border-teal-300">
              <Layers className="w-4 h-4" />
              <span>5. Bin Allocation</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-2 rounded-lg border border-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              <span>6. Stock Updated</span>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white p-2 rounded-xl shadow-sm">
        <button
          onClick={() => setActiveTab('GRN')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'GRN' ? 'bg-[#024097] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create GRN</span>
        </button>

        <button
          onClick={() => setActiveTab('QC')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'QC' ? 'bg-[#024097] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Pending QC ({grnList.filter(g => g.qcStatus === 'Pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('OSDR')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'OSDR' ? 'bg-[#024097] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>OSDR Entry / Damage Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('BIN')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'BIN' ? 'bg-[#024097] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bin Allocation</span>
        </button>

        <button
          onClick={() => setActiveTab('DOCS')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'DOCS' ? 'bg-[#024097] text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Upload Docs & Photos</span>
        </button>
      </div>

      {/* Tab 1: Create GRN */}
      {activeTab === 'GRN' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-base font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#024097]" />
            Goods Receipt Note (GRN) Creation
          </h3>

          <form onSubmit={handleCreateGRN} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">PO Number *</label>
                <input
                  type="text"
                  required
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Supplier / Vendor Name *</label>
                <input
                  type="text"
                  required
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Note / Waybill No *</label>
                <input
                  type="text"
                  required
                  value={deliveryNoteNo}
                  onChange={(e) => setDeliveryNoteNo(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Material Item *</label>
                <select
                  value={selectedItemCode}
                  onChange={(e) => setSelectedItemCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-[#024097]"
                >
                  {stockItems.map(item => (
                    <option key={item.id} value={item.itemCode}>
                      {item.itemCode} - {item.shortDescription}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PO Ordered Qty</label>
                <input
                  type="number"
                  value={orderedQty}
                  onChange={(e) => setOrderedQty(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Physically Received Qty *</label>
                <input
                  type="number"
                  required
                  value={receivedQty}
                  onChange={(e) => setReceivedQty(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-black text-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch / Heat Number *</label>
                <input
                  type="text"
                  required
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Received By (Receiver Name) *</label>
                <input
                  type="text"
                  required
                  value={receivedBy}
                  onChange={(e) => setReceivedBy(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Receiving Remarks / Condition Note</label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#024097] hover:bg-blue-800 text-white font-extrabold rounded-lg shadow-lg flex items-center gap-2 text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Submit GRN & Send to QC</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Pending QC */}
      {activeTab === 'QC' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-base font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-purple-700" />
              Quality Inspection (QC) Queue
            </span>
            <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">
              {grnList.filter(g => g.qcStatus === 'Pending').length} Pending Inspection
            </span>
          </h3>

          <div className="divide-y divide-slate-200">
            {grnList.filter(g => g.qcStatus === 'Pending').length === 0 ? (
              <p className="p-6 text-center text-slate-500 font-semibold text-xs">
                All inward GRNs have been inspected by Quality Control.
              </p>
            ) : (
              grnList.filter(g => g.qcStatus === 'Pending').map((grn) => (
                <div key={grn.id} className="py-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-black text-base text-[#024097]">{grn.id}</span>
                      <span className="ml-3 text-xs font-bold text-slate-700">PO: {grn.poNumber}</span>
                      <span className="ml-3 text-xs text-slate-500">Supplier: {grn.supplierName}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold border border-amber-300">
                      Pending Inspection
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div><span className="text-slate-500">Item:</span> <strong className="text-slate-900">{grn.itemCode}</strong></div>
                    <div><span className="text-slate-500">Description:</span> <strong className="text-slate-900">{grn.description}</strong></div>
                    <div><span className="text-slate-500">Qty Received:</span> <strong className="text-emerald-700">{grn.receivedQty} {grn.uom}</strong></div>
                    <div><span className="text-slate-500">Batch:</span> <strong className="font-mono">{grn.batchNumber}</strong></div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleQCApproval(grn, false)}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Fail QC / Create OSDR</span>
                    </button>

                    <button
                      onClick={() => handleQCApproval(grn, true)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pass QC Inspection</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: OSDR Entry & Damage Report */}
      {activeTab === 'OSDR' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-6">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              OSDR (Over, Short, Damaged & Rejected) Discrepancy Entry
            </h3>
            <p className="text-xs text-slate-500">
              Record discrepancy claims for supplier insurance and vendor replacements.
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-red-900 mb-1">Discrepancy Category *</label>
              <select
                value={osdrType}
                onChange={(e) => setOsdrType(e.target.value as any)}
                className="w-full p-2 border border-red-300 rounded font-bold text-red-900"
              >
                <option value="Shortage">Shortage Receipt</option>
                <option value="Damaged">Damaged Material</option>
                <option value="Over Receipt">Over Receipt</option>
                <option value="Rejected">Quality Rejected</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-red-900 mb-1">Discrepancy Quantity</label>
              <input
                type="number"
                value={osdrDiscrepancyQty}
                onChange={(e) => setOsdrDiscrepancyQty(Number(e.target.value))}
                className="w-full p-2 border border-red-300 rounded font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-red-900 mb-1">Action Required</label>
              <input
                type="text"
                value={osdrAction}
                onChange={(e) => setOsdrAction(e.target.value)}
                className="w-full p-2 border border-red-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => alert(`OSDR Discrepancy record saved successfully! Vendor claim notification sent.`)}
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-extrabold rounded-lg shadow text-xs"
            >
              Save OSDR & Submit Vendor Claim
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Bin Allocation */}
      {activeTab === 'BIN' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-base font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-700" />
            Bin Location Allocation (Ready Stock Commit)
          </h3>

          <div className="divide-y divide-slate-200">
            {grnList.filter(g => g.qcStatus === 'Approved').length === 0 ? (
              <p className="p-6 text-center text-slate-500 font-semibold text-xs">
                No items pending bin allocation.
              </p>
            ) : (
              grnList.filter(g => g.qcStatus === 'Approved').map((grn) => (
                <div key={grn.id} className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono font-black text-slate-900">{grn.id}</span>
                    <span className="ml-3 font-bold text-[#024097]">{grn.itemCode}</span>
                    <span className="ml-3 text-slate-600">{grn.description}</span>
                    <span className="ml-3 font-black text-emerald-700">Qty: {grn.receivedQty} {grn.uom}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Assign Bin:</span>
                    <input
                      type="text"
                      defaultValue={grn.binLocation || 'A-12-01'}
                      id={`bin-${grn.id}`}
                      className="p-1.5 border border-slate-300 rounded font-mono font-bold w-28 text-center text-blue-900"
                    />
                    <button
                      onClick={() => {
                        const inputVal = (document.getElementById(`bin-${grn.id}`) as HTMLInputElement)?.value || 'A-12-01';
                        handleBinAllocation(grn, inputVal);
                      }}
                      className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded shadow"
                    >
                      Commit to Bin
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Documents & Photos */}
      {activeTab === 'DOCS' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-extrabold text-slate-800 mb-2 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-800" />
            Upload Shipping Documents & Photo Attachments
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-blue-50/50 cursor-pointer transition-colors">
              <UploadCloud className="w-8 h-8 text-[#024097] mx-auto mb-2" />
              <p className="font-bold text-slate-800 text-xs">Upload Shipping Document (PDF, Delivery Note, MTR)</p>
              <p className="text-[10px] text-slate-400 mt-1">Drag and drop files here or click to browse</p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-blue-50/50 cursor-pointer transition-colors">
              <Camera className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="font-bold text-slate-800 text-xs">Attach Material Photo Proofs</p>
              <p className="text-[10px] text-slate-400 mt-1">Capture or upload crate condition photos</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
