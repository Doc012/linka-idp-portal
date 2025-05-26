import axios from 'axios';

const API_URL = 'http://localhost:8080/api/issues';

const issueService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (issueData) => {
    // Ensure correct data types
    const formattedData = {
      ...issueData,
      userId: parseInt(issueData.userId),
      wardId: parseInt(issueData.wardId),
      projectId: issueData.projectId ? parseInt(issueData.projectId) : null
    };
    
    const response = await axios.post(API_URL, formattedData);
    return response.data;
  },
  
  update: async (id, issueData) => {
    // Ensure correct data types
    const formattedData = {
      ...issueData,
      userId: parseInt(issueData.userId),
      wardId: parseInt(issueData.wardId),
      projectId: issueData.projectId ? parseInt(issueData.projectId) : null
    };
    
    const response = await axios.put(`${API_URL}/${id}`, formattedData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default issueService;