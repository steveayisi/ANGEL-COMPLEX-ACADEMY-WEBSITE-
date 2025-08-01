import React from 'react';
import { Users, Clock, MapPin, Star, Trophy, Music, BookOpen, Palette, Calculator, Globe, Heart, Zap } from 'lucide-react';

const Clubs = () => {
  const clubs = [
    {
      name: 'Science Club',
      description: 'Explore the wonders of science through experiments, observations, and discovery.',
      icon: Zap,
      color: 'bg-blue-100 text-blue-600',
      members: 25,
      meetingDay: 'Wednesdays',
      meetingTime: '3:00 PM - 4:30 PM',
      location: 'Science Laboratory',
      supervisor: 'Mrs. Comfort Adjei',
      activities: [
        'Science experiments and demonstrations',
        'Science fair preparation',
        'Laboratory skills development',
        'Scientific research projects'
      ],
      achievements: [
        '1st Place - Regional Science Fair 2024',
        'Best Innovation Award 2023',
        'Outstanding Research Project 2024'
      ]
    },
    {
      name: 'Mathematics Club',
      description: 'Develop problem-solving skills and explore the beauty of mathematics.',
      icon: Calculator,
      color: 'bg-green-100 text-green-600',
      members: 30,
      meetingDay: 'Thursdays',
      meetingTime: '3:00 PM - 4:30 PM',
      location: 'Mathematics Classroom',
      supervisor: 'Mr. Emmanuel Frimpong',
      activities: [
        'Mathematical puzzles and games',
        'Competition preparation',
        'Peer tutoring sessions',
        'Mathematical modeling projects'
      ],
      achievements: [
        'Regional Math Olympiad Winners',
        'Best Problem Solving Team 2024',
        'Mathematics Excellence Award'
      ]
    },
    {
      name: 'Reading Club',
      description: 'Foster a love for reading and improve literacy skills through shared literary experiences.',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-600',
      members: 35,
      meetingDay: 'Tuesdays',
      meetingTime: '3:00 PM - 4:00 PM',
      location: 'School Library',
      supervisor: 'Mr. Samuel Mensah',
      activities: [
        'Book discussions and reviews',
        'Creative writing workshops',
        'Storytelling sessions',
        'Reading competitions'
      ],
      achievements: [
        'Best School Library Program 2024',
        'Reading Champion Award',
        'Literature Quiz Winners'
      ]
    },
    {
      name: 'Art & Craft Club',
      description: 'Express creativity through various art forms and craft projects.',
      icon: Palette,
      color: 'bg-pink-100 text-pink-600',
      members: 28,
      meetingDay: 'Fridays',
      meetingTime: '3:00 PM - 4:30 PM',
      location: 'Art Room',
      supervisor: 'Mrs. Patience Nyarko',
      activities: [
        'Painting and drawing sessions',
        'Craft making workshops',
        'Art exhibitions preparation',
        'Creative design projects'
      ],
      achievements: [
        'Best Art Exhibition 2024',
        'Creative Excellence Award',
        'Community Art Project Recognition'
      ]
    },
    {
      name: 'Music Club',
      description: 'Develop musical talents through singing, playing instruments, and music appreciation.',
      icon: Music,
      color: 'bg-yellow-100 text-yellow-600',
      members: 40,
      meetingDay: 'Mondays',
      meetingTime: '3:00 PM - 4:30 PM',
      location: 'Music Room',
      supervisor: 'Mrs. Patience Nyarko',
      activities: [
        'Choir practice sessions',
        'Instrument lessons',
        'Music theory classes',
        'Performance preparation'
      ],
      achievements: [
        'Regional Music Festival Winners',
        'Best School Choir 2024',
        'Outstanding Performance Award'
      ]
    },
    {
      name: 'Environmental Club',
      description: 'Promote environmental awareness and sustainable practices within the school community.',
      icon: Globe,
      color: 'bg-green-100 text-green-600',
      members: 22,
      meetingDay: 'Wednesdays',
      meetingTime: '3:00 PM - 4:00 PM',
      location: 'School Garden',
      supervisor: 'Mr. Kwame Asante',
      activities: [
        'School gardening projects',
        'Recycling initiatives',
        'Environmental awareness campaigns',
        'Clean-up exercises'
      ],
      achievements: [
        'Best Environmental Project 2024',
        'Green School Award',
        'Community Service Recognition'
      ]
    },
    {
      name: 'Sports Club',
      description: 'Develop athletic skills and promote physical fitness through various sports activities.',
      icon: Trophy,
      color: 'bg-orange-100 text-orange-600',
      members: 50,
      meetingDay: 'Daily',
      meetingTime: '3:00 PM - 5:00 PM',
      location: 'Sports Field',
      supervisor: 'Mr. Daniel Opoku',
      activities: [
        'Football training sessions',
        'Athletics practice',
        'Inter-house competitions',
        'Sports tournaments'
      ],
      achievements: [
        'Regional Football Champions',
        'Best Athletic Performance',
        'Sports Excellence Award'
      ]
    },
    {
      name: 'Debate Club',
      description: 'Enhance public speaking skills and critical thinking through structured debates.',
      icon: Users,
      color: 'bg-red-100 text-red-600',
      members: 20,
      meetingDay: 'Fridays',
      meetingTime: '3:00 PM - 4:30 PM',
      location: 'School Auditorium',
      supervisor: 'Mr. Joseph Boateng',
      activities: [
        'Debate competitions',
        'Public speaking workshops',
        'Critical thinking exercises',
        'Mock parliamentary sessions'
      ],
      achievements: [
        'Regional Debate Champions',
        'Best Debater Award 2024',
        'Public Speaking Excellence'
      ]
    },
    {
      name: 'Community Service Club',
      description: 'Engage in community service activities and develop social responsibility.',
      icon: Heart,
      color: 'bg-rose-100 text-rose-600',
      members: 32,
      meetingDay: 'Saturdays',
      meetingTime: '9:00 AM - 12:00 PM',
      location: 'Various Community Locations',
      supervisor: 'Mrs. Grace Mensah',
      activities: [
        'Community outreach programs',
        'Charity events organization',
        'Volunteer work coordination',
        'Social awareness campaigns'
      ],
      achievements: [
        'Outstanding Community Service 2024',
        'Youth Leadership Award',
        'Social Impact Recognition'
      ]
    }
  ];

  const clubStats = [
    { number: '9', label: 'Active Clubs' },
    { number: '280+', label: 'Club Members' },
    { number: '15+', label: 'Weekly Sessions' },
    { number: '25+', label: 'Awards Won' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">School Clubs & Activities</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Discover and join our vibrant clubs that help students develop their talents, 
              interests, and leadership skills beyond the classroom.
            </p>
          </div>
        </div>
      </section>

      {/* Club Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clubStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Active Clubs
            </h2>
            <p className="text-xl text-gray-600">
              Choose from a variety of clubs to explore your interests and develop new skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${club.color} mr-4`}>
                    <club.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
                    <p className="text-gray-600 text-sm">{club.members} members</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{club.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{club.meetingDay}, {club.meetingTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{club.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Supervisor: {club.supervisor}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Activities:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {club.activities.slice(0, 3).map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {club.achievements.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
                      Recent Achievements:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {club.achievements.slice(0, 2).map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <Star className="h-3 w-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Joining Our Clubs
            </h2>
            <p className="text-xl text-gray-600">
              Why extracurricular activities are important for your child's development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Social Skills</h3>
              <p className="text-gray-600">Build friendships and learn teamwork through collaborative activities.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leadership</h3>
              <p className="text-gray-600">Develop leadership skills and take on responsibilities within the club.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Talent Discovery</h3>
              <p className="text-gray-600">Discover and nurture hidden talents and interests.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Character Building</h3>
              <p className="text-gray-600">Build character, confidence, and personal values.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Join a Club
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your child involved in our exciting clubs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose a Club</h3>
              <p className="text-gray-600">Browse our clubs and find one that matches your child's interests.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Fill Registration Form</h3>
              <p className="text-gray-600">Complete the club registration form available at the school office.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Meet the Supervisor</h3>
              <p className="text-gray-600">Introduce your child to the club supervisor and understand expectations.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Participating</h3>
              <p className="text-gray-600">Your child can start attending club meetings and activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join a Club?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Help your child discover their passion and develop new skills through our diverse club offerings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Registration Form
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clubs;