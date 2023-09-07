"use client"

import { Companion, Message } from "@prisma/client";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BotAvatar from "@/components/bot-avatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface CHProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatHeader =  ({ companion }: CHProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const onDelete = async() => {
    try {
      await axios.delete(`/api/companion/${companion.id}`)
      toast ({
        description : "Success"
      })
      router.refresh()
      router.push("/")
    } catch (error) {
      toast ({
        description : "Some Thing went Wrong",
        variant : "destructive"
      })
    }
  }
  return (
    <div className="flex w-full mt-2 justify-between items-center border-b border-primary/10 pb-4 sticky top-0 z-10 bg-secondary ">
      <div className="flex gap-x-2 items-center">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name} </p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created By {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
