import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Admin() {
  const [helpRequests, setHelpRequests] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'users'>('requests');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simulate API / DB fetch (from localStorage or mock data)
      const storedRequests = JSON.parse(localStorage.getItem('help_requests') || '[]');
      const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');

      // If no data exists, create mock ones
      if (storedRequests.length === 0 || storedProfiles.length === 0) {
        const mockProfiles = [
          {
            id: '1',
            name: 'Ravi Kumar',
            email: 'ravi@example.com',
            role: 'farmer',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Neha Sharma',
            email: 'neha@ngo.org',
            role: 'ngo',
            created_at: new Date().toISOString(),
          },
        ];

        const mockRequests = [
          {
            id: '101',
            user_id: '1',
            name: 'Ravi Kumar',
            location: 'Uttarakhand',
            issue_type: 'crop_disease',
            description: 'Leaves turning yellow rapidly',
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '102',
            user_id: '2',
            name: 'Neha Sharma',
            location: 'Delhi NCR',
            issue_type: 'water_shortage',
            description: 'Need irrigation support in farms',
            status: 'in_progress',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

        localStorage.setItem('profiles', JSON.stringify(mockProfiles));
        localStorage.setItem('help_requests', JSON.stringify(mockRequests));

        setProfiles(mockProfiles);
        setHelpRequests(mockRequests);
      } else {
        // Attach profile info to each request
        const requestsWithProfiles = storedRequests.map((req: any) => ({
          ...req,
          profile: storedProfiles.find((p: any) => p.id === req.user_id),
        }));

        setProfiles(storedProfiles);
        setHelpRequests(requestsWithProfiles);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const updatedRequests = helpRequests.map((req) =>
        req.id === id ? { ...req, status, updated_at: new Date().toISOString() } : req
      );

      setHelpRequests(updatedRequests);
      localStorage.setItem('help_requests', JSON.stringify(updatedRequests));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <LoadingSpinner message="Loading admin dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage help requests and user accounts</p>
        </motion.div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'requests'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Help Requests ({helpRequests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Users ({profiles.length})</span>
          </button>
        </div>

        {activeTab === 'requests' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Issue Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {helpRequests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{request.name}</p>
                          {request.profile && <p className="text-sm text-gray-500">{request.profile.email}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{request.location}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 capitalize">{request.issue_type.replace('_', ' ')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(request.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={request.status}
                          onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {profiles.map((profile, index) => (
                    <motion.tr
                      key={profile.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">{profile.name}</td>
                      <td className="px-6 py-4 text-gray-700">{profile.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
                          {profile.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
