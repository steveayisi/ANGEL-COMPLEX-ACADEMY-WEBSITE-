import React, { useState } from "react";
import { DatabaseService } from "../lib/database";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Car,
  Bus,
  Users,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await DatabaseService.submitContactMessage(formData);
      
      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        console.error("Submission error:", result.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+233 24 123 4567 (Main Office)",
        "+233 20 987 6543 (Admissions)",
        "+233 24 555 8888 (Emergency)",
      ],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@angelscomplexacademy.edu.gh",
        "admissions@angelscomplexacademy.edu.gh",
        "head@angelscomplexacademy.edu.gh",
      ],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MapPin,
      title: "Physical Address",
      details: [
        "Angels Complex Academy",
        "Sowutuom Chopbar, Accra",
        "Greater Accra Region, Ghana",
      ],
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 7:30 AM - 4:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
        "Sunday: Closed",
      ],
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const departments = [
    {
      name: "Administration",
      contact: "admin@angelscomplexacademy.edu.gh",
      phone: "+233 24 123 4567",
      head: "Mrs. Regina Opoku Ansah",
    },
    {
      name: "Admissions Office",
      contact: "admissions@angelscomplexacademy.edu.gh",
      phone: "+233 20 987 6543",
      head: "Mr. Prince Ansong",
    },
    {
      name: "Academic Affairs",
      contact: "academic@angelscomplexacademy.edu.gh",
      phone: "+233 24 456 7890",
      head: "Mr. Prince Ansong",
    },
    {
      name: "Finance Office",
      contact: "finance@angelscomplexacademy.edu.gh",
      phone: "+233 20 345 6789",
      head: "Mr. Maxwel Ansah",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20 contact-hero">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with Angels Complex Academy. We're here to answer
              your questions and help you with admissions, school information,
              and more.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${info.color}`}
                >
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="academic">Academic Information</option>
                      <option value="fees">Fees and Payments</option>
                      <option value="transportation">Transportation</option>
                      <option value="extracurricular">
                        Clubs and Activities
                      </option>
                      <option value="general">General Information</option>
                      <option value="complaint">Complaint/Concern</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Failed to send message. Please try again or call us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Visit Our Campus
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5398429892815!2d-0.2733964!3d5.6759897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9d3e8e8e8e8e%3A0x0!2sSowutuom%20Chopbar%2C%20Accra!5e0!3m2!1sen!2sgh!4v1234567890123!5m2!1sen!2sgh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Angels Complex Academy - Sowutuom Chopbar"
                  ></iframe>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Main Campus</h3>
                      <p className="text-gray-600">
                        Sowutuom Chopbar, Accra<br />
                        Greater Accra Region, Ghana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Car className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Parking</h3>
                      <p className="text-gray-600">
                        Free parking available for visitors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Bus className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Public Transport</h3>
                      <p className="text-gray-600">
                        Accessible by trotro and taxi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="h-6 w-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat with us on WhatsApp
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get instant responses to your questions
                </p>
                <a
                  href="https://wa.me/233241234567?text=Hello%20Angels%20Complex%20Academy,%20I%20would%20like%20to%20inquire%20about..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Start WhatsApp Chat
                </a>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Quick Response Times
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Email inquiries: Within 24 hours</li>
                  <li>• Phone calls: Immediate response during office hours</li>
                  <li>• Admissions questions: Same day response</li>
                  <li>• Emergency matters: Immediate attention</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Department Contacts
            </h2>
            <p className="text-xl text-gray-600">
              Reach out to specific departments for specialized assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Head: {dept.head}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="truncate">{dept.contact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Emergency Contact
          </h2>
          <p className="text-xl mb-8 text-red-100">
            For urgent matters requiring immediate attention
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+233245558888" className="flex items-center justify-center hover:text-red-100 transition-colors">
              <Phone className="h-6 w-6 mr-2" />
              <span className="text-xl font-semibold">+233 24 555 8888</span>
            </a>
            <a href="mailto:emergency@angelscomplexacademy.edu.gh" className="flex items-center justify-center hover:text-red-100 transition-colors">
              <Mail className="h-6 w-6 mr-2" />
              <span className="text-xl font-semibold">
                emergency@angelscomplexacademy.edu.gh
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
