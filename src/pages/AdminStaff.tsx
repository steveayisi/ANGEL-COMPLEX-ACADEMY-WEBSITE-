import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatabaseService, Staff } from "../lib/database";
import { supabase } from "../lib/supabaseClient";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Eye,
  EyeOff,
  Save,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function AdminStaff() {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    education: "",
    experience: "",
    specialization: "",
    bio: "",
    achievements: "",
    email: "",
    phone: "",
    image_url: "",
    is_key_staff: false,
    is_proprietress: false,
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    checkAuth();
    fetchStaff();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchStaff = async () => {
    setLoading(true);
    const result = await DatabaseService.getAllStaff();
    if (result.success && result.data) {
      setStaffList(result.data);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `staff/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const staffData = {
      ...formData,
      achievements: formData.achievements
        ? formData.achievements.split("\n").filter((a) => a.trim())
        : [],
    };

    let result;
    if (editingId) {
      result = await DatabaseService.updateStaff(editingId, staffData);
    } else {
      result = await DatabaseService.createStaff(staffData);
    }

    if (result.success) {
      alert(
        editingId
          ? "Staff member updated successfully!"
          : "Staff member added successfully!"
      );
      resetForm();
      fetchStaff();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleEdit = (staff: Staff) => {
    setFormData({
      name: staff.name,
      title: staff.title,
      education: staff.education,
      experience: staff.experience,
      specialization: staff.specialization,
      bio: staff.bio || "",
      achievements: staff.achievements?.join("\n") || "",
      email: staff.email || "",
      phone: staff.phone || "",
      image_url: staff.image_url || "",
      is_key_staff: staff.is_key_staff,
      is_proprietress: staff.is_proprietress,
      display_order: staff.display_order,
      is_active: staff.is_active,
    });
    setImagePreview(staff.image_url || "");
    setEditingId(staff.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    const result = await DatabaseService.deleteStaff(id);
    if (result.success) {
      alert("Staff member deleted successfully!");
      fetchStaff();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const result = await DatabaseService.toggleStaffStatus(id, !currentStatus);
    if (result.success) {
      fetchStaff();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleMoveOrder = async (staff: Staff, direction: "up" | "down") => {
    const currentIndex = staffList.findIndex((s) => s.id === staff.id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= staffList.length) return;

    const currentOrder = staff.display_order;
    const swapOrder = staffList[swapIndex].display_order;

    await DatabaseService.updateStaff(staff.id!, { display_order: swapOrder });
    await DatabaseService.updateStaff(staffList[swapIndex].id!, {
      display_order: currentOrder,
    });

    fetchStaff();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      education: "",
      experience: "",
      specialization: "",
      bio: "",
      achievements: "",
      email: "",
      phone: "",
      image_url: "",
      is_key_staff: false,
      is_proprietress: false,
      display_order: staffList.length,
      is_active: true,
    });
    setImagePreview("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Staff Management
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Navigation */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => navigate("/admin/updates")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Updates
            </button>
            <button
              onClick={() => navigate("/admin/announcements")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
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
            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium whitespace-nowrap">
              Staff Management
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Staff Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showForm ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {showForm ? "Cancel" : "Add New Staff Member"}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit Staff Member" : "Add New Staff Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="staff-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    id="staff-title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education *
                  </label>
                  <input
                    id="staff-education"
                    name="education"
                    type="text"
                    required
                    value={formData.education}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., B.Ed. in Early Childhood Education"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience *
                  </label>
                  <input
                    id="staff-experience"
                    name="experience"
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 15+ years in education"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <input
                    id="staff-specialization"
                    name="specialization"
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Early Childhood Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order *
                  </label>
                  <input
                    id="staff-display-order"
                    name="display_order"
                    type="number"
                    required
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="staff-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    id="staff-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="staff-bio"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief biography of the staff member"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements (one per line)
                </label>
                <textarea
                  id="staff-achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={(e) =>
                    setFormData({ ...formData, achievements: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="National Teacher Award 2019&#10;Curriculum Development Lead&#10;Parent Education Workshops Facilitator"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                    <Upload className="w-5 h-5" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {uploading && (
                    <span className="text-sm text-gray-500">Uploading...</span>
                  )}
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_key_staff}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_key_staff: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Key Staff Member
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_proprietress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_proprietress: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Proprietress
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Active
                  </span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? "Update Staff Member" : "Add Staff Member"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Staff List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Staff Members</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading staff members...
            </div>
          ) : staffList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No staff members found. Add your first staff member above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffList.map((staff, index) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-gray-900">
                            {staff.display_order}
                          </span>
                          <div className="flex gap-1">
                            {index > 0 && (
                              <button
                                onClick={() => handleMoveOrder(staff, "up")}
                                className="p-1 text-gray-400 hover:text-blue-600"
                                title="Move up"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                            )}
                            {index < staffList.length - 1 && (
                              <button
                                onClick={() => handleMoveOrder(staff, "down")}
                                className="p-1 text-gray-400 hover:text-blue-600"
                                title="Move down"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.image_url ? (
                          <img
                            src={staff.image_url}
                            alt={staff.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                              No Image
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {staff.name}
                        </div>
                        {staff.email && (
                          <div className="text-sm text-gray-500">
                            {staff.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {staff.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {staff.specialization}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          {staff.is_proprietress && (
                            <span className="inline-flex text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                              Proprietress
                            </span>
                          )}
                          {staff.is_key_staff && (
                            <span className="inline-flex text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                              Key Staff
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            handleToggleStatus(staff.id!, staff.is_active)
                          }
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            staff.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {staff.is_active ? (
                            <>
                              <Eye className="w-3 h-3" /> Active
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" /> Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(staff)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(staff.id!)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
