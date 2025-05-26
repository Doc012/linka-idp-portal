import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResidentUser } from '../../data/users';
import { wards, getWardById } from '../../data/wards';

const WardView = () => {
  const residentUser = getResidentUser();
  const [currentWard, setCurrentWard] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEngagementPrompt, setShowEngagementPrompt] = useState(true);
  const [participationPoints, setParticipationPoints] = useState(
    localStorage.getItem('participationPoints') ? parseInt(localStorage.getItem('participationPoints')) : 25
  );
  const [activeSurvey, setActiveSurvey] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [showServiceStatus, setShowServiceStatus] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchWardData = async () => {
      try {
        setLoading(true);
        
        // Get the resident's ward
        if (residentUser && residentUser.wardNumber) {
          const ward = getWardById(residentUser.wardNumber);
          setCurrentWard(ward);
          setSelectedWard(ward);
          
          // Generate mock upcoming events for the ward
          const mockEvents = [
            {
              id: 1,
              title: "Community Clean-up Day",
              date: "June 18, 2025",
              time: "09:00 - 12:00",
              location: `${ward.name} Central Park`,
              description: "Join your neighbors in cleaning up our community parks and streets. Supplies provided. Earn 100 participation points!",
              category: "environment",
              registrationLink: "#register-cleanup"
            },
            {
              id: 2,
              title: "Ward Budget Consultation",
              date: "June 22, 2025",
              time: "18:00 - 20:00",
              location: `${ward.name} Community Hall`,
              description: "Have your say in how municipal funds are allocated in our ward. Your input directly shapes our community's future.",
              category: "governance",
              registrationLink: "#register-budget"
            },
            {
              id: 3,
              title: "Youth Skills Development Workshop",
              date: "June 25, 2025",
              time: "10:00 - 15:00",
              location: "Midvaal Technology Center",
              description: "Free workshop for youth aged 16-25. Learn digital skills, CV writing, and interview techniques.",
              category: "education",
              registrationLink: "#register-workshop"
            }
          ];
          
          setUpcomingEvents(mockEvents);
        }
        
      } catch (err) {
        console.error('Error fetching ward data:', err);
        setError('Failed to load ward information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWardData();
    
    // Simulate checking for service status after a delay
    const timer = setTimeout(() => {
      setShowServiceStatus(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [residentUser]);

  const handleWardChange = (e) => {
    const wardId = parseInt(e.target.value);
    const ward = getWardById(wardId);
    setSelectedWard(ward);
  };

  // Calculate ward statistics
  const getWardStatistics = (ward) => {
    if (!ward) return null;

    return [
      { label: 'Population', value: ward.population.toLocaleString(), icon: 'users' },
      { label: 'Area', value: `${ward.area} km²`, icon: 'map' },
      { label: 'Projects', value: ward.projects, icon: 'project' },
      { label: 'Issues', value: ward.issues, icon: 'issue' }
    ];
  };

  // Render icon based on type
  const renderIcon = (type) => {
    switch (type) {
      case 'users':
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'map':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case 'project':
        return (
          <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'issue':
        return (
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'environment':
        return (
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'governance':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case 'education':
        return (
          <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'participation':
        return (
          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const handleEventRegistration = (eventId) => {
    // In a real app, this would send a registration request to the backend
    
    // Update participation points
    const newPoints = participationPoints + 25;
    setParticipationPoints(newPoints);
    localStorage.setItem('participationPoints', newPoints.toString());
    
    // Update the UI
    alert(`You've successfully registered for the event! +25 participation points awarded.`);
  };

  const handleSurveyStart = () => {
    // In a real app, this would open the survey
    
    // Update participation points
    const newPoints = participationPoints + 50;
    setParticipationPoints(newPoints);
    localStorage.setItem('participationPoints', newPoints.toString());
    
    // Update the UI
    setActiveSurvey(false);
    alert(`Thank you for participating in the survey! +50 participation points awarded.`);
  };

  const handleEngagementDismiss = () => {
    setShowEngagementPrompt(false);
  };

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    
    if (email.trim() === '') {
      alert('Please enter a valid email address');
      return;
    }
    
    // In a real app, this would send the subscription to the backend
    
    // Update participation points
    const newPoints = participationPoints + 30;
    setParticipationPoints(newPoints);
    localStorage.setItem('participationPoints', newPoints.toString());
    
    // Update the UI
    setIsSubscribed(true);
    setTimeout(() => {
      setShowNewsletterModal(false);
    }, 2000);
  };
  
  // Calculate level based on participation points
  const getParticipationLevel = () => {
    if (participationPoints < 50) return { name: 'Observer', color: 'bg-gray-500' };
    if (participationPoints < 100) return { name: 'Contributor', color: 'bg-blue-500' };
    if (participationPoints < 200) return { name: 'Engaged Citizen', color: 'bg-indigo-600' };
    if (participationPoints < 350) return { name: 'Community Champion', color: 'bg-purple-600' };
    return { name: 'Ward Leader', color: 'bg-yellow-600' };
  };
  
  const level = getParticipationLevel();
  const nextLevelThreshold = 
    participationPoints < 50 ? 50 : 
    participationPoints < 100 ? 100 : 
    participationPoints < 200 ? 200 : 
    participationPoints < 350 ? 350 : 500;
  const progressToNextLevel = Math.min(100, Math.round((participationPoints / nextLevelThreshold) * 100));

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Ward Information</h1>
      <p className="text-gray-600 mb-6">Stay connected and engaged with your local ward</p>
      
      {/* Engagement Status Bar */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-4 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${level.color}`}>
              {participationPoints}
            </div>
            <div className="ml-4">
              <p className="text-sm text-indigo-100">Your Participation Level</p>
              <p className="text-xl font-bold">{level.name}</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress to next level</span>
              <span>{progressToNextLevel}%</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2.5">
              <div 
                className="bg-white h-2.5 rounded-full"
                style={{ width: `${progressToNextLevel}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 text-indigo-100">
              {nextLevelThreshold - participationPoints} points needed to reach the next level
            </p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Service Status Alert - conditionally shown */}
      {showServiceStatus && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded shadow-sm animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              {renderIcon('alert')}
            </div>
            <div className="ml-3">
              <p className="text-yellow-700 font-medium">Scheduled Water Maintenance</p>
              <p className="text-yellow-600 text-sm mt-1">
                There will be a scheduled water interruption in parts of {selectedWard?.name || 'your ward'} on 
                June 17, 2025 from 09:00 to 14:00. Please store water for use during this period.
              </p>
              <div className="mt-2">
                <a 
                  href="#water-notice" 
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900"
                >
                  View more details →
                </a>
              </div>
            </div>
            <button 
              onClick={() => setShowServiceStatus(false)}
              className="ml-auto flex-shrink-0 text-yellow-500 hover:text-yellow-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Ward selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentWard ? (
                <>You are a resident of <span className="text-blue-600">{currentWard.name}</span></>
              ) : (
                'Select a Ward to View'
              )}
            </h2>
            <p className="text-gray-600 text-sm">
              View detailed information about wards in Midvaal Municipality
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <select
              value={selectedWard?.id || ''}
              onChange={handleWardChange}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a ward</option>
              {wards.map(ward => (
                <option key={ward.id} value={ward.id}>
                  {ward.name} - {ward.region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Engagement Opportunity Banner - conditionally shown */}
      {showEngagementPrompt && selectedWard && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md p-4 mb-6 text-white relative overflow-hidden">
          <button 
            onClick={handleEngagementDismiss}
            className="absolute top-2 right-2 text-white opacity-80 hover:opacity-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <svg className="w-16 h-16 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-1">Your Voice Matters in {selectedWard.name}!</h3>
              <p className="text-green-100 mb-3">
                Participate in community decisions, report issues, and help shape the future of your ward. 
                Earn rewards and recognition for your civic engagement.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link 
                  to="/resident/strategic-plans" 
                  className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                >
                  View Strategic Plans
                </Link>
                <Link 
                  to="/resident/report-issue" 
                  className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                >
                  Report an Issue
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Ward detail */}
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 mt-4">Loading ward information...</p>
        </div>
      ) : selectedWard ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Ward header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedWard.name}</h2>
                <p className="text-blue-100">{selectedWard.region}, Midvaal Municipality</p>
              </div>
              <div className="mt-4 md:mt-0 bg-white text-blue-800 rounded-lg px-4 py-2 shadow">
                <p className="text-sm font-medium">Councillor</p>
                <p className="text-lg font-bold">{selectedWard.councillorName}</p>
              </div>
            </div>
          </div>
          
          {/* Tab navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'overview' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('facilities')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'facilities' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Key Facilities
              </button>
              <button
                onClick={() => setActiveTab('roads')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'roads' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Main Roads
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none relative ${
                  activeTab === 'events' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Events
                {upcomingEvents.length > 0 && (
                  <span className="absolute top-3 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {upcomingEvents.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('participate')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'participate' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Participate
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            {/* Overview tab */}
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-700 mb-6">{selectedWard.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ward Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {getWardStatistics(selectedWard).map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
                      <div className="mr-3">
                        {renderIcon(stat.icon)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Updates</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <div className="flex">
                      <p className="text-sm text-yellow-800">
                        <span className="font-bold">Notice:</span> Ward committee meeting scheduled for 15 June 2025 
                        at the {selectedWard.name} Community Hall.
                      </p>
                      <button className="ml-auto text-yellow-800 hover:text-yellow-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                      <p className="text-sm text-green-800">
                        <span className="font-bold">Announcement:</span> New road maintenance project starting 
                        in {selectedWard.name} next month. See Projects section for details.
                      </p>
                      <button className="ml-auto text-green-800 hover:text-green-900">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Active Ward Survey */}
                {activeSurvey && (
                  <div className="mt-8 bg-indigo-50 rounded-lg p-5 border border-indigo-100 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10">
                      <svg className="h-40 w-40 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3">Ward Priorities Survey</h3>
                    <p className="text-indigo-700 mb-4">
                      Your input is needed! Help us understand what matters most to {selectedWard.name} residents.
                      Take our 2-minute survey and earn 50 participation points.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSurveyStart}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium text-sm shadow-sm"
                      >
                        Take Survey Now (+50 points)
                      </button>
                      <button
                        className="bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-300 px-4 py-2 rounded font-medium text-sm shadow-sm"
                      >
                        Remind Me Later
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Newsletter Signup Teaser */}
                <div className="mt-8 bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Stay Connected with Your Ward</h3>
                  <p className="text-blue-700 mb-3">
                    Get updates about projects, events, and important announcements directly in your inbox.
                  </p>
                  <button
                    onClick={() => setShowNewsletterModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm shadow-sm"
                  >
                    Subscribe to Ward Newsletter (+30 points)
                  </button>
                </div>
              </div>
            )}
            
            {/* Facilities tab */}
            {activeTab === 'facilities' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Facilities in {selectedWard.name}</h3>
                <div className="space-y-4">
                  {selectedWard.keyFacilities.map((facility, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="mt-1 mr-3 bg-blue-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{facility}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Located in {selectedWard.region}, Midvaal Municipality
                        </p>
                        <div className="mt-2 flex gap-3">
                          <a href="#" className="text-blue-600 text-xs font-medium hover:text-blue-800">
                            View on map
                          </a>
                          <a href="#" className="text-blue-600 text-xs font-medium hover:text-blue-800">
                            Report issue
                          </a>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Open Now
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Community Proposal CTA */}
                <div className="mt-8 p-5 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <svg className="w-16 h-16 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-purple-800 mb-1">Have an idea for a new community facility?</h4>
                      <p className="text-purple-700 mb-3">
                        Submit your proposal for a new facility in {selectedWard.name}. 
                        Community-backed proposals are reviewed quarterly by the municipal council.
                      </p>
                      <Link 
                        to="/resident/submit-proposal" 
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium"
                      >
                        Submit Facility Proposal (+100 points)
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Need information about other facilities?</h4>
                  <p className="text-sm text-blue-700">
                    Contact the Midvaal Municipality information desk at 016 360 7400 or visit 
                    the municipal offices in Meyerton.
                  </p>
                </div>
              </div>
            )}
            
            {/* Roads tab */}
            {activeTab === 'roads' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Main Roads in {selectedWard.name}</h3>
                
                {/* Road maintenance status */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Road Maintenance Status</h4>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-2">
                    <div className="h-2.5 rounded-full bg-green-500" style={{ width: '72%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>72% of roads in good condition</span>
                    <span>Last assessment: May 2025</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedWard.mainRoads.map((road, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start hover:bg-gray-100 transition-colors">
                      <div className="mt-1 mr-3 bg-green-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{road}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          A main route in {selectedWard.region}
                        </p>
                        <div className="mt-2 flex space-x-4">
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                            <span className="text-xs text-gray-600">Good condition</span>
                          </div>
                          <a href="#" className="text-blue-600 text-xs font-medium hover:text-blue-800">
                            View traffic updates
                          </a>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="ml-auto flex-shrink-0 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                          Maintenance planned
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Report Road Issues</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Notice potholes, damaged road signs, or other road-related issues? Report them to help improve 
                      our community infrastructure.
                    </p>
                    <Link 
                      to="/resident/report-issue?category=roads"
                      className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium"
                    >
                      Report Road Issue (+25 points)
                    </Link>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-800 mb-2">Upcoming Road Projects</h4>
                    <p className="text-sm text-indigo-700 mb-3">
                      Stay informed about planned road upgrades and construction in your ward.
                    </p>
                    <Link 
                      to="/resident/projects?category=infrastructure"
                      className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium"
                    >
                      View Road Projects
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Events tab */}
            {activeTab === 'events' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Upcoming Events in {selectedWard.name}</h3>
                <p className="text-gray-600 mb-6">Stay connected with your community by attending local events</p>
                
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingEvents.map(event => (
                      <div 
                        key={event.id} 
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-5 border-l-4 border-blue-500">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg mb-1">{event.title}</h4>
                              <p className="text-gray-600 mb-3">{event.description}</p>
                            </div>
                            <div className="mt-2 md:mt-0 md:ml-6 md:text-right flex-shrink-0">
                              <div className="inline-flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {renderIcon(event.category)}
                                <span className="ml-1 capitalize">{event.category}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-4 items-center text-sm">
                            <div className="flex items-center text-gray-700">
                              <svg className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <svg className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <svg className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <div className="mt-5 flex justify-end">
                            <button
                              onClick={() => handleEventRegistration(event.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                            >
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Register Now (+25 points)
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">No upcoming events</h4>
                    <p className="text-gray-500">Check back soon for new events in your ward.</p>
                  </div>
                )}
                
                <div className="mt-8 bg-blue-50 rounded-lg p-5 flex flex-col md:flex-row items-center">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <svg className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Hosting a Community Event?</h4>
                    <p className="text-blue-700 mb-3">
                      If you're organizing a community event in {selectedWard.name}, submit it to our calendar to reach more residents.
                    </p>
                    <Link 
                      to="/resident/submit-event" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                    >
                      Submit an Event (+75 points)
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Participate tab */}
            {activeTab === 'participate' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ways to Participate in {selectedWard.name}</h3>
                <p className="text-gray-600 mb-6">
                  Get involved in your community and earn participation points that can be redeemed for rewards
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 p-2 rounded-full mr-3">
                          {renderIcon('participation')}
                        </div>
                        <h4 className="font-semibold text-gray-800">Attend Ward Meetings</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Participate in monthly ward committee meetings to discuss important community matters.
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-indigo-600 font-medium">+50 points per meeting</span>
                        <Link 
                          to="/resident/ward-meetings" 
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View Schedule →
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          {renderIcon('environment')}
                        </div>
                        <h4 className="font-semibold text-gray-800">Volunteer for Projects</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Join community clean-ups, tree planting, or other volunteer initiatives in your ward.
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600 font-medium">+100 points per event</span>
                        <Link 
                          to="/resident/volunteer" 
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          Find Opportunities →
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          {renderIcon('project')}
                        </div>
                        <h4 className="font-semibold text-gray-800">Review Strategic Plans</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Provide feedback on municipal development plans that affect your ward and community.
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-600 font-medium">+75 points per review</span>
                        <Link 
                          to="/resident/strategic-plans" 
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Plans →
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                          {renderIcon('issue')}
                        </div>
                        <h4 className="font-semibold text-gray-800">Report & Track Issues</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Help improve your ward by reporting infrastructure issues, service delivery problems, and more.
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-yellow-600 font-medium">+25 points per report</span>
                        <Link 
                          to="/resident/report-issue" 
                          className="text-yellow-600 hover:text-yellow-800 font-medium"
                        >
                          Report Issue →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md overflow-hidden p-6 text-white">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <svg className="h-20 w-20 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Participation Rewards Program</h3>
                      <p className="text-indigo-100 mb-4">
                        Your active participation earns you points that can be redeemed for community benefits:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-indigo-100 mb-4">
                        <li>250 points: Free access to municipal recreational facilities</li>
                        <li>500 points: Tree planted in your name in a community park</li>
                        <li>750 points: Priority processing of municipal services</li>
                        <li>1000+ points: Recognition at annual community awards</li>
                      </ul>
                      <Link 
                        to="/resident/rewards" 
                        className="inline-block bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium"
                      >
                        View All Rewards
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Ward footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Need assistance?</span> Contact your ward councillor: 
                </p>
                <p className="text-sm font-medium">{selectedWard.councillorName} - councillor@midvaal.gov.za</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="/resident/report-issue"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Report Issue
                </a>
                <a 
                  href="#share"
                  className="inline-block bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium"
                >
                  Share Ward Page
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-2">No ward selected</h2>
          <p className="text-gray-500 mb-4">
            Please select a ward from the dropdown menu to view detailed information.
          </p>
        </div>
      )}
      
      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Ward Newsletter Subscription</h3>
                <button 
                  onClick={() => setShowNewsletterModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Subscribe to our ward newsletter to receive updates on projects, events, and important announcements.
              </p>
              
              <form onSubmit={handleNewsletterSubscribe}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm shadow-sm flex-1"
                  >
                    {isSubscribed ? 'Subscribed!' : 'Subscribe Now (+30 points)'}
                  </button>
                  <button
                    onClick={() => setShowNewsletterModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium text-sm flex-1"
                  >
                    Later
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardView;