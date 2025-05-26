import apiClient from '../apiClient';

const wardService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/wards', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/wards/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await apiClient.post('/wards', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await apiClient.put(`/wards/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/wards/${id}`);
    return response.data;
  }
};

export default wardService;