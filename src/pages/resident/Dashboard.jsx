import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResidentUser } from '../../data/users';
import { getWardById } from '../../data/wards';

const ResidentDashboard = () => {
  // Get the resident user from our mock data
  const residentUser = getResidentUser();
  const userWard = getWardById(residentUser?.wardNumber);
  
  const [stats, setStats] = useState({
    myIssuesCount: 0,
    wardProjectsCount: 0,
    strategicPlansCount: 0,
    communityEngagement: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch this data from an API
        setStats({
          myIssuesCount: 3,
          wardProjectsCount: 5,
          strategicPlansCount: 2,
          communityEngagement: 68 // Percentage
        });

        // Mock notifications
        setNotifications([
          {
            id: 1,
            type: 'update',
            title: 'Your issue has been addressed',
            description: 'The pothole on Main Street has been fixed',
            date: '2023-05-22T14:30:00Z',
            isRead: false
          },
          {
            id: 2,
            type: 'alert',
            title: 'Scheduled power maintenance',
            description: 'Electricity will be interrupted in Ward 2 on June 15 from 9AM to 12PM',
            date: '2023-05-21T10:15:00Z',
            isRead: true
          },
          {
            id: 3,
            type: 'community',
            title: 'Community cleanup event',
            description: 'Join your neighbors for a community cleanup this Saturday',
            date: '2023-05-20T09:45:00Z',
            isRead: false
          }
        ]);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'update':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'alert':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'community':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  // Get upcoming events for Ward
  const upcomingEvents = [
    {
      id: 1,
      title: 'Town Hall Meeting',
      date: '2023-06-15T18:00:00Z',
      location: 'Community Center',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Park Cleanup Day',
      date: '2023-06-17T09:00:00Z',
      location: 'Central Park',
      type: 'community'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome/Onboarding Message - Appears only for first-time/returning users */}
      {showWelcomeMessage && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md p-4 mb-6 animate-fade-in transition-opacity flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">Welcome back, {residentUser?.name}!</h2>
            <p className="mt-1">Make your voice heard and help improve your community</p>
          </div>
          <button 
            onClick={() => setShowWelcomeMessage(false)} 
            className="text-white opacity-70 hover:opacity-100"
            aria-label="Close welcome message"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Resident User Profile Section */}
      {residentUser && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold overflow-hidden">
                {residentUser.picUrl ? (
                  <img src={residentUser.picUrl} alt={`${residentUser.name} ${residentUser.surname}`} className="h-full w-full object-cover" />
                ) : (
                  <span>{residentUser.name.charAt(0)}{residentUser.surname.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="md:ml-4 flex-grow">
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {residentUser.name} {residentUser.surname}</h1>
              <div className="mt-1 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Ward:</span> {userWard?.name} - {userWard?.region}
                </p>
                <p>
                  <span className="font-semibold">Councillor:</span> {userWard?.councillorName}
                </p>
              </div>
            </div>
            
            {/* Community Engagement Score */}
            <div className="mt-4 md:mt-0 bg-blue-50 rounded-lg p-3 text-center min-w-[140px]">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-16 h-16" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeDasharray={`${stats.communityEngagement}, 100`}
                  />
                </svg>
                <span className="absolute text-sm font-semibold text-indigo-700">{stats.communityEngagement}%</span>
              </div>
              <p className="mt-1 text-xs font-medium text-indigo-800">Engagement Score</p>
              <p className="text-xs text-indigo-600">Level: Active Citizen</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Main Dashboard Content - 2 Columns on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* What's Happening Section - Personalized Updates */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">What's Happening in Your Ward</h2>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Project Updates */}
                  <div className="p-4 bg-blue-50 rounded-md">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h3 className="text-md font-medium text-blue-800">Latest Project Update</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-1">
                      <span className="font-semibold">Road Resurfacing Project:</span> 60% complete - Ahead of schedule!
                    </p>
                    <Link to="/resident/projects" className="text-xs text-blue-800 font-medium hover:underline">
                      View all {stats.wardProjectsCount} projects in your ward →
                    </Link>
                  </div>
                  
                  {/* Community Activity */}
                  <div className="p-4 bg-green-50 rounded-md">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-md font-medium text-green-800">Community Activity</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-1">
                      12 residents reported issues this week - your contribution matters!
                    </p>
                    <p className="text-xs text-green-800 font-medium">
                      Your ward's engagement rank: <span className="font-bold">3rd out of 15 wards</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions - High Visibility */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Make an Impact Today</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/resident/report-issue" className="bg-red-50 hover:bg-red-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200 group">
                <div className="bg-red-100 group-hover:bg-red-200 p-3 rounded-full mb-2">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Report Issue</span>
                <span className="text-xs text-gray-500 mt-1">2 min</span>
              </Link>
              
              <Link to="/resident/my-issues" className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200 group">
                <div className="bg-orange-100 group-hover:bg-orange-200 p-3 rounded-full mb-2">
                  <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">My Issues</span>
                <span className="text-xs text-gray-500 mt-1">{stats.myIssuesCount} active</span>
              </Link>
              
              <Link to="/resident/projects" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200 group">
                <div className="bg-green-100 group-hover:bg-green-200 p-3 rounded-full mb-2">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Projects</span>
                <span className="text-xs text-gray-500 mt-1">{stats.wardProjectsCount} in ward</span>
              </Link>
              
              <Link to="/resident/ward" className="bg-indigo-50 hover:bg-indigo-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200 group">
                <div className="bg-indigo-100 group-hover:bg-indigo-200 p-3 rounded-full mb-2">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">My Ward</span>
                <span className="text-xs text-gray-500 mt-1">Ward {residentUser?.wardNumber}</span>
              </Link>
            </div>
          </div>
          
          {/* Your Issues - Quick Overview with Visual Progress */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Your Recent Issues</h2>
              <Link to="/resident/my-issues" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View All →
              </Link>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : stats.myIssuesCount > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-md">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-yellow-800">Pothole on Main Street</h3>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">Reported on May 18, 2023</p>
                    <div className="mt-2">
                      <p className="text-xs text-yellow-700 mb-1">Status: Repair crew scheduled</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-l-4 border-green-400 bg-green-50 rounded-r-md">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-green-800">Street Light Outage</h3>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">Reported on May 10, 2023</p>
                    <p className="text-xs text-green-700 mt-2">
                      <span className="font-semibold">Resolution:</span> Light replaced on May 15
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500 mb-3">You haven't reported any issues yet</p>
                  <Link 
                    to="/resident/report-issue" 
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Report Your First Issue
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Community Feedback - Showing Impact */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Community Impact</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-indigo-600">82%</p>
                  <p className="text-sm text-gray-600">of reported issues were resolved in the last 30 days</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xl font-bold text-blue-700">24</p>
                  <p className="text-sm text-blue-600">Potholes Fixed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xl font-bold text-green-700">18</p>
                  <p className="text-sm text-green-600">Streetlights Repaired</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xl font-bold text-purple-700">7</p>
                  <p className="text-sm text-purple-600">Parks Cleaned</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Your reports help us improve our community!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column (1/3 width on large screens) */}
        <div className="space-y-6">
          {/* Notifications Panel */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                {notifications.filter(n => !n.isRead).length} New
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 flex ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <div className="mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div>
                      <h3 className={`font-medium ${!notification.isRead ? 'text-blue-800' : 'text-gray-800'}`}>
                        {notification.title}
                      </h3>
                      <p className={`text-sm mt-1 ${!notification.isRead ? 'text-blue-700' : 'text-gray-600'}`}>
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(notification.date)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No notifications at this time</p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="bg-gray-50 px-4 py-3 text-center">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  Mark all as read
                </button>
              </div>
            )}
          </div>
          
          {/* Upcoming Events Calendar */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            </div>
            <div className="p-6">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                      <div className="bg-white border border-gray-200 rounded-lg p-2 mr-3 text-center min-w-[50px]">
                        <p className="text-sm font-bold text-indigo-600">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {event.location}
                        </p>
                        <button className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                          Add to calendar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No upcoming events</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Ward News/Updates */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Latest Updates</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">New water pipeline project approved</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    The council has approved funding for a new water pipeline to improve supply reliability in your area.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Posted 2 days ago</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Municipal budget published for review</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    The proposed municipal budget for the next fiscal year is now available for public review and comment.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Posted 5 days ago</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Polls - Engagement Feature */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Community Poll</h2>
            </div>
            <div className="p-6">
              <h3 className="font-medium text-gray-800 mb-3">
                What should be our community's top priority for improvement?
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <input id="poll-1" name="poll" type="radio" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="poll-1" className="ml-2 block text-sm text-gray-700">Road maintenance</label>
                </div>
                <div className="flex items-center">
                  <input id="poll-2" name="poll" type="radio" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="poll-2" className="ml-2 block text-sm text-gray-700">Public parks and recreation</label>
                </div>
                <div className="flex items-center">
                  <input id="poll-3" name="poll" type="radio" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="poll-3" className="ml-2 block text-sm text-gray-700">Water and sanitation</label>
                </div>
                <div className="flex items-center">
                  <input id="poll-4" name="poll" type="radio" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="poll-4" className="ml-2 block text-sm text-gray-700">Public safety</label>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded">
                Submit Vote
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                108 residents have voted so far • Poll closes in 3 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;