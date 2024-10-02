import { Box } from "@chakra-ui/react";
import React from "react";
import { UserAvatar } from "../../utils/InputField";
import { timeSince } from "../../../utils/helper";

const SendMessageText = ({ data }) => {
  const time = timeSince(data?.time);

  return (
    <div className="flex gap-2 justify-end items-end my-[2px]">
      <Box
        // bg="gray.500"
        className="sm:w-[45%] w-[80%]"
        bgGradient="linear(to-r,#3f4c6b, #3f4c6b)"
        // w="40%"
        p={1}
        color="white"
        borderRadius={"0.5rem"}
        borderTopEndRadius={"0px"}
      >
        
        <div className="py-1/2 px-1">
          {data?.content ||
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          dolor aliquid amet quibusdam debitis omnis temporibus ullam at animi
          ipsum? Architecto aperiam unde officia, odio sint, quos a quia
          quibusdam neque sit consequuntur alias optio obcaecati, cum atque?
          Quidem blanditiis earum non obcaecati.`}
        </div>
        <div className="flex items-center justify-end text-xs text-gray-300">
          <span>{time || "10:12 am"}</span>
        </div>
      </Box>
    </div>
  );
};

export default SendMessageText;
