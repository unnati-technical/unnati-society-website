import axios from 'axios';
import { toast } from 'sonner';
// import { auth } from '../contexts/AuthContext' // We'll handle this dynamically if needed, or from Firebase directly if used.

const API_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Firebase token if available
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // If you are using Firebase auth in web as well:
      // const token = await auth.currentUser?.getIdToken();
      // if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Failed to get auth token', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    // If the backend returned a unified { success, data } object, unwrap it
    if (response.data && typeof response.data === 'object' && 'success' in response.data && 'data' in response.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error('Session expired. Please log in again.');
      } else if (error.response.status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);
