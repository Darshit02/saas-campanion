"use client"

import ChatHeader from "@/components/chat-header";
import { Companion, Message } from "@prisma/client"

interface CCProps{
    companion : Companion & {
    messages:Message[];
    _count:{
messages : number
    }
}}
export const ChatClient = ({companion} : CCProps) => {
    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion}/>
        </div>
    )
}