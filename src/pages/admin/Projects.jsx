import { useState, useEffect } from 'react';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [strategicPlans, setStrategicPlans] = useState([]);
  const [wards, setWards] = useState([]);
  
  // State for project form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    strategicPlanId: '',
    title: '',
    description: '',
    wardId: '',
    status: 'PLANNED',
    startDate: '',
    endDate: '',
    actualEndDate: null
  });

  const statusOptions = [
    { value: 'PLANNED', label: 'Planned' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' }
  ];

  // Mock wards data
  const mockWards = [
    { id: 1, name: 'Ward 1 - Northern District', councillorName: 'Jacob Zuma', region: 'Northern Region' },
    { id: 2, name: 'Ward 2 - Central Business District', councillorName: 'Thabo Mbeki', region: 'Central Region' },
    { id: 3, name: 'Ward 3 - Riverside East', councillorName: 'Cyril Ramaphosa', region: 'Eastern Region' },
    { id: 4, name: 'Ward 4 - Meyerton South', councillorName: 'Patricia de Lille', region: 'Southern Region' },
    { id: 5, name: 'Ward 5 - Sicelo Township', councillorName: 'Sarah Mthembu', region: 'Western Region' }
  ];

  // Mock strategic plans
  const mockStrategicPlans = [
    {
      id: 1,
      title: 'Water Infrastructure Upgrade 2025-2027',
      description: 'Comprehensive upgrade of water supply infrastructure',
      category: 'INFRASTRUCTURE',
      wardId: 1
    },
    {
      id: 2,
      title: 'Small Business Development Initiative',
      description: 'Program to support local entrepreneurs',
      category: 'ECONOMIC_DEVELOPMENT',
      wardId: 2
    },
    {
      id: 3,
      title: 'Community Health Outreach Program',
      description: 'Mobile healthcare clinics and preventative care education',
      category: 'SOCIAL_SERVICES',
      wardId: 5
    },
    {
      id: 4,
      title: 'Green Spaces Rehabilitation Project',
      description: 'Restoration and development of parks',
      category: 'ENVIRONMENTAL',
      wardId: 3
    },
    {
      id: 5,
      title: 'Transparent Governance Initiative',
      description: 'Implementation of digital systems for public access',
      category: 'GOVERNANCE',
      wardId: 4
    }
  ];

  // Mock projects data
  const mockProjects = [
    {
      id: 101,
      title: 'Sicelo Road Rehabilitation',
      description: 'Repair and upgrade of roads in Sicelo Township including drainage and sidewalks.',
      strategicPlanId: 1,
      wardId: 5,
      status: 'IN_PROGRESS',
      startDate: '2025-02-15',
      endDate: '2025-12-30',
      actualEndDate: null
    },
    {
      id: 102,
      title: 'Meyerton Water Supply Upgrade',
      description: 'Installation of new water pipes and pressure systems to improve water supply reliability.',
      strategicPlanId: 1,
      wardId: 2,
      status: 'PLANNED',
      startDate: '2025-06-01',
      endDate: '2026-05-30',
      actualEndDate: null
    },
    {
      id: 103,
      title: 'Northern District Solar Street Lighting',
      description: 'Installation of solar-powered street lights to improve safety and reduce electricity costs.',
      strategicPlanId: 4,
      wardId: 1,
      status: 'COMPLETED',
      startDate: '2024-08-15',
      endDate: '2025-03-30',
      actualEndDate: '2025-04-10'
    },
    {
      id: 104,
      title: 'Riverside East Clinic Renovation',
      description: 'Upgrading facilities at the community clinic to expand services and improve healthcare access.',
      strategicPlanId: 3,
      wardId: 3,
      status: 'IN_PROGRESS',
      startDate: '2025-01-10',
      endDate: '2025-08-15',
      actualEndDate: null
    },
    {
      id: 105,
      title: 'Township Small Business Hub',
      description: 'Creating a central space for local entrepreneurs to operate businesses with shared facilities.',
      strategicPlanId: 2,
      wardId: 5,
      status: 'PLANNED',
      startDate: '2025-09-01',
      endDate: '2026-06-30',
      actualEndDate: null
    }
  ];

  // Fetch all data (mock implementation)
  const fetchData = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setProjects(mockProjects);
      setStrategicPlans(mockStrategicPlans);
      setWards(mockWards);
      setLoading(false);
      setError(null);
    }, 800);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format date to YYYY-MM-DD for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle special cases
    if (name === 'actualEndDate' && value === '') {
      // If actual end date is cleared, set to null
      setCurrentProject({ ...currentProject, [name]: null });
    } else {
      setCurrentProject({ ...currentProject, [name]: value });
    }
  };

  // Open modal for creating a new project
  const openCreateModal = () => {
    setCurrentProject({
      strategicPlanId: '',
      title: '',
      description: '',
      wardId: '',
      status: 'PLANNED',
      startDate: '',
      endDate: '',
      actualEndDate: null
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing a project
  const openEditModal = (project) => {
    // Format dates for the form inputs
    const formattedProject = {
      ...project,
      startDate: formatDateForInput(project.startDate),
      endDate: formatDateForInput(project.endDate),
      actualEndDate: formatDateForInput(project.actualEndDate),
      // Convert IDs to strings for form elements
      strategicPlanId: project.strategicPlanId.toString(),
      wardId: project.wardId.toString()
    };
    
    setCurrentProject(formattedProject);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Convert form data
    const projectData = {
      ...currentProject,
      strategicPlanId: parseInt(currentProject.strategicPlanId),
      wardId: parseInt(currentProject.wardId)
    };
    
    // Simulate API delay
    setTimeout(() => {
      if (isEditing) {
        // Update existing project in our mock data
        const updatedProjects = projects.map(project => 
          project.id === parseInt(currentProject.id) ? projectData : project
        );
        setProjects(updatedProjects);
      } else {
        // Create new project with a mock ID
        const newProject = {
          ...projectData,
          id: Math.max(...projects.map(p => p.id)) + 1
        };
        setProjects([...projects, newProject]);
      }
      
      setLoading(false);
      closeModal();
    }, 600);
  };

  // Handle project deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const filteredProjects = projects.filter(project => project.id !== id);
        setProjects(filteredProjects);
        setLoading(false);
      }, 500);
    }
  };

  // Helper function to get strategic plan title by ID
  const getStrategicPlanTitle = (planId) => {
    if (!planId) return 'N/A';
    const plan = strategicPlans.find(p => p.id === parseInt(planId));
    return plan ? plan.title : `Plan ${planId}`;
  };

  // Helper function to get ward name by ID
  const getWardName = (wardId) => {
    if (!wardId) return 'N/A';
    const ward = wards.find(w => w.id === parseInt(wardId));
    return ward ? ward.name : `Ward ${wardId}`;
  };

  // Helper function to get status display with color
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Project Management</h1>
        <button 
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Project
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Projects list */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategic Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-xs truncate" title={project.title}>
                        {project.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStrategicPlanTitle(project.strategicPlanId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getWardName(project.wardId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusDisplay(project.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(project.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(project)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No projects found. Click "Add New Project" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for creating/editing project */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentProject.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProject.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="strategicPlanId">
                  Strategic Plan
                </label>
                <select
                  id="strategicPlanId"
                  name="strategicPlanId"
                  value={currentProject.strategicPlanId}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a strategic plan</option>
                  {strategicPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wardId">
                  Ward
                </label>
                <select
                  id="wardId"
                  name="wardId"
                  value={currentProject.wardId}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a ward</option>
                  {wards.map(ward => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name} - {ward.region}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={currentProject.status}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={currentProject.startDate}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    Planned End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={currentProject.endDate}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              
              {currentProject.status === 'COMPLETED' && (
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actualEndDate">
                    Actual End Date
                  </label>
                  <input
                    type="date"
                    id="actualEndDate"
                    name="actualEndDate"
                    value={currentProject.actualEndDate || ''}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required={currentProject.status === 'COMPLETED'}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {isEditing ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;