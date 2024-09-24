import React, { useContext } from "react";
import { UserAvatar } from "../../utils/InputField";
import { BellIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { SocketContext } from "../../../context/Socket.context";


const UserNavbar = () => {
  const { userData } = useContext(SocketContext);
  return (
    <div className="flex items-center justify-between text-color p-4">
      <div className="flex items-center gap-4">
        <UserAvatar data={userData}/>
        <p className="font-medium text-xl">{userData?.userName}</p>
      </div>
      <div className="flex items-center gap-4">
        <BellIcon className="size-6 cursor-pointer" />
        <EllipsisHorizontalIcon className="size-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default UserNavbar;
