import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Award,
  Book,
  Users,
  Star,
  Mail,
  Phone,
} from "lucide-react";
import { DatabaseService, Staff as StaffType } from "../lib/database";

// Import background image
import angelspic from "../assets/angelspic.jpg";

const Staff = () => {
  const [proprietress, setProprietress] = useState<StaffType | null>(null);
  const [keyStaff, setKeyStaff] = useState<StaffType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    setLoading(true);
    
    // Fetch proprietress
    const proprietressResult = await DatabaseService.getProprietress();
    if (proprietressResult.success && proprietressResult.data) {
      setProprietress(proprietressResult.data);
    }

    // Fetch key staff
    const keyStaffResult = await DatabaseService.getKeyStaff();
    if (keyStaffResult.success && keyStaffResult.data) {
      setKeyStaff(keyStaffResult.data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading staff information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          backgroundImage: `url(${angelspic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Staff
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Our dedicated team of qualified educators and support staff are
              committed to providing the best educational experience for every
              child.
            </p>
          </div>
        </div>
      </section>

      {/* Proprietress Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Proprietress
            </h2>
            <p className="text-xl text-gray-600">
              Leading with vision, experience, and dedication
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-24 w-24 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {proprietress?.name}
                </h3>
                <p className="text-lg text-blue-600 font-semibold mb-2">
                  {proprietress?.title}
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  {proprietress?.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{proprietress.email}</span>
                    </div>
                  )}
                  {proprietress?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{proprietress.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    Education
                  </h4>
                  <p className="text-gray-700">{proprietress?.education}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <Book className="h-5 w-5 mr-2 text-green-600" />
                    Experience & Specialization
                  </h4>
                  <p className="text-gray-700 mb-2">{proprietress?.experience}</p>
                  <p className="text-gray-700">{proprietress?.specialization}</p>
                </div>

                {proprietress?.achievements && proprietress.achievements.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-600" />
                      Achievements
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {proprietress.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {proprietress?.bio && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">About</h4>
                    <p className="text-gray-700">{proprietress.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Staff Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Staff Members
            </h2>
            <p className="text-xl text-gray-600">
              Leadership team committed to excellence in education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {keyStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="text-center mb-6">
                  {staff.image_url ? (
                    <img
                      src={staff.image_url}
                      alt={staff.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-16 w-16 text-blue-600" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {staff.name}
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold">
                    {staff.title}
                  </p>
                  {(staff.email || staff.phone) && (
                    <div className="flex justify-center space-x-4 text-sm text-gray-600 mt-2">
                      {staff.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{staff.email}</span>
                        </div>
                      )}
                      {staff.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{staff.phone}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                      <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                      Education
                    </h4>
                    <p className="text-gray-700">{staff.education}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                      <Star className="h-5 w-5 mr-2 text-yellow-600" />
                      Experience
                    </h4>
                    <p className="text-gray-700">{staff.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                      <Award className="h-5 w-5 mr-2 text-green-600" />
                      Specialization
                    </h4>
                    <p className="text-gray-700">{staff.specialization}</p>
                  </div>

                  {staff.bio && (
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                        <Book className="h-5 w-5 mr-2 text-purple-600" />
                        About
                      </h4>
                      <p className="text-gray-700">{staff.bio}</p>
                    </div>
                  )}

                  {staff.achievements && staff.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Key Achievements
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {staff.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Stats */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Staff Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Total Staff Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">35+</div>
              <div className="text-gray-300">Qualified Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">12</div>
              <div className="text-gray-300">Average Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-300">With Teaching Qualifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 text-blue-100">
            Are you passionate about education? We're always looking for
            dedicated professionals to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="/careers#application-form"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Send Your CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;
