// src/socket/events/index.ts

import { Server } from "socket.io";

import onConnection from "./events/on-connect";
import onSendMessage from "./events/send-message";
import onDisconnect from "./events/on-disconnect";
import onStartTime from "./events/on-start-time";

const connectedSockets: Set<string> = new Set();
const secCount: number = 0;

const handleSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    onConnection(socket, connectedSockets, secCount);
    onSendMessage(socket);
    onStartTime(socket);
    onDisconnect(socket, connectedSockets);
  });
};

export default handleSocketEvents;
