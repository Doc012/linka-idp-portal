import axios from 'axios';

const API_URL = 'http://localhost:8080/api/wards';

const wardService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (wardData) => {
    const response = await axios.post(API_URL, wardData);
    return response.data;
  },
  
  update: async (id, wardData) => {
    const response = await axios.put(`${API_URL}/${id}`, wardData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default wardService;