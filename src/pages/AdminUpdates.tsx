import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { DatabaseService, NewsUpdate } from "../lib/database";
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  User,
  Mail,
} from "lucide-react";

export default function AdminUpdates() {
  const navigate = useNavigate();
  const categories: NewsUpdate["category"][] = [
    "Achievement",
    "Facilities",
    "Academic",
    "Sports",
    "Events",
    "Resources",
  ];
  const [updates, setUpdates] = useState<NewsUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<NewsUpdate | null>(null);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState<Partial<NewsUpdate>>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    category: "Events",
    excerpt: "",
    content: "",
    image_url: "",
    is_featured: false,
    is_published: false,
  });

  const checkAuth = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
    } else {
      setAdminName(
        user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin"
      );
      setAdminEmail(user.email || "");
    }
  }, [navigate]);

  const fetchUpdates = useCallback(async () => {
    setLoading(true);
    const result = await DatabaseService.getAllUpdates();
    if (result.success && result.data) {
      setUpdates(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void checkAuth();
    void fetchUpdates();
  }, [checkAuth, fetchUpdates]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Show local preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `updates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("applications")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert(`Failed to upload image: ${uploadError.message}`);
        setUploadingImage(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("applications").getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setUploadingImage(false);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image: " + (error as Error).message);
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUpdate) {
      const result = await DatabaseService.updateNewsUpdate(
        editingUpdate.id!,
        formData
      );
      if (result.success) {
        alert("Update edited successfully!");
        setShowForm(false);
        setEditingUpdate(null);
        resetForm();
        fetchUpdates();
      } else {
        alert("Failed to edit update: " + result.error);
      }
    } else {
      const result = await DatabaseService.createUpdate(formData as NewsUpdate);
      if (result.success) {
        alert("Update created successfully!");
        setShowForm(false);
        resetForm();
        fetchUpdates();
      } else {
        alert("Failed to create update: " + result.error);
      }
    }
  };

  const handleEdit = (update: NewsUpdate) => {
    setEditingUpdate(update);
    setFormData(update);
    setImagePreview(update.image_url || "");
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this update?")) {
      const result = await DatabaseService.deleteUpdate(id);
      if (result.success) {
        alert("Update deleted successfully!");
        fetchUpdates();
      } else {
        alert("Failed to delete update: " + result.error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
      category: "Events",
      excerpt: "",
      content: "",
      image_url: "",
      is_featured: false,
      is_published: false,
    });
    setImagePreview("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Newspaper className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                News & Updates Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-900">
                    {adminName}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{adminEmail}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/admin/announcements")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Manage Announcements
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => navigate("/admin/jobs")}
              className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Job Openings
            </button>
            <button
              onClick={() => navigate("/admin/applications")}
              className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Job Applications
            </button>
            <button
              onClick={() => navigate("/admin/admissions")}
              className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Admissions
            </button>
            <button className="py-4 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
              News & Updates
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Updates
              </h2>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingUpdate(null);
                  resetForm();
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Update</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {updates.map((update) => (
                      <tr key={update.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {update.is_featured && (
                              <Star
                                className="h-4 w-4 text-yellow-500 mr-2"
                                fill="currentColor"
                              />
                            )}
                            <span className="text-sm font-medium text-gray-900">
                              {update.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {update.date}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {update.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {update.author}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {update.is_published ? (
                              <span className="flex items-center space-x-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                <Eye className="h-3 w-3" />
                                <span>Published</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                <EyeOff className="h-3 w-3" />
                                <span>Draft</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button
                            onClick={() => handleEdit(update)}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label={`Edit ${update.title}`}
                            title="Edit update"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(update.id!)}
                            className="text-red-600 hover:text-red-800"
                            aria-label={`Delete ${update.title}`}
                            title="Delete update"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingUpdate ? "Edit Update" : "Add New Update"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="news-title"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    id="news-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. School wins regional award"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="news-date"
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    id="news-date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="news-author"
                  >
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    id="news-author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. School Administration"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="news-category"
                  >
                    Category *
                  </label>
                  <select
                    required
                    id="news-category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as NewsUpdate["category"],
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="news-excerpt"
                >
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={3}
                  id="news-excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief summary..."
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="news-content"
                >
                  Content *
                </label>
                <textarea
                  required
                  rows={10}
                  id="news-content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full article content..."
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="news-image"
                >
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="news-image"
                  onChange={(e) =>
                    e.target.files?.[0] && handleImageUpload(e.target.files[0])
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {uploadingImage && (
                  <div className="mt-2 flex items-center text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <p className="text-sm">Uploading image...</p>
                  </div>
                )}
                {(imagePreview || formData.image_url) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img
                      src={imagePreview || formData.image_url}
                      alt="Preview"
                      className="h-48 w-auto object-cover rounded-lg border-2 border-gray-300"
                    />
                    {formData.image_url && (
                      <p className="text-xs text-green-600 mt-2">✓ Image uploaded to server</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Featured Update</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_published: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Publish Now</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingUpdate ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUpdate(null);
                    resetForm();
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
