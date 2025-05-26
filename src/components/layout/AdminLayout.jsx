import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  // Check if we're on mobile and adjust sidebar accordingly
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // On mobile devices, set the initial sidebar state based on screen size
      if (isMobile && !localStorage.getItem('adminSidebarState')) {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when changing routes
  useEffect(() => {
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobileView]);

  // Toggle sidebar and save state to localStorage
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('adminSidebarState', newState ? 'open' : 'compact');
  };

  // Mock notifications - in a real app, these would come from an API
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: 'issue',
        message: 'New issue reported: Pothole on Main Street',
        time: '5 minutes ago',
        isRead: false
      },
      {
        id: 2,
        type: 'project',
        message: 'Project "Road Repairs Phase 2" is now in progress',
        time: '1 hour ago',
        isRead: false
      },
      {
        id: 3,
        type: 'user',
        message: 'New user registered: Jane Citizen',
        time: '3 hours ago',
        isRead: true
      }
    ]);
  }, []);

  // Handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path === '/admin/users') return 'User Management';
    if (path === '/admin/wards') return 'Ward Management';
    if (path === '/admin/strategic-plans') return 'Strategic Plans';
    if (path === '/admin/projects') return 'Projects';
    if (path === '/admin/issues') return 'Issues';
    return 'Admin Portal';
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />

      {/* Main content */}
      <div 
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        } ${isMobileView ? 'ml-0' : ''}`}
      >
        {/* Top navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md transition-all"
                  aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {isSidebarOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                <h1 className="ml-3 text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
              </div>

              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </form>
                </div>
              </div>

              <div className="flex items-center">
                {/* Notifications dropdown */}
                <div className="relative inline-block text-left mr-4">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="notifications-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">View notifications</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {notifications.some(n => !n.isRead) && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Profile dropdown */}
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white text-sm font-medium">
                        AM
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex py-3 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center">
                    <a href="/admin" className="text-gray-500 hover:text-gray-700">
                      Admin
                    </a>
                  </div>
                </li>
                {location.pathname !== '/admin' && (
                  <>
                    <li>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-gray-700 font-medium">{getPageTitle()}</span>
                      </div>
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;