import { useEffect } from "react";
import useConversation from "../statemange/userConversation.js";
import axios from "axios";

function useGetMessage() {
  const {
    selectedConversation,
    setMessages,
    loading,
    setLoading
  } = useConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `/api/message/get/${selectedConversation._id}`
        );

        if (Array.isArray(res.data.messages)) {
          setMessages(res.data.messages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("❌ Error in fetchMessages", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation, setMessages, setLoading]);

  return { loading };
}

export default useGetMessage;
