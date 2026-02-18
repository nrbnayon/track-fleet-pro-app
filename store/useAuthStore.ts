import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '@/lib/api';

interface User {
  user_id: string;
  email_address?: string;
  full_name?: string;
  role: string;
  account_type?: string | "DRIVER";
  driver_profile?: {
    first_name: string | null;
    last_name: string | null;
    vehicle_number: string | null;
    phone_number: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<{ user_id: string; role: string }>;
  verifyEmail: (userId: string, code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<{ user_id: string }>;
  verifyResetCode: (userId: string, code: string) => Promise<{ secret_key: string }>;
  resetPassword: (userId: string, secretKey: string, newPassword: string, confirmPassword: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  getProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (email, password) => {
    try {
      const response = await api.post('/api/auth/signin/', {
        email_address: email,
        password,
      });

      console.log('Full API Response:', JSON.stringify(response.data, null, 2));

      if (response.data.success) {
        const { access_token, refresh_token, user_id, role } = response.data.data;
        
        console.log('Login successful, storing tokens...');
        console.log('Access token:', access_token);
        console.log('Refresh token:', refresh_token);
        console.log('User ID:', user_id);
        console.log('Role:', role);

        if (role !== "DRIVER") {
          throw new Error("Access Denied: Only drivers can login.");
        }
        
        if (!access_token) {
          throw new Error('No access token received from server');
        }
        
        // Ensure all values are strings for SecureStore
        await SecureStore.setItemAsync('access_token', String(access_token));
        await SecureStore.setItemAsync('refresh_token', String(refresh_token));
        await SecureStore.setItemAsync('user_id', String(user_id));
        
        // Verify tokens were stored
        const storedToken = await SecureStore.getItemAsync('access_token');
        console.log('Stored token retrieved:', storedToken);
        
        // Fetch full profile
        await useAuthStore.getState().getProfile();
        
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signUp: async (data) => {
    try {
      const response = await api.post('/api/auth/signup/', data);
      
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Signup failed');
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
  },

  verifyEmail: async (userId, code) => {
    try {
      const response = await api.post('/api/auth/verify-email/', {
        user_id: userId,
        code,
      });

      if (response.data.success) {
        const { access_token, refresh_token, user_id } = response.data.data;
        
        // Ensure all values are strings for SecureStore
        await SecureStore.setItemAsync('access_token', String(access_token));
        await SecureStore.setItemAsync('refresh_token', String(refresh_token));
        await SecureStore.setItemAsync('user_id', String(user_id));

        await useAuthStore.getState().getProfile();
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/api/auth/forgot-password/', {
        email_address: email,
      });

      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  verifyResetCode: async (userId, code) => {
    try {
      const response = await api.post('/api/auth/verify-reset-code/', {
        user_id: userId,
        code,
      });

      if (response.data.success) {
        return response.data.data; // contains secret_key
      }
      throw new Error(response.data.message);
    } catch (error) {
      console.error('Verify reset code error:', error);
      throw error;
    }
  },

  resetPassword: async (userId, secretKey, newPassword, confirmPassword) => {
    try {
      const response = await api.post('/api/auth/reset-password/', {
        user_id: userId,
        secret_key: secretKey,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  resendOTP: async (email) => {
    try {
      const response = await api.post('/api/auth/resent-otp/', {
        email_address: email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      const response = await api.delete('/api/auth/deleted-account/');
      
      if (response.data.success) {
        // Clear all stored data after successful deletion
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('user_id');
        set({ user: null, isAuthenticated: false });
      } else {
        throw new Error(response.data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/api/auth/getme/');
      if (response.data.success) {
        const storedUserId = await SecureStore.getItemAsync('user_id');
        set({ 
            user: { 
                ...response.data.data, 
                user_id: storedUserId || response.data.data.user_id 
            } 
        });
      }
    } catch (error) {
      console.error('Get profile error:', error);
      // Don't throw here, just log. create checkAuth for critical checks.
    }
  },

  signOut: async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user_id');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = await SecureStore.getItemAsync('access_token');
      
      if (token) {
        // Optionally verify token validity with an API call (getProfile)
        try {
            await useAuthStore.getState().getProfile();
            set({ isAuthenticated: true });
        } catch (e) {
            // If getProfile fails (e.g. 401 even after retry), assume logged out
            set({ isAuthenticated: false, user: null });
        }
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error('Check auth error:', error);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  }
}));
