import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import logoAngels from "../assets/logoAngels.jpg"; // Import your logo

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Admissions", href: "/admissions" },
    { name: "Staff", href: "/staff" },
    { name: "Updates", href: "/updates" },
    { name: "Clubs", href: "/clubs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="relative group cursor-pointer">
                  <img
                    src={logoAngels}
                    alt="School Logo"
                    className="h-12 w-12 rounded-full object-cover transition-all duration-700 ease-in-out
                             logo-float logo-glow
                             hover:logo-pop active:logo-roll
                             shadow-lg hover:shadow-2xl
                             ring-2 ring-blue-200 hover:ring-4 hover:ring-blue-400
                             transform hover:scale-110 hover:rotate-12
                             border-2 border-white hover:border-blue-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add('logo-pop');
                      setTimeout(() => e.currentTarget.classList.remove('logo-pop'), 600);
                    }}
                    onClick={(e) => {
                      e.currentTarget.classList.add('logo-roll');
                      setTimeout(() => e.currentTarget.classList.remove('logo-roll'), 2000);
                    }}
                  />
                  {/* Multiple glowing effect rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 
                                group-hover:opacity-20 animate-ping duration-1000"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 
                                group-hover:opacity-10 animate-pulse duration-2000"></div>
                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 
                                group-hover:opacity-100 animate-bounce duration-500 delay-100"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 
                                group-hover:opacity-100 animate-ping duration-700 delay-200"></div>
                </div>
                <div className="transition-all duration-300 hover:translate-x-1 group-hover:scale-105">
                  <h1 className="text-xl font-bold transition-all duration-500
                               text-shimmer hover:text-shimmer
                               transform hover:scale-105 cursor-pointer
                               drop-shadow-sm hover:drop-shadow-md">
                    Angels Complex Academy
                  </h1>
                  <p className="text-xs text-gray-500 hover:text-blue-500 transition-all duration-300
                               animate-pulse hover:animate-bounce
                               transform hover:translate-x-2 hover:scale-110
                               hover:font-semibold hover:drop-shadow-sm">
                    Education the best Asset ✨🎓
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative group">
                  <img
                    src={logoAngels}
                    alt="School Logo"
                    className="h-12 w-12 rounded-full object-cover transition-all duration-500 ease-in-out
                             hover:scale-105 hover:rotate-6 
                             shadow-lg hover:shadow-xl
                             ring-2 ring-gray-600 hover:ring-blue-400"
                  />
                  {/* Subtle glow for footer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-white opacity-0 
                                hover:opacity-10 transition-opacity duration-500"></div>
                </div>
                <div className="transition-all duration-300">
                  <h3 className="text-xl font-bold text-white hover:text-blue-300 transition-colors duration-300">
                    Angels Complex Academy
                  </h3>
                  <p className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    Education the best Asset ✨
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Providing quality education from creche to junior high school,
                nurturing young minds for a brighter future.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admissions"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Staff
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clubs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Clubs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">+233 XX XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">
                    info@angelscomplexacademy.edu.gh
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">Accra, Ghana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Angels Complex Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
