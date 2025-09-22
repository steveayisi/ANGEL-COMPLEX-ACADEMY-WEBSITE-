import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Car, Bus, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        '+233 XX XXX XXXX (Main Office)',
        '+233 XX XXX XXXX (Admissions)',
        '+233 XX XXX XXXX (Emergency)'
      ],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'info@angelscomplexacademy.edu.gh',
        'admissions@angelscomplexacademy.edu.gh',
        'head@angelscomplexacademy.edu.gh'
      ],
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Physical Address',
      details: [
        'Angels Complex Academy',
        '123 Education Street',
        'Accra, Ghana'
      ],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 8:00 AM - 4:00 PM',
        'Saturday: 9:00 AM - 12:00 PM',
        'Sunday: Closed'
      ],
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const departments = [
    {
      name: 'Administration',
      contact: 'admin@angelscomplexacademy.edu.gh',
      phone: '+233 XX XXX XXXX',
      head: 'Mrs. Victoria Ankrah'
    },
    {
      name: 'Admissions Office',
      contact: 'admissions@angelscomplexacademy.edu.gh',
      phone: '+233 XX XXX XXXX',
      head: 'Mr. Kwame Asante'
    },
    {
      name: 'Academic Affairs',
      contact: 'academic@angelscomplexacademy.edu.gh',
      phone: '+233 XX XXX XXXX',
      head: 'Mrs. Grace Mensah'
    },
    {
      name: 'Student Affairs',
      contact: 'students@angelscomplexacademy.edu.gh',
      phone: '+233 XX XXX XXXX',
      head: 'Mr. Joseph Boateng'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with Angels Complex Academy. We're here to answer your questions 
              and help you with admissions, school information, and more.
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
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${info.color}`}>
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">{detail}</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <option value="extracurricular">Clubs and Activities</option>
                      <option value="general">General Information</option>
                      <option value="complaint">Complaint/Concern</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Visit Our Campus</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-500">School Map Placeholder</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Main Campus</h3>
                      <p className="text-gray-600">123 Education Street, Accra, Ghana</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Car className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Parking</h3>
                      <p className="text-gray-600">Free parking available for visitors</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Bus className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Public Transport</h3>
                      <p className="text-gray-600">Accessible by trotro and taxi</p>
                    </div>
                  </div>
                </div>
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
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">Head: {dept.head}</p>
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
            <div className="flex items-center justify-center">
              <Phone className="h-6 w-6 mr-2" />
              <span className="text-xl font-semibold">+233 XX XXX XXXX</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="h-6 w-6 mr-2" />
              <span className="text-xl font-semibold">emergency@angelscomplexacademy.edu.gh</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;