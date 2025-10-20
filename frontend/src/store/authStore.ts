import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  region?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
  login: (token: string, user: User, refreshToken?: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
  setToken: (token: string) => void;
}

// Helper to decode JWT and get expiry
const getTokenExpiry = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null; // Convert to milliseconds
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      tokenExpiry: null,
      login: (token, user, refreshToken) => {
        const expiry = getTokenExpiry(token);
        set({ 
          token, 
          user, 
          refreshToken: refreshToken || null,
          isAuthenticated: true,
          tokenExpiry: expiry
        });
      },
      logout: () => set({ 
        token: null, 
        user: null, 
        refreshToken: null,
        isAuthenticated: false,
        tokenExpiry: null 
      }),
      isTokenValid: () => {
        const state = get();
        if (!state.token || !state.tokenExpiry) return false;
        
        // Check if token is expired (with 30 second buffer)
        const now = Date.now();
        return state.tokenExpiry > (now + 30000);
      },
      setToken: (token) => {
        const expiry = getTokenExpiry(token);
        set({ token, tokenExpiry: expiry });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        tokenExpiry: state.tokenExpiry
      })
    }
  )
);
