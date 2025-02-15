"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { socket } from "@/lib/socket";
import { AuthForm } from "@/components/AuthForm";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Header } from "@/components/Header";
import { Message } from "@/types";
import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";

export default function ChatContainer() {
  const { user, messages, addMessage, isHydrated } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    if (!socket.connected) {
      socket.connect();
    }

    const messageHandler = (msg: Message) => {
      console.log("Received message:", msg);
      addMessage(msg);
    };

    socket.on("chat message", messageHandler);

    return () => {
      socket.off("chat message", messageHandler);
      socket.disconnect();
    };
  }, [user, addMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show loading spinner while hydrating
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111b21]">
        <div className="w-12 h-12 border-4 border-[#00a884] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Only show AuthForm if user is not logged in and hydration is complete
  if (!user) {
    return <AuthForm />;
  }

  let lastDate: string | null = null;

  return (
    <div className="flex flex-col h-screen bg-[#0b141a]">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-4 max-w-5xl mx-auto ">
          {messages.map((message) => {
            const messageDate = new Date(message.timestamp);
            let formattedDate = format(messageDate, "dd MMM yyyy");
            if (isToday(messageDate)) formattedDate = "Today";
            else if (isYesterday(messageDate)) formattedDate = "Yesterday";

            const showDate = lastDate !== formattedDate;
            lastDate = formattedDate;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {showDate && (
                  <div className="text-center text-xs text-[#8696a0] py-2 font-medium bg-[#202c33] rounded-lg mx-auto w-fit px-4 shadow-md border border-[#8696a0] my-4">
                    {formattedDate}
                  </div>
                )}
                <ChatMessage message={message} />
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput />
    </div>
  );
}
