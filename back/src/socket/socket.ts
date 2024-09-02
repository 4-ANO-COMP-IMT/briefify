// src/socket/events/index.ts

import { Server } from "socket.io";

import onConnection from "./events/on-connect";
import onSendMessage from "./events/send-message";
import onDisconnect from "./events/on-disconnect";
import onStartTime from "./events/on-start-time";
import onEnterMeeting from "./events/on-enter-meeting";

const connectedUsers: Set<{ socketId: string; userId: string }> = new Set();
const meetingLeader: string = "";
const secCount: number = 0;

const handleSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    onConnection(socket, secCount);
    onEnterMeeting(socket, connectedUsers);
    onSendMessage(socket);
    onStartTime(socket, meetingLeader);
    onDisconnect(socket, connectedUsers);
  });
};

export default handleSocketEvents;
