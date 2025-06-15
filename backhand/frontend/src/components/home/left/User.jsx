import React from "react";
import useConversation from "../../../statemange/userConversation";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function User({ user }) {
  // ✅ दोनों setters लाओ
  const {
    selectedConversation,
    setSelectedConversation,
    setShowChatOnMobile,
  } = useConversation();

  const isSelected = selectedConversation?._id === user._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  // 👉 हैंडलर
  const handleClick = () => {
    setSelectedConversation(user);
    setShowChatOnMobile(true);
  };

  return (
    <div
      onClick={handleClick}
      className={`hover:bg-slate-600 duration-300 border border-gray-800  m-1 
      px-3 py-4 lg:py-6 xl:py-7  ${
        isSelected ? "bg-slate-700" : ""
      }`}
    >
      <div className="flex flex-col space-x-4 space-y-6">
        <div className="flex items-center space-x-4 cursor-pointer rounded-full">
          <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
            <div className="w-14 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
            </div>
          </div>
          <div>
            <h1 className="font-bold">{user.name}</h1>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
