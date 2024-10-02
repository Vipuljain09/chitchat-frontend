import React, { useContext } from "react";
import { UserAvatar } from "../../utils/InputField";
import { BellIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { SocketContext } from "../../../context/Socket.context";
import {
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { ChatContext } from "../../../context/Chat.context";
import { useNavigate } from "react-router-dom";

const UserSetting = () => {
  const { setUserSettingOpen } = useContext(ChatContext);
  const { logoutHandler } = useContext(SocketContext);
  const navigate = useNavigate();
  const profileHandler = () => {
    setUserSettingOpen((pre) => !pre);
  };

  const userLogoutHandler = () => {
    logoutHandler();
    navigate("/auth/sign-in");
  };
  return (
    <Card className="rounded-r-lg">
      <CardBody p={"0"} backgroundColor={"gray.700"} color={"white"}>
        <div
          className="p-4 cursor-pointer hover:bg-gray-800"
          onClick={profileHandler}
        >
          User Profile
        </div>
        <div className="p-4 cursor-pointer hover:bg-gray-800">Setting</div>
        <div
          className="p-4 cursor-pointer hover:bg-gray-800"
          onClick={userLogoutHandler}
        >
          {" "}
          Logout
        </div>
      </CardBody>
    </Card>
  );
};
const UserNavbar = () => {
  const { userData } = useContext(SocketContext);
  const { setUserSettingOpen } = useContext(ChatContext);
  const profileHandler = () => {
    setUserSettingOpen((pre) => !pre);
  };
  return (
    <div className="flex items-center justify-between text-color p-4">
      <div className="flex items-center gap-4">
        <Tooltip label="Profile" placement="right" bg="white" color="black">
          <div onClick={profileHandler}>
            <UserAvatar data={userData} />
          </div>
        </Tooltip>
        <p className="font-medium text-xl">{userData?.userName}</p>
      </div>
      <div className="flex items-center gap-4">
        <BellIcon className="size-6 cursor-pointer" />
        <Popover
          placement="bottom-end"
          shadow="none"
          border="0px"
          className="border-0"
        >
          <PopoverTrigger>
            <EllipsisHorizontalIcon className="size-6 cursor-pointer"></EllipsisHorizontalIcon>
          </PopoverTrigger>
          <PopoverContent
            border="0"
            w="200px"
            shadow="none"
            borderRadius="0"
            boxShadow={"none"}
            _focusVisible={{ boxShadow: "none", outline: "0" }}
          >
            <UserSetting />
            {/* <p>Helo</p> */}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UserNavbar;
