import { Socket } from "socket.io";

const onConnection = (
  socket: Socket,
  membersSet: Set<string>,
  secCount: number,
) => {
  console.log(`A user connected: ${socket.id}`);

  membersSet.add(socket.id);

  socket.emit("current_time", { time: secCount });
  socket.emit("current_meeting_members", { members: Array.from(membersSet) });

  socket.broadcast.emit("meeting_members", {
    id: socket.id,
    message: "A new user has joined the meeting",
    members: Array.from(membersSet),
  });
};

export default onConnection;
