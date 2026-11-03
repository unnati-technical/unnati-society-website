import axios from 'axios';
import { auth } from '../lib/firebase';
import { toast } from 'sonner';

// Clean base URL: strip any trailing slash or trailing '/api' from VITE_API_URL
// This ensures that endpoints starting with '/api/...' never result in '/api/api/...'
// regardless of whether VITE_API_URL is "https://domain.com/api" or "https://domain.com"
const RAW_URL = import.meta.env.VITE_API_URL || '';
const API_URL = RAW_URL.trim().replace(/\/+$/, '').replace(/\/api$/, '');

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Firebase token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
        // Only show session expired for user-triggered mutations, not background GETs
        const method = error.config?.method?.toUpperCase();
        if (method && method !== 'GET') {
          toast.error('Session expired. Please log in again.');
        }
      } else if (error.response.status >= 500) {
        // Only toast 500s for user-triggered mutations (POST/PUT/PATCH/DELETE)
        // Suppress noisy 500s from background polling (GET) like notifications, contacts
        const method = error.config?.method?.toUpperCase();
        if (method && method !== 'GET') {
          const message = error.response.data?.message || 'An unexpected error occurred';
          toast.error(message);
        }
        // For GET 500s: silently reject so the component can handle it gracefully
      }
    } else if (error.request) {
      // Only show network error if it was a user-triggered action
      const method = error.config?.method?.toUpperCase();
      if (method && method !== 'GET') {
        toast.error('Network error. Please check your connection.');
      }
    }
    return Promise.reject(error);
  }
);
