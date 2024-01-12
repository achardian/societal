import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileImg = ({ src, className }: { src: string; className: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt="profile-img" className="object-cover" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileImg;
