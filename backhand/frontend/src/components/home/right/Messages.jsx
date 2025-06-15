import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../../context/useGetMessage.js";
import Loading from "../../../log-sign/Loading.jsx";
import useGetSocketMessage from "../../../context/useGetSocketMessage.jsx";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import useConversation from "../../../statemange/userConversation.js";

const Messages = () => {
  const { messages, loading } = useConversation();
  const lastMessageRef = useRef();
  const { socket } = useSocketContext();

  useGetMessage();       // ✅ Old messages load
  useGetSocketMessage(); // ✅ New socket messages

  // ✅ Auto scroll to bottom when new message added
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="pt-4 pb-24 px-4 overflow-y-auto h-[calc(100vh-80px)]">
      {loading ? (
        <Loading />
      ) : (
        Array.isArray(messages) &&
       messages.map((message, index) => (
  <div
    key={`${message._id}-${index}`}  
    ref={index === messages.length - 1 ? lastMessageRef : null}
  >
    <Message message={message} />
  </div>
))

      )}

      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <p className="text-center text-gray-400 mt-4">Say hi!</p>
      )}
    </div>
  );
};

export default Messages;
