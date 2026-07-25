import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StockReport } from './components/StockReport';
import { MaterialsInward } from './components/MaterialsInward';
import { CreateRMR } from './components/CreateRMR';
import { CreateManifest } from './components/CreateManifest';
import { MaterialsOutward } from './components/MaterialsOutward';
import { Reports } from './components/Reports';
import { UserManagement } from './components/UserManagement';
import { SettingsModule } from './components/Settings';
import { AuditTrail } from './components/AuditTrail';

import {
  StockItem,
  RMRRequest,
  Manifest,
  GRNEntry,
  Notification,
  AuditLog,
  UserRole,
  RMRStatus
} from './types';

import {
  getStoredStockItems,
  saveStoredStockItems,
  getStoredRMRs,
  saveStoredRMRs,
  getStoredGRNs,
  saveStoredGRNs,
  getStoredManifests,
  saveStoredManifests,
  getStoredNotifications,
  saveStoredNotifications,
  getStoredAuditLogs,
  saveStoredAuditLogs,
  calculateKPIs
} from './data/mockData';

export default function App() {
  const [activeModule, setActiveModule] = useState<string>('Dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Warehouse Supervisor');

  // Persistent States
  const [stockItems, setStockItems] = useState<StockItem[]>(() => getStoredStockItems());
  const [rmrList, setRmrList] = useState<RMRRequest[]>(() => getStoredRMRs());
  const [grnList, setGrnList] = useState<GRNEntry[]>(() => getStoredGRNs());
  const [manifests, setManifests] = useState<Manifest[]>(() => getStoredManifests());
  const [notifications, setNotifications] = useState<Notification[]>(() => getStoredNotifications());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStoredAuditLogs());

  const [selectedRMRForManifest, setSelectedRMRForManifest] = useState<RMRRequest | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveStoredStockItems(stockItems);
  }, [stockItems]);

  useEffect(() => {
    saveStoredRMRs(rmrList);
  }, [rmrList]);

  useEffect(() => {
    saveStoredGRNs(grnList);
  }, [grnList]);

  useEffect(() => {
    saveStoredManifests(manifests);
  }, [manifests]);

  useEffect(() => {
    saveStoredNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    saveStoredAuditLogs(auditLogs);
  }, [auditLogs]);

  // KPIs
  const kpis = calculateKPIs(stockItems, rmrList, manifests, grnList);

  // Handlers
  const handleAddStockItem = (newItemData: Omit<StockItem, 'id' | 'srNo'>) => {
    const newItem: StockItem = {
      ...newItemData,
      id: `STK-00${stockItems.length + 1}`,
      srNo: stockItems.length + 1
    };
    const updated = [newItem, ...stockItems];
    setStockItems(updated);

    // Audit log
    addAuditLog('ADD_STOCK_ITEM', 'Materials Stock Report', `Added new stock item ${newItem.itemCode} (${newItem.shortDescription})`);
  };

  const handleEditStockItem = (updatedItem: StockItem) => {
    const updated = stockItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    setStockItems(updated);
    addAuditLog('EDIT_STOCK_ITEM', 'Materials Stock Report', `Updated details for ${updatedItem.itemCode}`);
  };

  const handleAddGRN = (newGRN: GRNEntry) => {
    setGrnList([newGRN, ...grnList]);

    // Add Notification
    addNotification({
      title: 'GRN Created',
      message: `Goods Receipt Note ${newGRN.id} created for ${newGRN.itemCode} (${newGRN.receivedQty} ${newGRN.uom}). Sent to Pending QC.`,
      type: 'QC_ALERT',
      relatedId: newGRN.id
    });

    addAuditLog('CREATE_GRN', 'Materials Inward', `Created GRN ${newGRN.id} for PO ${newGRN.poNumber}`);
  };

  const handleUpdateGRNStatus = (grnId: string, qcStatus: GRNEntry['qcStatus'], bin?: string) => {
    setGrnList(grnList.map(g => g.id === grnId ? { ...g, qcStatus, binLocation: bin || g.binLocation } : g));
    addAuditLog('UPDATE_GRN_STATUS', 'Materials Inward', `Updated QC Status for ${grnId} to ${qcStatus}`);
  };

  const handleStockUpdate = (itemCode: string, addQty: number, binLocation: string) => {
    setStockItems(stockItems.map(item => {
      if (item.itemCode === itemCode) {
        const newQty = item.quantity + addQty;
        return {
          ...item,
          quantity: newQty,
          availableQuantity: newQty - item.reservedQuantity,
          binLocation: binLocation || item.binLocation,
          lastGRNDate: new Date().toISOString().split('T')[0],
          stockStatus: newQty <= item.reorderLevel ? 'Low Stock' : 'In Stock'
        };
      }
      return item;
    }));
  };

  const handleCreateRMR = (newRMR: RMRRequest) => {
    setRmrList([newRMR, ...rmrList]);

    addNotification({
      title: 'RMR Submitted',
      message: `New Material Requisition Request ${newRMR.id} submitted for ${newRMR.rigName} by ${newRMR.requestedBy}. Warehouse supervisor notified via email.`,
      type: 'RMR_SUBMITTED',
      relatedId: newRMR.id
    });

    addAuditLog('SUBMIT_RMR', 'Create RMR', `Engineers submitted RMR ${newRMR.id} for ${newRMR.rigName}`);
  };

  const handleUpdateRMRStatus = (rmrId: string, status: RMRStatus, reason?: string) => {
    setRmrList(rmrList.map(r => r.id === rmrId ? { ...r, status, rejectionReason: reason } : r));

    if (status === 'Approved') {
      addNotification({
        title: 'RMR Approved',
        message: `RMR ${rmrId} has been Approved by Warehouse Supervisor. Field Engineer notified via email. Ready to create Manifest.`,
        type: 'RMR_APPROVED',
        relatedId: rmrId
      });
    }

    addAuditLog('UPDATE_RMR_STATUS', 'Create RMR', `Changed status of RMR ${rmrId} to ${status}`);
  };

  const handleConvertToManifest = (rmr: RMRRequest) => {
    setSelectedRMRForManifest(rmr);
    setActiveModule('Create Manifest');
  };

  const handleSaveManifest = (newManifest: Manifest) => {
    setManifests([newManifest, ...manifests]);

    // Update RMR status to Manifest Created
    setRmrList(rmrList.map(r => r.id === newManifest.rmrNumber ? { ...r, status: 'Manifest Created', manifestId: newManifest.id } : r));

    addNotification({
      title: 'Manifest Created',
      message: `Shipping Manifest ${newManifest.id} created for ${newManifest.rigName}. Field Team notified via email.`,
      type: 'MANIFEST_CREATED',
      relatedId: newManifest.id
    });

    addAuditLog('CREATE_MANIFEST', 'Create Manifest', `Generated Shipping Manifest ${newManifest.id} for ${newManifest.rigName}`);
  };

  const handleAcknowledgeManifest = (manifestId: string) => {
    const ackTime = new Date().toLocaleString();
    setManifests(manifests.map(m => m.id === manifestId ? {
      ...m,
      status: 'Acknowledged',
      acknowledgedBy: 'Field Supervisor Alain Bongo',
      acknowledgedAt: ackTime
    } : m));

    addNotification({
      title: 'Acknowledgement Received',
      message: `Field Team clicked Acknowledge for Manifest ${manifestId}. Automatic acknowledgement email sent back to Warehouse Depot!`,
      type: 'ACKNOWLEDGEMENT',
      relatedId: manifestId
    });

    addAuditLog('ACKNOWLEDGE_MANIFEST', 'Create Manifest', `Field Team acknowledged receipt of Manifest ${manifestId} at ${ackTime}`);
  };

  const handleIssueMaterial = (rmrId: string) => {
    const rmr = rmrList.find(r => r.id === rmrId);
    if (!rmr) return;

    // Deduct stock for items
    rmr.items.forEach(reqItem => {
      setStockItems(prev => prev.map(st => {
        if (st.itemCode === reqItem.itemCode) {
          const newQty = Math.max(0, st.quantity - reqItem.requiredQty);
          return {
            ...st,
            quantity: newQty,
            availableQuantity: Math.max(0, newQty - st.reservedQuantity),
            lastIssueDate: new Date().toISOString().split('T')[0]
          };
        }
        return st;
      }));
    });

    addAuditLog('ISSUE_MATERIAL', 'Materials Outward', `Issued outward materials for RMR ${rmrId}`);
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const addAuditLog = (action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      user: currentUserRole,
      role: currentUserRole,
      action,
      module,
      details,
      ipAddress: '192.168.10.42'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleNotificationClick = (notif: Notification) => {
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
    if (notif.relatedId?.startsWith('RMR')) {
      setActiveModule('Create RMR');
    } else if (notif.relatedId?.startsWith('MAN')) {
      setActiveModule('Create Manifest');
    } else if (notif.relatedId?.startsWith('GRN')) {
      setActiveModule('Materials Inward');
    }
  };

  const approvedRMRs = rmrList.filter(r => r.status === 'Approved' || r.status === 'Submitted');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-[#024097] selection:text-white">
      
      {/* Fixed Top Header */}
      <Header
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onSearch={(q) => {
          setActiveModule('Materials Stock Report');
        }}
        currentUserRole={currentUserRole}
        onRoleChange={setCurrentUserRole}
        onNavigate={setActiveModule}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onNavigate={setActiveModule}
          currentUserRole={currentUserRole}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {activeModule === 'Dashboard' && (
            <Dashboard
              kpis={kpis}
              notifications={notifications}
              onNavigate={setActiveModule}
              onAcknowledgeManifest={handleAcknowledgeManifest}
              recentRMRs={rmrList}
              recentManifests={manifests}
            />
          )}

          {activeModule === 'Materials Stock Report' && (
            <StockReport
              items={stockItems}
              onAddItem={handleAddStockItem}
              onEditItem={handleEditStockItem}
            />
          )}

          {activeModule === 'Materials Inward' && (
            <MaterialsInward
              grnList={grnList}
              stockItems={stockItems}
              onAddGRN={handleAddGRN}
              onUpdateGRNStatus={handleUpdateGRNStatus}
              onStockUpdate={handleStockUpdate}
            />
          )}

          {activeModule === 'Create RMR' && (
            <CreateRMR
              rmrList={rmrList}
              stockItems={stockItems}
              currentUserRole={currentUserRole}
              onCreateRMR={handleCreateRMR}
              onUpdateRMRStatus={handleUpdateRMRStatus}
              onConvertToManifest={handleConvertToManifest}
            />
          )}

          {activeModule === 'Create Manifest' && (
            <CreateManifest
              manifests={manifests}
              approvedRMRs={rmrList.filter(r => r.status === 'Approved' || r.status === 'Submitted')}
              onSaveManifest={handleSaveManifest}
              onAcknowledgeManifest={handleAcknowledgeManifest}
              selectedRMRForManifest={selectedRMRForManifest}
            />
          )}

          {activeModule === 'Materials Outward' && (
            <MaterialsOutward
              approvedRMRs={approvedRMRs}
              stockItems={stockItems}
              onNavigateToManifest={handleConvertToManifest}
              onIssueMaterial={handleIssueMaterial}
            />
          )}

          {(activeModule.includes('Report') || activeModule === 'Reports') && (
            <Reports
              initialReportType={activeModule}
              stockItems={stockItems}
              rmrList={rmrList}
              manifests={manifests}
              grns={grnList}
            />
          )}

          {activeModule === 'User Management' && <UserManagement />}
          {activeModule === 'Settings' && <SettingsModule />}
          {activeModule === 'Audit Trail' && <AuditTrail logs={auditLogs} />}
        </main>

      </div>
    </div>
  );
}
