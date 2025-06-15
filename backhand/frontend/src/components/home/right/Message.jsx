import React from "react";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("messager"));
  const itsMe = message.senderId === authUser.user._id;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${itsMe ? "justify-end" : "justify-start"} mb-2`}>
      <div>
        <div
          className={`px-4 py-2 max-w-xs rounded-lg text-white break-words ${
            itsMe ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          {message.message}
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
