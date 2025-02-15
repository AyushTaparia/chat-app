"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Message, User } from "@/types";

interface ChatStore {
  messages: Message[];
  user: User | null;
  addMessage: (message: Message) => void;
  setUser: (user: User | null) => void;
  clearMessages: () => void;
}

export const useStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      user: null,
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setUser: (user) => set({ user }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        user: state.user,
      }),
    }
  )
);
