import { Socket } from "socket.io";

const onDisconnect = (
  socket: Socket,
  membersSet: Set<{ socketId: string; userId: string }>,
) => {
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    for (const member of membersSet) {
      if (member.socketId === socket.id) {
        membersSet.delete(member);
        break;
      }
    }

    console.log(Array.from(membersSet));

    socket.broadcast.emit("meeting_members", {
      id: socket.id,
      message: "A user has left the meeting",
      members: Array.from(membersSet),
    });
  });
};

export default onDisconnect;
