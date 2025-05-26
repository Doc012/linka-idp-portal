import { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  
  // State for user form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    email: '',
    wardNumber: '',
    password: '',
    enabled: true,
    roleType: null
  });

  // Mock roles data
  const mockRoles = [
    { roleID: 1, roleType: 'Admin' },
    { roleID: 2, roleType: 'Ward Councillor' },
    { roleID: 3, roleType: 'Resident' },
    { roleID: 4, roleType: 'Municipal Manager' },
    { roleID: 5, roleType: 'Service Technician' }
  ];

  // Mock users data
  const mockUsers = [
    {
      userID: 1,
      name: 'John',
      surname: 'Doe',
      phoneNumber: '0821234567',
      email: 'john.doe@example.com',
      wardNumber: 3,
      enabled: true,
      roleType: { roleID: 1, roleType: 'Admin' }
    },
    {
      userID: 2,
      name: 'Jane',
      surname: 'Smith',
      phoneNumber: '0739876543',
      email: 'jane.smith@example.com',
      wardNumber: 5,
      enabled: true,
      roleType: { roleID: 2, roleType: 'Ward Councillor' }
    },
    {
      userID: 3,
      name: 'Michael',
      surname: 'Johnson',
      phoneNumber: '0641234567',
      email: 'michael.j@example.com',
      wardNumber: 3,
      enabled: false,
      roleType: { roleID: 3, roleType: 'Resident' }
    },
    {
      userID: 4,
      name: 'Sarah',
      surname: 'Williams',
      phoneNumber: '0837654321',
      email: 'sarah.w@example.com',
      wardNumber: 7,
      enabled: true,
      roleType: { roleID: 4, roleType: 'Municipal Manager' }
    },
    {
      userID: 5,
      name: 'David',
      surname: 'Brown',
      phoneNumber: '0742345678',
      email: 'david.b@example.com',
      wardNumber: 2,
      enabled: true,
      roleType: { roleID: 5, roleType: 'Service Technician' }
    }
  ];

  // Simulate fetching users
  const fetchUsers = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setUsers(mockUsers);
      setError(null);
      setLoading(false);
    }, 800);
  };

  // Simulate fetching roles
  const fetchRoles = () => {
    // Simulate API delay
    setTimeout(() => {
      setRoles(mockRoles);
    }, 500);
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'enabled') {
      setCurrentUser({ ...currentUser, [name]: e.target.checked });
    } else if (name === 'roleID') {
      // Find the selected role
      const selectedRole = roles.find(role => role.roleID === parseInt(value));
      setCurrentUser({ ...currentUser, roleType: selectedRole });
    } else {
      setCurrentUser({ ...currentUser, [name]: value });
    }
  };

  // Open modal for creating a new user
  const openCreateModal = () => {
    setCurrentUser({
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      wardNumber: '',
      password: '', // Include for new users
      enabled: true,
      roleType: null
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing a user
  const openEditModal = (user) => {
    // Create a copy without password since we don't update passwords in edit mode
    const userForEdit = { ...user };
    delete userForEdit.password;
    
    setCurrentUser(userForEdit);
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
    
    // Simulate API call with a loading delay
    setLoading(true);
    
    setTimeout(() => {
      if (isEditing) {
        // Update existing user in our mock data
        const updatedUsers = users.map(user => 
          user.userID === currentUser.userID ? currentUser : user
        );
        setUsers(updatedUsers);
      } else {
        // Create new user with a mock ID
        const newUser = {
          ...currentUser,
          userID: Math.max(...users.map(u => u.userID)) + 1
        };
        setUsers([...users, newUser]);
      }
      
      setLoading(false);
      closeModal();
    }, 600);
  };

  // Handle user deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Simulate API call
      setLoading(true);
      
      setTimeout(() => {
        const filteredUsers = users.filter(user => user.userID !== id);
        setUsers(filteredUsers);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <button 
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New User
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Users list */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surname</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.userID}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.userID}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.surname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.wardNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.roleType?.roleType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user.userID)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No users found. Click "Add New User" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for creating/editing user */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit User' : 'Add New User'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currentUser.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={currentUser.surname}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={currentUser.phoneNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wardNumber">
                    Ward Number
                  </label>
                  <input
                    type="number"
                    id="wardNumber"
                    name="wardNumber"
                    value={currentUser.wardNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              
              {!isEditing && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required={!isEditing}
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleID">
                  Role
                </label>
                <select
                  id="roleID"
                  name="roleID"
                  value={currentUser.roleType?.roleID || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.roleID} value={role.roleID}>
                      {role.roleType}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enabled"
                    checked={currentUser.enabled}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Active User</span>
                </label>
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
                  {isEditing ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;