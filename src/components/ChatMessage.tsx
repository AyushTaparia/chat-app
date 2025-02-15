"use client";

import { Message } from "@/types";
import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const user = useStore((state) => state.user);
  const isOwnMessage = message.sender === user?.id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[60%] px-4 py-2 rounded-lg ${
          isOwnMessage
            ? "bg-[#005c4b] text-[#e9edef] rounded-br-none"
            : "bg-[#3f5562] text-[#e9edef] rounded-bl-none"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-xs text-[#00a884] font-medium mb-1 capitalize">
            {message.senderName || "User"}
          </p>
        )}
        <div className="flex items-end gap-6">
          <p className="break-words text-sm">{message.text}</p>
          <p className="text-[9px] text-[#8696a0] text-right mt-1">
            {format(new Date(message.timestamp), "hh:mm a, dd MMM yyyy")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
