import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SocketProvider } from "./context/Socket.context.jsx";
import { ChatProvider } from "./context/Chat.context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <SocketProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </SocketProvider>
    </ChakraProvider>
  </StrictMode>
);
