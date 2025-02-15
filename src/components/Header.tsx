"use client";

import { useStore } from "@/store/useStore";
import { socket } from "@/lib/socket";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, setUser, clearMessages } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    socket.disconnect();
    setUser(null);
    clearMessages();
    localStorage.removeItem("jwt");
  };

  return (
    <div className="bg-[#202c33] px-6 py-3 flex items-center justify-between shadow-md border-b border-[#2a3942]">
      <h1 className="text-xl font-semibold text-[#e9edef]">WhatsChat</h1>

      {user && (
        <span className="hidden md:inline-block text-[#aebac1] capitalize">
          Welcome, {user.username || user.email}
        </span>
      )}

      {user && (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-[#2a3942] transition"
          >
            <Menu className="w-6 h-6 text-[#aebac1]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2a3942] rounded-lg shadow-lg border border-[#3c4b57] overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-[#e9edef] hover:bg-[#202c33] transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
