import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface CFProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
}

const ChatForm = ({
  input,
  isLoading,
  handleInputChange,
  onSubmmit,
}: CFProps) => {
  return (
    <form onSubmit={onSubmmit} className="border-t border-primary/10 py-4 flex items-center gap-x-2 sticky bottom-0 bg-secondary ">
    <Input
      disabled={isLoading}
      value={input}
      onChange={handleInputChange}
      placeholder="Type a message"
      className="rounded-lg bg-primary/10"
    />
    <Button disabled={isLoading} variant="ghost">
      <SendHorizonal className="w-6 h-6" />
    </Button>
  </form>
  );
};

export default ChatForm;
