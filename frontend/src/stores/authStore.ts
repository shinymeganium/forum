import { create } from "zustand";

type AuthState = {
  token: string | null;
  userId: string | null;
  username: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  initializeAuth: (token: string) => void;

  login: (
    token: string,
    userId: string,
    username: string,
    role: string
  ) => void;

  logout: () => void;

  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  userId: null,
  username: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuth: (token) => set(() => ({
    // if (token) {

    // }
  })),

  login: (token, userId, username, role) => set(() => ({
    token, userId, username, role, isAuthenticated: true
  })),

  logout: () => set(() => ({
    token: null,
    userId: null,
    username: null,
    role: null,
    isAuthenticated: false
  })),

  setLoading: (loading) => set(() => ({
    isLoading: loading
  }))

}));