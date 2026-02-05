import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('access_token');
    console.log('Request interceptor - Token retrieved:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
    console.log('Request URL:', config.url);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // specific check for 401 and avoid infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_URL}/api/auth/custom-refresh/`, {
            refresh: refreshToken, // payload body based on user spec
        }, {
            headers: {
                Authorization: `Bearer ${await SecureStore.getItemAsync('access_token')}` // The user spec shows sending access token in Auth header too?
                // Request 7: "Authorization: Bearer Token: access token: ..." 
                // Wait, usually refresh endpoint uses refresh token in body OR header. Use spec.
                // Spec says: Authorization: Bearer <access_token> AND body: { refresh: <refresh_token> }
            }
        });

        if (response.data.success) {
          const { access_token } = response.data.data;
          
          // Ensure token is stored as string
          await SecureStore.setItemAsync('access_token', String(access_token));
          
          // If the refresh endpoint returns a new refresh token, store it too (User spec doesn't explicitly show it in #7 response, only access_token)
          // Response #7: { data: { access_token: "..." } } - No refresh token in response.
          
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh failure (e.g., logout user)
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('user_data');
        // You might want to redirect to login here or emit an event
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
