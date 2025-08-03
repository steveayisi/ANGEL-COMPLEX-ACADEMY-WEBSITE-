import React from "react";
import {
  GraduationCap,
  Target,
  Eye,
  Heart,
  Users,
  BookOpen,
  Award,
  Globe,
} from "lucide-react";
import angelsPic from "../assets/angelspic.jpg";

const About = () => {
  const achievements = [
    {
      year: "1999",
      title: "School Founded",
      description:
        "Angels Complex Academy was established with a vision to provide quality education.",
    },
    {
      year: "2015",
      title: "Expansion",
      description:
        "Added junior high school program to serve students through JHS 3.",
    },
    {
      year: "2018",
      title: "Recognition",
      description:
        "Received excellence award for outstanding academic performance.",
    },
    {
      year: "2020",
      title: "Modern Facilities",
      description:
        "Upgraded infrastructure with modern classrooms and technology.",
    },
    {
      year: "2023",
      title: "Digital Learning",
      description:
        "Integrated digital learning platforms for enhanced education.",
    },
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Modern Library",
      description:
        "Well-stocked library with books for all age groups and digital resources.",
    },
    {
      icon: Users,
      title: "Computer Lab",
      description:
        "State-of-the-art computer laboratory for digital literacy programs.",
    },
    {
      icon: Heart,
      title: "Medical Room",
      description: "On-site medical facility with qualified nursing staff.",
    },
    {
      icon: Globe,
      title: "Science Lab",
      description:
        "Fully equipped science laboratory for hands-on learning experiences.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-40">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${angelsPic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About Angels Complex Academy
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              For over two decades, we have been nurturing young minds and
              building future leaders through quality education and character
              development.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Angels Complex Academy was founded in 1999 with a simple yet
                powerful vision: to provide quality education that nurtures the
                whole child - academically, socially, and morally.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Starting as a small nursery school, we have grown to become a
                comprehensive educational institution serving students from
                creche through junior high school. Our commitment to excellence
                has made us a trusted name in education.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to uphold our founding principles while
                embracing modern teaching methods and technology to prepare our
                students for the challenges of tomorrow.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="text-center">
                <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">
                  15+ Years of Excellence
                </h3>
                <p className="text-gray-600">
                  Serving the community with dedication and producing graduates
                  who excel in their academic and personal endeavors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide quality education that develops the intellectual,
                social, emotional, and physical potential of every child in a
                safe and nurturing environment.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading educational institution that produces
                confident, creative, and caring individuals who contribute
                positively to society.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <p className="text-gray-600">
                Excellence, Integrity, Compassion, Innovation, and Respect form
                the foundation of everything we do at Angels Complex Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "pr-8" : "pl-8"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-blue-600 font-semibold text-sm mb-2">
                        {achievement.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600">
              Modern facilities designed to enhance learning and development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <facility.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Angels Complex Academy?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Proven Track Record
              </h3>
              <p className="text-gray-600">
                15+ years of excellence in education with outstanding student
                achievements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualified Staff</h3>
              <p className="text-gray-600">
                Experienced and dedicated teachers committed to student success.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comprehensive Curriculum
              </h3>
              <p className="text-gray-600">
                Well-rounded education covering academics, arts, and character
                development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
