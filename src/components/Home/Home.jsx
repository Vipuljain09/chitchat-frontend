import { Button, Input } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/auth/sign-in");
    }
  }, []);

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
