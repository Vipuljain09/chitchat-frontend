import React, { useContext, useState } from "react";
import SearchUserInput from "../../utils/SearchInput";
import UserNavbar from "./UserNavbar";
import UserList from "./UserList";
import { ChatContext } from "../../../context/Chat.context";

const ChatNavbar = () => {
  
  return (
    <div className="flex flex-col w-full">
      <UserNavbar />
      <SearchUserInput/>
      <UserList/>
    </div>
  );
};

export default ChatNavbar;
