import { isObjectIdOrHexString } from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import {io, getReceiverSocketId } from "../SocketIO/server.js";

export const sendMesage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    const newMessage = new Message({ senderId, receiverId, message });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);


const receiverSocketId = getReceiverSocketId(receiverId);
const senderSocketId = getReceiverSocketId(senderId); 



if (receiverSocketId) {
  io.to(receiverSocketId).emit("sendMessage", newMessage); 
}
// if (senderSocketId) {
//   io.to(senderSocketId).emit("sendMessage", newMessage); 
// }






    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });

  } catch (error) {
    console.log("Error in sending message: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getMessage = async (req, res) => {
try {
    
  const { id: chatuser } = req.params;
    const senderId = req.user._id;

    
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatuser] },
    }).populate("messages");
if(!conversation) {
     return  res.status(201).json({ message: "no conversation " });
}
const messages = conversation.messages;
  return  res.status(201).json({ messages });
} catch (error) {
    console.log("message getting error " + error)
     res.status(500).json({ message: "Internal server error" });
}
}