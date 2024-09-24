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
        p={2}
        color="white"
        borderRadius={"0.5rem"}
        borderTopEndRadius={"0px"}
      >
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span>You</span>
          <span>{time || "10:12 am"}</span>
        </div>
        <div className="py-2">
          {data?.content ||
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          dolor aliquid amet quibusdam debitis omnis temporibus ullam at animi
          ipsum? Architecto aperiam unde officia, odio sint, quos a quia
          quibusdam neque sit consequuntur alias optio obcaecati, cum atque?
          Quidem blanditiis earum non obcaecati.`}
        </div>
      </Box>
    </div>
  );
};

export default SendMessageText;
