import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminSidebar = ({ isOpen }) => {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  const navigate = useNavigate();
  
  // Menu structure with icons and sections
  const menuItems = [
    {
      id: 'main',
      name: 'Main',
      items: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          path: '/admin',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'management',
      name: 'Management',
      items: [
        {
          id: 'users',
          name: 'Users',
          path: '/admin/users',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )
        },
        {
          id: 'wards',
          name: 'Wards',
          path: '/admin/wards',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'planning',
      name: 'Planning & Development',
      items: [
        {
          id: 'strategic-plans',
          name: 'Strategic Plans',
          path: '/admin/strategic-plans',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          )
        },
        {
          id: 'projects',
          name: 'Projects',
          path: '/admin/projects',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'issues',
      name: 'Community Issues',
      items: [
        {
          id: 'issues',
          name: 'Issues Management',
          path: '/admin/issues',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics',
      items: [
        {
          id: 'analytics-dashboard',
          name: 'Analytics Dashboard',
          isComingSoon: true,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          badge: 'Soon'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account',
      items: [
        {
          id: 'logout',
          name: 'Logout',
          isLogout: true,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          )
        }
      ]
    }
  ];

  const handleAnalyticsClick = (e) => {
    e.preventDefault();
    setShowComingSoonModal(true);
  };

  // Show logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutConfirmModal(true);
  };

  // Perform actual logout
  const handleLogout = () => {
    // If you have any authentication state to clear, do it here
    // For example: localStorage.removeItem('token');
    
    // Close modal
    setShowLogoutConfirmModal(false);
    
    // Navigate to home page
    navigate('/');
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl flex flex-col ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo and title */}
        <div className={`flex items-center h-16 border-b border-blue-600 flex-shrink-0 ${isOpen ? 'justify-start px-4' : 'justify-center px-0'}`}>
          {isOpen ? (
            <div className="flex items-center">
              <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="ml-2 text-xl font-semibold">Admin Portal</span>
            </div>
          ) : (
            <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )}
        </div>
        
        {/* User profile info - only show in expanded mode */}
        {isOpen && (
          <div className="px-4 py-3 border-b border-blue-600 mb-2 flex-shrink-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                  <span className="text-lg font-medium">AM</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin Manager</p>
                <div className="flex items-center mt-1">
                  <span className="bg-green-400 h-2 w-2 rounded-full mr-1"></span>
                  <p className="text-xs text-blue-200">Municipal Administrator</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - with overflow scrolling */}
        <nav className={`mt-2 ${isOpen ? 'px-2' : 'px-1'} flex-1 overflow-y-auto`}>
          {menuItems.map((section) => (
            <div key={section.id} className="mb-4">
              {isOpen && (
                <p className="px-2 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
                  {section.name}
                </p>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  if (item.isLogout) {
                    return (
                      <button
                        key={item.id}
                        onClick={handleLogoutClick}
                        className={`group flex items-center ${isOpen ? 'px-2' : 'px-1 justify-center'} py-2 text-sm font-medium rounded-md transition-colors text-blue-100 hover:bg-red-600 hover:text-white w-full`}
                        title="Logout"
                      >
                        <div className="text-red-300 group-hover:text-white">
                          {item.icon}
                        </div>
                        
                        {isOpen && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </button>
                    );
                  }
                  
                  if (item.isComingSoon) {
                    return (
                      <button
                        key={item.id}
                        onClick={handleAnalyticsClick}
                        className={`group flex items-center ${isOpen ? 'px-2' : 'px-1 justify-center'} py-2 text-sm font-medium rounded-md transition-colors text-blue-100 hover:bg-blue-600 hover:text-white w-full`}
                        title={item.name}
                      >
                        <div className="text-blue-300 group-hover:text-white">
                          {item.icon}
                        </div>
                        
                        {isOpen && (
                          <>
                            <span className="ml-3">{item.name}</span>
                            
                            {item.badge && (
                              <span className="ml-auto inline-block py-0.5 px-2 text-xs rounded-full bg-blue-500 text-white">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}

                        {/* Show badges as dots in collapsed view */}
                        {!isOpen && item.badge && (
                          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-400 ring-1 ring-blue-700"></span>
                        )}
                      </button>
                    );
                  }
                  
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={({ isActive }) => {
                        let baseClasses = `group flex items-center ${isOpen ? 'px-2' : 'px-1 justify-center'} py-2 text-sm font-medium rounded-md transition-colors `;
                        
                        if (isActive) {
                          return baseClasses + 'bg-blue-800 text-white';
                        }
                        
                        if (item.highlight) {
                          return baseClasses + (isOpen 
                            ? 'text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'
                            : 'text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700');
                        }
                        
                        return baseClasses + 'text-blue-100 hover:bg-blue-600 hover:text-white';
                      }}
                      title={item.name}
                    >
                      <div className={`${item.highlight ? 'text-white' : 'text-blue-300 group-hover:text-white'}`}>
                        {item.icon}
                      </div>
                      
                      {isOpen && (
                        <>
                          <span className="ml-3">{item.name}</span>
                          
                          {item.badge && (
                            <span className="ml-auto inline-block py-0.5 px-2 text-xs rounded-full bg-blue-500 text-white">
                              {item.badge}
                            </span>
                          )}
                          
                          {item.count && (
                            <span className="ml-auto inline-block py-0.5 px-2 text-xs rounded-full bg-blue-500 text-white">
                              {item.count}
                            </span>
                          )}
                        </>
                      )}

                      {/* Show badges as dots in collapsed view */}
                      {!isOpen && (item.badge || item.count) && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-400 ring-1 ring-blue-700"></span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* App version footer */}
        <div className={`border-t border-blue-600 flex-shrink-0 ${isOpen ? 'px-4 py-3' : 'py-3 flex justify-center'}`}>
          {isOpen ? (
            <div className="flex items-center justify-between">
              <a href="#" className="text-xs text-blue-300 hover:text-white transition-colors">
                Admin Settings
              </a>
              <span className="text-xs text-blue-400">v1.0.0</span>
            </div>
          ) : (
            <button className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 transition-opacity" title="Admin Manager">
              <span className="font-semibold text-xs">AM</span>
            </button>
          )}
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Analytics Coming Soon!</h3>
              <p className="text-blue-100">
                We're building powerful analytics tools to help you gain insights from your data.
              </p>
            </div>
            
            <div className="px-6 py-6 bg-gray-50">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our development team is working hard to bring you advanced analytics features:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Interactive dashboards with real-time data</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Customizable reports and visualizations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Data-driven insights and trend analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowComingSoonModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  I'll check back later
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Expected release: Q3 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-6 text-white">
              <div className="flex items-center">
                <div className="mr-4 flex-shrink-0">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Confirm Logout</h3>
                  <p className="text-red-100 mt-1">
                    Are you sure you want to log out of the admin portal?
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600 mb-4">
                You will be redirected to the home page and will need to log in again to access the admin portal.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowLogoutConfirmModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;