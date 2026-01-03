import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseService, Announcement } from "../lib/database";
import { X, Edit2, Trash2 } from "lucide-react";

const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    message: "",
    type: "info",
    is_active: true,
  });

  useEffect(() => {
    checkAuth();
    fetchAnnouncements();
  }, []);

  const checkAuth = () => {
    // Add your auth check logic
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
    }
  };

  const fetchAnnouncements = async () => {
    const result = await DatabaseService.getAllAnnouncements();
    if (result.success && result.data) {
      setAnnouncements(result.data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAnnouncement) {
      const result = await DatabaseService.updateAnnouncement(
        editingAnnouncement.id!,
        formData
      );
      if (result.success) {
        alert("Announcement updated successfully!");
        setShowForm(false);
        setEditingAnnouncement(null);
        resetForm();
        fetchAnnouncements();
      } else {
        alert("Failed to update announcement: " + result.error);
      }
    } else {
      const result = await DatabaseService.createAnnouncement(formData);
      if (result.success) {
        alert("Announcement created successfully!");
        setShowForm(false);
        resetForm();
        fetchAnnouncements();
      } else {
        alert("Failed to create announcement: " + result.error);
      }
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData(announcement);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      const result = await DatabaseService.deleteAnnouncement(id);
      if (result.success) {
        alert("Announcement deleted successfully!");
        fetchAnnouncements();
      } else {
        alert("Failed to delete announcement: " + result.error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      type: "info",
      is_active: true,
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "border-l-4 border-blue-500 bg-blue-50";
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "success":
        return "border-l-4 border-green-500 bg-green-50";
      case "event":
        return "border-l-4 border-purple-500 bg-purple-50";
      default:
        return "border-l-4 border-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Announcements
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/admin/staff")}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
              >
                Staff
              </button>
              <button
                onClick={() => navigate("/admin/updates")}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => navigate("/admin/updates")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Updates
            </button>
            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium whitespace-nowrap">
              Announcements
            </button>
            <button
              onClick={() => navigate("/admin/admissions")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Admissions
            </button>
            <button
              onClick={() => navigate("/admin/applications")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Job Applications
            </button>
            <button
              onClick={() => navigate("/admin/jobs")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Job Openings
            </button>
            <button
              onClick={() => navigate("/admin/contact-messages")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Contact Messages
            </button>
            <button
              onClick={() => navigate("/admin/staff")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Staff Management
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add New Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              setEditingAnnouncement(null);
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add New Announcement
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {editingAnnouncement ? "Edit Announcement" : "Add Announcement"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Announcement title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Announcement message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as Announcement["type"],
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                    Active
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  {editingAnnouncement ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No announcements yet. Create one!</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-6 rounded-lg shadow ${getTypeColor(announcement.type)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {announcement.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          announcement.is_active
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {announcement.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{announcement.message}</p>
                    <div className="text-sm text-gray-500">
                      Type: <span className="font-medium capitalize">{announcement.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Edit"
                      aria-label="Edit announcement"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id!)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete"
                      aria-label="Delete announcement"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAnnouncements;
