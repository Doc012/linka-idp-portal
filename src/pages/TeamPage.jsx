import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const slideInterval = useRef(null);
  
  const slides = [
    "https://sn-pcs.netlify.app/repairlink/sld3.jpg",
    "https://sn-pcs.netlify.app/repairlink/sld1.jpg",
    "https://sn-pcs.netlify.app/repairlink/sld2.jpg"
  ];
  
  // Preload images and handle loading state
  useEffect(() => {
    const imagePromises = slides.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    
    // Also preload team member images
    const teamImagePromises = teamMembers.map((member) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = member.image;
        img.onload = resolve;
        img.onerror = resolve; // Still resolve on error to not block loading
      });
    });
    
    // Wait for all images to load
    Promise.all([...imagePromises, ...teamImagePromises])
      .then(() => {
        // Increased delay from 1000ms to 3500ms (3.5 seconds)
        setTimeout(() => {
          setIsLoading(false);
          setAnimateCards(true);
        }, 3500); // Extended time to allow users to appreciate the loading animation
      })
      .catch(() => {
        // If there's an error loading some images, still show the site after a timeout
        // Increased from 2000ms to 4000ms (4 seconds)
        setTimeout(() => {
          setIsLoading(false);
          setAnimateCards(true);
        }, 4000);
      });
  }, []);
  
  // Image slider logic
  useEffect(() => {
    // Only start the slider after loading is complete
    if (!isLoading) {
      const startSlider = () => {
        slideInterval.current = setInterval(() => {
          setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
      };
      
      startSlider();
      
      return () => {
        if (slideInterval.current) {
          clearInterval(slideInterval.current);
        }
      };
    }
  }, [slides.length, isLoading]);
  
  const goToSlide = (index) => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    setCurrentSlide(index);
  };
  
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Tiego Molele",
      role: "Innovation Developer",
      category: "research",
      description: "Led the project’s vision, aligning it with municipal goals and citizen needs. Brought in creative ideas, feature strategy, and helped define a user-first experience.",
      image: "https://sn-pcs.netlify.app/repairlink/tiego.jpg",
      contact: {
        email: "tiegomo645@gmail.com",
        github: "Tiego123",
        linkedin: "tiego-molele-2635b8253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
      }
    },
    {
      id: 2,
      name: "Morena Ramateletse",
      role: "Frontend Developer",
      category: "frontend",
      description: "Focused on crafting clean, responsive UI with React and Tailwind CSS. Played a key role in layout design and styling across the platform.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEdeQg6rrzQpA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1688506554576?e=1753920000&v=beta&t=PkOuDulngzN6MlRIXh6gu5FH9fO-CnLPrtSxQ5Rpa_k",
      contact: {
        email: " MSRamateletse0581@protonmail.com",
        github: "MrRobotjr7",
        linkedin: "ramateletse-morena-ba59b4134"
      }
    },
    {
      id: 3,
      name: "Siyabonga Hlongwane",
      role: "Frontend Developer",
      category: "frontend",
      description: "Implemented dynamic frontend components and ensured smooth API integration. Helped bring interactivity and performance to the user interface.",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
      contact: {
        email: "s@gmail.com",
        github: "aminapatels",
        linkedin: "amina-patel-uxdev"
      }
    },
    {
      id: 4,
      name: "Simphiwe Mtombeni",
      role: "Frontend Developer",
      category: "frontend",
      description: "Worked on user dashboards and public-facing pages. Ensured accessibility, navigation flow, and consistency across screens.",
      image: "https://media.licdn.com/dms/image/v2/C4D03AQFhV_bAd4jryg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1608033748874?e=1753920000&v=beta&t=NqI1VaxqUEYCYLsMfOyNN5dbOFwYgKzUKkA13KbcFVM",
      contact: {
        email: "imphiwemtombeni@outlook.com",
        github: "SimphiweMtombeni ",
        linkedin: "simphiwe-mtombeni/"
      }
    },
    {
      id: 5,
      name: "Jessica Morwatshehla",
      role: "Backend Developer",
      category: "backend",
      description: "Handled backend logic, RESTful API development, and database design using Spring Boot and MySQL. Ensured the platform was reliable and scalable.",
      image: "https://sn-pcs.netlify.app/repairlink/j1.jpg",
      contact: {
        email: "tshehla456@gmail.com",
        github: "Jessica054",
        linkedin: "jessica-morwatshehla-2041ba2a7"
      }
    },
    {
      id: 6,
      name: "Siphamandla Ngcepe",
      role: "Backend Developer",
      category: "backend",
      description: "Worked on authentication, role-based access, and admin features. Focused on secure data handling and supporting complex user interactions.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEKxrFnSyVSFQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713457941935?e=1753920000&v=beta&t=CmqLIm0lZ__7irtGAB6BBw4NF9pXCOdWZIMUIlKwzdY",
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
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900">
          <div className="text-center">
            <div className="mb-10 relative">
              {/* Center logo */}
              <div className="relative h-24 w-24 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto shadow-lg z-10">
                <svg className="h-14 w-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              {/* Pulsing ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border-2 border-indigo-300/50 animate-pulse-ring"></div>
              </div>
              
              {/* Orbiting circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-40 w-40">
                  {/* Orbiting elements */}
                  <div className="absolute h-3 w-3 rounded-full bg-indigo-300 top-0 left-1/2 -translate-x-1/2 animate-orbit" 
                       style={{ animationDelay: "0ms" }}></div>
                  <div className="absolute h-3 w-3 rounded-full bg-purple-300 top-1/2 right-0 -translate-y-1/2 animate-orbit" 
                       style={{ animationDelay: "-750ms" }}></div>
                  <div className="absolute h-3 w-3 rounded-full bg-indigo-200 bottom-0 left-1/2 -translate-x-1/2 animate-orbit" 
                       style={{ animationDelay: "-1500ms" }}></div>
                  <div className="absolute h-3 w-3 rounded-full bg-purple-200 top-1/2 left-0 -translate-y-1/2 animate-orbit" 
                       style={{ animationDelay: "-2250ms" }}></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">Linka IDP Portal</h2>
            <p className="text-indigo-200 mb-8">Preparing your experience...</p>
            
            {/* Bouncing dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-white/80 animate-bounce-delayed" 
                  style={{ animationDelay: `${i * 150}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modern header with glass effect - increased z-index to ensure it stays on top */}
      <header className="sticky top-0 z-40 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-b from-indigo-700 via-indigo-800 to-purple-900 flex items-center justify-center shadow-lg">
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

      {/* Updated Hero section with image slider */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/60 to-purple-700/60"></div>
            </div>
          ))}
        </div>
        
        {/* Slider navigation dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        {/* Enhanced content overlay with municipal branding emphasis */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                Municipal Digital Transformation Initiative
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
                Meet Our Implementation Team
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-white/90 drop-shadow leading-relaxed">
                The professionals behind the Linka IDP Portal, working together to revolutionize 
                municipal planning and strengthen community engagement across our municipality.
              </p>
            </div>
          </div>
        </div>
        
        {/* Gradient overlay at bottom for smooth transition */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-gray-50/70 to-transparent" style={{ bottom: "-8px" }}></div>
      </div>

      {/* Main content - adjusted padding to prevent overlapping */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced team filtering tabs with more professional styling */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-full bg-white shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              Complete Team
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              Strategic Planning
            </button>
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'frontend'
                  ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              User Interface
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'backend'
                  ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-purple-900 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              System Architecture
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
                  
                  {/* Contact links with enhanced styling and email tooltip */}
                  <div className="flex justify-center space-x-5">
                    <div className="relative">
                      <a 
                        href={`mailto:${member.contact.email}`} 
                        className="text-indigo-400 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                        title="Email"
                        onMouseEnter={() => setHoveredEmail(member.id)}
                        onMouseLeave={() => setHoveredEmail(null)}
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shadow-sm hover:shadow">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </a>
                      
                      {/* Email tooltip that appears on hover */}
                      {hoveredEmail === member.id && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-indigo-800 text-white text-xs rounded-lg py-2 px-3 shadow-lg z-10 whitespace-nowrap animate-fade-in">
                          <div className="relative">
                            {member.contact.email}
                            {/* Triangle pointer at bottom */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-indigo-800 rotate-45"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
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

        {/* Project info section with refined cards and municipal focus */}
        <div className="mt-28 bg-gradient-to-r from-gray-50 to-purple-50 py-16 rounded-3xl shadow-sm">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-3">Linka IDP Portal</h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            A digital solution designed specifically for our municipality's integrated development planning needs
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="h-2 bg-gradient-to-r from-gray-700 to-purple-900"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Municipal Vision</h4>
                <p className="text-gray-600">
                  Linka IDP is a digital solution that improves how citizens engage with municipal development plans. It allows users to access, vote on, and comment on Integrated Development Plans (IDPs) by ward. This encourages transparency and greater community participation.
                </p> 
                <br />
                <p className="text-gray-600">
                  The platform bridges the gap between local government and residents. It helps municipalities understand local needs and priorities more clearly. Linka promotes inclusive, accountable, and citizen-driven planning.
                </p>
              </div>
            </div>
            
            {/* Technologies card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="h-2 bg-gradient-to-r from-gray-700 to-purple-900"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Technologies</h4>
                
                {/* Frontend Technologies */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Frontend</h5>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Vite', 'Tailwind CSS', 'React Router'].map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Backend Technologies */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Backend</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'Spring Boot', 'Spring Security', 'Spring Mail', 'MySQL', 'JPA/Hibernate'].map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Authentication */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Authentication</h5>
                  <div className="flex flex-wrap gap-2">
                    {['JWT', 'Redis'].map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tools & Platforms */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Tools & Platforms</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Postman', 'Netlify', 'MySQL Workbench'].map((tech) => (
                      <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="h-2 bg-gradient-to-r from-gray-700 to-purple-900"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Get Started</h4>
                <p className="text-gray-600 mb-6">
                  To access the Linka IDP Portal, click the login button. Demo credentials are available for both administrator and resident views.
                </p>
                <div className="mt-6">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-gray-700 to-purple-800 hover:from-gray-800 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
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
        </div>
      </main>

      {/* Enhanced footer with municipal branding */}
      <footer className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border-t border-gray-100 mt-24">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-b from-gray-700 via-gray-800 to-purple-900 flex items-center justify-center shadow-md">
                  <svg className="h-7 w-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">© 2025 Linka IDP Portal</p>
                <p className="text-sm text-gray-500">A municipal digital transformation initiative</p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 text-center md:text-right">
              <p className="text-sm text-gray-500 mb-2">For more information, contact:</p>
              <p className="text-base font-medium text-gray-900">Municipal Digital Services Office</p>
              <p className="text-sm text-gray-600">digital.services@municipality.gov.za</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage;