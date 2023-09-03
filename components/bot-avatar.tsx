import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface BAProps {
  src: string;
}
const BotAvatar = ({ src }: BAProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
