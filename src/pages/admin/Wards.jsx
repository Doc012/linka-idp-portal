import { useState, useEffect } from 'react';

const WardManagement = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for ward form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWard, setCurrentWard] = useState({
    name: '',
    councillorName: '',
    region: ''
  });

  // Mock wards data
  const mockWards = [
    { id: 1, name: 'Ward 1 - Northern District', councillorName: 'Jacob Zuma', region: 'Northern Region' },
    { id: 2, name: 'Ward 2 - Central Business District', councillorName: 'Thabo Mbeki', region: 'Central Region' },
    { id: 3, name: 'Ward 3 - Riverside East', councillorName: 'Cyril Ramaphosa', region: 'Eastern Region' },
    { id: 4, name: 'Ward 4 - Meyerton South', councillorName: 'Patricia de Lille', region: 'Southern Region' },
    { id: 5, name: 'Ward 5 - Sicelo Township', councillorName: 'Sarah Mthembu', region: 'Western Region' }
  ];

  // Fetch all wards (mock implementation)
  const fetchWards = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setWards(mockWards);
      setLoading(false);
      setError(null);
    }, 800);
  };

  useEffect(() => {
    fetchWards();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWard({ ...currentWard, [name]: value });
  };

  // Open modal for creating a new ward
  const openCreateModal = () => {
    setCurrentWard({ name: '', councillorName: '', region: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing a ward
  const openEditModal = (ward) => {
    setCurrentWard(ward);
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
        // Update existing ward in our mock data
        const updatedWards = wards.map(ward => 
          ward.id === currentWard.id ? currentWard : ward
        );
        setWards(updatedWards);
      } else {
        // Create new ward with a mock ID
        const newWard = {
          ...currentWard,
          id: Math.max(...wards.map(w => w.id)) + 1
        };
        setWards([...wards, newWard]);
      }
      
      setLoading(false);
      closeModal();
    }, 600);
  };

  // Handle ward deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ward?')) {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const filteredWards = wards.filter(ward => ward.id !== id);
        setWards(filteredWards);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Ward Management</h1>
        <button 
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Ward
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Wards list */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Councillor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wards.length > 0 ? (
                wards.map((ward) => (
                  <tr key={ward.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{ward.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ward.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ward.councillorName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ward.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(ward)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(ward.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No wards found. Click "Add New Ward" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for creating/editing ward */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Ward' : 'Add New Ward'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Ward Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentWard.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="councillorName">
                  Councillor Name
                </label>
                <input
                  type="text"
                  id="councillorName"
                  name="councillorName"
                  value={currentWard.councillorName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                  Region
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={currentWard.region}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
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
                  {isEditing ? 'Update Ward' : 'Create Ward'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardManagement;