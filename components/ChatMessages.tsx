"use client";

import { Companion } from "@prisma/client";
import { ChatMessage } from "@/components/ChatMessage";
import { CMSProps } from "@/components/ChatMessage";
import { useEffect, useState } from "react";

interface CMProps {
  messages: CMSProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({ 
  messages: [], 
  isLoading,
   companion }: 
   CMProps) => {
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello I am ${companion.name} , ${companion.description}`}
      />
    </div>
  );
};

export default ChatMessages;
