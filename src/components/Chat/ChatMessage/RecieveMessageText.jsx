import { Box } from "@chakra-ui/react";
import React from "react";
import { UserAvatar } from "../../utils/InputField";
import { timeSince } from "../../../utils/helper";

const RecieveMessageText = ({ data, isAvatarVisible = false, senderInfo }) => {
  const time = timeSince(data?.time);
  return (
    <div className="flex gap-2 my-[2px] sm:w-[45%] w-[80%]">
      <div className={`${!isAvatarVisible ? "invisible" : ""}`}>
        {<UserAvatar data={senderInfo} />}
      </div>
      <Box
        // bg="gray.500"
        bgGradient="linear(to-l, #5C73B9, #B330E1)"
        w="100%"
        p={1}
        color="white"
        borderRadius={"0.5rem"}
        borderTopLeftRadius={"0px"}
      >
        <div className="py-1/2 px-1">
          {data?.content ||
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          dolor aliquid amet quibusdam debitis omnis temporibus ullam at animi
          ipsum? Architecto aperiam unde officia, odio sint, quos a quia
          quibusdam neque sit consequuntur alias optio obcaecati, cum atque?
          Quidem blanditiis earum non obcaecati.`}
        </div>
        <div className="flex items-center justify-end text-xs text-white">
          <span>{time || "10:12 am"}</span>
        </div>
      </Box>
    </div>
  );
};

export default RecieveMessageText;
