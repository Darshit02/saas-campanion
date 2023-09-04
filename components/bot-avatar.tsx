import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface BAProps {
  src: string;
}
const BotAvatar = ({ src }: BAProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
