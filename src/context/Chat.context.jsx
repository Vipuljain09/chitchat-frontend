import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "./Socket.context";
import { getUserById } from "../api/api.js";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  
  const { userData, socket } = useContext(SocketContext);

  const [friendList, setFriendList] = useState([]);
  const [currentChatOpen, setCurrentChatOpen] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const chatHistoryRef = useRef(chatHistory);
  const friendListRef = useRef(friendList);
  // Step 2: Update the ref whenever chatHistory changes
  useEffect(() => {
    chatHistoryRef.current = chatHistory;
    friendListRef.current = friendList;
  }, [chatHistory, friendList]);

  const addFriendHandler = (data) => {
    
    const friendListInfo = friendListRef.current;
    const isPresent = friendListInfo?.find((item) => item?._id === data?._id);
    if (!isPresent) {
      setFriendList([{ ...data, unseenMessage: 0 }, ...friendListInfo]);
      setChatHistory((pre) => {
        return { ...pre, [data?._id]: [] };
      });
    }
  };

  const increaseUnseenMessage = (id) => {
    const friendListInfo = friendListRef.current;
    const newData = friendListInfo?.map((data) => {
      if (data?.receiverId === id) {
        const newCount = (data?.unseenMessage || 0) + 1;
        return { ...data, unseenMessage: newCount };
      } else return data;
    });

    setFriendList(newData);
  };

  const updateCurrentChatHandler = (data) => {
    setSideBarOpen((pre) => !pre);
    if (currentChatOpen?._id === data?._id) return;
    setCurrentChatOpen(data);
  };

  const updateChatHandler = async (data) => {
    try {

      const receiverId = data?.receiverId;
      const chatHistoryInfo = chatHistoryRef?.current;
      console.log(receiverId, chatHistory, chatHistory?.receiverId);

      if (!chatHistoryInfo?.receiverId) {
        const newFriendData = await getUserById(receiverId);
        addFriendHandler(newFriendData);
      }

      console.log(chatHistory, chatHistory?.[receiverId], data);

      const updatedChatData = [...chatHistoryInfo?.[receiverId], data];
      setChatHistory((pre) => {
        return { ...pre, [receiverId]: updatedChatData };
      });

      console.log(currentChatOpen?._id !== data?.receiverId);

      if (currentChatOpen?._id !== data?.receiverId) {
        increaseUnseenMessage(data?.receiverId);
      }
    } catch (error) {
      console.log("error---", error);
    }
  };

  const updateReceiverChatHandler = async (data) => {
    try {
      const senderId = data?.senderId;
      const chatHistoryInfo = chatHistoryRef?.current;

      console.log(
        senderId,
        chatHistoryRef?.current,
        chatHistory,
        chatHistory?.senderId
      );

      if (!chatHistoryInfo?.senderId) {
        const newFriendData = await getUserById(senderId);
        addFriendHandler(newFriendData);
      }

      console.log(chatHistory, chatHistory?.[senderId], data);

      const updatedChatData = [...chatHistoryInfo?.[senderId], data];
      console.log(senderId, updatedChatData);

      setChatHistory({ ...chatHistoryInfo, [senderId]: updatedChatData });

      console.log(currentChatOpen?._id !== data?.senderId);

      if (currentChatOpen?._id !== data?.senderId) {
        increaseUnseenMessage(data?.senderId);
      }
    } catch (error) {
      console.log("error---", error);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", async (data) => {
        try {
          console.log(data, chatHistoryRef?.current);
          console.log(data, chatHistory);
          await updateReceiverChatHandler(data);
        } catch (error) {
          console.log("Receive Message", error);
        }
      });

      return () => {
        socket.off("receive_message", () => {
          console.log("socket off");
        });
      };
    }
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        friendList,
        currentChatOpen,
        setCurrentChatOpen,
        chatHistory,
        addFriendHandler,
        updateChatHandler,
        updateCurrentChatHandler,
        sideBarOpen,
        setSideBarOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
