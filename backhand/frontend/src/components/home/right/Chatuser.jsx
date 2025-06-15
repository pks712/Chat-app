import React from "react";
import { HiArrowLeft } from "react-icons/hi";          // ⬅️ Back icon
import useConversation from "../../../statemange/userConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

const Chatuser = () => {
  const {
    selectedConversation,
    setShowChatOnMobile,      // ⬅️ bring this setter
  } = useConversation();

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation?._id);


 

  return (
    <div className="flex items-center space-x-4 pl-2 pr-4 py-2 bg-gray-900 hover:bg-gray-700 duration-300">
      {/* Mobile Back Button */}
      <button
        onClick={() => setShowChatOnMobile(false)}
        className="lg:hidden text-white p-2"
      >
        <HiArrowLeft size={24} />
      </button>

      {/* Avatar with online indicator */}
      <div className="relative w-11 rounded-full">
        <img
          src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
          alt="profile"
          className="rounded-full w-11 h-11 object-cover"
        />
        {isOnline && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-gray-900 bg-green-500"></span>
        )}
      </div>

      {/* User Info */}
      <div>
        <h1 className="text-xl text-white">{selectedConversation.name}</h1>
        <span className="text-sm text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default Chatuser;

