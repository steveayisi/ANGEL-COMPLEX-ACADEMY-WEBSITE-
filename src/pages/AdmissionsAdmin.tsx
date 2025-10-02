import React, { useState, useEffect } from 'react';
import { DatabaseService, type AdmissionRecord } from '../lib/database';
import { 
  Users, 
  Search, 
  Calendar, 
  Phone, 
  Mail, 
  User,
  Baby,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const AdmissionsAdmin = () => {
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);

  // Load admissions data
  useEffect(() => {
    loadAdmissions();
    loadStats();
  }, []);

  const loadAdmissions = async () => {
    try {
      setLoading(true);
      const result = await DatabaseService.getAllAdmissions();
      
      if (result.success && result.data) {
        setAdmissions(result.data);
      } else {
        setError(result.error || 'Failed to load admissions');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    const result = await DatabaseService.getAdmissionStats();
    if (result.success) {
      setStats(result.data);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAdmissions();
      return;
    }

    setLoading(true);
    const result = await DatabaseService.searchAdmissions(searchTerm);
    
    if (result.success && result.data) {
      setAdmissions(result.data);
    } else {
      setError(result.error || 'Search failed');
    }
    setLoading(false);
  };

  const updateApplicationStatus = async (id: string, newStatus: 'pending' | 'under_review' | 'accepted' | 'rejected') => {
    const result = await DatabaseService.updateAdmissionStatus(id, newStatus);
    
    if (result.success) {
      // Refresh the list
      loadAdmissions();
      loadStats();
    } else {
      alert(`Failed to update status: ${result.error}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAdmissions = admissions.filter(admission => {
    if (statusFilter !== 'all' && admission.application_status !== statusFilter) {
      return false;
    }
    return true;
  });

  if (loading && admissions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admissions Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and review student applications</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.under_review}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Admissions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Applications ({filteredAdmissions.length})
            </h2>
          </div>
          
          {filteredAdmissions.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAdmissions.map((admission) => (
                <div key={admission.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Parent Info */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <User className="h-5 w-5 mr-2 text-gray-400" />
                            {admission.parent_name}
                          </h3>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {admission.parent_phone}
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {admission.parent_email}
                            </div>
                            {admission.parent_occupation && (
                              <p>Occupation: {admission.parent_occupation}</p>
                            )}
                          </div>
                        </div>

                        {/* Child Info */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 flex items-center">
                            <Baby className="h-5 w-5 mr-2 text-gray-400" />
                            {admission.child_name}
                          </h4>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <p>Age: {admission.child_age} years</p>
                            <p>Gender: {admission.child_gender}</p>
                            <p>Desired Level: {admission.desired_level}</p>
                            {admission.previous_school && (
                              <p>Previous School: {admission.previous_school}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {admission.additional_message && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">
                            <strong>Message:</strong> {admission.additional_message}
                          </p>
                        </div>
                      )}

                      {/* Emergency Contact */}
                      {admission.emergency_contact_name && (
                        <div className="mt-4 text-sm text-gray-600">
                          <p>
                            <strong>Emergency Contact:</strong> {admission.emergency_contact_name}
                            {admission.emergency_contact_phone && ` - ${admission.emergency_contact_phone}`}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Applied: {new Date(admission.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="ml-6 flex flex-col items-end space-y-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusColor(admission.application_status)}`}>
                        {getStatusIcon(admission.application_status)}
                        <span className="ml-1 capitalize">{admission.application_status.replace('_', ' ')}</span>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        {admission.application_status !== 'accepted' && (
                          <button
                            onClick={() => updateApplicationStatus(admission.id, 'accepted')}
                            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                        )}
                        {admission.application_status !== 'under_review' && (
                          <button
                            onClick={() => updateApplicationStatus(admission.id, 'under_review')}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Review
                          </button>
                        )}
                        {admission.application_status !== 'rejected' && (
                          <button
                            onClick={() => updateApplicationStatus(admission.id, 'rejected')}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsAdmin;