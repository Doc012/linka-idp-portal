import axios from 'axios';

const API_URL = 'http://localhost:8080/api/projects';

const projectService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (projectData) => {
    // Ensure correct data types
    const formattedData = {
      ...projectData,
      strategicPlanId: parseInt(projectData.strategicPlanId),
      wardId: parseInt(projectData.wardId)
    };
    
    const response = await axios.post(API_URL, formattedData);
    return response.data;
  },
  
  update: async (id, projectData) => {
    // Ensure correct data types
    const formattedData = {
      ...projectData,
      strategicPlanId: parseInt(projectData.strategicPlanId),
      wardId: parseInt(projectData.wardId)
    };
    
    const response = await axios.put(`${API_URL}/${id}`, formattedData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default projectService;