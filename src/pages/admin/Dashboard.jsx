import { useState, useEffect } from 'react';
import { getAdminUser } from '../../data/users';

const AdminDashboard = () => {
  // Get the admin user from our mock data
  const adminUser = getAdminUser();
  
  const [stats, setStats] = useState({
    usersCount: 0,
    wardsCount: 0,
    strategicPlansCount: 0,
    projectsCount: 0,
    issuesCount: 0,
    openIssuesCount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for stats
  const mockStats = {
    usersCount: 348,
    wardsCount: 15,
    strategicPlansCount: 12,
    projectsCount: 28,
    issuesCount: 45,
    openIssuesCount: 15
  };

  useEffect(() => {
    // Simulate API loading with a timeout
    const loadMockData = () => {
      setLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        setStats(mockStats);
        setLoading(false);
      }, 1200);
    };

    loadMockData();
  }, []);

  // Sample recent activity data
  const recentActivities = [
    { id: 1, type: 'user', action: 'created', subject: 'John Doe', timestamp: '2025-05-22T14:30:00Z' },
    { id: 2, type: 'project', action: 'updated', subject: 'Road Maintenance', timestamp: '2025-05-22T12:15:00Z' },
    { id: 3, type: 'issue', action: 'resolved', subject: 'Water Supply Issue #123', timestamp: '2025-05-21T16:45:00Z' },
    { id: 4, type: 'ward', action: 'created', subject: 'North District', timestamp: '2025-05-21T09:20:00Z' },
    { id: 5, type: 'user', action: 'updated', subject: 'Jane Smith', timestamp: '2025-05-20T11:10:00Z' }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'project':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'issue':
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'ward':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Admin User Profile Section */}
      {adminUser && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold overflow-hidden">
                {adminUser.picUrl ? (
                  <img src={adminUser.picUrl} alt={`${adminUser.name} ${adminUser.surname}`} className="h-full w-full object-cover" />
                ) : (
                  <span>{adminUser.name.charAt(0)}{adminUser.surname.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {adminUser.name} {adminUser.surname}</h1>
              <div className="mt-1 text-sm text-gray-600">
                <p><span className="font-semibold">Role:</span> {adminUser.roleType.roleType}</p>
                <p><span className="font-semibold">Email:</span> {adminUser.email}</p>
                <p><span className="font-semibold">Ward:</span> {adminUser.wardNumber}</p>
              </div>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="h-2 w-2 mr-1 bg-green-500 rounded-full"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Stat Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : stats.usersCount}
              </p>
            </div>
          </div>
        </div>
        
        {/* Wards Stat Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Total Wards</p>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : stats.wardsCount}
              </p>
            </div>
          </div>
        </div>
        
        {/* Projects Stat Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : stats.projectsCount}
              </p>
            </div>
          </div>
        </div>
        
        {/* Strategic Plans Stat Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Strategic Plans</p>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : stats.strategicPlansCount}
              </p>
            </div>
          </div>
        </div>
        
        {/* Total Issues Stat Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Total Issues</p>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : stats.issuesCount}
              </p>
            </div>
          </div>
        </div>
        
        {/* Open Issues Stat Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm">Open Issues</p>
              <p className="text-2xl font-semibold text-gray-800">
                {loading ? (
                  <span className="inline-block w-12 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : stats.openIssuesCount}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start">
                <div className="rounded-full bg-gray-200 w-10 h-10 animate-pulse"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                {getActivityIcon(activity.type)}
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.subject} was {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 text-center">
          <button 
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View all activity
          </button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/users" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200">
            <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Add User</span>
          </a>
          
          <a href="/admin/wards" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200">
            <svg className="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Manage Wards</span>
          </a>
          
          <a href="/admin/projects" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200">
            <svg className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm font-medium text-gray-700">View Projects</span>
          </a>
          
          <a href="/admin/issues" className="bg-red-50 hover:bg-red-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-200">
            <svg className="h-8 w-8 text-red-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Manage Issues</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;