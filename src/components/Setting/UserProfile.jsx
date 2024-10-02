import { Button, Image, Input } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ArrowLeftIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";

import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/Chat.context";
import { updateUserAvatar, updateUserData } from "../../api/api";
import { SocketContext } from "../../context/Socket.context";

const UserProfile = () => {
  const { setUserSettingOpen } = useContext(ChatContext);
  const { userData, setUserData } = useContext(SocketContext);
  const [data, setData] = useState({ name: "", about: "", url: "" });
  const [userAvatarFormData, setUserAvatarFormData] = useState(new FormData());

  const profileHandler = () => {
    setUserSettingOpen((pre) => !pre);
  };

  const avatarUpdateHandler = (event) => {
    console.log(event);

    let fileInput = event.target.files[0];
    if (!fileInput) return;
    const localAvatarUrl = URL.createObjectURL(fileInput);

    setData((pre) => {
      return { ...pre, url: localAvatarUrl };
    });

    let formData = new FormData();
    formData.append("avatar_file", fileInput);
    setUserAvatarFormData(formData);

    console.log(formData, fileInput);
  };

  const profileUpdateHandler = async () => {
    console.log(userAvatarFormData, userData, data);

    const userPayload = {};
    if (userAvatarFormData?.has("avatar_file")) {
      const updatedAvatarResponse = await updateUserAvatar(
        userAvatarFormData,
        userData?._id
      );
      console.log(updatedAvatarResponse);
    }

    userPayload.Name = data?.name;
    userPayload.about = data?.about;

    const userUpdatedResponse = await updateUserData(
      userPayload,
      userData?._id
    );
    console.log(userUpdatedResponse);
    
    setUserData(userUpdatedResponse);
  };
  console.log(userAvatarFormData);

  useEffect(() => {
    const newData = {
      name: userData?.Name || "",
      url: userData?.avatar || "",
      about: userData?.about || "",
    };
    setData(newData);
  }, [userData]);

  console.log(data,userData);
  
  return (
    <div className="flex flex-col w-full px-4">
      <div className="flex items-center gap-4 text-white py-4">
        <ArrowLeftIcon
          className="size-7 cursor-pointer h-full rounded-r-full hover:opacity-50"
          onClick={profileHandler}
        />
        <p className="text-2xl font-medium">Profile</p>
      </div>

      <div className="flex items-center justify-center my-8">
        <label htmlFor="profile-upload">
          <div className="relative hover:opacity-50 cursor-pointer">
            <Image
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              src={data?.url && data?.url}
              alt="Dan Abramov"
              className=""
            />
            <div className="absolute top-[40%] w-full items-center flex flex-col text-white">
              <CameraIcon
                className="size-7 cursor-pointer h-full rounded-r-full"
                onClick={profileHandler}
              />
              <p className="font-medium opacity-80">Change Profile</p>
            </div>
          </div>
        </label>
        <Input
          id="profile-upload"
          placeholder="Select Date and Time"
          size="md"
          type="file"
          accept="image/*"
          onChange={avatarUpdateHandler}
          hidden
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col my-4">
          <p className="text-sm text-pink-400 py-2">Your name</p>
          <Input
            placeholder="UserName"
            variant="unstyled"
            bg="gray.800"
            py={"0.75rem"}
            px={"1rem"}
            color={"gray.500"}
            h={"full"}
            value={data?.name}
            onChange={(e) => {
              setData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col my-4">
          <p className="text-sm text-pink-400 py-2">About</p>
          <Input
            placeholder="about yourself..."
            variant="unstyled"
            bg="gray.800"
            py={"0.75rem"}
            px={"1rem"}
            color={"gray.500"}
            h={"full"}
            value={data?.about}
            onChange={(e) => {
              setData((pre) => {
                return { ...pre, about: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-end my-4">
        <Button colorScheme="pink" onClick={profileUpdateHandler}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
