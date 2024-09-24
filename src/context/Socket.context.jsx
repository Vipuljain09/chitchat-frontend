import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      autoConnect: false, // Do not connect automatically
    });
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
    
  }, []);

  const loginHandler = (user) => {
    setUserData(user); // Update user data

    if (socket) {
      socket.auth = { userId: user._id }; // Pass the user data to the socket
      socket.connect(); // Manually connect the socket after login
    }
    
  };

  const logoutHandler = () => {
    setUserData(null);
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, setSocket, userData, setUserData,loginHandler,logoutHandler }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
