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
        p={2}
        color="white"
        borderRadius={"0.5rem"}
        borderTopLeftRadius={"0px"}
      >
        <div className="flex items-center justify-between text-xs text-white font-medium">
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

export default RecieveMessageText;
