import React, { useState, useEffect } from 'react';
import { IndianRupee, RefreshCw, CheckCircle2, Clock, XCircle, Download } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '../../components/pagesCompo/admin/AdminLayout';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/donations');
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      toast.error('Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 size={12} />
            Completed
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} />
            Pending
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1220]">Donations & Funds</h1>
            <p className="text-gray-500 text-sm mt-1">Track and manage incoming donations in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchDonations}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Raised</p>
              <h3 className="text-2xl font-bold text-gray-900">
                ₹{donations.filter(d => d.status === 'COMPLETED').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Successful Donations</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {donations.filter(d => d.status === 'COMPLETED').length}
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Processing</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {donations.filter(d => d.status === 'PENDING').length}
              </h3>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm">
                  <th className="py-4 px-6 font-semibold text-gray-600">Donor Details</th>
                  <th className="py-4 px-6 font-semibold text-gray-600">Amount</th>
                  <th className="py-4 px-6 font-semibold text-gray-600">Transaction ID</th>
                  <th className="py-4 px-6 font-semibold text-gray-600">Date & Time</th>
                  <th className="py-4 px-6 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-500">
                      <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-blue-500" />
                      Loading donations...
                    </td>
                  </tr>
                ) : donations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-500">
                      No donations found.
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{donation.donorName}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{donation.donorEmail}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">
                          {donation.currency === 'INR' ? '₹' : donation.currency}{donation.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {donation.transactionId || '—'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{new Date(donation.createdAt).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{new Date(donation.createdAt).toLocaleTimeString()}</div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(donation.status)}
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
};

export default AdminDonations;
