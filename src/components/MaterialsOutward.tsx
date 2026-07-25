import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  Truck, 
  Printer, 
  Boxes, 
  ArrowRight, 
  FileText, 
  PackageCheck,
  ShieldCheck
} from 'lucide-react';
import { RMRRequest, StockItem } from '../types';

interface MaterialsOutwardProps {
  approvedRMRs: RMRRequest[];
  stockItems: StockItem[];
  onNavigateToManifest: (rmr: RMRRequest) => void;
  onIssueMaterial: (rmrId: string) => void;
}

export const MaterialsOutward: React.FC<MaterialsOutwardProps> = ({
  approvedRMRs,
  stockItems,
  onNavigateToManifest,
  onIssueMaterial
}) => {
  const [selectedRMR, setSelectedRMR] = useState<RMRRequest | null>(approvedRMRs[0] || null);
  const [step, setStep] = useState<number>(1); // 1: Select RMR, 2: Pick List & Bin Picking, 3: Issue & Gate Pass

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      {/* Header & Flow */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2 mb-1">
          <Upload className="w-6 h-6 text-[#024097]" />
          Materials Outward & Bin Picking Workflow
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Select approved field requisition requests, verify bin stock, generate picking lists, issue materials, and print gate passes.
        </p>

        {/* Workflow Steps */}
        <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] text-xs font-bold">
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${step === 1 ? 'bg-[#024097] text-white' : 'bg-white text-slate-700'}`}>
              <FileText className="w-4 h-4" />
              <span>1. Select Approved RMR</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400" />

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${step === 2 ? 'bg-[#024097] text-white' : 'bg-white text-slate-700'}`}>
              <Boxes className="w-4 h-4" />
              <span>2. Bin Picking List</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400" />

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${step === 3 ? 'bg-[#024097] text-white' : 'bg-white text-slate-700'}`}>
              <PackageCheck className="w-4 h-4" />
              <span>3. Issue & Gate Pass</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400" />

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-100 text-teal-900 border border-teal-300">
              <Truck className="w-4 h-4" />
              <span>4. Manifest & Dispatch</span>
            </div>

          </div>
        </div>
      </div>

      {/* Step 1: Select RMR */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-4">
        <h3 className="text-base font-extrabold text-slate-800 pb-2 border-b border-slate-200 flex items-center justify-between">
          <span>Select Approved RMR for Outward Picking</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
            {approvedRMRs.length} Approved Ready to Issue
          </span>
        </h3>

        {approvedRMRs.length === 0 ? (
          <p className="p-8 text-center text-slate-500 font-semibold text-xs">
            No pending approved RMR requests ready for outward picking.
          </p>
        ) : (
          <div className="space-y-3">
            {approvedRMRs.map((rmr) => (
              <div
                key={rmr.id}
                onClick={() => setSelectedRMR(rmr)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedRMR?.id === rmr.id ? 'border-[#024097] bg-blue-50/50 shadow' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-base text-[#024097]">{rmr.id}</span>
                    <span className="font-bold text-slate-900">Rig Target: {rmr.rigName}</span>
                    <span className="bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      {rmr.priority} Priority
                    </span>
                  </div>
                  <div className="text-slate-500 font-semibold">
                    Engineer: <strong className="text-slate-800">{rmr.requestedBy}</strong> | Date Required: <strong className="text-amber-800">{rmr.requiredDate}</strong>
                  </div>
                </div>

                {/* Items in RMR */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {rmr.items.map(it => {
                    const st = stockItems.find(s => s.itemCode === it.itemCode);
                    return (
                      <div key={it.id} className="p-2 bg-white rounded border border-slate-200 flex justify-between items-center">
                        <div>
                          <span className="font-mono font-bold text-[#024097] block">{it.itemCode}</span>
                          <span className="text-[11px] text-slate-600">{it.shortDescription}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900 block">Req: {it.requiredQty} {it.uom}</span>
                          <span className="text-[10px] text-blue-900 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                            Bin: {st?.binLocation || 'A-12-01'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRMR && (
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              onClick={() => {
                onIssueMaterial(selectedRMR.id);
                alert(`Material Outward Picked & Issued for ${selectedRMR.id}! Gate Pass Ready.`);
                setStep(3);
              }}
              className="px-5 py-2.5 bg-[#024097] hover:bg-blue-800 text-white font-black rounded-lg shadow text-xs flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Issue Material & Generate Gate Pass</span>
            </button>

            <button
              onClick={() => onNavigateToManifest(selectedRMR)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg shadow-lg text-xs flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Proceed to Create Shipping Manifest →</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
