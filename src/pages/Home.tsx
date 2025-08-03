import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  Heart,
  Shield,
} from "lucide-react";
import angelsP1c from "../assets/angelsp1c.jpg";

const Home = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description:
        "Comprehensive learning from creche to junior high school with modern teaching methods.",
    },
    {
      icon: Users,
      title: "Experienced Staff",
      description:
        "Dedicated and qualified teachers committed to nurturing young minds.",
    },
    {
      icon: BookOpen,
      title: "Rich Curriculum",
      description:
        "Well-rounded education covering academics, arts, sports, and character development.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Proven track record of academic achievement and student success.",
    },
  ];

  const levels = [
    {
      title: "Creche",
      age: "6 months - 2 years",
      description: "Nurturing care for the youngest learners",
      color: "bg-pink-100 text-pink-800",
    },
    {
      title: "Nursery 1 & 2",
      age: "2 - 4 years",
      description: "Foundation learning through play",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Kindergarten 1 & 2",
      age: "4 - 6 years",
      description: "Preparing for primary education",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Primary 1-6",
      age: "6 - 12 years",
      description: "Building strong academic foundations",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "JHS 1-3",
      age: "12 - 15 years",
      description: "Advanced learning and skill development",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const stats = [
    { number: "500+", label: "Students" },
    { number: "50+", label: "Teachers" },
    { number: "15+", label: "Years Experience" },
    { number: "10+", label: "Clubs & Activities" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${angelsP1c})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Welcome to{" "}
              <span className="text-white">Angels Complex Academy</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Education the best Asset • Nurturing Young Minds • Building Future
              Leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center group"
              >
                Apply Now{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Angels Complex Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a nurturing environment where every child can thrive
              academically, socially, and personally from their earliest years
              through junior high school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Education Levels
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive learning journey from early childhood to junior high
              school
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${level.color}`}
                >
                  {level.age}
                </div>
                <h3 className="text-xl font-semibold mb-2">{level.title}</h3>
                <p className="text-gray-600">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Striving for the highest standards in education and character
                development.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Care</h3>
              <p className="text-gray-600">
                Providing a nurturing environment where every child feels valued
                and supported.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                Building character through honesty, respect, and moral values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our School Family?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Give your child the best start in life with quality education at
            Angels Complex Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admissions"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Application
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
