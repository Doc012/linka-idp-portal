import axios from 'axios';

const API_URL = 'http://localhost:8080/api/strategic-plans';

const strategicPlanService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (planData) => {
    // Ensure dates are in the correct format
    const formattedData = {
      ...planData,
      // Convert to expected format if needed
      createdBy: parseInt(planData.createdBy),
      wardId: parseInt(planData.wardId)
    };
    
    const response = await axios.post(API_URL, formattedData);
    return response.data;
  },
  
  update: async (id, planData) => {
    // Ensure dates are in the correct format
    const formattedData = {
      ...planData,
      // Convert to expected format if needed
      createdBy: parseInt(planData.createdBy),
      wardId: parseInt(planData.wardId)
    };
    
    const response = await axios.put(`${API_URL}/${id}`, formattedData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default strategicPlanService;