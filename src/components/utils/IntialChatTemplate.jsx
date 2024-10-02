import React from "react";
import ImageLogo from "../../assets/bgImage.jpg";
import { Image } from "@chakra-ui/react";
import BackgroundImage from "../../assets/messageBackground.jpg";
const IntialChatTemplate = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ backgroundImage: `url(${BackgroundImage})`, opacity:'80%' }}
    >
      <div className="flex flex-col w-[50%]">
        <div className="flex items-center justify-center">
          <Image
            src={ImageLogo}
            alt="Dan Abramov"
            width={"300px"}
            height={"300px"}
            borderRadius={"full"}
          />
        </div>
        <div className="flex flex-col gap-2 items-center my-4">
          <p className="text-2xl font-semibold">Welcome to your ChitChat App</p>
          <p className="text-sm text-center">
            The perfect place to stay connected with friends and family. Enjoy
            seamless conversations and real-time messaging with ease!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntialChatTemplate;
