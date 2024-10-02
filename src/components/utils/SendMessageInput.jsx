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
import React, { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const SendMessageInput = ({ onSubmit, MessageText, setMessageText }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const emojiChangeHandler = (e) => {
    setMessageText((preText) => preText + e.native);
  };
  console.log(showEmojiPicker);

  return (
    <div className="flex items-center justify-between h-full">
      <InputGroup
        size="md"
        display="flex"
        alignItems="center"
        position={"relative"}
        h={"full"}
      >
        <InputLeftElement display={"flex"} h={"full"}>
          <div
            ref={emojiPickerRef}
            onClick={() => setShowEmojiPicker((pre) => !pre)}
          >
            <FaceSmileIcon className="size-6 cursor-pointer" />
          </div>
          {showEmojiPicker && (
            <div className="absolute bottom-[60px] left-[0]">
              <Picker
                data={data}
                onEmojiSelect={emojiChangeHandler}
                previewPosition="none"
                onClickOutside={(e) => {
                  if (
                    emojiPickerRef.current.outerHTML === e.target.outerHTML ||
                    emojiPickerRef?.current?.children?.[0]?.innerHTML ==
                      e.target.outerHTML
                  ) {
                    return;
                  }
                  setShowEmojiPicker(false);
                }}
                // className="bg-red-500"
              />
            </div>
          )}
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
