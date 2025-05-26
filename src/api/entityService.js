import apiClient from './apiClient';

export const createEntityService = (endpoint) => {
  return {
    getAll: async (params = {}) => {
      const response = await apiClient.get(`/${endpoint}`, { params });
      return response.data;
    },
    
    getById: async (id) => {
      const response = await apiClient.get(`/${endpoint}/${id}`);
      return response.data;
    },
    
    create: async (data) => {
      const response = await apiClient.post(`/${endpoint}`, data);
      return response.data;
    },
    
    update: async (id, data) => {
      const response = await apiClient.put(`/${endpoint}/${id}`, data);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await apiClient.delete(`/${endpoint}/${id}`);
      return response.data;
    }
  };
};