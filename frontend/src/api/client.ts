import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Use environment variable in production, proxy in development
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if we're currently refreshing the token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't retry login requests
      if (originalRequest.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { token, user } = useAuthStore.getState();
      
      // Check if we have a token and user
      if (!token || !user) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        // Try to verify the current token
        const response = await axios.post('/api/auth/verify', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.valid) {
          // Token is still valid, retry the original request
          processQueue(null, token);
          return apiClient(originalRequest);
        } else {
          // Token is invalid, logout
          processQueue(error, null);
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If refresh fails, logout the user
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
