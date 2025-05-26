import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  
  // Animation effect on page load
  useEffect(() => {
    setAnimateCards(true);
  }, []);
  
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Tiego",
      role: "Innovation Developer",
      category: "research",
      description: "Led the project’s vision, aligning it with municipal goals and citizen needs. Brought in creative ideas, feature strategy, and helped define a user-first experience.",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      contact: {
        email: "sarah.johnson@linkaresearch.org",
        github: "sarahjplanner",
        linkedin: "sarah-johnson-urbanplanning"
      }
    },
    {
      id: 2,
      name: "Morena",
      role: "Frontend Developer",
      category: "frontend",
      description: "Focused on crafting clean, responsive UI with React and Tailwind CSS. Played a key role in layout design and styling across the platform.",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      contact: {
        email: "david.chen@linkateam.org",
        github: "davidchen-dev",
        linkedin: "david-chen-webdev"
      }
    },
    {
      id: 3,
      name: "Siyabonga",
      role: "Frontend Developer",
      category: "frontend",
      description: "Implemented dynamic frontend components and ensured smooth API integration. Helped bring interactivity and performance to the user interface.",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      contact: {
        email: "amina.patel@linkateam.org",
        github: "aminapatels",
        linkedin: "amina-patel-uxdev"
      }
    },
    {
      id: 4,
      name: "Simphiwe",
      role: "Frontend Developer",
      category: "frontend",
      description: "Worked on user dashboards and public-facing pages. Ensured accessibility, navigation flow, and consistency across screens.",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      contact: {
        email: "miguel.rodriguez@linkateam.org",
        github: "miguelr-dev",
        linkedin: "miguel-rodriguez-webdev"
      }
    },
    {
      id: 5,
      name: "Jessica",
      role: "Backend Developer",
      category: "backend",
      description: "Handled backend logic, RESTful API development, and database design using Spring Boot and MySQL. Ensured the platform was reliable and scalable.",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      contact: {
        email: "grace.kim@linkateam.org",
        github: "gracekim-dev",
        linkedin: "grace-kim-backend"
      }
    },
    {
      id: 6,
      name: "Siphamandla Ngcepe",
      role: "Backend Developer",
      category: "backend",
      description: "Worked on authentication, role-based access, and admin features. Focused on secure data handling and supporting complex user interactions.",
      image: "https://sn-pcs.netlify.app/repairlink/pic1.jpg",
      contact: {
        email: "sphashepherd@gmail.com",
        github: "Doc012",
        linkedin: "siphamandla-ngcepe-a690ab20b/"
      }
    }
  ];

  // Filter team members based on active tab
  const filteredMembers = activeTab === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
      {/* Modern header with glass effect - increased z-index to ensure it stays on top */}
      <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900 flex items-center justify-center transform rotate-3 shadow-lg">
                <svg className="h-8 w-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">Linka IDP Portal</h1>
              <p className="text-sm text-gray-600 font-medium">Integrated Development Planning for Municipalities</p>
            </div>
          </div>
          <Link 
            to="/login" 
            className="group relative inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 hover:from-indigo-800 hover:via-indigo-900 hover:to-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            <span className="relative z-10 flex items-center">
              Log in to Portal
              <svg className="ml-2 -mr-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>
      </header>

      {/* Hero section with sidebar-matched color palette */}
      <div className="relative bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute right-0 top-0 transform translate-x-1/4 -translate-y-1/4" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-indigo-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa28" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-indigo-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Meet Our Team</h2>
            <p className="max-w-3xl mx-auto text-xl text-indigo-200">
              The talented individuals behind the Linka IDP Portal, working together to revolutionize 
              municipal planning and community engagement.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-b from-transparent to-indigo-50"></div>
      </div>

      {/* Main content - adjusted padding to prevent overlapping */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Team filtering tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-white shadow-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-indigo-50'
              }`}
            >
              All Team
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-indigo-50'
              }`}
            >
              Innovation
            </button>
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'frontend'
                  ? 'bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-indigo-50'
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'backend'
                  ? 'bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-indigo-50'
              }`}
            >
              Backend
            </button>
          </div>
        </div>

        {/* Improved team members grid with enhanced cards - fixed positioning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900 opacity-90"></div>
                <div className="absolute inset-0 opacity-30">
                  <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`pattern-${member.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" className="text-indigo-400" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${member.id})`} />
                  </svg>
                </div>
                
                {/* Curved wave shape at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16">
                  <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="h-full w-full">
                    <path 
                      d="M0,120 C250,180 750,60 1000,120 L1000,0 L0,0 Z" 
                      className="fill-white"
                    ></path>
                  </svg>
                </div>
                
                <div className="h-32 md:h-40 relative">
                  {/* Empty space for profile image that will overlap */}
                </div>
              </div>
              
              <div className="px-6 pt-0 pb-8 relative">
                {/* Profile image that overlaps with the background */}
                <div className="absolute -top-16 inset-x-0 flex justify-center">
                  <div className="ring-4 ring-white rounded-full overflow-hidden h-32 w-32 shadow-lg">
                    <img
                      className="h-full w-full object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                </div>
                
                {/* Content with proper spacing for the overlapping image */}
                <div className="text-center pt-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                      {member.role}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600 text-base leading-relaxed px-2">{member.description}</p>
                  
                  {/* Divider */}
                  <div className="mt-6 mb-4 flex justify-center">
                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-indigo-200 to-purple-300"></div>
                  </div>
                  
                  {/* Contact links with enhanced styling */}
                  <div className="flex justify-center space-x-5">
                    <a 
                      href={`mailto:${member.contact.email}`} 
                      className="text-indigo-400 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      title="Email"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shadow-sm hover:shadow">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </a>
                    <a 
                      href={`https://github.com/${member.contact.github}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      title="GitHub"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shadow-sm hover:shadow">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                        </svg>
                      </div>
                    </a>
                    <a 
                      href={`https://linkedin.com/in/${member.contact.linkedin}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      title="LinkedIn"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shadow-sm hover:shadow">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project info section with refined cards */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">About the Linka IDP Portal</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="h-2 bg-gradient-to-r from-indigo-700 to-purple-900"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center mb-5 group-hover:bg-indigo-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Project Mission</h4>
                <p className="text-gray-600">
                  The Linka IDP Portal is a comprehensive platform designed to streamline the 
                  integrated development planning process for municipalities. It facilitates 
                  collaboration between administrators and residents to address community needs effectively.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="h-2 bg-gradient-to-r from-indigo-700 to-purple-900"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center mb-5 group-hover:bg-indigo-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'Mapbox API'].map((tech) => (
                    <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="h-2 bg-gradient-to-r from-indigo-700 to-purple-900"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center mb-5 group-hover:bg-indigo-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Get Started</h4>
                <p className="text-gray-600 mb-5">
                  To access the Linka IDP Portal, click the login button. Demo credentials are 
                  available for both administrator and resident views.
                </p>
                <Link 
                  to="/login" 
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  Proceed to Login
                  <svg className="ml-2 -mr-1 h-4 w-4 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Refined footer with glass effect */}
      <footer className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border-t border-indigo-100 mt-24">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900 flex items-center justify-center transform -rotate-2">
                  <svg className="h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">© 2025 Linka IDP Portal</p>
                <p className="text-xs text-gray-500">All rights reserved</p>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="flex space-x-6">
                <a href="#" className="text-indigo-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-indigo-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-indigo-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">Contact</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage;