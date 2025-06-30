import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthProvider.jsx";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { authuser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
  if (authuser) {
   
    const newSocket = io("https://chat-app-1-r76t.onrender.com", {
      query: { userId: authuser.user._id },
      withCredentials: true,
    });

    newSocket.on("connect", () => {
    
    });

    newSocket.on("getonline", (users) => {
    
      setOnlineUsers(users);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(newSocket);

    return () => {
      newSocket.off();
      newSocket.close();
    };
  }
}, [authuser]);


  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
