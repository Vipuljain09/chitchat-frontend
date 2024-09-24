import { Button, Input } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <div className="w-screen">
      <div className="w-full flex items-center ">
        <Input
          placeholder="Join Room"
          width={"30%"}
          padding={"20px"}
          margin={"20px"}
        />
        <Button colorScheme="teal" variant="outline" size={"md"}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default Home;
