import { useEffect } from "react";
import useConversation from "../statemange/userConversation";
import { useSocketContext } from "./SocketContext";
import sound from "../assets/noti.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const isCurrentConversation =
        selectedConversation?._id?.toString() === newMessage.senderId?.toString() ||
        selectedConversation?._id?.toString() === newMessage.receiverId?.toString();

      if (isCurrentConversation) {
        // ✅ Check if message already exists
        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg._id === newMessage._id);
          if (exists) return prevMessages;

          // ✅ Only play sound if new
          const audio = new Audio(sound);
          audio.play();

          return [...prevMessages, newMessage];
        });
      }
    };

    socket.on("sendMessage", handleNewMessage);

    return () => socket.off("sendMessage", handleNewMessage);
  }, [socket, selectedConversation, setMessages]);
};

export default useGetSocketMessage;
