import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  lang?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUserLanguage: (lang: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (userData: User) => {
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateUserLanguage: (lang: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, lang } : null,
        }));
      },
    }),
    {
      name: "auth-storage", // nombre para el storage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
