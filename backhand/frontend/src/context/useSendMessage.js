import { useState } from "react";
import axios from "axios";
import useConversation from "../statemange/userConversation.js";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages } = useConversation();

  const sendMessages = async (messageText) => {
    setLoading(true);

    if (!selectedConversation || !selectedConversation._id) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {
        message: messageText,
      });

      const newMessage = res.data.newMessage;

      // ✅ Directly add message to UI
      setMessages((prev) => [...prev, newMessage]);

    } catch (error) {
      console.error("❌ useSendMessage error", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
}

export default useSendMessage;
