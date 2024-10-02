import { Avatar, AvatarBadge } from "@chakra-ui/react";

export const UserAvatar = ({ data, statusVisiable = false }) => {
  const name = data?.userName || "";
  const url = data?.avatar || "https://bit.ly/broken-link";
  return (
    <Avatar src={url} name={name} bg="gray.700" className="cursor-pointer">
      {statusVisiable && (
        <AvatarBadge boxSize="0.75em" bg="green.500" border={"0"} />
      )}
    </Avatar>
  );
};
