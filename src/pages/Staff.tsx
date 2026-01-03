import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Award,
  Book,
  Users,
  Star,
  Mail,
  Phone,
} from "lucide-react";
import angelspic from "../assets/angelspic.jpg";
import { DatabaseService, type Staff as StaffMember } from "../lib/database";

const Staff = () => {
  const [proprietress, setProprietress] = useState<StaffMember | null>(null);
  const [keyStaff, setKeyStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStaff = async () => {
      setLoading(true);
      const [propRes, keyRes] = await Promise.all([
        DatabaseService.getProprietress(),
        DatabaseService.getKeyStaff(),
      ]);

      if (propRes.success) {
        setProprietress(propRes.data || null);
      }
      if (keyRes.success && keyRes.data) {
        setKeyStaff(keyRes.data);
      }
      setLoading(false);
    };

    void loadStaff();
  }, []);

  const renderAvatar = (image?: string, name?: string) => (
    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
      {image ? (
        <img src={image} alt={name || "Staff"} className="w-full h-full object-cover" />
      ) : (
        <Users className="h-12 w-12 text-gray-400" />
      )}
    </div>
  );

  return (
    <div className="bg-white">
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
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Staff</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Our dedicated team of educators and support staff keep Angels Complex Academy moving forward.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Proprietress</h2>
            <p className="text-xl text-gray-600">Leading with vision, experience, and dedication</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-12">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : !proprietress ? (
              <p className="text-gray-600">Proprietress profile coming soon.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4">
                    {renderAvatar(proprietress.image_url, proprietress.name)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{proprietress.name}</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">{proprietress.title}</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-600">
                    {proprietress.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{proprietress.email}</span>
                      </div>
                    )}
                    {proprietress.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{proprietress.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  {proprietress.education && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                        Education
                      </h4>
                      <p className="text-gray-700">{proprietress.education}</p>
                    </div>
                  )}

                  {(proprietress.experience || proprietress.specialization) && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <Book className="h-5 w-5 mr-2 text-green-600" />
                        Experience & Specialization
                      </h4>
                      {proprietress.experience && <p className="text-gray-700 mb-2">{proprietress.experience}</p>}
                      {proprietress.specialization && <p className="text-gray-700">{proprietress.specialization}</p>}
                    </div>
                  )}

                  {proprietress.achievements && proprietress.achievements.length > 0 && (
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

                  {proprietress.bio && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">About</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{proprietress.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Staff Members</h2>
            <p className="text-xl text-gray-600">Leadership team committed to excellence in education</p>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : keyStaff.length === 0 ? (
            <p className="text-center text-gray-600">Staff profiles coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {keyStaff.map((staff) => (
                <div
                  key={staff.id || staff.name}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                      {renderAvatar(staff.image_url, staff.name)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{staff.name}</h3>
                    <p className="text-lg text-blue-600 font-semibold">{staff.title}</p>
                  </div>

                  <div className="space-y-4">
                    {staff.education && (
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                          <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                          Education
                        </h4>
                        <p className="text-gray-700">{staff.education}</p>
                      </div>
                    )}

                    {staff.experience && (
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                          <Star className="h-5 w-5 mr-2 text-yellow-600" />
                          Experience
                        </h4>
                        <p className="text-gray-700">{staff.experience}</p>
                      </div>
                    )}

                    {staff.specialization && (
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                          <Award className="h-5 w-5 mr-2 text-green-600" />
                          Specialization
                        </h4>
                        <p className="text-gray-700">{staff.specialization}</p>
                      </div>
                    )}

                    {staff.bio && <p className="text-gray-700 whitespace-pre-wrap">{staff.bio}</p>}

                    {staff.achievements && staff.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Staff Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <p className="text-gray-200">Dedicated Staff Members</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <p className="text-gray-200">Parental Satisfaction Rate</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">15+</div>
              <p className="text-gray-200">Years of Excellence</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1:20</div>
              <p className="text-gray-200">Teacher to Student Ratio</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;
