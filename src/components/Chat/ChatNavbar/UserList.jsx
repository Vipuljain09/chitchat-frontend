import React, { useContext } from "react";
import SingleUserItem from "./SingleUserItem";
import { ChatContext } from "../../../context/Chat.context";
const arr = [1, 2, 3, 2, 5];

const UserList = ({ data }) => {
  const {friendList} = useContext(ChatContext);
  return (
    <div className="flex flex-col overflow-y-auto hide-scrollbar">
      {friendList?.map((item, index) => (
        <SingleUserItem key={index} userInfo={item} />
      ))}
    </div>
  );
};

export default UserList;
