import { Socket } from "socket.io";

const onDisconnect = (socket: Socket, membersSet: Set<string>) => {
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    membersSet.delete(socket.id);

    socket.broadcast.emit("meeting_members", {
      id: socket.id,
      message: "A user has left the meeting",
      members: Array.from(membersSet),
    });
  });
};

export default onDisconnect;
