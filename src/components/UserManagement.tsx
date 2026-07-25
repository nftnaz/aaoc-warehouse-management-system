import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, Mail, UserCheck, Key, Lock } from 'lucide-react';
import { UserRole } from '../types';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 'USR-001',
      name: 'Michel Nguema',
      email: 'm.nguema@aaoc-gabon.com',
      role: 'Field Engineer',
      department: 'Workover (Rig-05)',
      status: 'Active',
      lastLogin: '2025-05-20 08:30 AM'
    },
    {
      id: 'USR-002',
      name: 'Jean Paul',
      email: 'jp.supervisor@aaoc-gabon.com',
      role: 'Warehouse Supervisor',
      department: 'Central Warehouse Depot',
      status: 'Active',
      lastLogin: '2025-05-20 07:45 AM'
    },
    {
      id: 'USR-003',
      name: 'Eric Nguema',
      email: 'eric.qc@aaoc-gabon.com',
      role: 'QC Inspector',
      department: 'Quality Control',
      status: 'Active',
      lastLogin: '2025-05-20 08:00 AM'
    },
    {
      id: 'USR-004',
      name: 'Francois Mba',
      email: 'f.mba@aaoc-gabon.com',
      role: 'Logistics Manager',
      department: 'Logistics & Supply Chain',
      status: 'Active',
      lastLogin: '2025-05-20 09:12 AM'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('Field Engineer');
  const [newDept, setNewDept] = useState('Drilling');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserItem = {
      id: `USR-00${users.length + 1}`,
      name: newName,
      email: newEmail,
      role: newRole,
      department: newDept,
      status: 'Active',
      lastLogin: 'Never'
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    alert(`New user ${newUser.name} created as ${newUser.role}!`);
  };

  return (
    <div className="p-4 lg:p-6 bg-slate-100 min-h-[calc(100vh-100px)] space-y-6">
      
      <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#024097] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#024097]" />
            User Management & Access Control
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage field engineer accounts, warehouse supervisors, role permissions, and system access.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-lg text-xs shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-xs divide-y divide-slate-200">
          <thead className="bg-[#031C3F] text-white font-bold text-[11px] uppercase">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Role</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-blue-50/50">
                <td className="p-3 font-mono font-bold text-[#024097]">{u.id}</td>
                <td className="p-3 font-bold text-slate-800">{u.name}</td>
                <td className="p-3 font-mono text-slate-600">{u.email}</td>
                <td className="p-3 font-bold text-purple-900 bg-purple-50">{u.role}</td>
                <td className="p-3 text-slate-700">{u.department}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b">Add New System User</h3>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full p-2 border border-slate-300 rounded font-bold"
                >
                  <option value="Field Engineer">Field Engineer</option>
                  <option value="Warehouse Supervisor">Warehouse Supervisor</option>
                  <option value="QC Inspector">QC Inspector</option>
                  <option value="Logistics Manager">Logistics Manager</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 font-bold rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#024097] text-white font-bold rounded shadow"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
