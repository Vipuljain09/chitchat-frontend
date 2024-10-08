import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/Socket.context";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const SignUp = () => {
  const navigate = useNavigate();
  const { loginHandler } = useContext(SocketContext);
  const [showPassword, setShowPassword] = useState(false);

  const [userDetail, setUserDetail] = useState({
    userName: "",
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

    if (userDetail?.userName?.trim() === "") {
      err.userName = "userName can't be empty";
      flg = false;
    }
    if (
      userDetail?.email?.trim() === "" ||
      !emailRegex?.test(userDetail?.email?.trim())
    ) {
      err.email = "email is not valid";
      flg = false;
    }
    if (
      userDetail?.password?.trim() === "" ||
      !passwordRegex.test(userDetail?.password?.trim())
    ) {
      err.password =
        "password should contain lower-case, upper-case, digit and specail character and have atleast 8 character long.";
      flg = false;
    }

    setErrMessage(err);
    return flg;
  };

  const submitHandler = async () => {
    if (!checkValidation()) return;

    try {
      const data = {
        userName: userDetail.userName,
        email: userDetail.email,
        password: userDetail.password,
      };
      const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
      const response = await fetch(`${apiUrl}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result?.statusCode >= 400) {
        setErrMessage({ finalMessage: result?.message });
        return;
      }

      console.log(result);

      const accessToken = result?.data?.accessToken;
      const userInfo = result?.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(userInfo));

      loginHandler(userInfo);

      // add loginHandler here to open the socket connection and update the user the data.

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userDetail, errMessage);

  return (
    <div className="flex w-full h-screen bg-gray-950 text-color">
      <div className="flex flex-col w-[90%] sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto h-[450px] mt-24">
        <p className="text-center text-red-400 text-sm font-medium">
          {errMessage?.finalMessage && errMessage?.finalMessage}
        </p>
        <p className="text-xl lg:text-2xl font-medium my-8">Sign Up</p>
        <div className="flex flex-col gap-8">
          <FormControl isInvalid={errMessage?.userName}>
            <Input
              placeholder="Username"
              variant="unstyled"
              bg="gray.800"
              p={"0.75rem"}
              color={"gray.500"}
              borderRadius={"2rem"}
              value={userDetail["userName"]}
              onChange={(e) =>
                setUserDetail({ ...userDetail, userName: e.target.value })
              }
            />
            {errMessage?.userName && (
              <FormErrorMessage px={2}>{errMessage?.userName}</FormErrorMessage>
            )}
          </FormControl>
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
          Sign Up
        </p>
        <p className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
          <span>Already have an account?</span>{" "}
          <span
            className="text-blue-500 cursor-pointer hover:opacity-70"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign In
          </span>
        </p>
        {/* bg-gradient-to-l from-#5C73B9 to-#B330E1 */}
      </div>
    </div>
  );
};

export default SignUp;
