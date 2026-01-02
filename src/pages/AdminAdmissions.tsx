import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { DatabaseService } from "../lib/database";
import { supabase } from "../supabaseClient";

const AdminAdmissions = () => {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "under_review" | "accepted" | "rejected"
  >("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    checkAuth();
    fetchAdmissions();
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
      setAdminName(
        user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin"
      );
    } catch (error) {
      navigate("/admin/login");
    }
  };

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      let result;
      if (filterStatus === "all") {
        result = await DatabaseService.getAllAdmissions();
      } else {
        result = await DatabaseService.getAdmissionsByStatus(
          filterStatus as "pending" | "under_review" | "accepted" | "rejected"
        );
      }

      if (result.success && result.data) {
        setAdmissions(result.data);
      } else {
        setMessage("Failed to fetch admissions");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
      setMessage("Error fetching admissions");
      setMessageType("error");
    }
    setLoading(false);
  };

  const handleStatusChange = async (
    admissionId: string,
    newStatus: "pending" | "under_review" | "accepted" | "rejected"
  ) => {
    try {
      const result = await DatabaseService.updateAdmissionStatus(
        admissionId,
        newStatus
      );
      if (result.success) {
        setMessage("Admission status updated");
        setMessageType("success");
        fetchAdmissions();
      } else {
        setMessage("Failed to update status");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error updating status");
      setMessageType("error");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "accepted":
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
              <h1 className="text-3xl font-bold text-gray-800">Admissions</h1>
              <p className="text-gray-600">Admin Portal</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-right mr-2">
                <p className="text-sm font-semibold text-gray-800">
                  {adminName}
                </p>
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
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Job Applications
            </button>
            <button
              onClick={() => navigate("/admin/admissions")}
              className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium"
            >
              Admissions
            </button>
            <button
              onClick={() => navigate("/admin/updates")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              News & Updates
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {(
              [
                "all",
                "pending",
                "under_review",
                "accepted",
                "rejected",
              ] as const
            ).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Admissions Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : admissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No admissions found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Parent Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Child Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Parent Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Parent Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Desired Level
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Applied Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((admission) => (
                    <tr
                      key={admission.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {admission.parent_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {admission.child_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a
                          href={`mailto:${admission.parent_email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {admission.parent_email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a
                          href={`tel:${admission.parent_phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {admission.parent_phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {admission.desired_level}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={admission.application_status}
                          onChange={(e) =>
                            handleStatusChange(
                              admission.id,
                              e.target.value as any
                            )
                          }
                          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusColor(
                            admission.application_status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(admission.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats */}
        {admissions.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-gray-800">
                {admissions.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Accepted</p>
              <p className="text-3xl font-bold text-green-600">
                {
                  admissions.filter((a) => a.application_status === "accepted")
                    .length
                }
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Under Review</p>
              <p className="text-3xl font-bold text-blue-600">
                {
                  admissions.filter(
                    (a) => a.application_status === "under_review"
                  ).length
                }
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-3xl font-bold text-red-600">
                {
                  admissions.filter((a) => a.application_status === "rejected")
                    .length
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAdmissions;
