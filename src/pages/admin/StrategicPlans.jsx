import { useState, useEffect } from 'react';

const StrategicPlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wards, setWards] = useState([]);
  const [users, setUsers] = useState([]);
  
  // State for plan form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    title: '',
    description: '',
    category: 'INFRASTRUCTURE',
    startDate: '',
    endDate: '',
    createdBy: '',
    wardId: ''
  });

  const categoryOptions = [
    { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
    { value: 'ECONOMIC_DEVELOPMENT', label: 'Economic Development' },
    { value: 'SOCIAL_SERVICES', label: 'Social Services' },
    { value: 'ENVIRONMENTAL', label: 'Environmental' },
    { value: 'GOVERNANCE', label: 'Governance' }
  ];

  // Mock wards data
  const mockWards = [
    { id: 1, name: 'Ward 1 - Northern District', councillorName: 'Jacob Zuma', region: 'Northern Region' },
    { id: 2, name: 'Ward 2 - Central Business District', councillorName: 'Thabo Mbeki', region: 'Central Region' },
    { id: 3, name: 'Ward 3 - Riverside East', councillorName: 'Cyril Ramaphosa', region: 'Eastern Region' },
    { id: 4, name: 'Ward 4 - Meyerton South', councillorName: 'Patricia de Lille', region: 'Southern Region' },
    { id: 5, name: 'Ward 5 - Sicelo Township', councillorName: 'Sarah Mthembu', region: 'Western Region' }
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
    }
  ];

  // Mock strategic plans
  const mockPlans = [
    {
      id: 1,
      title: 'Water Infrastructure Upgrade 2025-2026',
      description: 'Comprehensive upgrade of water supply infrastructure including pipelines, reservoirs, and treatment facilities across the municipality.',
      category: 'INFRASTRUCTURE',
      startDate: '2025-01-15',
      endDate: '2026-12-31',
      wardId: 1,
      createdBy: 1
    },
    {
      id: 2,
      title: 'Small Business Development Initiative',
      description: 'Program to support local entrepreneurs with training, micro-loans, and business development services.',
      category: 'ECONOMIC_DEVELOPMENT',
      startDate: '2025-03-01',
      endDate: '2026-02-28',
      wardId: 2,
      createdBy: 2
    },
    {
      id: 3,
      title: 'Community Health Outreach Program',
      description: 'Mobile healthcare clinics and preventative care education for underserved communities.',
      category: 'SOCIAL_SERVICES',
      startDate: '2025-02-01',
      endDate: '2025-12-31',
      wardId: 5,
      createdBy: 1
    },
    {
      id: 4,
      title: 'Green Spaces Rehabilitation Project',
      description: 'Restoration and development of parks, urban gardens, and recreational areas throughout the municipality.',
      category: 'ENVIRONMENTAL',
      startDate: '2025-04-01',
      endDate: '2026-10-31',
      wardId: 3,
      createdBy: 3
    },
    {
      id: 5,
      title: 'Transparent Governance Initiative',
      description: 'Implementation of digital systems for public access to municipal decisions, budgets, and service delivery tracking.',
      category: 'GOVERNANCE',
      startDate: '2025-01-01',
      endDate: '2026-01-01',
      wardId: 4,
      createdBy: 2
    }
  ];

  // Fetch all data (mock implementation)
  const fetchData = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setPlans(mockPlans);
      setWards(mockWards);
      setUsers(mockUsers);
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
    setCurrentPlan({ ...currentPlan, [name]: value });
  };

  // Open modal for creating a new plan
  const openCreateModal = () => {
    setCurrentPlan({
      title: '',
      description: '',
      category: 'INFRASTRUCTURE',
      startDate: '',
      endDate: '',
      createdBy: '',
      wardId: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing a plan
  const openEditModal = (plan) => {
    setCurrentPlan({
      ...plan,
      // Format dates for date inputs
      startDate: plan.startDate.substring(0, 10),
      endDate: plan.endDate.substring(0, 10),
      // Make sure these are strings for the form
      createdBy: plan.createdBy.toString(),
      wardId: plan.wardId.toString()
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
    
    // Simulate API delay
    setTimeout(() => {
      if (isEditing) {
        // Update existing plan in our mock data
        const updatedPlans = plans.map(plan => 
          plan.id === parseInt(currentPlan.id) ? {
            ...currentPlan,
            // Convert string form values to numbers where needed
            id: parseInt(currentPlan.id),
            wardId: parseInt(currentPlan.wardId),
            createdBy: parseInt(currentPlan.createdBy)
          } : plan
        );
        setPlans(updatedPlans);
      } else {
        // Create new plan with a mock ID
        const newPlan = {
          ...currentPlan,
          id: Math.max(...plans.map(p => p.id)) + 1,
          // Convert string form values to numbers where needed
          wardId: parseInt(currentPlan.wardId),
          createdBy: parseInt(currentPlan.createdBy)
        };
        setPlans([...plans, newPlan]);
      }
      
      setLoading(false);
      closeModal();
    }, 600);
  };

  // Handle plan deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this strategic plan?')) {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const filteredPlans = plans.filter(plan => plan.id !== id);
        setPlans(filteredPlans);
        setLoading(false);
      }, 500);
    }
  };

  // Helper function to get ward name by ID
  const getWardName = (wardId) => {
    if (!wardId) return 'N/A';
    const ward = wards.find(w => w.id === parseInt(wardId));
    return ward ? ward.name : `Ward ${wardId}`;
  };

  // Helper function to get user name by ID
  const getUserName = (userId) => {
    if (!userId) return 'N/A';
    const user = users.find(u => u.userID === parseInt(userId));
    return user ? `${user.name} ${user.surname}` : `User ${userId}`;
  };

  // Helper function to format category for display
  const formatCategory = (category) => {
    if (!category) return '';
    return category.replace(/_/g, ' ');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Strategic Plan Management</h1>
        <button 
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Strategic Plan
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Strategic Plans list */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{plan.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-xs truncate" title={plan.title}>
                        {plan.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plan.category === 'INFRASTRUCTURE' ? 'bg-blue-100 text-blue-800' :
                        plan.category === 'ECONOMIC_DEVELOPMENT' ? 'bg-green-100 text-green-800' :
                        plan.category === 'SOCIAL_SERVICES' ? 'bg-purple-100 text-purple-800' :
                        plan.category === 'ENVIRONMENTAL' ? 'bg-teal-100 text-teal-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {formatCategory(plan.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getWardName(plan.wardId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(plan.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(plan.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getUserName(plan.createdBy)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(plan)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(plan.id)}
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
                    No strategic plans found. Click "Add New Strategic Plan" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for creating/editing strategic plan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Strategic Plan' : 'Add New Strategic Plan'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentPlan.title}
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
                  value={currentPlan.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={currentPlan.category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  {categoryOptions.map(option => (
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
                    value={currentPlan.startDate}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={currentPlan.endDate}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wardId">
                  Ward
                </label>
                <select
                  id="wardId"
                  name="wardId"
                  value={currentPlan.wardId}
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
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdBy">
                  Created By
                </label>
                <select
                  id="createdBy"
                  name="createdBy"
                  value={currentPlan.createdBy}
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
                  {isEditing ? 'Update Strategic Plan' : 'Create Strategic Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicPlanManagement;