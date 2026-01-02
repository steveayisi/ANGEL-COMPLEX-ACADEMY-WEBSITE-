import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Download, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { DatabaseService, type JobApplication } from "../lib/database";
import { supabase } from "../supabaseClient";

const AdminApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "reviewed" | "rejected">("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  useEffect(() => {
    checkAuth();
    fetchApplications();
  }, [filterStatus]);

  const checkAuth = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      setAdminEmail(user.email || "");
      setAdminName(user.user_metadata?.full_name || user.email?.split('@')[0] || "Admin");
    } catch (error) {
      navigate("/admin/login");
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let result;
      if (filterStatus === "all") {
        result = await DatabaseService.getAllJobApplications();
      } else {
        result = await DatabaseService.getJobApplicationsByStatus(filterStatus);
      }

      if (result.success && result.data) {
        setApplications(result.data);
      } else {
        setMessage("Failed to fetch applications");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setMessage("Error fetching applications");
      setMessageType("error");
    }
    setLoading(false);
  };

  const handleStatusChange = async (applicationId: string, newStatus: "pending" | "reviewed" | "rejected") => {
    try {
      const result = await DatabaseService.updateJobApplicationStatus(applicationId, newStatus);
      if (result.success) {
        setMessage("Application status updated");
        setMessageType("success");
        fetchApplications();
      } else {
        setMessage("Failed to update status");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error updating status");
      setMessageType("error");
    }
  };

  const handleDelete = async (applicationId: string) => {
    if (confirm("Are you sure you want to delete this application?")) {
      try {
        const result = await DatabaseService.deleteJobApplication(applicationId);
        if (result.success) {
          setMessage("Application deleted");
          setMessageType("success");
          fetchApplications();
        } else {
          setMessage("Failed to delete application");
          setMessageType("error");
        }
      } catch (error) {
        setMessage("Error deleting application");
        setMessageType("error");
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "reviewed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
              <p className="text-gray-600">Admin Portal</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-right mr-2">
                <p className="text-sm font-semibold text-gray-800">{adminName}</p>
                <p className="text-xs text-gray-500">{adminEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 border-b border-gray-200 pb-4">
            <button
              onClick={() => navigate("/admin/jobs")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Job Openings
            </button>
            <button
              onClick={() => navigate("/admin/applications")}
              className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium"
            >
              Job Applications
            </button>
            <button
              onClick={() => navigate("/admin/admissions")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Admissions
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-2">
            {(["all", "pending", "reviewed", "rejected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No applications found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Applied Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{app.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">
                          {app.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`tel:${app.phone}`} className="text-blue-600 hover:underline">
                          {app.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {app.jobs?.title || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusColor(
                            app.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {app.resume_url && app.resume_url !== "No resume uploaded" && (
                            <a
                              href={app.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                console.log("Resume URL:", app.resume_url);
                                if (!app.resume_url.startsWith('http')) {
                                  e.preventDefault();
                                  alert('Invalid resume URL: ' + app.resume_url);
                                }
                              }}
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              <Download size={16} />
                              Resume
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Details View */}
        {applications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{app.full_name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Email:</strong> {app.email}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Phone:</strong> {app.phone}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Position:</strong> {app.jobs?.title}
                  </p>
                  <div className="bg-gray-50 p-3 rounded mb-3 max-h-24 overflow-y-auto">
                    <p className="text-xs text-gray-700 font-semibold mb-1">Cover Letter:</p>
                    <p className="text-xs text-gray-600">{app.cover_letter}</p>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                      className={`flex-1 px-2 py-1 rounded text-xs font-medium cursor-pointer ${getStatusColor(
                        app.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
