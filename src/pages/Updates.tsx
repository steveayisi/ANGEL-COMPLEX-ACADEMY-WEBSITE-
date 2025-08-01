import React from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Bell, Star, Award } from 'lucide-react';

const Updates = () => {
  const featuredNews = {
    title: 'Angels Complex Academy Wins Regional Academic Excellence Award',
    date: '2025-01-15',
    author: 'School Administration',
    category: 'Achievement',
    excerpt: 'We are proud to announce that Angels Complex Academy has been awarded the Regional Academic Excellence Award for outstanding performance in the 2024 academic year.',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    content: 'This prestigious award recognizes our commitment to providing quality education and the exceptional performance of our students across all levels. The award ceremony was held at the Regional Education Office, where our students and teachers were celebrated for their dedication and hard work.'
  };

  const newsUpdates = [
    {
      title: 'New Computer Laboratory Officially Opens',
      date: '2025-01-12',
      author: 'ICT Department',
      category: 'Facilities',
      excerpt: 'State-of-the-art computer laboratory with 30 modern computers now available for student use.',
      image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Second Term Begins January 20th',
      date: '2025-01-10',
      author: 'Academic Office',
      category: 'Academic',
      excerpt: 'All students are expected to report to school on Monday, January 20th, 2025 for the commencement of the second term.',
      image: 'https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Inter-House Sports Competition Results',
      date: '2025-01-08',
      author: 'Sports Department',
      category: 'Sports',
      excerpt: 'Blue House emerges victorious in the annual inter-house sports competition held last weekend.',
      image: 'https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Parent-Teacher Association Meeting',
      date: '2025-01-05',
      author: 'PTA Committee',
      category: 'Events',
      excerpt: 'Monthly PTA meeting scheduled for January 25th at 2:00 PM in the school auditorium.',
      image: 'https://images.pexels.com/photos/5212367/pexels-photo-5212367.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Science Fair 2025 Preparations Begin',
      date: '2025-01-03',
      author: 'Science Department',
      category: 'Academic',
      excerpt: 'Students are invited to participate in the upcoming Science Fair scheduled for March 2025.',
      image: 'https://images.pexels.com/photos/5212344/pexels-photo-5212344.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'New Library Books Arrive',
      date: '2025-01-01',
      author: 'Library Department',
      category: 'Resources',
      excerpt: 'Over 500 new books have been added to our library collection, covering various subjects and age groups.',
      image: 'https://images.pexels.com/photos/5212326/pexels-photo-5212326.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const announcements = [
    {
      title: 'School Fees Payment Deadline',
      date: '2025-01-18',
      type: 'urgent',
      message: 'Parents are reminded that school fees for the second term must be paid by January 31st, 2025.'
    },
    {
      title: 'Uniform Inspection',
      date: '2025-01-16',
      type: 'info',
      message: 'Complete uniform inspection will be conducted on January 22nd. Ensure all students are properly dressed.'
    },
    {
      title: 'Vaccination Exercise',
      date: '2025-01-14',
      type: 'health',
      message: 'Ghana Health Service will conduct routine vaccination for all students on January 28th.'
    },
    {
      title: 'Academic Performance Review',
      date: '2025-01-12',
      type: 'academic',
      message: 'First term academic performance reports are now available for collection at the school office.'
    }
  ];

  const achievements = [
    {
      title: 'Mathematics Olympiad Winners',
      description: 'Five students from Angels Complex Academy won positions in the Regional Mathematics Olympiad.',
      date: '2025-01-10',
      icon: Award
    },
    {
      title: 'Best School Environmental Project',
      description: 'Our school garden project has been recognized as the best environmental initiative in the district.',
      date: '2025-01-05',
      icon: Star
    },
    {
      title: 'Outstanding Teacher Award',
      description: 'Mrs. Akosua Osei receives the Outstanding Early Years Teacher Award from the Regional Education Office.',
      date: '2024-12-20',
      icon: Award
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'sports':
        return 'bg-green-100 text-green-800';
      case 'events':
        return 'bg-purple-100 text-purple-800';
      case 'facilities':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-500 bg-red-50';
      case 'health':
        return 'border-green-500 bg-green-50';
      case 'academic':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">School Updates & News</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Stay informed about the latest happenings, achievements, and announcements 
              from Angels Complex Academy.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
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
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredNews.category)}`}>
                    {featuredNews.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredNews.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{new Date(featuredNews.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">{featuredNews.author}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredNews.content}
                </p>
              </div>
              <div className="lg:p-8">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-64 lg:h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
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
            {announcements.map((announcement, index) => (
              <div key={index} className={`border-l-4 p-6 rounded-lg ${getAnnouncementColor(announcement.type)}`}>
                <div className="flex items-center mb-2">
                  <Bell className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-semibold text-lg text-gray-900">{announcement.title}</h3>
                </div>
                <p className="text-gray-700 mb-3">{announcement.message}</p>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent News & Updates
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsUpdates.map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                      {news.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{news.title}</h3>
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
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Celebrating our students' and school's accomplishments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(achievement.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
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