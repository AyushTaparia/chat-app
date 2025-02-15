"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";
import { useStore } from "@/store/useStore";
import { Send } from "lucide-react";

export function ChatInput() {
  const [message, setMessage] = useState("");
  const user = useStore((state) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage = {
      id: crypto.randomUUID(),
      text: message.trim(),
      sender: user.id,
      senderName: user.username || user.email,
      timestamp: new Date().toISOString(),
    };

    socket.emit("chat message", newMessage);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#202c33] shadow-md">
      <div className="flex items-center space-x-3 max-w-4xl mx-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 bg-[#2a3942] text-[#e9edef] rounded-full border-none focus:ring-2 focus:ring-[#00a884] outline-none placeholder:text-[#8696a0] shadow-sm"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="p-3 bg-[#00a884] text-white rounded-full hover:bg-[#00916e] transition-colors shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
