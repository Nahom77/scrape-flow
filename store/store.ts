import { User } from "@/types";
import { create } from "zustand";

interface AppState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logOut: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  logOut: () => set({ user: undefined }),
}));
