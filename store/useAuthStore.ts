import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'driver' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const TOKEN_KEY = 'track-fleet-auth-token';
const USER_KEY = 'track-fleet-user-data';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Start true to check auth on mount

  signIn: async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dummy validation
      // In a real app, this would be: const response = await api.post('/login', { email, password });
      
      const dummyUser: User = {
        id: 'user_123',
        email,
        name: 'Nayon',
        role: 'driver'
      };
      const dummyToken = 'dummy-jwt-token-123456';

      // Persist to SecureStore
      await SecureStore.setItemAsync(TOKEN_KEY, dummyToken);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(dummyUser));

      set({ 
        user: dummyUser, 
        token: dummyToken, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userStr = await SecureStore.getItemAsync(USER_KEY);

      if (token && userStr) {
        set({ 
          token, 
          user: JSON.parse(userStr), 
          isAuthenticated: true 
        });
      } else {
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        });
      }
    } catch (error) {
      console.error('Check auth error:', error);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  }
}));
