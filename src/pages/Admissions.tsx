import React, { useState } from 'react';
import { Calendar, CheckCircle, Phone, Mail, MapPin, Clock, Users, Download } from "lucide-react";
import * as htmlToImage from 'html-to-image';
import * as XLSX from 'xlsx';
const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'ACA-ADMIN-2025';

interface FormData {
  parentName: string;
  childName: string;
  age: string;
  level: string;
  phone: string;
  email: string;
  message: string;
}
 

const Admissions = () => {
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    childName: "",
    age: "",
    level: "",
    phone: "",
    email: "",
    message: "",
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const masterFileName = 'angels_academy_applications.xlsx';
  const previewRef = React.useRef<HTMLDivElement | null>(null);
  const [adminCode, setAdminCode] = useState('');
  const [adminError, setAdminError] = useState('');

  const readMasterFile = async () => {
    try {
      const existingData = localStorage.getItem('applications');
      return existingData ? JSON.parse(existingData) : [];
    } catch (error) {
      console.error('Error reading master file:', error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const applicationData = {
        ...formData,
        submissionDate: new Date().toLocaleString(),
        applicationId: `ACA${Date.now()}`,
      };

      // Read existing applications
      const existingApplications = await readMasterFile();
      
      // Add new application
      const updatedApplications = [...existingApplications, applicationData];
      
      // Save to localStorage
      localStorage.setItem('applications', JSON.stringify(updatedApplications));

  // Show preview
  setShowPreview(true);
      
      // Create master Excel file
      const masterWsData = [
        ['Angels Complex Academy - All Applications'],
        ['Last Updated:', new Date().toLocaleString()],
        [''],
        ['Application ID', 'Submission Date', 'Parent Name', 'Child Name', 'Age', 'Level', 'Phone', 'Email', 'Message']
      ];

      // Add all applications to the sheet
      updatedApplications.forEach(app => {
        masterWsData.push([
          app.applicationId,
          app.submissionDate,
          app.parentName,
          app.childName,
          app.age,
          app.level,
          app.phone,
          app.email,
          app.message
        ]);
      });

      // Prepare master data sheet and persist to localStorage only
      const ws = XLSX.utils.aoa_to_sheet(masterWsData);
      ws['!cols'] = [
        { wch: 15 }, { wch: 20 }, { wch: 25 }, { wch: 25 },
        { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 30 }, { wch: 40 }
      ];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'All Applications');
      // Serialize workbook to base64 and store for admin download later
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
      localStorage.setItem('applications_master_xlsx_base64', wbout);

      alert('Application submitted successfully! You can now preview and download an image copy.');
    } catch (error) {
      console.error('Error processing application:', error);
      alert('There was an error processing your application. Please try again.');
    }
  };

  const handleAdminDownload = () => {
    if (adminCode.trim() !== PASSCODE) {
      setAdminError('Incorrect passcode');
      return;
    }
    setAdminError('');
    try {
      const base64 = localStorage.getItem('applications_master_xlsx_base64');
      if (!base64) {
        alert('No applications found yet. Submit a form to generate the master file.');
        return;
      }
      const wb = XLSX.read(base64, { type: 'base64' });
      XLSX.writeFile(wb, masterFileName);
    } catch (err) {
      console.error('Failed to download master file', err);
      alert('Failed to download master file.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    "Birth certificate (original and photocopy)",
    "Passport-sized photographs (4 copies)",
    "Previous school report cards (if applicable)",
    "Immunization records",
    "Parent/guardian identification",
    "Proof of residence",
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Apply Now or Get More Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="childName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Child's Name *
                    </label>
                    <input
                      type="text"
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Child's Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Level</option>
                      <option value="creche">Creche</option>
                      <option value="nursery1">Nursery 1</option>
                      <option value="nursery2">Nursery 2</option>
                      <option value="kg1">KG 1</option>
                      <option value="kg2">KG 2</option>
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us more about your child or any specific questions..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <span>Submit Application</span>
                  <Download className="h-5 w-5" />
                </button>

                {showPreview && (
                  <div ref={previewRef} className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Application Preview</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Parent/Guardian Name</p>
                        <p className="font-medium">{formData.parentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Child's Name</p>
                        <p className="font-medium">{formData.childName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-medium">{formData.age}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Desired Level</p>
                        <p className="font-medium">{formData.level}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contact Information</p>
                        <p className="font-medium">{formData.phone}</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Additional Message</p>
                        <p className="font-medium">{formData.message}</p>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          onClick={async () => {
                            try {
                              if (!previewRef.current) return;
                              const dataUrl = await htmlToImage.toPng(previewRef.current, { cacheBust: true });
                              const link = document.createElement('a');
                              const safeChildName = formData.childName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                              link.download = `angels_academy_application_${safeChildName}_${new Date().toISOString().split('T')[0]}.png`;
                              link.href = dataUrl;
                              link.click();
                            } catch (err) {
                              console.error('Failed to export image', err);
                              alert('Sorry, could not generate image.');
                            }
                          }}
                          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Image Copy</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowPreview(false);
                            setFormData({
                              parentName: "",
                              childName: "",
                              age: "",
                              level: "",
                              phone: "",
                              email: "",
                              message: "",
                            });
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          Submit Another Application
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-3 text-sm text-gray-500 text-center">
                  Your application will be saved and you can download a copy for your records
                </p>

                {/* Admin-only section */}
                <div className="mt-10 border-t pt-6">
                  <p className="text-xs uppercase text-gray-500 mb-3">Admin only</p>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <input
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter admin passcode"
                    />
                    <button
                      type="button"
                      onClick={handleAdminDownload}
                      className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      Download Master Excel
                    </button>
                  </div>
                  {adminError && <p className="text-red-600 text-sm mt-2">{adminError}</p>}
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
                    <p className="text-gray-600">+233 XX XXX XXXX</p>
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
