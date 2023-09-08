"use client";

import { Companion } from "@prisma/client";
import { ChatMessage } from "@/components/ChatMessage";
import { CMSProps } from "@/components/ChatMessage";
import { ElementRef, useEffect, useRef, useState } from "react";

interface CMProps {
  messages: CMSProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({ 
 
  messages = [], 
  isLoading,
   companion }: 
   CMProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null)
    const [fackLoading , setFackLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setFackLoading(false)
      },1000)
      return () => 
      {
        clearTimeout(timeout)
      }
    },[])
    useEffect(() => {
      scrollRef?.current?.scrollIntoView({behavior : "smooth"})

    } , [messages.length])

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
      isLoading = {fackLoading}
        src={companion.src}
        role="system"
        content={`Hello I am ${companion.name} , ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          role={message.role}
          key={message.content}
          content={message.content}
          src={companion.src} 
          />
      ))}
      {isLoading && (
        <ChatMessage
        role="system"
        src={companion.src}
        isLoading
        />
      )}
      <div
      /// <reference path />
        ref={scrollRef}
      />
    </div>
  );
};

export default ChatMessages;
