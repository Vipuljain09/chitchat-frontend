import React, { useContext, useEffect, useState } from "react";
import { Divider } from "@chakra-ui/react";
import ChatNavbar from "./ChatNavbar/ChatNavbar";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessage from "./ChatMessage/ChatMessage";
import { ChatContext } from "../../context/Chat.context";
import { SocketContext } from "../../context/Socket.context";
import UserProfile from "../Setting/UserProfile";
import IntialChatTemplate from "../utils/IntialChatTemplate";
const Chat = () => {
  const {
    friendList,
    currentChatOpen,
    chatHistory,
    sideBarOpen,
    userSettingOpen,
  } = useContext(ChatContext);

  const { userData } = useContext(SocketContext);

  console.log("userData-->", userData);
  console.log("friendList", friendList);
  console.log("currentChatOpen", currentChatOpen);
  console.log("chatHistory", chatHistory);
  console.log("sideBarOpen", sideBarOpen);
  console.log("userSettingOpen", userSettingOpen);
  return (
    <div className="flex w-full h-screen">
      <div
        className={`lg:flex lg:w-[30%] w-full ${
          !sideBarOpen && "hidden"
        } bg-gray-900`}
      >
        {userSettingOpen ? <UserProfile /> : <ChatNavbar />}
      </div>
      <Divider orientation="vertical" borderColor={"black"} />
      <div
        className={`lg:flex flex-col lg:w-[70%] bg-gray-950 text-color ${
          sideBarOpen && "hidden"
        } w-full flex `}
      >
        {currentChatOpen ? (
          <>
            <ChatHeader />
            <ChatMessage />
          </>
        ) : (
          <IntialChatTemplate />
        )}
      </div>
    </div>
  );
};

export default Chat;
