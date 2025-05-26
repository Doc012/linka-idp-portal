import apiClient from '../apiClient';

const userService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/v1/users', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/v1/users/${id}`);
    return response.data;
  },
  
  create: async (userData) => {
    const response = await apiClient.post('/v1/users', userData);
    return response.data;
  },
  
  update: async (id, userData) => {
    const response = await apiClient.put(`/v1/users/${id}`, userData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/v1/users/${id}`);
    return response.data;
  },
  
  getAllRoles: async () => {
    const response = await apiClient.get('/v1/roles');
    return response.data;
  },
  
  getUsersByRole: async (roleType) => {
    const response = await apiClient.get(`/v1/users/role/${roleType}`);
    return response.data;
  }
};

export default userService;