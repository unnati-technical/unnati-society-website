import React, { useState } from 'react';
import { ShieldAlert, Plus, Trash2, Mail, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import AdminLayout from '../components/admin/AdminLayout';
import { adminUsersApi } from '../api/admin-users.api';

export default function AdminRoles() {
  const queryClient = useQueryClient();
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const { data: admins = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await adminUsersApi.getAll();
      return Array.isArray(res) ? res : (res.data || []);
    }
  });

  const addAdminMutation = useMutation({
    mutationFn: (data: { email: string; name: string }) => adminUsersApi.create(data),
    onSuccess: () => {
      toast.success('Admin added successfully!');
      setNewEmail('');
      setNewName('');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to add admin');
    }
  });

  const removeAdminMutation = useMutation({
    mutationFn: (id: string) => adminUsersApi.delete(id),
    onSuccess: () => {
      toast.success('Admin removed successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to remove admin');
    }
  });

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    addAdminMutation.mutate({ email: newEmail, name: newName });
  };

  const handleRemoveAdmin = (id: string, email: string) => {
    if (email === 'unnati.ir@iiitbh.ac.in' || email.toLowerCase() === 'rinku4578914@gmail.com' || email.toLowerCase() === 'technical.ir@iiitbh.ac.in') {
      toast.error('Cannot remove a protected super admin.');
      return;
    }
    if (confirm(`Are you sure you want to remove ${email} from admins?`)) {
      removeAdminMutation.mutate(id);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
            <ShieldAlert size={28} className="text-blue-600" />
            Roles & Permissions
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage users who have access to this admin dashboard.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-lg mb-4 text-gray-900">Add New Admin</h2>
          <form onSubmit={handleAddAdmin} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={addAdminMutation.isPending}
              className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {addAdminMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
              Add Admin
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 md:p-5 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900">Authorized Admins</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Always show primary admin */}
                <tr className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        U
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Primary Admin</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail size={12} />
                          unnati.ir@iiitbh.ac.in
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
                      Super Admin
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-xs text-gray-400 font-medium italic">Protected</span>
                  </td>
                </tr>

                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                      <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                      Loading...
                    </td>
                  </tr>
                ) : (
                  admins.map((admin: any) => (
                    <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                            {admin.name?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-900">{admin.name || 'Admin'}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Mail size={12} />
                              {admin.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                          {admin.role || 'Admin'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {admin.email?.toLowerCase() === 'rinku4578914@gmail.com' || admin.email?.toLowerCase() === 'technical.ir@iiitbh.ac.in' ? (
                          <span className="text-xs text-gray-400 font-medium italic">Protected</span>
                        ) : (
                          <button
                            onClick={() => handleRemoveAdmin(admin.id, admin.email)}
                            disabled={removeAdminMutation.isPending}
                            className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Remove Admin"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
