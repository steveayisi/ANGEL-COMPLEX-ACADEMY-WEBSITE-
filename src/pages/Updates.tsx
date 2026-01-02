import React, { useEffect, useState } from "react";
import { DatabaseService, NewsUpdate, Announcement } from "../lib/database";
import {
  Calendar,
  User,
  ArrowRight,
  Star,
  Bell,
  Clock,
} from "lucide-react";
const Updates = () => {
  const [featuredNews, setFeaturedNews] = useState<NewsUpdate | null>(null);
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    setLoading(true);
    
    // Fetch featured news
    const featuredResult = await DatabaseService.getFeaturedUpdate();
    if (featuredResult.success && featuredResult.data) {
      setFeaturedNews(featuredResult.data);
    }

    // Fetch all published updates
    const updatesResult = await DatabaseService.getAllPublishedUpdates();
    if (updatesResult.success && updatesResult.data) {
      setNewsUpdates(updatesResult.data);
    }

    // Fetch active announcements
    const announcementsResult = await DatabaseService.getActiveAnnouncements();
    if (announcementsResult.success && announcementsResult.data) {
      setAnnouncements(announcementsResult.data);
    }

    setLoading(false);
  };



  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "achievement":
        return "bg-yellow-100 text-yellow-800";
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "sports":
        return "bg-green-100 text-green-800";
      case "events":
        return "bg-purple-100 text-purple-800";
      case "facilities":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAnnouncementTypeColor = (type: string) => {
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20 updates-hero">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              School Updates & News
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Stay informed about the latest happenings, achievements, and
              announcements from Angels Complex Academy.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Important Announcements
              </h2>
              <p className="text-xl text-gray-600">
                Stay up to date with important school notices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`p-6 rounded-lg ${getAnnouncementTypeColor(announcement.type)}`}
                >
                  <div className="flex items-center mb-2">
                    <Bell className="h-5 w-5 mr-2 text-gray-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      {announcement.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3">{announcement.message}</p>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {new Date(announcement.created_at!).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured News - Only show if exists */}
      {loading ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </section>
      ) : featuredNews ? (
        <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Featured News
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      featuredNews.category
                    )}`}
                  >
                    {featuredNews.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredNews.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {new Date(featuredNews.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">{featuredNews.author}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredNews.excerpt}
                </p>
              </div>
              <div className="lg:p-8">
                <img
                  src={featuredNews.image_url || "https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=400"}
                  alt={featuredNews.title}
                  className="w-full h-64 lg:h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* Recent News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent News & Updates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : newsUpdates.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No updates available at this time.</p>
              </div>
            ) : (
              newsUpdates.map((news, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={news.image_url || "https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=400"}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        news.category
                      )}`}
                    >
                      {news.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      <span>{news.author}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter to receive the latest news and updates
            directly in your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Updates;
