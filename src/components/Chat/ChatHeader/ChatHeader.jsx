import React, { useContext } from "react";
import {
  StarIcon,
  UserPlusIcon,
  VideoCameraIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { UserAvatar } from "../../utils/InputField";
import { ChatContext } from "../../../context/Chat.context";
const ChatHeader = ({ userInfo }) => {
  const { setSideBarOpen,currentChatOpen } = useContext(ChatContext);
  const sideBarHandler = () => {
    setSideBarOpen((pre) => !pre);
  };
  console.log(currentChatOpen);
  
  return (
    <div className="relative">
      <ChevronLeftIcon
        className="size-11 cursor-pointer absolute h-full left-0 top-1/2 transform -translate-y-1/2 rounded-r-full p-2 hover:opacity-50 lg:hidden"
        onClick={sideBarHandler}
      />

      <div className="flex items-center justify-between p-8 md:px-16 px-12 lg:px-8 bg-gray-900 h-24">
        <div className="flex items-center gap-8">
          <UserAvatar data={currentChatOpen}/>
          <div className="flex flex-col items-start">
            <p className="md:text-2xl font-medium">{currentChatOpen?.userName}</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium px-1">Active Now</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center md:gap-4 gap-2">
          <StarIcon className="size-12 cursor-pointer text-white bg-gray-800 p-3 rounded-full" />
          <UserPlusIcon className="size-12 cursor-pointer text-white bg-gray-800 p-3 rounded-full" />
          <VideoCameraIcon className="size-12 cursor-pointer text-white bg-gray-800 p-3 rounded-full" />
          <PhoneIcon className="size-12 cursor-pointer text-white bg-gray-800 p-3 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
