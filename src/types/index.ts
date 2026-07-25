export type RMRStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Under Review' 
  | 'Approved' 
  | 'Rejected' 
  | 'Manifest Created' 
  | 'Closed';

export type PriorityLevel = 'Low' | 'Normal' | 'High' | 'Emergency';

export type UserRole = 'Warehouse Supervisor' | 'Field Engineer' | 'QC Inspector' | 'Logistics Manager' | 'System Admin';

export interface StockItem {
  id: string;
  srNo: number;
  itemCode: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  uom: string;
  quantity: number;
  binLocation: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Critical Stock' | 'Out of Stock' | 'Dead Stock';
  batchNumber: string;
  serialNumber?: string;
  lastGRNDate: string;
  lastIssueDate: string;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  reservedQuantity: number;
  availableQuantity: number;
  unitPrice: number;
  remarks: string;
  barcode: string;
}

export interface RMRItem {
  id: string;
  itemCode: string;
  shortDescription: string;
  uom: string;
  requiredQty: number;
  availableStock: number;
  remarks?: string;
}

export interface RMRRequest {
  id: string; // e.g. RMR-2025-05-0021
  rigName: string;
  riglessFieldName?: string;
  department: 'Drilling' | 'Workover' | 'Production' | 'Maintenance' | 'Subsea' | 'Logistics';
  priority: PriorityLevel;
  requiredDate: string;
  requestedBy: string;
  createdDate: string;
  status: RMRStatus;
  items: RMRItem[];
  warehouseReviewer?: string;
  rejectionReason?: string;
  manifestId?: string;
}

export interface GRNEntry {
  id: string; // GRN-2025-05-0018
  poNumber: string;
  supplierName: string;
  receivedDate: string;
  receivedBy: string;
  deliveryNoteNo: string;
  itemCode: string;
  description: string;
  orderedQty: number;
  receivedQty: number;
  uom: string;
  batchNumber: string;
  qcStatus: 'Pending' | 'Approved' | 'Rejected' | 'OSDR Created';
  binLocation?: string;
  documents?: string[];
  photoUrls?: string[];
  remarks?: string;
}

export interface QCEntry {
  id: string;
  grnId: string;
  itemCode: string;
  description: string;
  receivedQty: number;
  inspectedQty: number;
  passedQty: number;
  failedQty: number;
  inspectorName: string;
  inspectionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  remarks: string;
  photosAttached: boolean;
}

export interface OSDREntry {
  id: string; // OSDR-2025-004
  grnId: string;
  type: 'Over Receipt' | 'Shortage' | 'Damaged' | 'Rejected';
  itemCode: string;
  description: string;
  expectedQty: number;
  actualQty: number;
  discrepancyQty: number;
  reportedBy: string;
  reportDate: string;
  actionRequired: string;
  vendorClaimStatus: 'Pending' | 'Submitted' | 'Resolved' | 'Written Off';
  photos: string[];
  remarks: string;
}

export interface Manifest {
  id: string; // MAN-2025-05-0042
  rmrNumber: string;
  rigName: string;
  vehicleNumber: string;
  driverName: string;
  driverContact: string;
  warehouseFrom: string;
  destination: string;
  dispatchDate: string;
  totalWeight: string; // e.g., "14.5 Tons"
  totalPackages: number;
  createdBy: string;
  status: 'Draft' | 'Dispatched' | 'Acknowledged' | 'In Transit';
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  items: {
    itemCode: string;
    description: string;
    qty: number;
    uom: string;
    packageType: string;
    weightKg: number;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'RMR_SUBMITTED' | 'RMR_APPROVED' | 'MANIFEST_CREATED' | 'ACKNOWLEDGEMENT' | 'LOW_STOCK' | 'QC_ALERT';
  read: boolean;
  relatedId?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
}

export interface DashboardKPIs {
  totalStockValue: number;
  todaysGRN: number;
  todaysDispatch: number;
  pendingRMR: number;
  pendingManifest: number;
  lowStockItems: number;
  criticalStockItems: number;
  activeRigs: number;
  riglessRequests: number;
  osdrPending: number;
  deadStockItems: number;
  totalItemsCount: number;
  availableStockItems: number;
  qcPending: number;
}
