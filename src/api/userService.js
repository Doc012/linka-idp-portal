import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/users';

const userService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
  },
  
  update: async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
  
  getRoles: async () => {
    // Updated to use the correct roles endpoint
    const response = await axios.get('http://localhost:8080/api/v1/roles/admin');
    return response.data;
  }
};

export default userService;