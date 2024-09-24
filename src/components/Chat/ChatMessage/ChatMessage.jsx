import React, { useContext, useEffect, useState } from "react";
import SendMessageInput from "../../utils/SendMessageInput";

import SendMessageText from "./SendMessageText";
import RecieveMessageText from "./RecieveMessageText";
import { SocketContext } from "../../../context/Socket.context";
import BackgroundImage from "../../../assets/messageBackground.jpg";
import { ChatContext } from "../../../context/Chat.context";
const ChatMessage = () => {
  const { currentChatOpen, chatHistory, updateChatHandler } =
    useContext(ChatContext);

  const [MessageText, setMessageText] = useState("");
  const [recieveText, setRecieveText] = useState("");
  const { userData, socket } = useContext(SocketContext);

  const submitHandler = async () => {
    console.log(MessageText);

    const currrentTime = Date.now();
    const data = {
      content: MessageText,
      senderId: userData?._id,
      parentMessageId: null,
      receiverId: currentChatOpen?._id,
      time: currrentTime,
    };
    console.log(data);
    socket.emit("send_message", data);
    await updateChatHandler(data);
    setMessageText("");
  };
  const chatData = chatHistory?.[currentChatOpen?._id] || [];
  console.log(currentChatOpen, chatHistory, chatData);
  return (
    <>
      <div className="flex flex-1 flex-col w-full overflow-auto hide-scrollbar">
        <div
          className={`flex gap-4 w-full flex-1`}
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          <div className="flex flex-col px-4  py-2 w-full">
            {chatData?.map((data, index) => {
              const isAvatarVisible =
                index === 0 ||
                chatData[index - 1]?.receiverId !== data?.receiverId;
              if (data?.senderId === userData?._id) {
                return <SendMessageText data={data} />;
              } else
                return (
                  <RecieveMessageText
                    data={data}
                    isAvatarVisible={isAvatarVisible}
                    senderInfo = {currentChatOpen}
                  />
                );
              console.log(data);
            })}
          </div>
        </div>
      </div>
      <div className="h-20 p-2 py-4 bg-gray-900">
        <SendMessageInput
          onSubmit={submitHandler}
          MessageText={MessageText}
          setMessageText={setMessageText}
        />
      </div>
    </>
  );
};

export default ChatMessage;
