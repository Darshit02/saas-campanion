"use client";

import ChatHeader from "@/components/chat-header";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/ChatMessages";
import { CMSProps } from "@/components/ChatMessage";

interface CCProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}
export const ChatClient = ({ companion }: CCProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<CMSProps[]>(companion.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage :CMSProps = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });
  const onSubmmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage :CMSProps = {
      role: "user",
      content: input,
    };
    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <div className="">
        <ChatMessages
          companion={companion}
          isLoading={isLoading}
          messages={messages}
        />
      </div>
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmmit={onSubmmit}
      />
    </div>
  );
};
