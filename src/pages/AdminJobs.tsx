import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { DatabaseService, type JobOpening } from "../lib/database";
import { supabase } from "../supabaseClient";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");

  const [formData, setFormData] = useState<JobOpening>({
    title: "",
    department: "",
    type: "Full-time",
    location: "Accra, Ghana",
    salary: "Competitive",
    description: "",
    requirements: [],
    responsibilities: [],
    is_active: true,
  });

  const [requirementInput, setRequirementInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");

  // Check authentication and fetch jobs
  useEffect(() => {
    checkAuth();
    fetchJobs();
  }, []);

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

  const fetchJobs = async () => {
    setLoading(true);
    const result = await DatabaseService.getAllJobOpenings();
    if (result.success && result.data) {
      setJobs(result.data);
    } else {
      console.error("Failed to fetch jobs:", result.error);
      setMessage(result.error || "Failed to fetch jobs");
      setMessageType("error");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementInput.trim()],
      });
      setRequirementInput("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const handleAddResponsibility = () => {
    if (responsibilityInput.trim()) {
      setFormData({
        ...formData,
        responsibilities: [
          ...formData.responsibilities,
          responsibilityInput.trim(),
        ],
      });
      setResponsibilityInput("");
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.department ||
      !formData.description ||
      formData.requirements.length === 0 ||
      formData.responsibilities.length === 0
    ) {
      setMessage("Please fill in all required fields");
      setMessageType("error");
      return;
    }

    if (editingId) {
      // Update job
      const result = await DatabaseService.updateJob(editingId, formData);
      if (result.success) {
        setMessage("Job updated successfully!");
        setMessageType("success");
        setEditingId(null);
        fetchJobs();
      } else {
        setMessage(`Failed to update job: ${result.error}`);
        setMessageType("error");
      }
    } else {
      // Create new job
      const result = await DatabaseService.createJob(formData);
      if (result.success) {
        setMessage("Job created successfully!");
        setMessageType("success");
        fetchJobs();
      } else {
        setMessage(`Failed to create job: ${result.error}`);
        setMessageType("error");
      }
    }

    // Reset form
    setTimeout(() => {
      setShowForm(false);
      setFormData({
        title: "",
        department: "",
        type: "Full-time",
        location: "Accra, Ghana",
        salary: "Competitive",
        description: "",
        requirements: [],
        responsibilities: [],
        is_active: true,
      });
      setMessage("");
    }, 2000);
  };

  const handleEdit = (job: JobOpening) => {
    setFormData(job);
    setEditingId(job.id || null);
    setShowForm(true);
  };

  const handleDelete = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      const result = await DatabaseService.deleteJob(jobId);
      if (result.success) {
        setMessage("Job deleted successfully!");
        setMessageType("success");
        fetchJobs();
      } else {
        setMessage(`Failed to delete job: ${result.error}`);
        setMessageType("error");
      }
    }
  };

  const handleToggleStatus = async (job: JobOpening) => {
    const result = await DatabaseService.toggleJobStatus(
      job.id || "",
      !job.is_active
    );
    if (result.success) {
      fetchJobs();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100">Manage Job Openings</p>
              <div className="mt-2 bg-blue-500 bg-opacity-30 rounded px-3 py-1 inline-block">
                <p className="text-sm font-semibold text-white">{adminName}</p>
                <p className="text-xs text-blue-100">{adminEmail}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/admin/jobs")}
              className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-medium"
            >
              Job Openings
            </button>
            <button
              onClick={() => navigate("/admin/applications")}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Job Applications
            </button>
            <button
              onClick={() => navigate("/admin/admissions")}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Admissions
            </button>
            <button
              onClick={() => navigate("/admin/updates")}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              News & Updates
            </button>
            <button
              onClick={() => navigate("/admin/contact-messages")}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Contact Messages
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              messageType === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle className={`h-5 w-5 mr-2 text-green-600`} />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
            )}
            <p
              className={
                messageType === "success" ? "text-green-800" : "text-red-800"
              }
            >
              {message}
            </p>
          </div>
        )}

        {/* Add New Job Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setFormData({
                  title: "",
                  department: "",
                  type: "Full-time",
                  location: "Accra, Ghana",
                  salary: "Competitive",
                  description: "",
                  requirements: [],
                  responsibilities: [],
                  is_active: true,
                });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            {showForm ? "Cancel" : "Add New Job"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Job" : "Add New Job Opening"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Primary School Teacher"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Teaching Staff"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Accra, Ghana"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Competitive"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active Status
                  </label>
                  <select
                    value={formData.is_active ? "true" : "false"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.value === "true",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job description..."
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements *
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRequirement();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a requirement and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-lg flex items-center justify-between"
                    >
                      <span>{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities *
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={responsibilityInput}
                    onChange={(e) => setResponsibilityInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddResponsibility();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a responsibility and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.responsibilities.map((resp, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-lg flex items-center justify-between"
                    >
                      <span>{resp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {editingId ? "Update Job" : "Create Job"}
              </button>
            </form>
          </div>
        )}

        {/* Jobs List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Job Openings
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 text-lg">No job openings yet.</p>
              <p className="text-gray-500">
                Click "Add New Job" to create one.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {job.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {job.department} • {job.type} • {job.location}
                      </p>
                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex gap-2 flex-wrap text-xs">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {job.requirements.length} requirements
                        </span>
                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                          {job.responsibilities.length} responsibilities
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(job)}
                        className={`p-2 rounded-lg transition-colors ${
                          job.is_active
                            ? "bg-yellow-50 hover:bg-yellow-100 text-yellow-600"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                        }`}
                        title={job.is_active ? "Deactivate" : "Activate"}
                      >
                        {job.is_active ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleEdit(job)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => handleDelete(job.id!)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
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

export default AdminJobs;
