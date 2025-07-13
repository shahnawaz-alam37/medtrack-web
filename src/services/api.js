import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/users',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Only add token for protected endpoints
    const publicEndpoints = [
      '/patient_info/',
      '/add_medication_reminder'
    ];
    const isPublic = publicEndpoints.some(ep => config.url?.startsWith(ep));
    if (!isPublic) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// Doctor fetches patient info by ID
export const getPatientInfo = async (patientId) => {
  try {
    const response = await api.get(`/patient_info/${patientId}`);
    console.log(response.data);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch patient information',
    };
  }
};

// Doctor adds medication for a user
export const addMedicationReminder = async (medicationData) => {
  try {
    console.log('Sending medication data:', medicationData);
    console.log('API URL:', '/add_medication_reminder');
    
    const response = await api.post('/add_medication_reminder', medicationData);
    console.log('API Response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to save medication reminder',
    };
  }
};

export default api;