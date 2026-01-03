import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { DatabaseService, ContactMessage } from "../lib/database";
import {
  MessageSquare,
  Mail,
  Phone,
  User,
  Calendar,
  CheckCircle,
  Eye,
  Trash2,
} from "lucide-react";

export default function AdminContactMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

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

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const result = await DatabaseService.getAllContactMessages();
    if (result.success && result.data) {
      setMessages(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void checkAuth();
    void fetchMessages();
  }, [checkAuth, fetchMessages]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if it's unread
    if (message.status === "unread") {
      await DatabaseService.updateContactMessageStatus(message.id!, "read");
      fetchMessages();
    }
  };

  const handleMarkResponded = async (id: string) => {
    await DatabaseService.updateContactMessageStatus(id, "responded");
    setSelectedMessage(null);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const { error } = await supabase
          .from("contact_messages")
          .delete()
          .eq("id", id);

        if (error) throw error;

        alert("Message deleted successfully!");
        setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Unread
          </span>
        );
      case "read":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            Read
          </span>
        );
      case "responded":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Responded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Contact Messages
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
      <nav className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 min-w-max">
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
            <button
              onClick={() => navigate("/admin/updates")}
              className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              News & Updates
            </button>
            <button className="py-4 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
              Contact Messages
            </button>
            <button
              onClick={() => navigate("/admin/staff")}
              className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Staff Management
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            All Messages ({messages.length})
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Unread: {messages.filter((m) => m.status === "unread").length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No contact messages yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name & Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
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
                {messages.map((message) => (
                  <tr
                    key={message.id}
                    className={message.status === "unread" ? "bg-blue-50" : ""}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {message.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="text-sm text-gray-500">
                            {message.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {message.subject}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(message.created_at!).toLocaleDateString()}
                      <br />
                      {new Date(message.created_at!).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(message.status || "unread")}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleViewMessage(message)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View message"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(message.id!)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete message"
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
      </main>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Message Details
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(selectedMessage.status || "unread")}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {selectedMessage.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Subject
                  </label>
                  <p className="text-gray-900">{selectedMessage.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(
                      selectedMessage.created_at!
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Message
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply via Email
                </a>
                {selectedMessage.phone && (
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Call
                  </a>
                )}
              </div>
              {selectedMessage.status !== "responded" && (
                <button
                  onClick={() => handleMarkResponded(selectedMessage.id!)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Mark as Responded</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
