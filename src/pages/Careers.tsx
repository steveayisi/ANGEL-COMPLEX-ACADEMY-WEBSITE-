import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Upload,
  Mail,
  Phone,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";

// Import background image
import angelspic from "../assets/angelspic.jpg";

const Careers = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const openPositions = [
    {
      title: "Primary School Teacher",
      department: "Teaching Staff",
      type: "Full-time",
      location: "Accra, Ghana",
      salary: "Competitive",
      description:
        "We are seeking a qualified and passionate Primary School Teacher to join our team. The ideal candidate will have a strong understanding of primary education curriculum and a commitment to student success.",
      requirements: [
        "Bachelor's degree in Education (B.Ed.) or equivalent",
        "Valid teaching license",
        "Minimum 2 years teaching experience",
        "Excellent classroom management skills",
        "Strong communication and interpersonal abilities",
      ],
      responsibilities: [
        "Develop and implement engaging lesson plans",
        "Assess student progress and provide feedback",
        "Maintain a positive classroom environment",
        "Collaborate with colleagues and parents",
        "Participate in school activities and events",
      ],
    },
    {
      title: "Early Childhood Educator",
      department: "Teaching Staff",
      type: "Full-time",
      location: "Accra, Ghana",
      salary: "Competitive",
      description:
        "Join our dedicated team of early years educators. We're looking for someone passionate about nurturing young minds in our Creche, Nursery, and KG programs.",
      requirements: [
        "Diploma or Degree in Early Childhood Education",
        "Experience working with children aged 6 months - 6 years",
        "Understanding of child development principles",
        "Patience, creativity, and enthusiasm",
        "First Aid certification (preferred)",
      ],
      responsibilities: [
        "Create age-appropriate learning activities",
        "Monitor child development and progress",
        "Maintain a safe and nurturing environment",
        "Communicate regularly with parents",
        "Implement early years curriculum",
      ],
    },
    {
      title: "JHS Mathematics/Science Teacher",
      department: "Teaching Staff",
      type: "Full-time",
      location: "Accra, Ghana",
      salary: "Competitive",
      description:
        "We are seeking an enthusiastic Mathematics and/or Science teacher for our Junior High School section. The ideal candidate should inspire students and make STEM subjects engaging.",
      requirements: [
        "Bachelor's degree in Mathematics, Science, or Education",
        "PGDE or teaching certification",
        "Strong subject matter expertise",
        "Experience with WAEC/BECE curriculum",
        "Technology integration skills",
      ],
      responsibilities: [
        "Teach Mathematics and/or Integrated Science",
        "Prepare students for BECE examinations",
        "Organize science clubs and competitions",
        "Use innovative teaching methods",
        "Track and improve student performance",
      ],
    },
    {
      title: "School Administrator",
      department: "Administrative Staff",
      type: "Full-time",
      location: "Accra, Ghana",
      salary: "Competitive",
      description:
        "We are looking for an organized and efficient School Administrator to support our daily operations and ensure smooth school management.",
      requirements: [
        "Diploma or Degree in Business Administration",
        "Minimum 3 years administrative experience",
        "Proficiency in Microsoft Office and school management software",
        "Strong organizational and multitasking abilities",
        "Excellent written and verbal communication",
      ],
      responsibilities: [
        "Manage school records and documentation",
        "Coordinate communication with parents and staff",
        "Assist with admissions and enrollment",
        "Support financial record-keeping",
        "Handle general office administration",
      ],
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.position) newErrors.position = "Please select a position";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Ghana phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      
      // Reset form
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          coverLetter: "",
          resume: null,
        });
        setErrors({});
        setSubmitStatus("idle");
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          resume: "File size must be less than 5MB",
        });
        return;
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          resume: "Please upload a PDF or Word document",
        });
        return;
      }

      setFormData({
        ...formData,
        resume: file,
      });

      if (errors.resume) {
        setErrors({
          ...errors,
          resume: "",
        });
      }
    }
  };

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
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Be part of a dedicated team shaping the future of education. We're
              looking for passionate educators and professionals to join Angels
              Complex Academy.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600">
              We offer a supportive environment for professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Competitive Salary
              </h3>
              <p className="text-gray-600">
                Attractive compensation packages and benefits
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Professional Development
              </h3>
              <p className="text-gray-600">
                Continuous training and growth opportunities
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Supportive Team</h3>
              <p className="text-gray-600">
                Collaborative environment with experienced colleagues
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">
                Reasonable hours and vacation time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600">
              Explore opportunities to make a difference
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {position.salary}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, position: position.title });
                      document
                        .getElementById("application-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4 lg:mt-0"
                  >
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-700 mb-6">{position.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Requirements:
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li
                          key={reqIndex}
                          className="flex items-start text-gray-700"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Responsibilities:
                    </h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className="flex items-start text-gray-700"
                        >
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Submit Your Application
            </h2>
            <p className="text-xl text-gray-600">
              Take the first step towards joining our team
            </p>
          </div>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="mb-8 p-6 bg-green-50 border-2 border-green-300 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <p className="text-green-800 font-bold text-lg">
                  Application Submitted Successfully!
                </p>
              </div>
              <p className="text-green-700 mt-2">
                Thank you for your interest in joining Angels Complex Academy.
                We have received your application and will review it carefully.
                If your qualifications match our requirements, we will contact
                you within 5-7 business days.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-800 font-medium">
                  Failed to submit application. Please try again.
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="e.g. John Mensah"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="john.mensah@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="+233 24 123 4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Position Applied For *
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.position ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a position</option>
                      {openPositions.map((pos, index) => (
                        <option key={index} value={pos.title}>
                          {pos.title}
                        </option>
                      ))}
                      <option value="other">Other Position</option>
                    </select>
                    {errors.position && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.position}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cover Letter / Message (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us why you're interested in joining our team and what makes you a great fit..."
                ></textarea>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume/CV (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <label
                    htmlFor="resume"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Click to upload
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    PDF or Word document (max 5MB)
                  </p>
                  {formData.resume && (
                    <p className="text-sm text-green-600 mt-2 flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {formData.resume.name}
                    </p>
                  )}
                  {errors.resume && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.resume}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md font-semibold transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Application...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
                <p className="text-sm text-gray-600 text-center mt-3">
                  By submitting this application, you agree to our privacy
                  policy and terms of service.
                </p>
              </div>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Questions About Employment?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our open positions or the
              application process, please don't hesitate to contact our HR
              department.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hr@angelscomplexacademy.edu.gh"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Mail className="h-5 w-5 mr-2" />
                hr@angelscomplexacademy.edu.gh
              </a>
              <a
                href="tel:+233244690571"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Phone className="h-5 w-5 mr-2" />
                +233 24 469 0571
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
