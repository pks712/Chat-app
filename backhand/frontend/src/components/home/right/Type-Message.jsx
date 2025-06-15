import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import useSendMessage from "../../../context/useSendMessage";

const Type_Message = () => {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // prevent empty send
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handelSubmit} className="w-full flex justify-center">
      {/* Container */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          bg-slate-900 px-4 py-2
          lg:left-[calc(33%)] lg:right-0 lg:px-6
        "
      >
        <div className="border border-gray-700 rounded-lg flex items-center px-2">
          {/* Emoji Button */}
          <button
            type="button"
            className="text-xl mr-2 hover:bg-gray-600 w-10 h-8 rounded-sm flex items-center justify-center relative group"
          >
            <BsEmojiSmile />
            <span className="absolute bottom-full rounded bg-gray-900 w-14 h-7 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 duration-300">
              Emojies
            </span>
          </button>

          {/* Attachment Button */}
          <button
            type="button"
            className="text-xl mr-4 hover:bg-gray-600 w-10 h-8 rounded-sm flex items-center justify-center relative group"
          >
            <GrAttachment />
            <span className="absolute bottom-full rounded bg-gray-900 w-14 h-7 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 duration-300">
              Attach
            </span>
          </button>

          {/* Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="grow outline-none bg-transparent text-white placeholder:text-gray-400"
            placeholder="Type a message"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading}
            className="text-3xl text-white hover:bg-gray-600 w-10 h-8 rounded-sm flex items-center justify-center relative group"
          >
            <IoMdSend />
            <span className="absolute bottom-full mb-1 rounded bg-gray-900 flex items-center justify-center text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 duration-300">
              Send
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Type_Message;
