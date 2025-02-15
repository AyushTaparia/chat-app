"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Message, User } from "@/types";

interface ChatStore {
  messages: Message[];
  user: User | null;
  isHydrated: boolean;
  addMessage: (message: Message) => void;
  setUser: (user: User | null) => void;
  clearMessages: () => void;
  setHydrated: () => void;
}

export const useStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      user: null,
      isHydrated: false,
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setUser: (user) => set({ user }),
      clearMessages: () => set({ messages: [] }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
