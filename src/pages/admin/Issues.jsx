import { useState, useEffect } from 'react';

const IssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [wards, setWards] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // State for issue form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIssue, setCurrentIssue] = useState({
    userId: '',
    wardId: '',
    projectId: '',
    title: '',
    description: '',
    status: 'OPEN'
  });

  const statusOptions = [
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'RESOLVED', label: 'Resolved' },
    { value: 'ESCALATED', label: 'Escalated' }
  ];

  // Mock users data
  const mockUsers = [
    {
      userID: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      roleType: { roleID: 1, roleType: 'Admin' }
    },
    {
      userID: 2,
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      roleType: { roleID: 2, roleType: 'Ward Councillor' }
    },
    {
      userID: 3,
      name: 'Michael',
      surname: 'Johnson',
      email: 'michael.j@example.com',
      roleType: { roleID: 3, roleType: 'Resident' }
    },
    {
      userID: 4,
      name: 'Sarah',
      surname: 'Williams',
      email: 'sarah.w@example.com',
      roleType: { roleID: 4, roleType: 'Municipal Manager' }
    }
  ];

  // Mock wards data
  const mockWards = [
    { id: 1, name: 'Ward 1 - Northern District', councillorName: 'Jacob Zuma', region: 'Northern Region' },
    { id: 2, name: 'Ward 2 - Central Business District', councillorName: 'Thabo Mbeki', region: 'Central Region' },
    { id: 3, name: 'Ward 3 - Riverside East', councillorName: 'Cyril Ramaphosa', region: 'Eastern Region' },
    { id: 4, name: 'Ward 4 - Meyerton South', councillorName: 'Patricia de Lille', region: 'Southern Region' },
    { id: 5, name: 'Ward 5 - Sicelo Township', councillorName: 'Sarah Mthembu', region: 'Western Region' }
  ];

  // Mock projects data
  const mockProjects = [
    {
      id: 101,
      title: 'Sicelo Road Rehabilitation',
      description: 'Repair and upgrade of roads in Sicelo Township including drainage and sidewalks.',
      wardId: 5
    },
    {
      id: 102,
      title: 'Meyerton Water Supply Upgrade',
      description: 'Installation of new water pipes and pressure systems to improve water supply reliability.',
      wardId: 2
    },
    {
      id: 103,
      title: 'Northern District Solar Street Lighting',
      description: 'Installation of solar-powered street lights to improve safety and reduce electricity costs.',
      wardId: 1
    },
    {
      id: 104,
      title: 'Riverside East Clinic Renovation',
      description: 'Upgrading facilities at the community clinic to expand services and improve healthcare access.',
      wardId: 3
    }
  ];

  // Mock issues data
  const mockIssues = [
    {
      id: 1001,
      title: 'Water Shortage in Central Business District',
      description: 'Residents have reported no water supply for the past 24 hours in the CBD area.',
      userId: 3,
      wardId: 2,
      projectId: 102,
      status: 'IN_PROGRESS',
      created_at: '2025-05-20T09:15:00Z'
    },
    {
      id: 1002,
      title: 'Street Light Malfunction on Main Road',
      description: 'Three street lights are not working on Main Road near the community center.',
      userId: 2,
      wardId: 1,
      projectId: 103,
      status: 'OPEN',
      created_at: '2025-05-22T14:30:00Z'
    },
    {
      id: 1003,
      title: 'Potholes on Sicelo Drive',
      description: 'Large potholes have formed on Sicelo Drive making it dangerous for drivers.',
      userId: 4,
      wardId: 5,
      projectId: 101,
      status: 'RESOLVED',
      created_at: '2025-05-15T11:45:00Z'
    },
    {
      id: 1004,
      title: 'Drainage Blockage Causing Flooding',
      description: 'Blocked drainage system causing flooding on residential properties during rainfall.',
      userId: 3,
      wardId: 3,
      projectId: null,
      status: 'ESCALATED',
      created_at: '2025-05-21T08:20:00Z'
    },
    {
      id: 1005,
      title: 'Noise Complaint from Construction',
      description: 'Residents complaining about excessive noise from construction site during early morning hours.',
      userId: 1,
      wardId: 4,
      projectId: null,
      status: 'OPEN',
      created_at: '2025-05-23T10:05:00Z'
    }
  ];

  // Fetch all data (mock implementation)
  const fetchData = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIssues(mockIssues);
      setUsers(mockUsers);
      setWards(mockWards);
      setProjects(mockProjects);
      setLoading(false);
      setError(null);
    }, 800);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for projectId - empty string should be null
    if (name === 'projectId' && value === '') {
      setCurrentIssue({ ...currentIssue, projectId: null });
    } else {
      setCurrentIssue({ ...currentIssue, [name]: value });
    }
  };

  // Open modal for creating a new issue
  const openCreateModal = () => {
    setCurrentIssue({
      userId: '',
      wardId: '',
      projectId: '',
      title: '',
      description: '',
      status: 'OPEN'
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing an issue
  const openEditModal = (issue) => {
    setCurrentIssue({
      ...issue,
      projectId: issue.projectId || '',
      userId: issue.userId.toString(),
      wardId: issue.wardId.toString()
    });
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
    const issueData = {
      ...currentIssue,
      userId: parseInt(currentIssue.userId),
      wardId: parseInt(currentIssue.wardId),
      projectId: currentIssue.projectId ? parseInt(currentIssue.projectId) : null
    };
    
    // Simulate API delay
    setTimeout(() => {
      if (isEditing) {
        // Update existing issue in our mock data
        const updatedIssues = issues.map(issue => 
          issue.id === parseInt(currentIssue.id) ? issueData : issue
        );
        setIssues(updatedIssues);
      } else {
        // Create new issue with a mock ID and current timestamp
        const newIssue = {
          ...issueData,
          id: Math.max(...issues.map(i => i.id)) + 1,
          created_at: new Date().toISOString()
        };
        setIssues([...issues, newIssue]);
      }
      
      setLoading(false);
      closeModal();
    }, 600);
  };

  // Handle issue deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const filteredIssues = issues.filter(issue => issue.id !== id);
        setIssues(filteredIssues);
        setLoading(false);
      }, 500);
    }
  };

  // Helper function to get user name by ID
  const getUserName = (userId) => {
    if (!userId) return 'N/A';
    const user = users.find(u => u.userID === parseInt(userId));
    return user ? `${user.name} ${user.surname}` : `User ${userId}`;
  };

  // Helper function to get ward name by ID
  const getWardName = (wardId) => {
    if (!wardId) return 'N/A';
    const ward = wards.find(w => w.id === parseInt(wardId));
    return ward ? ward.name : `Ward ${wardId}`;
  };

  // Helper function to get project title by ID
  const getProjectTitle = (projectId) => {
    if (!projectId) return 'N/A';
    const project = projects.find(p => p.id === parseInt(projectId));
    return project ? project.title : `Project ${projectId}`;
  };

  // Helper function to get status display with color
  const getStatusDisplay = (status) => {
    const statusConfig = {
      'OPEN': { color: 'bg-yellow-100 text-yellow-800', label: 'Open' },
      'IN_PROGRESS': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      'RESOLVED': { color: 'bg-green-100 text-green-800', label: 'Resolved' },
      'ESCALATED': { color: 'bg-red-100 text-red-800', label: 'Escalated' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Issue Management</h1>
        <button 
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Issue
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Issues list */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.length > 0 ? (
                issues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{issue.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-xs truncate" title={issue.title}>
                        {issue.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getWardName(issue.wardId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {issue.projectId ? 
                        <div className="max-w-xs truncate" title={getProjectTitle(issue.projectId)}>
                          {getProjectTitle(issue.projectId)}
                        </div> 
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getUserName(issue.userId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusDisplay(issue.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(issue.created_at)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(issue)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(issue.id)}
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
                    No issues found. Click "Add New Issue" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for creating/editing issue */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Issue' : 'Add New Issue'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Issue Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentIssue.title}
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
                  value={currentIssue.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                  Reported By
                </label>
                <select
                  id="userId"
                  name="userId"
                  value={currentIssue.userId}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.userID} value={user.userID}>
                      {user.name} {user.surname} - {user.email}
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
                  value={currentIssue.wardId}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">
                  Related Project (Optional)
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={currentIssue.projectId || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">None (General Issue)</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={currentIssue.status}
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
                  {isEditing ? 'Update Issue' : 'Create Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueManagement;