import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { searchUserController } from "../../api/api.js";
import { UserAvatar } from "./InputField.jsx";
import { ChatContext } from "../../context/Chat.context.jsx";
const SearchedUserItem = ({ data, onClickHandler }) => {
  return (
    <div
      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded-lg"
      onClick={() => {
        onClickHandler(data);
      }}
    >
      <UserAvatar />
      <div className="flex flex-col text-sm">
        <p>{data?.userName || "--"}</p>
        <p>{data?.email || "--"}</p>
      </div>
    </div>
  );
};

const SearchUserInput = () => {

  const { addFriendHandler } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [inputGroupHeight, setInputGroupHeight] = useState(0);
  const inputGroupRef = useRef(null);

  const addUserHandler = (data) => {
    addFriendHandler(data);
    setText("");
  };

  useEffect(() => {
    if (inputGroupRef.current) {
      const height = inputGroupRef.current.offsetHeight;
      setInputGroupHeight(height);
    }
    if (!text || text?.trim() === "") {
      setSearchList([]);
      return;
    }
    const id = setTimeout(async () => {
      searchUserController(text).then((data) => {
        setSearchList(data);
      });
    }, 500);
    setTimeoutId(id);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text]);

  console.log(searchList, inputGroupHeight);

  return (
    <div className="relative flex flex-col my-6 text-color px-4">
      <InputGroup
        size="md"
        display="flex"
        alignItems="center"
        ref={inputGroupRef}
      >
        <InputLeftElement
          pointerEvents="none"
          display={"flex"}
          h={"full"}
          px={"0.5rem"}
        >
          <MagnifyingGlassIcon className="size-6" />
        </InputLeftElement>
        <Input
          placeholder="Search User"
          variant="unstyled"
          bg="gray.800"
          py={"0.75rem"}
          borderRadius={"1.5rem"}
          color={"gray.500"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </InputGroup>
      {searchList?.length > 0 && text?.trim() !== "" && (
        <div
          className={`absolute top-[${inputGroupHeight}px] min-h-[400px] z-10 my-2 w-full flex flex-col bg-gray-800 rounded-lg`}
        >
          {searchList?.map((item) => (
            <SearchedUserItem
              data={item}
              onClickHandler={addUserHandler}
              key={item?._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUserInput;
