import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/Socket.context";
import { ChatContext } from "../../context/Chat.context";
import { getChatHistory, getFriendList } from "../../api/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
const SignIn = () => {
  const navigate = useNavigate();
  const { loginHandler } = useContext(SocketContext);
  const [showPassword, setShowPassword] = useState(false);
  const { setFriendList, setChatHistory } = useContext(ChatContext);
  const [userDetail, setUserDetail] = useState({
    password: "",
    email: "",
  });
  const [errMessage, setErrMessage] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };
  const checkValidation = () => {
    setErrMessage(null);
    const err = {};
    let flg = true;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      userDetail?.email?.trim() === "" ||
      !emailRegex?.test(userDetail?.email?.trim())
    ) {
      err.email = "Email is not valid";
      flg = false;
    }
    if (
      userDetail?.password?.trim() === "" ||
      !passwordRegex.test(userDetail?.password?.trim())
    ) {
      err.password =
        "Password should contain lower-case, upper-case, digit and specail character and have atleast 8 character long.";
      flg = false;
    }
    setErrMessage(err);
    return flg;
  };

  const submitHandler = async () => {
    if (!checkValidation()) return;

    try {
      const data = {
        email: userDetail.email,
        password: userDetail.password,
      };

      const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;

      const response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (result?.statusCode >= 400) {
        setErrMessage({ finalMessage: result?.message });
        return;
      }

      const accessToken = result?.data?.accessToken;
      const userInfo = result?.data;
      loginHandler(userInfo);

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(userInfo));

      const friendInfoList = await getFriendList(userInfo?._id);
      const chatHistoryInfoList = await getChatHistory(userInfo?._id);
      console.log(friendInfoList, chatHistoryInfoList);

      setFriendList(friendInfoList);
      setChatHistory(chatHistoryInfoList);

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(errMessage);

  return (
    <div className="flex w-full h-screen bg-gray-950 text-color">
      <div className="flex flex-col w-[90%] sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto h-[450px] mt-24">
        <p className="text-center text-red-400 text-sm font-medium">
          {errMessage?.finalMessage && errMessage?.finalMessage}
        </p>
        <p className="text-2xl font-medium my-8">Sign In</p>
        <div className="flex flex-col gap-8">
          <FormControl isInvalid={errMessage?.email}>
            <Input
              placeholder="Email"
              variant="unstyled"
              bg="gray.800"
              p={"0.75rem"}
              color={"gray.500"}
              borderRadius={"2rem"}
              value={userDetail["email"]}
              onChange={(e) =>
                setUserDetail({ ...userDetail, email: e.target.value })
              }
            />
            {errMessage?.email && (
              <FormErrorMessage px={2}>{errMessage?.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errMessage?.password}>
            <InputGroup display={"flex"}>
              <Input
                placeholder="Passsword"
                type={showPassword ? "text" : "password"}
                variant="unstyled"
                bg="gray.800"
                p={"0.75rem"}
                pr={"1.5rem"}
                color={"gray.500"}
                borderRadius={"2rem"}
                value={userDetail["password"]}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, password: e.target.value })
                }
              />
              <InputRightElement m={1} display={"flex"}>
                {showPassword ? (
                  <EyeSlashIcon
                    className="cursor-pointer size-6"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <EyeIcon
                    className="cursor-pointer size-6"
                    onClick={toggleShowPassword}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            {errMessage?.password && (
              <FormErrorMessage px={2}>{errMessage?.password}</FormErrorMessage>
            )}
          </FormControl>
        </div>
        <p
          className="text-lg font-semibold py-3 my-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full cursor-pointer"
          onClick={submitHandler}
        >
          Sign In
        </p>
        <p className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
          <span>Don't have an account?</span>{" "}
          <span
            className="text-blue-500 cursor-pointer hover:opacity-70"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
