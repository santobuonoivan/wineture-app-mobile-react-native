import { create } from "zustand";

interface SessionState {
  expired: boolean;
  message?: string | null;
  setExpired: (expired: boolean, message?: string | null) => void;
  clear: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  expired: false,
  message: null,
  setExpired: (expired: boolean, message?: string | null) =>
    set({ expired, message: message ?? null }),
  clear: () => set({ expired: false, message: null }),
}));
