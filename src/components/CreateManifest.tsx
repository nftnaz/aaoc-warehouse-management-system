import React, { useState } from 'react';
import { 
  Truck, 
  FileText, 
  Printer, 
  Mail, 
  Download, 
  Eye, 
  Save, 
  CheckCircle2, 
  X, 
  Building2, 
  UserCheck, 
  MapPin, 
  Scale 
} from 'lucide-react';
import { Manifest, RMRRequest } from '../types';

interface CreateManifestProps {
  manifests: Manifest[];
  approvedRMRs: RMRRequest[];
  onSaveManifest: (manifest: Manifest) => void;
  onAcknowledgeManifest: (manifestId: string) => void;
  selectedRMRForManifest?: RMRRequest | null;
}

export const CreateManifest: React.FC<CreateManifestProps> = ({
  manifests,
  approvedRMRs,
  onSaveManifest,
  onAcknowledgeManifest,
  selectedRMRForManifest
}) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewingManifest, setPreviewingManifest] = useState<Manifest | null>(null);

  // Form State
  const [manifestNumber, setManifestNumber] = useState(
    `MAN-2025-05-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [rmrNumber, setRmrNumber] = useState(
    selectedRMRForManifest?.id || approvedRMRs[0]?.id || 'RMR-2025-05-0021'
  );
  const [rigName, setRigName] = useState(selectedRMRForManifest?.rigName || 'Workover Rig-05');
  const [vehicleNumber, setVehicleNumber] = useState('GAB-TRK-8891-B');
  const [driverName, setDriverName] = useState('Emanuel Ondo');
  const [driverContact, setDriverContact] = useState('+241 07 45 88 12');
  const [warehouseFrom, setWarehouseFrom] = useState('Central Supply Depot - Port Gentil');
  const [destination, setDestination] = useState('Workover Rig-05 (Rabi Field)');
  const [dispatchDate, setDispatchDate] = useState('2025-05-20 02:00 PM');
  const [totalWeight, setTotalWeight] = useState('18.5 Tons');
  const [totalPackages, setTotalPackages] = useState(14);

  // When RMR dropdown changes, sync Rig Name & Destination
  const handleRMRChange = (selectedId: string) => {
    setRmrNumber(selectedId);
    const rmr = approvedRMRs.find(r => r.id === selectedId);
    if (rmr) {
      setRigName(rmr.rigName);
      setDestination(`${rmr.rigName} (${rmr.riglessFieldName || 'Main Oilfield Pad'})`);
    }
  };

  const currentRMR = approvedRMRs.find(r => r.id === rmrNumber) || selectedRMRForManifest;

  const handleSave = () => {
    const newManifest: Manifest = {
      id: manifestNumber,
      rmrNumber,
      rigName,
      vehicleNumber,
      driverName,
      driverContact,
      warehouseFrom,
      destination,
      dispatchDate,
      totalWeight,
      totalPackages: Number(totalPackages),
      createdBy: 'Warehouse Dispatch Lead',
      status: 'Dispatched',
      items: currentRMR ? currentRMR.items.map(i => ({
        itemCode: i.itemCode,
        description: i.shortDescription,
        qty: i.requiredQty,
        uom: i.uom,
        packageType: 'Heavy Wooden Crate / Bundle',
        weightKg: i.requiredQty * 120
      })) : [
        {
          itemCode: 'DRL-BAR-100',
          description: 'Barite Drilling Grade 4.2 SG',
          qty: 20,
          uom: 'BAG (1000 KG)',
          packageType: 'Jumbo Bag',
          weightKg: 20000
        }
      ]
    };

    onSaveManifest(newManifest);
    alert(`Shipping Manifest ${newManifest.id} saved & dispatched! Email notification sent to Field Team.`);
  };

  const handleEmailManifest = () => {
    alert(`Automatic email with PDF Manifest ${manifestNumber} dispatched to Field Rig Team at ${destination}.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
            <Truck className="w-6 h-6 text-teal-700" />
            Create Material Shipping Manifest
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Generate gate pass, dispatch logistics manifests, driver sign-offs, and field acknowledgements.
          </p>
        </div>
      </div>

      {/* Manifest Form Container */}
      <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#024097]" />
            Manifest Information Details
          </h3>
          <span className="text-xs font-mono font-bold bg-blue-100 text-[#024097] px-3 py-1 rounded-full">
            Auto-Generated ID: {manifestNumber}
          </span>
        </div>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Approved RMR *</label>
            <select
              value={rmrNumber}
              onChange={(e) => handleRMRChange(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-bold text-[#024097]"
            >
              {approvedRMRs.map(r => (
                <option key={r.id} value={r.id}>
                  {r.id} - {r.rigName} ({r.requestedBy})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Rig Name *</label>
            <input
              type="text"
              required
              value={rigName}
              onChange={(e) => setRigName(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Vehicle / Truck No *</label>
            <input
              type="text"
              required
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-bold uppercase"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Driver Name *</label>
            <input
              type="text"
              required
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Driver Contact Phone *</label>
            <input
              type="text"
              required
              value={driverContact}
              onChange={(e) => setDriverContact(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dispatching Warehouse *</label>
            <input
              type="text"
              required
              value={warehouseFrom}
              onChange={(e) => setWarehouseFrom(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Destination Pad / Rig *</label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-semibold text-emerald-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dispatch Date & Time *</label>
            <input
              type="text"
              required
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Total Cargo Weight *</label>
            <input
              type="text"
              required
              value={totalWeight}
              onChange={(e) => setTotalWeight(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Total Packages Count *</label>
            <input
              type="number"
              required
              value={totalPackages}
              onChange={(e) => setTotalPackages(Number(e.target.value))}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-black"
            />
          </div>

        </div>

        {/* Action Buttons Bar matching requirements: Save, Preview, Print, Email Manifest, Download PDF */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          
          <button
            onClick={() => {
              const testManifest: Manifest = {
                id: manifestNumber,
                rmrNumber,
                rigName,
                vehicleNumber,
                driverName,
                driverContact,
                warehouseFrom,
                destination,
                dispatchDate,
                totalWeight,
                totalPackages: Number(totalPackages),
                createdBy: 'Warehouse Dispatch Lead',
                status: 'Dispatched',
                items: currentRMR ? currentRMR.items.map(i => ({
                  itemCode: i.itemCode,
                  description: i.shortDescription,
                  qty: i.requiredQty,
                  uom: i.uom,
                  packageType: 'Heavy Wooden Crate',
                  weightKg: i.requiredQty * 120
                })) : []
              };
              setPreviewingManifest(testManifest);
              setShowPreviewModal(true);
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Preview Manifest</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#024097] hover:bg-blue-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Print Manifest</span>
          </button>

          <button
            onClick={handleEmailManifest}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Mail className="w-4 h-4" />
            <span>Email Manifest</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-extrabold text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save & Dispatch</span>
          </button>

        </div>
      </div>

      {/* Existing Manifests Log & Field Acknowledgement Tracker */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-4 h-4 text-teal-700" />
            Active Material Shipping Manifests ({manifests.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">Maintains complete field audit trail</span>
        </div>

        <div className="divide-y divide-slate-200">
          {manifests.map((man) => (
            <div key={man.id} className="p-4 space-y-3 hover:bg-slate-50/80 transition-colors text-xs">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-base text-[#024097]">{man.id}</span>
                  <span className="bg-blue-100 text-[#024097] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                    Linked RMR: {man.rmrNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                    man.status === 'Acknowledged' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {man.status}
                  </span>
                </div>

                <div className="text-slate-500 font-semibold">
                  Dispatched: <strong>{man.dispatchDate}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg">
                <div><span className="text-slate-500">Destination:</span> <strong className="text-slate-900">{man.destination}</strong></div>
                <div><span className="text-slate-500">Driver:</span> <strong className="text-slate-900">{man.driverName} ({man.vehicleNumber})</strong></div>
                <div><span className="text-slate-500">Weight / Pkgs:</span> <strong className="text-slate-900">{man.totalWeight} ({man.totalPackages} pkgs)</strong></div>
                <div>
                  <span className="text-slate-500">Field Ack:</span>{' '}
                  {man.acknowledgedBy ? (
                    <strong className="text-emerald-700 font-bold">Confirmed by {man.acknowledgedBy}</strong>
                  ) : (
                    <span className="text-amber-700 font-bold">Pending Field Receipt</span>
                  )}
                </div>
              </div>

              {/* Action for Field Team Acknowledge */}
              <div className="flex justify-end gap-2 pt-1">
                {man.status !== 'Acknowledged' && (
                  <button
                    onClick={() => {
                      onAcknowledgeManifest(man.id);
                      alert(`Acknowledgement email automatically sent back to Warehouse for Manifest ${man.id}! Audit trail updated.`);
                    }}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow text-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Click to Acknowledge Manifest Delivery</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Printable / Preview Manifest Document Modal */}
      {showPreviewModal && previewingManifest && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 border border-slate-300 max-h-[90vh] overflow-y-auto print:p-0 print:border-none">
            <div className="flex items-center justify-between pb-4 border-b border-slate-300 print:hidden">
              <h3 className="font-extrabold text-slate-800 text-sm">Official Material Shipping Manifest & Gate Pass</h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Document Design */}
            <div className="py-4 space-y-6 text-xs text-slate-800 font-sans">
              <div className="border-b-2 border-[#024097] pb-4 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-[#024097] tracking-wide">ARAB AFRICAN OIL COMPANY (AAOC)</h1>
                  <h2 className="text-xs font-bold text-slate-600">GABON OIL COMPANY - INTEGRATED ORGANIZATION</h2>
                  <p className="text-[10px] text-slate-500">Central Supply Depot Gate Pass & Dispatch Manifest</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-[#024097] font-mono">{previewingManifest.id}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Date: {previewingManifest.dispatchDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <p className="font-bold text-[#024097] uppercase text-[10px]">Dispatch From:</p>
                  <p className="font-bold text-slate-900">{previewingManifest.warehouseFrom}</p>
                  <p className="font-bold text-[#024097] uppercase text-[10px] mt-2">Driver & Transport:</p>
                  <p className="text-slate-800 font-semibold">{previewingManifest.driverName} ({previewingManifest.vehicleNumber})</p>
                  <p className="text-slate-500">Phone: {previewingManifest.driverContact}</p>
                </div>
                <div>
                  <p className="font-bold text-[#024097] uppercase text-[10px]">Destination Pad / Rig:</p>
                  <p className="font-bold text-slate-900">{previewingManifest.destination}</p>
                  <p className="font-bold text-[#024097] uppercase text-[10px] mt-2">Cargo Summary:</p>
                  <p className="text-slate-800 font-semibold">{previewingManifest.totalWeight} | {previewingManifest.totalPackages} Packages</p>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-slate-300 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#031C3F] text-white font-bold text-[10px] uppercase">
                    <tr>
                      <th className="p-2">Item Code</th>
                      <th className="p-2">Material Description</th>
                      <th className="p-2 text-right">Qty</th>
                      <th className="p-2">UOM</th>
                      <th className="p-2">Packaging</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {previewingManifest.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2 font-mono font-bold text-[#024097]">{it.itemCode}</td>
                        <td className="p-2 font-medium">{it.description}</td>
                        <td className="p-2 text-right font-bold">{it.qty}</td>
                        <td className="p-2 font-mono text-[11px]">{it.uom}</td>
                        <td className="p-2 text-slate-600">{it.packageType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature Blocks */}
              <div className="grid grid-cols-3 gap-4 pt-8 text-center text-[10px] font-bold text-slate-600">
                <div className="border-t border-slate-400 pt-2">
                  <p>Warehouse Supervisor Signature</p>
                </div>
                <div className="border-t border-slate-400 pt-2">
                  <p>Transport Driver Signature</p>
                </div>
                <div className="border-t border-slate-400 pt-2">
                  <p>Field Receiver Signature</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2 print:hidden">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 border border-slate-300 font-bold rounded text-xs"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#024097] text-white font-bold rounded text-xs shadow flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
