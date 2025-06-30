// SocketIO/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4001"],
    credentials: true,
  },
});

const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;
  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getonline", Object.keys(users));

  socket.on("disconnect", () => {
    delete users[userId];
    io.emit("getonline", Object.keys(users));
  });
});

export { app, io, server };
