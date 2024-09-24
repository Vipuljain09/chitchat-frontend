import { Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/Socket.context";

const SignIn = () => {
  const navigate = useNavigate();
  const { userData, setUserData, loginHandler } = useContext(SocketContext);
  const [userDetail, setUserDetail] = useState({
    password: "",
    email: "",
  });
  const [errMessage, setErrMessage] = useState(null);

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
      err.userName = "Email is not valid";
      flg = false;
    }
    if (
      userDetail?.password?.trim() === "" ||
      !passwordRegex.test(userDetail?.password?.trim())
    ) {
      err.userName =
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
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userData);

  return (
    <div className="flex w-full h-screen bg-gray-950 text-color">
      <div className="flex flex-col w-[90%] sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto h-[450px] mt-24">
        <p className="text-2xl font-medium my-8">Sign In</p>
        <div className="flex flex-col gap-8">
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
          <Input
            placeholder="Passsword"
            type="password"
            variant="unstyled"
            bg="gray.800"
            p={"0.75rem"}
            color={"gray.500"}
            borderRadius={"2rem"}
            value={userDetail["password"]}
            onChange={(e) =>
              setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
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
