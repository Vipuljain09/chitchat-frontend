import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  LinkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const SendMessageInput = ({ onSubmit, MessageText, setMessageText }) => {

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  
  return (
    <div className="flex items-center justify-between h-full">
      <InputGroup size="md" display="flex" alignItems="center" h={"full"}>
        <InputLeftElement pointerEvents="none" display={"flex"} h={"full"}>
          <FaceSmileIcon className="size-6 cursor-pointer" />
        </InputLeftElement>
        <Input
          placeholder="Text anything...."
          variant="unstyled"
          bg="gray.800"
          py={"0.75rem"}
          color={"gray.500"}
          h={"full"}
          value={MessageText}
          onChange={(event) => setMessageText(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement
          pointerEvents="none"
          display={"flex"}
          h={"full"}
          px={"0.5rem"}
          mr={"32px"}
        >
          <LinkIcon className="size-8 cursor-pointer" />
        </InputRightElement>
      </InputGroup>

      <PaperAirplaneIcon
        className="size-12 cursor-pointer text-white bg-pink-500 p-3 rounded-full ml-6"
        onClick={onSubmit}
      />
    </div>
  );
};

export default SendMessageInput;
