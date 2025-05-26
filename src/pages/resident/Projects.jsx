import { useState, useEffect } from 'react';
import { getResidentUser } from '../../data/users';
import { getWardById } from '../../data/wards';

const Projects = () => {
  const residentUser = getResidentUser();
  const userWard = getWardById(residentUser?.wardNumber);
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Static project data with updated recent dates for 2025
        const mockProjects = [
          {
            id: 1,
            title: "Road Resurfacing - Main Street",
            description: "Complete resurfacing of Main Street from Oak Avenue to Pine Boulevard to address degraded road conditions and improve safety.",
            category: "INFRASTRUCTURE",
            status: "IN_PROGRESS",
            startDate: "2025-02-15",
            endDate: "2025-06-30",
            budget: 850000,
            spent: 475000,
            wardId: residentUser?.wardNumber,
            location: "Main Street",
            progress: 60,
            updates: [
              { date: "2025-02-15", text: "Project commenced - road preparation began" },
              { date: "2025-03-20", text: "First section completed - 30% of total project" },
              { date: "2025-05-10", text: "Second section in progress - on schedule" }
            ],
            images: [
              "https://media.istockphoto.com/id/626291464/photo/street-resurfacing-men-and-machinery-in-port-charlotte-florida.jpg?s=612x612&w=0&k=20&c=KHtwQUK8Za2IhzRAlCENMiHPSB2Q4wp7xb5Q8kG7WOk="
            ],
            contractor: "Midvaal Roads & Construction Ltd",
            projectManager: "James Wilson",
            contactEmail: "projects@midvaal.gov.za"
          },
          {
            id: 2,
            title: "Community Park Renovation",
            description: "Upgrade of Central Community Park including new playground equipment, improved lighting, and landscaping enhancements.",
            category: "PARKS",
            status: "PLANNED",
            startDate: "2025-07-10",
            endDate: "2025-09-15",
            budget: 350000,
            spent: 0,
            wardId: residentUser?.wardNumber,
            location: "Central Community Park, Riverside Drive",
            progress: 0,
            updates: [
              { date: "2025-04-15", text: "Project approved by council" },
              { date: "2025-05-18", text: "Community consultation completed" }
            ],
            images: [
              "https://images.squarespace-cdn.com/content/v1/50afefd0e4b01c11f0ec0c82/1551238130609-C0HAH9S6XZCXEL0JSGUL/ElkRidgePark-101-DesignConcepts.jpg?format=1500w"
            ],
            contractor: "Green Spaces Developers",
            projectManager: "Sarah Johnson",
            contactEmail: "parks@midvaal.gov.za"
          },
          {
            id: 3,
            title: "Water Pipeline Replacement",
            description: "Replacement of aging water supply infrastructure to improve reliability and reduce leakage in the eastern section of the ward.",
            category: "WATER",
            status: "PLANNED",
            startDate: "2025-08-01",
            endDate: "2025-10-30",
            budget: 1200000,
            spent: 0,
            wardId: residentUser?.wardNumber,
            location: "Eastern District - Oak Street to Maple Avenue",
            progress: 0,
            updates: [
              { date: "2025-04-10", text: "Engineering assessment completed" },
              { date: "2025-05-20", text: "Tender process initiated" }
            ],
            images: [
              "https://www.george.gov.za/wp-content/uploads/2022/05/Parkdene-water-scaled.jpg"
            ],
            contractor: "Pending tender award",
            projectManager: "Michael Brown",
            contactEmail: "water@midvaal.gov.za"
          },
          {
            id: 4,
            title: "Street Lighting Upgrade",
            description: "Installation of energy-efficient LED street lighting throughout the ward to improve visibility and safety while reducing energy consumption.",
            category: "ELECTRICITY",
            status: "COMPLETED",
            startDate: "2024-11-01",
            endDate: "2025-01-15",
            actualEndDate: "2025-01-10",
            budget: 320000,
            spent: 305000,
            wardId: residentUser?.wardNumber,
            location: "Ward-wide implementation",
            progress: 100,
            updates: [
              { date: "2024-11-01", text: "Project commenced with main thoroughfares" },
              { date: "2024-12-10", text: "75% of installations completed" },
              { date: "2025-01-10", text: "Project completed ahead of schedule" }
            ],
            images: [
              "https://i0.wp.com/oucblog.com/wp-content/uploads/2022/05/ROADWAY-LED-LIGHTING-SIDE-BY-SIDE.jpg?resize=1280%2C640&ssl=1"
            ],
            contractor: "Bright Future Electrical Ltd",
            projectManager: "Emily Clark",
            contactEmail: "electricity@midvaal.gov.za",
            outcome: "95 new LED lights installed, reducing energy consumption by 60% and improving visibility in previously dark areas."
          },
          {
            id: 5,
            title: "Stormwater Drainage Improvement",
            description: "Upgrading stormwater infrastructure to prevent flooding during heavy rainfall in low-lying areas of the ward.",
            category: "INFRASTRUCTURE",
            status: "IN_PROGRESS",
            startDate: "2025-01-15",
            endDate: "2025-06-30",
            budget: 750000,
            spent: 450000,
            wardId: residentUser?.wardNumber,
            location: "Valley View Area - Riverside to Lakeside",
            progress: 45,
            updates: [
              { date: "2025-01-15", text: "Ground works commenced" },
              { date: "2025-02-20", text: "Main drainage channels excavated" },
              { date: "2025-04-18", text: "Concrete lining of channels in progress" }
            ],
            images: [
              "https://amtengineering.com/wp-content/uploads/2020/11/Slip-Lining-MD16-2-updated.jpg"
            ],
            contractor: "Waterways Construction",
            projectManager: "Robert Mills",
            contactEmail: "infrastructure@midvaal.gov.za"
          }
        ];
        
        setProjects(mockProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [residentUser?.wardNumber]);

  // Filter projects based on status and category
  const filteredProjects = projects.filter(project => {
    const statusMatch = filter === 'all' || project.status === filter;
    const categoryMatch = categoryFilter === 'all' || project.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  // Function to display status with color
  const getStatusDisplay = (status) => {
    const statusConfig = {
      'PLANNED': { color: 'bg-yellow-100 text-yellow-800', label: 'Planned' },
      'IN_PROGRESS': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      'COMPLETED': { color: 'bg-green-100 text-green-800', label: 'Completed' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Function to format budget numbers
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  // Format date for display - ensuring all dates show 2025 when appropriate
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // Create a proper date object from the string
    const date = new Date(dateString);
    
    // Format it according to South African locale with full month name
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };

  // Get color for category badge
  const getCategoryBadgeColor = (category) => {
    const categoryColors = {
      'INFRASTRUCTURE': 'bg-orange-100 text-orange-800',
      'PARKS': 'bg-green-100 text-green-800',
      'WATER': 'bg-blue-100 text-blue-800',
      'ELECTRICITY': 'bg-yellow-100 text-yellow-800',
      'SANITATION': 'bg-purple-100 text-purple-800',
      'HOUSING': 'bg-red-100 text-red-800'
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  // Open project detail modal
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Total project stats
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
  const inProgressProjects = projects.filter(p => p.status === 'IN_PROGRESS').length;
  const plannedProjects = projects.filter(p => p.status === 'PLANNED').length;
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Projects in {userWard?.name}
        </h1>
        <p className="text-gray-600">
          View and track current and upcoming projects in your area
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Projects dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Projects</p>
              <p className="text-2xl font-bold text-gray-800">{totalProjects}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-gray-800">{inProgressProjects}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Planned</p>
              <p className="text-2xl font-bold text-gray-800">{plannedProjects}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{completedProjects}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Budget summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ward Projects Budget</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Allocated Budget</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalBudget)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">In Progress</p>
              <p className="font-bold text-blue-700 mt-1">
                {formatCurrency(projects.filter(p => p.status === 'IN_PROGRESS').reduce((sum, p) => sum + p.budget, 0))}
              </p>
            </div>
            <div className="px-4 py-2 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium">Planned</p>
              <p className="font-bold text-yellow-700 mt-1">
                {formatCurrency(projects.filter(p => p.status === 'PLANNED').reduce((sum, p) => sum + p.budget, 0))}
              </p>
            </div>
            <div className="px-4 py-2 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">Completed</p>
              <p className="font-bold text-green-700 mt-1">
                {formatCurrency(projects.filter(p => p.status === 'COMPLETED').reduce((sum, p) => sum + p.spent, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter controls */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
            <span className="text-gray-700 font-medium">Filter by status:</span>
            
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            
            <button
              onClick={() => setFilter('PLANNED')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === 'PLANNED' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Planned
            </button>
            
            <button
              onClick={() => setFilter('IN_PROGRESS')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === 'IN_PROGRESS' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
            
            <button
              onClick={() => setFilter('COMPLETED')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === 'COMPLETED' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="category-filter" className="text-gray-700 font-medium mr-2">Category:</label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(category => (
                <option key={category} value={category}>
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects list */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {project.images && project.images.length > 0 && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-medium text-gray-800">
                    {project.title}
                  </h2>
                </div>
                
                <div className="flex items-center mb-4 space-x-2">
                  {getStatusDisplay(project.status)}
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium text-gray-700">{formatDate(project.startDate)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">
                        {project.status === 'COMPLETED' ? 'Completion' : 'Est. Completion'}
                      </p>
                      <p className="font-medium text-gray-700">
                        {formatDate(project.actualEndDate || project.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium text-gray-700">{formatCurrency(project.budget)}</p>
                  </div>
                </div>
                
                {project.status === 'COMPLETED' && project.actualEndDate && (
                  <div className="mt-4 bg-green-50 p-3 rounded">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Completed on:</span> {formatDate(project.actualEndDate)}
                    </p>
                  </div>
                )}

                {project.status === 'IN_PROGRESS' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-indigo-700 font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 px-6 py-3">
                <button 
                  onClick={() => openProjectDetails(project)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none"
                >
                  View project details →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          
          <h3 className="text-lg font-medium text-gray-800 mb-2">No projects found</h3>
          
          <p className="text-gray-600">
            {filter === 'all' && categoryFilter === 'all'
              ? 'There are currently no projects scheduled for your ward.'
              : `There are no ${filter.toLowerCase()} ${categoryFilter !== 'all' ? categoryFilter.toLowerCase() : ''} projects in your ward at this time.`
            }
          </p>
        </div>
      )}

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">{selectedProject.title}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left column - Images and details */}
                <div className="w-full md:w-2/3">
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img 
                        src={selectedProject.images[0]} 
                        alt={selectedProject.title} 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4 space-x-2">
                      {getStatusDisplay(selectedProject.status)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeColor(selectedProject.category)}`}>
                        {selectedProject.category}
                      </span>
                    </div>
                    
                    <h3 className="text-gray-800 font-medium mb-2">Description</h3>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                    
                    <h3 className="text-gray-800 font-medium mb-2">Location</h3>
                    <p className="text-gray-600 mb-4">{selectedProject.location}</p>
                    
                    {selectedProject.outcome && (
                      <>
                        <h3 className="text-gray-800 font-medium mb-2">Outcome</h3>
                        <p className="text-gray-600 mb-4">{selectedProject.outcome}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Timeline and updates */}
                  <div className="mb-6">
                    <h3 className="text-gray-800 font-medium mb-4">Project Updates</h3>
                    <div className="space-y-4">
                      {selectedProject.updates.map((update, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 ring-4 ring-indigo-100"></div>
                            {index < selectedProject.updates.length - 1 && (
                              <div className="w-0.5 h-full bg-indigo-100 ml-0.75"></div>
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm font-medium text-gray-700">{formatDate(update.date)}</p>
                            <p className="text-gray-600 mt-1">{update.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column - Stats and contact */}
                <div className="w-full md:w-1/3">
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <h3 className="text-gray-800 font-medium mb-4">Project Information</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Project Start</p>
                        <p className="font-medium text-gray-700">{formatDate(selectedProject.startDate)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">
                          {selectedProject.status === 'COMPLETED' ? 'Completion Date' : 'Expected Completion'}
                        </p>
                        <p className="font-medium text-gray-700">
                          {formatDate(selectedProject.actualEndDate || selectedProject.endDate)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Total Budget</p>
                        <p className="font-medium text-gray-700">{formatCurrency(selectedProject.budget)}</p>
                      </div>
                      
                      {selectedProject.status !== 'PLANNED' && (
                        <div>
                          <p className="text-sm text-gray-500">Spent to Date</p>
                          <p className="font-medium text-gray-700">{formatCurrency(selectedProject.spent)}</p>
                        </div>
                      )}
                      
                      {selectedProject.status === 'IN_PROGRESS' && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium text-indigo-700">{selectedProject.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500" 
                              style={{ width: `${selectedProject.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-gray-800 font-medium mb-4">Contact Information</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Contractor</p>
                        <p className="font-medium text-gray-700">{selectedProject.contractor}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Project Manager</p>
                        <p className="font-medium text-gray-700">{selectedProject.projectManager}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Contact Email</p>
                        <a 
                          href={`mailto:${selectedProject.contactEmail}`} 
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {selectedProject.contactEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={() => {
                  setShowModal(false);
                  // In a real app, this would navigate to a report page or open a modal
                  alert('Report an issue with this project feature would be implemented here');
                }}
              >
                Report an Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;