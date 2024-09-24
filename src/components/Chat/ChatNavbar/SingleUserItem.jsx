import { Avatar, AvatarBadge, Divider } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserAvatar } from "../../utils/InputField";
import { ChatContext } from "../../../context/Chat.context";

const SingleUserItem = ({ userInfo: reciverUserInfo }) => {
  const { currentChatOpen, updateCurrentChatHandler } = useContext(ChatContext);
  const currentChatHandler = () => {
    updateCurrentChatHandler(reciverUserInfo);
  };

  const isCurrentChat = currentChatOpen?._id === reciverUserInfo?._id;
  console.log(isCurrentChat, reciverUserInfo);
  const unseenCount = reciverUserInfo?.unseenMessage || 0;
  return (
    <div
      className={`flex flex-col cursor-pointer px-4 ${
        isCurrentChat ? "bg-gray-800" : ""
      }`}
      onClick={currentChatHandler}
    >
      <div className="flex items-center gap-4 py-4">
        <UserAvatar data={reciverUserInfo} />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <p className="text-gray-300">{reciverUserInfo?.userName || "--"}</p>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-gray-500">Yesterday</p>
            {unseenCount !== 0 && (
              <span className="text-white bg-pink-500 px-2 py-[2px] rounded-full text-sm w-max">
                {unseenCount}
              </span>
            )}
          </div>
        </div>
      </div>
      <Divider orientation="horizontal" borderColor={"gray.700"} />
    </div>
  );
};

export default SingleUserItem;
