import React from "react";
import {
  GraduationCap,
  Award,
  Book,
  Users,
  Star,
  Mail,
  Phone,
} from "lucide-react";

// Import background image
import angelspic from "../assets/angelspic.jpg";

const Staff = () => {
  const headTeacher = {
    name: "Mrs. Regina Opoku Ansah",
    title: "Proprietress",
    education: "M.Ed. Educational Leadership, University of Ghana",
    experience: "20 years in education",
    specialization: "Educational Leadership & Curriculum Development",
    bio: "Mrs. Regina Opoku Ansah has been leading Angels Complex Academy for over 18 years. Her passion for education and dedication to student success has made her a respected leader in the educational community. She holds a Master's degree in Educational Leadership and has been instrumental in developing innovative teaching methods that cater to diverse learning needs.",
    achievements: [
      "Outstanding Educator Award 2020",
      "Best School Administrator 2019",
      "Educational Innovation Recognition 2018",
    ],
  };

  const staffMembers = [
    {
      name: "Mr. Prince Ansong",
      title: "Head Teacher",
      education: "B.Ed. Technical Education",
      experience: "15 years",
      specialization: "Technical & Vocational Education",
      subjects: ["Pre Technical Skills", "Basic Design & Technology"],
    },
    {
      name: "Mrs. Akosua Osei",
      title: "Senior Teacher - Early Years",
      education: "Diploma in Early Childhood Education",
      experience: "12 years",
      specialization: "Early Childhood Development",
      subjects: ["Creche", "Nursery", "KG Programs"],
    },
    {
      name: "Miss Abena Owusu",
      title: "Primary Section Head",
      education: "B.Ed. Primary Education",
      experience: "10 years",
      specialization: "Primary Education",
      subjects: ["English", "Social Studies", "RME"],
    },
    /*{
      name: "Mr. Joseph Boateng",
      title: "JHS Section Head",
      education: "B.A. English, PGDE",
      experience: "14 years",
      specialization: "English Language & Literature",
      subjects: ["English Language", "Literature", "French"],
    },
    {
      name: "Mrs. Comfort Adjei",
      title: "Science Teacher",
      education: "B.Sc. Biology, PGDE",
      experience: "8 years",
      specialization: "Integrated Science",
      subjects: ["Integrated Science", "Biology", "Chemistry"],
    },
    {
      name: "Mr. Emmanuel Frimpong",
      title: "Mathematics Teacher",
      education: "B.Sc. Mathematics, PGDE",
      experience: "9 years",
      specialization: "Mathematics",
      subjects: ["Mathematics", "Further Mathematics", "Physics"],
    },
    {
      name: "Mrs. Patience Nyarko",
      title: "Creative Arts Teacher",
      education: "B.A. Fine Arts, PGDE",
      experience: "7 years",
      specialization: "Visual & Performing Arts",
      subjects: ["Creative Arts", "Music", "Drama"],
    },
    {
      name: "Mr. Daniel Opoku",
      title: "Physical Education Teacher",
      education: "B.Ed. Physical Education",
      experience: "6 years",
      specialization: "Sports & Physical Education",
      subjects: ["Physical Education", "Sports", "Health Education"],
    },
    {
      name: "Mrs. Beatrice Ampong",
      title: "ICT Coordinator",
      education: "B.Sc. Computer Science, PGDE",
      experience: "5 years",
      specialization: "Information Technology",
      subjects: ["ICT", "Computer Studies", "Digital Literacy"],
    },*/
  ];

  const supportStaff = [
    {
      name: "Mr. Maxwel Ansah",
      title: "School Bursar",
      education: "Diploma in Accounting",
      experience: "14 years",
      specialization: "Financial Management",
    },
    {
      name: "Mr. Samuel Mensah",
      title: "Librarian",
      education: "B.A. Library Science",
      experience: "6 years",
      specialization: "Information Management",
    },
    {
      name: "Mrs. Victoria Ankrah",
      title: "School Secretary",
      education: "HND Secretaryship",
      experience: "10 years",
      specialization: "Administrative Support",
    },
    {
      name: "Mr. Francis Donkor",
      title: "Security Supervisor",
      education: "Certificate in Security Management",
      experience: "12 years",
      specialization: "School Security",
    },
  ];

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
                  {headTeacher.name}
                </h3>
                <p className="text-lg text-blue-600 font-semibold mb-2">
                  {headTeacher.title}
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>head@angelscomplexacademy.edu.gh</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    Education
                  </h4>
                  <p className="text-gray-700">{headTeacher.education}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <Book className="h-5 w-5 mr-2 text-green-600" />
                    Experience & Specialization
                  </h4>
                  <p className="text-gray-700 mb-2">{headTeacher.experience}</p>
                  <p className="text-gray-700">{headTeacher.specialization}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Achievements
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {headTeacher.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">About</h4>
                  <p className="text-gray-700">{headTeacher.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Staff Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Teaching Staff
            </h2>
            <p className="text-xl text-gray-600">
              Qualified educators dedicated to student success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((staff, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {staff.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{staff.title}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                      Education
                    </h4>
                    <p className="text-sm text-gray-600">{staff.education}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-600" />
                      Experience
                    </h4>
                    <p className="text-sm text-gray-600">{staff.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Book className="h-4 w-4 mr-2 text-green-600" />
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {staff.subjects.map((subject, subIndex) => (
                        <span
                          key={subIndex}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Support Staff
            </h2>
            <p className="text-xl text-gray-600">
              Essential team members who ensure smooth school operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportStaff.map((staff, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {staff.name}
                </h3>
                <p className="text-purple-600 font-medium mb-2">
                  {staff.title}
                </p>
                <p className="text-sm text-gray-600 mb-1">{staff.education}</p>
                <p className="text-sm text-gray-600">{staff.experience}</p>
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
              href="mailto:hr@angelscomplexacademy.edu.gh"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="mailto:hr@angelscomplexacademy.edu.gh"
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
