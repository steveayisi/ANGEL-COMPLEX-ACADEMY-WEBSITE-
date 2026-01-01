import React, { useState, useEffect } from "react";
import { DatabaseService, type AdmissionData } from "../lib/database";
import {
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";

// Import background image
import angels2 from "../assets/angels2.jpg";

const Admissions = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    age: "",
    level: "",
    phone: "",
    email: "",
    message: "",
    parentOccupation: "",
    childGender: "",
    previousSchool: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string>("");

  // Auto-hide success message after 10 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 10000); // Hide after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.parentName.trim())
      newErrors.parentName = "Parent/Guardian name is required";
    if (!formData.childName.trim())
      newErrors.childName = "Child's name is required";
    if (!formData.age) newErrors.age = "Child's age is required";
    if (!formData.level) newErrors.level = "Please select a level";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    if (!formData.childGender)
      newErrors.childGender = "Please select child's gender";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic Ghana phone number format)
    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Ghana phone number";
    }

    // Age validation
    const age = parseInt(formData.age);
    if (formData.age && (age < 0 || age > 18)) {
      newErrors.age = "Please enter a valid age (0-18 years)";
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
    setSubmitError("");

    try {
      // Prepare data for database
      const admissionData: AdmissionData = {
        parent_name: formData.parentName,
        parent_occupation: formData.parentOccupation || undefined,
        parent_phone: formData.phone,
        parent_email: formData.email,
        child_name: formData.childName,
        child_gender: formData.childGender as "male" | "female",
        child_age: parseInt(formData.age),
        desired_level: formData.level,
        previous_school: formData.previousSchool || undefined,
        emergency_contact_name: formData.emergencyContact || undefined,
        emergency_contact_phone: formData.emergencyPhone || undefined,
        additional_message: formData.message || undefined,
      };

      // Submit to database
      const result = await DatabaseService.submitAdmission(admissionData);

      if (result.success) {
        setSubmitStatus("success");
        // Reset form after a delay to allow user to see success message
        setTimeout(() => {
          setFormData({
            parentName: "",
            childName: "",
            age: "",
            level: "",
            phone: "",
            email: "",
            message: "",
            parentOccupation: "",
            childGender: "",
            previousSchool: "",
            emergencyContact: "",
            emergencyPhone: "",
          });
          setErrors({});
        }, 2000);

        // Scroll to success message smoothly
        setTimeout(() => {
          const formSection = document.querySelector(
            ".application-form-section"
          );
          if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        throw new Error(result.error || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const admissionProcess = [
    {
      step: 1,
      title: "Initial Inquiry",
      description:
        "Contact us via phone, email, or visit our campus to express interest.",
    },
    {
      step: 2,
      title: "Application Form",
      description:
        "Complete the admission application form with required documents.",
    },
    {
      step: 3,
      title: "Assessment",
      description:
        "Age-appropriate assessment for students entering Primary 1 and above.",
    },
    {
      step: 4,
      title: "Interview",
      description:
        "Parent-child interview to understand needs and expectations.",
    },
    {
      step: 5,
      title: "Enrollment",
      description: "Complete enrollment process and payment of fees.",
    },
  ];

  const requirements = [
    "Birth certificate (original and 2 photocopies)",
    "Passport-sized photographs (6 copies - recent)",
    "Previous school report cards (last 2 terms if applicable)",
    "Transfer certificate from previous school (if applicable)",
    "Immunization/vaccination records (WHO Yellow Card)",
    "Parent/guardian national ID or passport (original and photocopy)",
    "Child's Ghana Health Insurance Card (if available)",
    "Proof of residence (utility bill, rental agreement, etc.)",
    "Medical examination report from certified physician",
    "Emergency contact information form (completed)",
    "Pastor's/community leader's recommendation letter",
    "Completed admission application form",
  ];

  const feeStructure = [
    {
      level: "Creche",
      registration: "GH₵ 200",
      termly: "GH₵ 800",
      feeding: "GH₵ 000",
    },
    {
      level: "Nursery 1 & 2",
      registration: "GH₵ 100",
      termly: "GH₵ 770",
      feeding: "GH₵ 000",
    },
    {
      level: "KG 1 & 2",
      registration: "GH₵ 100",
      termly: "GH₵ 770",
      feeding: "GH₵ 000",
    },
    {
      level: "Primary 1-3",
      registration: "GH₵ 100",
      termly: "GH₵ 715",
      feeding: "GH₵ 000",
    },
    {
      level: "Primary 4-6",
      registration: "GH₵ 100",
      termly: "GH₵ 740",
      feeding: "GH₵ 000",
    },
    {
      level: "JHS 1-2",
      registration: "GH₵ 200",
      termly: "GH₵ 900",
      feeding: "GH₵ 000",
    },
    {
      level: "JHS 3",
      registration: "GH₵ 200",
      termly: "GH₵ 1500",
      feeding: "GH₵ 000",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          backgroundImage: `url(${angels2})`,
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join our school family and give your child the best start in life.
              We welcome students from creche through junior high school.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admission Open</h3>
              <p className="text-gray-600">
                Applications accepted year-round with three admission periods
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">All Levels</h3>
              <p className="text-gray-600">
                From creche (6 months) to JHS 3 (15 years)
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Process</h3>
              <p className="text-gray-600">Simple 5-step admission process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Admission Process
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to enroll your child
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {admissionProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Required Documents
              </h2>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Important Dates
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">First Term</h3>
                  <p className="text-gray-600">
                    Applications: July - September
                  </p>
                  <p className="text-gray-600">Term Starts: September</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-lg">Second Term</h3>
                  <p className="text-gray-600">
                    Applications: November - January
                  </p>
                  <p className="text-gray-600">Term Starts: January</p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <h3 className="font-semibold text-lg">Third Term</h3>
                  <p className="text-gray-600">Applications: March - May</p>
                  <p className="text-gray-600">Term Starts: May</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Requirements & Admission Criteria */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Age Requirements & Admission Criteria
            </h2>
            <p className="text-xl text-gray-600">
              Specific requirements for each level of education
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Age Requirements */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Age Requirements
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">Creche</span>
                  <span className="text-gray-600">6 months - 2 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">Nursery 1</span>
                  <span className="text-gray-600">2 - 3 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">Nursery 2</span>
                  <span className="text-gray-600">3 - 4 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">KG 1</span>
                  <span className="text-gray-600">4 - 5 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">KG 2</span>
                  <span className="text-gray-600">5 - 6 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">Primary 1</span>
                  <span className="text-gray-600">6 - 7 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="font-medium text-gray-900">JHS 1</span>
                  <span className="text-gray-600">12 - 13 years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">JHS 3</span>
                  <span className="text-gray-600">14 - 16 years</span>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Additional Criteria
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    For New Students
                  </h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Must pass age-appropriate assessment</li>
                    <li>• Interview with parents and child</li>
                    <li>• Health clearance from physician</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    For Transfer Students
                  </h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Good academic standing from previous school</li>
                    <li>• Clean disciplinary record</li>
                    <li>• Recommendation from former teacher/principal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Special Needs
                  </h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Individual assessment required</li>
                    <li>• Medical documentation if applicable</li>
                    <li>• Parent consultation meeting</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Age requirements may be flexible
                    based on individual readiness and assessment results.
                    Contact admissions office for special circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fee Structure
            </h2>
            <p className="text-xl text-gray-600">
              Transparent and competitive pricing for quality education
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Fee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Termly Fee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feeding Fee
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feeStructure.map((fee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {fee.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {fee.registration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {fee.termly}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {fee.feeding}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50 application-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Apply Now or Get More Information
              </h2>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-6 bg-green-50 border-2 border-green-300 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <p className="text-green-800 font-bold text-lg">
                      🎉 Application Submitted Successfully!
                    </p>
                  </div>
                  <p className="text-green-700 mt-2">
                    Thank you for your interest in Angels Complex Academy. We
                    have received your application and will contact you within
                    24-48 hours to discuss the next steps.
                  </p>
                  <p className="text-green-600 text-sm mt-2 font-medium">
                    Application ID: #{Date.now().toString().slice(-6)} |
                    Submitted on {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-red-800 font-medium">
                      Failed to submit application
                    </p>
                  </div>
                  {submitError && (
                    <p className="text-red-700 text-sm mt-1">{submitError}</p>
                  )}
                  <p className="text-red-700 text-sm mt-1">
                    Please check your internet connection and try again. If the
                    problem persists, contact us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parent Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Parent/Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="parentName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.parentName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="e.g. Mr. John Mensah"
                      />
                      {errors.parentName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.parentName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="parentOccupation"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="parentOccupation"
                        name="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Teacher, Engineer, Banker"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="+233 24 123 4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
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
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="john.mensah@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Child Information */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Child Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="childName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Child's Full Name *
                      </label>
                      <input
                        type="text"
                        id="childName"
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.childName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="e.g. Mary Mensah"
                      />
                      {errors.childName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.childName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="childGender"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Gender *
                      </label>
                      <select
                        id="childGender"
                        name="childGender"
                        value={formData.childGender}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.childGender
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.childGender && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.childGender}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Age *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="0"
                        max="18"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.age ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="e.g. 5"
                      />
                      {errors.age && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.age}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="level"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Desired Level *
                      </label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.level ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Level</option>
                        <option value="creche">
                          Creche (6 months - 2 years)
                        </option>
                        <option value="nursery1">Nursery 1 (2-3 years)</option>
                        <option value="nursery2">Nursery 2 (3-4 years)</option>
                        <option value="kg1">KG 1 (4-5 years)</option>
                        <option value="kg2">KG 2 (5-6 years)</option>
                        <option value="primary1">Primary 1</option>
                        <option value="primary2">Primary 2</option>
                        <option value="primary3">Primary 3</option>
                        <option value="primary4">Primary 4</option>
                        <option value="primary5">Primary 5</option>
                        <option value="primary6">Primary 6</option>
                        <option value="jhs1">JHS 1</option>
                        <option value="jhs2">JHS 2</option>
                        <option value="jhs3">JHS 3</option>
                      </select>
                      {errors.level && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.level}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="previousSchool"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Previous School (if applicable)
                    </label>
                    <input
                      type="text"
                      id="previousSchool"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name of previous school"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="emergencyContact"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Grandmother, Uncle, etc."
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="emergencyPhone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Additional Message or Special Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us more about your child, any special needs, dietary requirements, or questions you may have..."
                  ></textarea>
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
                  <p className="text-sm text-gray-600 text-center mt-2">
                    * Required fields. We will contact you within 24-48 hours.
                  </p>
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-600">+233 24 469 0571</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">
                      admissions@angelscomplexacademy.edu.gh
                    </p>
                    <p className="text-gray-600">
                      info@angelscomplexacademy.edu.gh
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-600">123 Education Street</p>
                    <p className="text-gray-600">Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 4:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 9:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
