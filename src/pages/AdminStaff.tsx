import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Users,
  CheckCircle,
  Phone,
  Mail,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { DatabaseService, type Staff } from "../lib/database";

const emptyStaff: Staff = {
  name: "",
  title: "",
  education: "",
  experience: "",
  specialization: "",
  bio: "",
  achievements: [],
  email: "",
  phone: "",
  image_url: "",
  is_key_staff: false,
  is_proprietress: false,
  display_order: 0,
  is_active: true,
};

const AdminStaff: React.FC = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [formData, setFormData] = useState<Staff>(emptyStaff);
  const [achievementsInput, setAchievementsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    void checkAuth();
    void fetchStaff();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
      return;
    }
    setAdminName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin");
    setAdminEmail(user.email || "");
  };

  const fetchStaff = async () => {
    setLoading(true);
    const result = await DatabaseService.getAllStaff();
    if (result.success && result.data) {
      setStaffList(result.data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const resetForm = () => {
    setFormData(emptyStaff);
    setAchievementsInput("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const achievements = achievementsInput
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean);

    const payload: Staff = {
      ...formData,
      achievements,
      display_order: Number(formData.display_order || 0),
    };

    const action = editingId
      ? DatabaseService.updateStaff(editingId, payload)
      : DatabaseService.createStaff(payload as Staff);

    const result = await action;

    if (result.success) {
      setMessage({ type: "success", text: editingId ? "Staff updated" : "Staff created" });
      resetForm();
      await fetchStaff();
    } else {
      setMessage({ type: "error", text: result.error || "Something went wrong" });
    }

    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (staff: Staff) => {
    setEditingId(staff.id || null);
    setFormData({ ...emptyStaff, ...staff });
    setAchievementsInput((staff.achievements || []).join("\n"));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this staff member?")) return;
    const result = await DatabaseService.deleteStaff(id);
    if (result.success) {
      setMessage({ type: "success", text: "Staff deleted" });
      await fetchStaff();
    } else {
      setMessage({ type: "error", text: result.error || "Failed to delete" });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleActive = async (staff: Staff) => {
    if (!staff.id) return;
    const result = await DatabaseService.toggleStaffStatus(staff.id, !staff.is_active);
    if (result.success) {
      await fetchStaff();
    }
  };

  const renderNavButton = (label: string, path: string, active?: boolean) => (
    <button
      onClick={() => navigate(path)}
      className={`px-4 py-3 font-medium ${
        active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
                <p className="text-sm text-gray-600">Add, edit, and publish staff</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{adminName}</p>
              <p className="text-xs text-gray-500">{adminEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 overflow-x-auto">
          {renderNavButton("Staff", "/admin/staff", true)}
          {renderNavButton("Job Openings", "/admin/jobs")}
          {renderNavButton("Job Applications", "/admin/applications")}
          {renderNavButton("Admissions", "/admin/admissions")}
          {renderNavButton("News & Updates", "/admin/updates")}
          {renderNavButton("Announcements", "/admin/announcements")}
          {renderNavButton("Contact Messages", "/admin/contact-messages")}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? "Edit Staff" : "Add Staff"}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title / Role</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <input
                type="text"
                value={formData.education || ""}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <input
                type="text"
                value={formData.experience || ""}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <input
                type="text"
                value={formData.specialization || ""}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={formData.image_url || ""}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                rows={3}
                value={formData.bio || ""}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Achievements (one per line)</label>
              <textarea
                rows={3}
                value={achievementsInput}
                onChange={(e) => setAchievementsInput(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Award A\nAward B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Order</label>
              <input
                type="number"
                value={formData.display_order ?? 0}
                onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={!!formData.is_key_staff}
                  onChange={(e) => setFormData({ ...formData, is_key_staff: e.target.checked })}
                  className="h-4 w-4 text-blue-600"
                />
                Key Staff
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={!!formData.is_proprietress}
                  onChange={(e) => setFormData({ ...formData, is_proprietress: e.target.checked })}
                  className="h-4 w-4 text-blue-600"
                />
                Proprietress
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.is_active !== false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600"
                />
                Active
              </label>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? "Saving..." : editingId ? "Update Staff" : "Add Staff"}
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Staff List</h2>
            <span className="text-sm text-gray-600">{staffList.length} total</span>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : staffList.length === 0 ? (
            <div className="text-gray-600">No staff yet. Add the first member above.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffList.map((staff) => (
                <div key={staff.id} className="border rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                      {staff.image_url ? (
                        <img src={staff.image_url} alt={staff.name} className="h-full w-full object-cover" />
                      ) : (
                        <Users className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
                        {staff.is_proprietress && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Proprietress</span>
                        )}
                        {staff.is_key_staff && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Key Staff</span>
                        )}
                        {staff.is_active ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">Inactive</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{staff.title}</p>
                      <p className="text-xs text-gray-500">Order: {staff.display_order ?? 0}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    {staff.education && <p><strong>Education:</strong> {staff.education}</p>}
                    {staff.experience && <p><strong>Experience:</strong> {staff.experience}</p>}
                    {staff.specialization && <p><strong>Specialization:</strong> {staff.specialization}</p>}
                    {staff.bio && <p className="text-gray-600">{staff.bio}</p>}
                  </div>

                  {staff.achievements && staff.achievements.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-1">Achievements</p>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                        {staff.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                    {staff.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" /> {staff.email}
                      </span>
                    )}
                    {staff.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" /> {staff.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex items-center gap-2"
                      >
                        <Edit2 className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => staff.id && handleDelete(staff.id)}
                        className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleActive(staff)}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      {staff.is_active ? (
                        <>
                          <ToggleRight className="h-5 w-5 text-green-600" /> Deactivate
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-5 w-5 text-gray-500" /> Activate
                        </>
                      )}
                    </button>
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

export default AdminStaff;
